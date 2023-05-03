import { FC, useContext, useEffect, useId, useRef, useState } from 'react'

import {
   Box,
   Button,
   ButtonGroup,
   Chip,
   Divider,
   Grid,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemSecondaryAction,
   ListItemText,
   ListSubheader,
   Paper, Stack, Tooltip, Typography
} from '@mui/material'
import { styled } from '@mui/styles'
import {
   ArrowDownwardRounded,
   ArrowUpwardRounded,
   DoneRounded,
   Download,
   GroupAddRounded,
   GroupWorkRounded,
   HighlightOffRounded,
   ManageAccountsRounded,
   PeopleAltRounded,
   PeopleOutlineRounded,
   PersonRounded,
   PersonSearchRounded,
   SaveAsRounded,
   SaveRounded,
   SearchRounded,
   TableViewRounded
} from '@mui/icons-material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import {
   BandejaProcesos,
   ConfirmDialogModal,
   ConfirmDialogRefProps,
   LinearWithValueLabel,
   ListItemFade,
   ListItemZoom,
   ModalLoader,
   MyAutocomplete,
   MySelect,
   MySelectItem,
   MyTextField,
   Scrollbar,
   SimpleModal,
   SimpleModalRefProps
} from 'components'

import { useAnalizarExtraccion, useAsignarExtraccion, useAuth } from 'hooks'

import {
   AsignarExtraccionProvider,
   AsignarExtraccionContext,
   useAsignarExtraccionContext
} from 'context'

import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, Usuario } from 'interfaces'
import { applyCommaThousands, noty, parseJsonTimestampToDate } from 'helpers'
import { messages } from 'constants/'
import { format, parseISO } from 'date-fns'

const MainPaper = styled(Paper)({
   height: '100%',
   overflow: 'auto'
})

const delayFadeTop: number = 200
const durationFadeTop: number = 500

const AsignarExtraccionSubMod: FC = () => {
   /* » Custom hook's ... */
   const { loadingExtraccion, loadingTablaDinamicaDb, findTablaDinamicaByUsrCreador } = useAsignarExtraccion()
   const { loadingAsigGrupoCamposAnalisisDb } = useAnalizarExtraccion()
   const { findAllUser } = useAuth()

   // ► Effect's ...
   useEffect(() => { findTablaDinamicaByUsrCreador() }, [])
   useEffect(() => { findAllUser() }, [])

   return (
      <>
         <BandejaProcesos>
            {/* ► Listas: Tablas Dinámicas y Grupos ... */}
            <Grid container item xs={ 12 } lg={ 3 } spacing={ 0.5 }>
               <Grid item xs={ 6 } lg={ 12 }>
                  <MainPaper variant='outlined'>
                     <Scrollbar>
                        <ListaTablasExtraccion />
                     </Scrollbar>
                  </MainPaper>
               </Grid>

               <Grid item xs={ 6 } lg={ 12 }>
                  <MainPaper variant='outlined'>
                     <Scrollbar>
                        <ListaGruposCamposAnalisis />
                     </Scrollbar>
                  </MainPaper>
               </Grid>
            </Grid>

            <Grid item xs={ 12 } lg={ 9 }>
               <MainPaper variant='outlined'>
                  <Scrollbar>
                     <ListaAsignacionesGrupo />
                  </Scrollbar>
               </MainPaper>
            </Grid>
         </BandejaProcesos>

         {/* » MODAL: Loading ...  */}
         { loadingExtraccion && <ModalLoader /> }
         { loadingTablaDinamicaDb && <ModalLoader /> }
         { loadingAsigGrupoCamposAnalisisDb && <ModalLoader /> }
      </>
   )
}

const ListaTablasExtraccion: FC = () => {
   /* ► CONTEXT-HOOK'S ... */
   const {
      handleAddTablaDinamicaTmp
   } = useContext(AsignarExtraccionContext)

   /* ► HOOK'S ... */
   const [selectedItem, setSelectedItem] = useState(-1)

   /* ► CUSTOM-HOOK'S  */
   const { tablasDinamicasDb, countTablaDinamicaByNombre } = useAsignarExtraccion()

   return (
      <List
         subheader={ <ListSubheader>Bases disponibles</ListSubheader> }
      >
         {
            tablasDinamicasDb.map((tablaDinamica, i) => (
               <ListItemFade key={ tablaDinamica.idTabla } i={ 0 } direction='left'>
                  <ListItemButton
                     selected={ selectedItem === i }
                     onClick={ () => {
                        countTablaDinamicaByNombre(tablaDinamica.nombre)
                        handleAddTablaDinamicaTmp('ADD', tablaDinamica)
                        setSelectedItem(i)
                     } }
                  >
                     <ListItemIcon><TableViewRounded /></ListItemIcon>
                     <ListItemText primary={
                        <Box display='flex' justifyContent='space-between' gap={ 1 } flexWrap='wrap'>
                           <Typography variant='h5'>{ tablaDinamica.nombre }</Typography>
                           <Typography variant='h6'>{ format(parseJsonTimestampToDate(tablaDinamica.fechaCreacion), 'dd-MM-yyyy') }</Typography>
                        </Box>
                     } />
                  </ListItemButton>
               </ListItemFade>
            ))
         }
      </List>
   )
}

const ListaGruposCamposAnalisis: FC = () => {
   /* ► CONTEXT-HOOK ...  */
   const {
      tablaDinamicaTmp,
      gruposCamposAnalisisTmp,
      rangosToAssignMasivaTmp,
      handleAddGrupoCamposAnalisisTmp,
      handleAddAsigsGrupoCamposAnalisisTmp,
      handleActionParamsToAsigMasivaTmp,
      handleRangosToAsigMasivaTmp
   } = useAsignarExtraccionContext()

   /* ► HOOK'S  */
   const modalAssing = useRef({} as SimpleModalRefProps)
   const modalTotalAsignMasiva = useRef({} as SimpleModalRefProps)
   const [selectedItem, setSelectedItem] = useState(-1)
   const [toggleAvailableRangesFromGCATmp, setToggleAvailableRangesFromGCATmpTmp] = useState(false)

   /* ► CUSTOM-HOOK'S ... */

   /* ► EFFECT'S ... */
   useEffect(() => { /* ► Cleanup: Si cambia `tablaDinamicaTmp`, resetea selección ...  */
      setSelectedItem(-1)
   }, [tablaDinamicaTmp])

   /* ► HANDLER'S: Clean-up ... */
   const handleModalTotalAsignMasivaOnOpen = () => {
      handleActionParamsToAsigMasivaTmp('RESET')
      handleRangosToAsigMasivaTmp('REMOVE')
   }

   const handleModalAssingOnOpen = () => {
      handleRangosToAsigMasivaTmp('REMOVE')
   }

   return (
      <>
         {/* ► ... */}
         <List
            subheader={ <ListSubheader>Grupos de analisis</ListSubheader> }
         >
            {
               gruposCamposAnalisisTmp.map((grupo, i) => (
                  <ListItemFade key={ grupo.idGrupo } i={ i } direction='bottom' >
                     <ListItemButton
                        selected={ i === selectedItem }
                        onClick={ () => {
                           setSelectedItem(i)
                           handleAddGrupoCamposAnalisisTmp(grupo)
                        } }
                     >

                        <ListItemIcon><GroupWorkRounded fontSize='small' /></ListItemIcon>

                        <ListItemText
                           onClick={ () => handleAddAsigsGrupoCamposAnalisisTmp('ADD', grupo.asigGrupoCamposAnalisis) }
                           primary={
                              <Typography variant='h5'>{ grupo.nombre }</Typography>
                           }
                        />

                        <ListItemSecondaryAction>
                           <IconButton
                              size='small'
                              onClick={ () => { modalAssing.current.setOpen(true) } }
                           >
                              <GroupAddRounded fontSize='small' />
                           </IconButton>
                        </ListItemSecondaryAction>

                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>

         {/* ► MODAL: Assign ... */}
         <SimpleModal ref={ modalAssing } onOpen={ handleModalAssingOnOpen }>
            <Box
               display='flex'
               flexDirection='column'
               alignItems='center'
               gap={ 2 }
            >

               {/* ► HEADER: Action's ... */}
               <ButtonGroup variant='contained' color='primary'>
                  <Button
                     startIcon={ toggleAvailableRangesFromGCATmp ? <ArrowUpwardRounded /> : <ArrowDownwardRounded /> }
                     onClick={ () => { setToggleAvailableRangesFromGCATmpTmp(prev => !prev) } }
                  >
                     Sugerir rangos
                  </Button>
                  <Button
                     startIcon={ <PeopleAltRounded /> }
                     onClick={ () => { modalTotalAsignMasiva.current.setOpen(true) } }
                  >
                     Asignación masiva
                  </Button>
                  <Button startIcon={ <PeopleOutlineRounded /> }>Asignar disponibles</Button>
               </ButtonGroup>

               {/* ► BODY: ... */}
               <>
                  {/* ► Apartado: Rangos sugeridos ...  */}
                  <SuggestedRanges open={ toggleAvailableRangesFromGCATmp } />

                  {/* ► Apartado: Formulario ...  */}
                  <PoolAsigns rangosAsignaciones={ rangosToAssignMasivaTmp } />
               </>

            </Box>

         </SimpleModal>

         {/* ► MODAL: Número de analistas y registros, para Asinación masiva ... */}
         <SimpleModal ref={ modalTotalAsignMasiva } onOpen={ handleModalTotalAsignMasivaOnOpen }>
            <Formik
               initialValues={{
                  totalAnalistas: 0,
                  regPorAnalista: 0
               }}
               validationSchema={Yup.object({
                  totalAnalistas: Yup.number().required('¡Campo requerido!')
                     .min(1, '¡Debe ser mayor 0!').max(8, '¡El Máximo es 8!'),
                  regPorAnalista: Yup.number().required('¡Campo requerido!')
                     .min(1, '¡Debe ser mayor a 0!')
               })

               }
               onSubmit={ (values: { totalAnalistas: number, regPorAnalista: number }, meta): void => {
                  handleActionParamsToAsigMasivaTmp('ADD', values)
                  modalTotalAsignMasiva.current.setOpen(false)
               } }>
               {() => (
                  <Form>
                     <Stack
                        direction='row'
                        spacing={ 2 }
                        alignItems='flex-start'
                        divider={ <Divider orientation='vertical' flexItem /> }
                     >
                        <MyTextField type='number'name='totalAnalistas'label='Analistas'width={ 7.5 }focused />
                        <MyTextField type='number' name='regPorAnalista' label='Registros' width={ 7.5 } />
                        <Button type='submit' variant='outlined'><ManageAccountsRounded /></Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

      </>
   )
}

const getFadecommonProps = (i: number) => ({
   left: true,
   big: true,
   delay: i * 400
})

const SuggestedRanges: FC<{ open: boolean }> = ({ open }) => {
   /* ► CONTEXT ... */
   const { rangosAvailableToAssignTmp } = useAsignarExtraccionContext()

   /* ► HOOK'S ...  */

   /* ► CUSTOM - HOOK'S ...  */
   const { loadingTablaDinamicaDb } = useAsignarExtraccion()

   /* ► CONDITIONAL - RENDERING ... */
   if (!open) return <></>
   if (open && rangosAvailableToAssignTmp.length === 0) {
      noty('success', messages.ALL_RANGES_ASSIGNED)
      return <></>
   }

   /* ► DEP'S ...  */

   return (
      <Stack
         width='90%'
         direction='row'
         justifyContent='space-around'
         divider={ <Divider orientation='vertical' flexItem /> }
      >
         {
            rangosAvailableToAssignTmp.map(({ regAnalisisIni, regAnalisisFin }, i) => (
               <Fade key={ i } { ...getFadecommonProps(i) }>
                  <Fade { ...getFadecommonProps(i) } when={ !loadingTablaDinamicaDb }>
                     <Chip
                        sx={{ width: 120 }}
                        size='small'
                        variant='outlined'
                        label={ `${applyCommaThousands(regAnalisisIni)} - ${applyCommaThousands(regAnalisisFin)}` }
                     />
                  </Fade>
               </Fade>
            ))
         }

      </Stack>
   )
}

type PoolAsignsProps = {
   rangosAsignaciones: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]
}

const PoolAsigns: FC<PoolAsignsProps> = ({ rangosAsignaciones = [] }) => {
   /* ► HOOK'S ... */
   const prefix = useId()

   /* ► CONDITIONAL-RENDER ... */
   if (rangosAsignaciones.length === 0) return <FrmAsign />

   return (
      <>
         {
            rangosAsignaciones.map((rango, i) => (
               <FrmAsign key={ `${prefix}-${i}` } rangoAsignacion={ rango } index={ i } />
            ))
         }
      </>
   )
}

type FrmAsignProps = {
   index?: number
   rangoAsignacion?: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>
}

const FrmAsign: FC<FrmAsignProps> = ({ rangoAsignacion, index = 0 }) => {
   /* ► CONTEXT-HOOK ...  */
   const {
      grupoCamposAnalisisTmp,
      rangosAvailableToAssignTmp
   } = useAsignarExtraccionContext()

   /* ► HOOK'S  */
   // eslint-disable-next-line no-undef
   const debaunceRef = useRef<NodeJS.Timeout>()
   const [isEnabled, setIsEnabled] = useState(true)
   const [isEnabledDebaunce, setIsEnabledDebaunce] = useState(true)

   /* ► CUSTOM-HOOK'S ... */
   const { userscurrentGroupDb } = useAuth()
   const {
      errorTablaDinamicaDb,
      totalRegistrosTablaDinamica,
      loadingTablaDinamicaDb,
      findTablaDinamicaByUsrCreador,
      assignedToGrupoAnalisis
   } = useAsignarExtraccion()

   /* ► EFFECT'S ... */
   useEffect(() => {
      if (isEnabled) return
      if (debaunceRef.current) clearTimeout(debaunceRef.current)
      debaunceRef.current = setTimeout(() => { setIsEnabledDebaunce(false) }, 1000)
      return () => {
         clearTimeout(debaunceRef.current!)
      }
   }, [isEnabled])

   /* ► DEP'S ...  */
   const isDisabledFrmAsign = loadingTablaDinamicaDb || rangosAvailableToAssignTmp.length === 0

   /* ► CONDITIONAL-RENDER ... */
   if (!isEnabledDebaunce) return <></>

   return (
      <Fade top big delay={ delayFadeTop * (index + 1) } duration={ durationFadeTop }>
         <Fade bottom when={ isEnabled }>
            <Formik
               initialValues={{
                  usrAnalista: {} as Usuario,
                  regAnalisisIni: rangoAsignacion?.regAnalisisIni || '' as any,
                  regAnalisisFin: rangoAsignacion?.regAnalisisFin || '' as any
               }}
               validationSchema={ Yup.object({
                  usrAnalista: Yup.object().nullable().required('¡Requerido!'),
                  regAnalisisIni: Yup.number().required('¡Requerido!')
                     .min(1, '¡Debe ser mayor o igual a 1!')
                     .max(Yup.ref('regAnalisisFin'), '¡Debe ser menor al máximo!'),
                  regAnalisisFin: Yup.number().required('¡Requerido!')
                     .min(Yup.ref('regAnalisisIni'), '¡Debe ser mayor o igual al mínimo!')
                     .max(totalRegistrosTablaDinamica, '¡No debe exceder al total de registros!')
               })}
               onSubmit={ async (values: Partial<AsigGrupoCamposAnalisisDto>, meta): Promise<void> => {
                  const { idGrupo } = grupoCamposAnalisisTmp
                  await assignedToGrupoAnalisis({ ...values, grupo: { idGrupo } })
                  await findTablaDinamicaByUsrCreador()
                  meta.resetForm()
                  /* ► Si no existe errores del lado del servidor y el Componente fué creado masivamente  ... */
                  if (!errorTablaDinamicaDb && Boolean(rangoAsignacion)) setIsEnabled(false)
               } }>
               {(props) => (
                  <Form>
                     <Stack
                        direction='row'
                        spacing={ 1 }
                        alignItems='flex-start'
                        divider={ <Divider orientation='vertical' flexItem /> }
                     >
                        <MyTextField type='number' name='regAnalisisIni' label='Rango inicial' width={ 12 } focused />
                        <MyTextField type='number' name='regAnalisisFin' label='Rango final' width={ 12 } />
                        <MyAutocomplete name='usrAnalista' label='Analista' width={ 30 } opt={ userscurrentGroupDb } { ...props } />
                        <Button
                           type='submit'
                           variant='outlined'
                           disabled={ isDisabledFrmAsign }
                        >
                           <SaveRounded />
                        </Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </Fade>
      </Fade>
   )
}

const ListaAsignacionesGrupo: FC = () => {
   // ► Context ...
   const {
      grupoCamposAnalisisTmp,
      filteredAsigsAnalisisTmp,
      totalAsigsByGrupoTmp
   } = useAsignarExtraccionContext()

   // ► Hook's ...
   const confirmEliminarAsign = useRef({} as ConfirmDialogRefProps)
   const modalReasignacion = useRef({} as SimpleModalRefProps)
   const [selectedItem, setSelectedItem] = useState(-1)
   const [isConfirmEliminarAsign, setIsConfirmEliminarAsign] = useState(false)
   const [selectedAsign, setSelectedAsign] = useState({} as AsigGrupoCamposAnalisisDto)

   // ► Custom hook's ...
   const {
      totalRegistrosTablaDinamica,
      findTablaDinamicaByUsrCreador,
      deleteAssignedToGrupoAById,
      reasignToGrupoAnalisis
   } = useAsignarExtraccion()

   const { userscurrentGroupDb } = useAuth()
   const { downloadAnalisadosByDates } = useAnalizarExtraccion()

   // » Effect's ...
   useEffect(() => { /* ► Si acepta eliminar los rangos asignados ... */
      if (!isConfirmEliminarAsign) return
      (async () => {
         await deleteAssignedToGrupoAById(selectedAsign.idAsigGrupo)
         await findTablaDinamicaByUsrCreador()

         /* ► Clean-up ... */
         setIsConfirmEliminarAsign(false)
         setSelectedAsign({} as AsigGrupoCamposAnalisisDto)
      })()
   }, [isConfirmEliminarAsign])

   // ► Dep's ...
   const hasGrupoCamposAnalisisTmp: boolean = Boolean(Object.entries(grupoCamposAnalisisTmp).length)

   return (
      <>

         {/* ► HEADER: Indicadores ... */}
         <Fade top when={ hasGrupoCamposAnalisisTmp }>
            {
               hasGrupoCamposAnalisisTmp && (
                  <Box p={ 2 }>
                     <Stack
                        justifyContent='space-around'
                        direction='row'
                        divider={ <Divider orientation='vertical' flexItem /> }
                     >
                        <Stack direction='row' spacing={ 1 }>
                           <Typography variant='h4'>Registros:</Typography>
                           <Typography variant='h3' color='burlywood'>
                              { new Intl.NumberFormat('es-PE').format(totalRegistrosTablaDinamica) }
                           </Typography>
                        </Stack>

                        <Stack direction='row' spacing={ 1 }>
                           <Typography variant='h4'>Asignados:</Typography>
                           <Typography variant='h3' color='green'>
                              { new Intl.NumberFormat('es-PE').format(totalAsigsByGrupoTmp) }
                           </Typography>
                        </Stack>

                        <Stack direction='row' spacing={ 1 }>
                           <Typography variant='h4'>Pendientes:</Typography>
                           <Typography variant='h3' color='red'>
                              { new Intl.NumberFormat('es-PE').format(totalRegistrosTablaDinamica - totalAsigsByGrupoTmp) }
                           </Typography>
                        </Stack>
                     </Stack>
                  </Box>
               )
            }
         </Fade>

         {/* ► Filter: ... */}
         <FrmFilterListaAsignaciones />

         {/* ► Body: ... */}
         <List subheader={ <ListSubheader>Rangos asignados</ListSubheader> }>
            {
               filteredAsigsAnalisisTmp.map((asign, i) => (
                  <ListItemZoom key={asign.idAsigGrupo} i={i}>
                     <ListItemButton
                        selected={ i === selectedItem }
                        onClick={ () => setSelectedItem(i) }
                     >

                        <ListItemIcon>
                           {
                              asign.totalAsignados === asign.totalAnalizados ? <DoneRounded color='success' /> : <PersonRounded color='disabled' />
                           }

                        </ListItemIcon>

                        <ListItemText
                           primary={
                              <Stack
                                 width={ '92%' }
                                 direction='row'
                                 overflow='auto'
                                 spacing={ 1 }
                                 divider={ <Divider orientation='vertical' flexItem /> }
                              >
                                 <Typography variant='h5'>{ format(parseISO(asign.fechaAsignacion), 'dd-MM-yyyy') }</Typography>
                                 <Typography variant='h5'>{ asign.usrAnalista.nombres }</Typography>
                                 <Typography variant='h5'>{ `Asignados: ${applyCommaThousands(asign.totalAsignados)}` }</Typography>
                                 <Typography variant='h5'>{ `Analizados: ${applyCommaThousands(asign.totalAnalizados)}` }</Typography>
                                 <Typography variant='h5'>{ `Pendientes: ${applyCommaThousands(asign.totalPendientes)}` }</Typography>
                                 <LinearWithValueLabel progress={ (asign.totalAnalizados / asign.totalAsignados) * 100 } width={ 100 } />
                                 <Typography variant='h5'>{ `R: ${asign.regAnalisisIni}-${asign.regAnalisisFin}` }</Typography>
                              </Stack>
                           }
                        />

                        <ListItemSecondaryAction>

                           <Tooltip title='Descargar asignados' placement='top-start' arrow>
                              <IconButton
                                 size='small'
                                 onClick={ () => {
                                    downloadAnalisadosByDates({
                                       idAsigGrupo: asign.idAsigGrupo,
                                       isAssignedTemplate: true
                                    })
                                 } }
                              >
                                 <Download fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Eliminar asignación' placement='top-start' arrow>
                              <IconButton
                                 size='small'
                                 onClick={ () => {
                                    setSelectedAsign(asign)
                                    confirmEliminarAsign.current.setIsOpen(true)
                                 } }
                              >
                                 <HighlightOffRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Reasignar' placement='top-start' arrow>
                              <IconButton
                                 size='small'
                                 disabled={ asign.totalAsignados === asign.totalAnalizados }
                                 onClick={ () => {
                                    setSelectedAsign(asign)
                                    modalReasignacion.current.setOpen(true)
                                 } }
                              >
                                 <PersonSearchRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                        </ListItemSecondaryAction>

                     </ListItemButton>
                  </ListItemZoom>
               ))
            }
         </List>

         {/* » MODAL: Confirm ...  */}
         <ConfirmDialogModal ref={ confirmEliminarAsign } title={'¿Seguro de continuar?'} setIsAccept={ setIsConfirmEliminarAsign } />

         {/* ► MODAL: Reasignación de grupo de analisis ...  */}
         <SimpleModal ref={ modalReasignacion }>
            <Formik
               initialValues={{
                  usrAnalista: {} as Usuario
               }}
               onSubmit={ async ({ usrAnalista }: { usrAnalista: Usuario }, meta): Promise<void> => {
                  await reasignToGrupoAnalisis({
                     idAsigGrupo: selectedAsign.idAsigGrupo,
                     usrAnalista
                  })
                  await findTablaDinamicaByUsrCreador()
                  meta.resetForm()
                  modalReasignacion.current.setOpen(false)
               } }
            >
               {(props) => (
                  <Form>
                     <Box
                        height={ 45 }
                        display='flex'
                        alignItems='flex-start'
                        gap={ 1 }
                     >
                        <MyAutocomplete name='usrAnalista' label='Ingrese un nuevo servidor' width={ 25 } opt={ userscurrentGroupDb } { ...props } />
                        <Button type='submit' variant='outlined' color='primary'><SaveAsRounded /></Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>
      </>
   )
}

const optEstadoAsig: MySelectItem[] = [
   { label: 'Completo', value: 1 },
   { label: 'Iniciado', value: 0 }
]

const FrmFilterListaAsignaciones: FC = () => {
   // ► Context ...
   const {
      handleActionFilteredAsigsGrupoCamposAnalisisTmp,
      handleActionFilterListAsigsTmp
   } = useAsignarExtraccionContext()

   return (
      <Formik
         initialValues={{
            fecIniAsignacion: format(new Date(), 'yyyy-MM-dd'),
            fecFinAsignacion: format(new Date(), 'yyyy-MM-dd'),
            completo: 1
         }}
         validationSchema={ Yup.object({
            fecIniAsignacion: Yup.date().max(Yup.ref('fecFinAsignacion'), '¡Debe ser menor o igual a la fecha final!'),
            fecFinAsignacion: Yup.date().min(Yup.ref('fecIniAsignacion'), '¡Debe ser mayor o igual a la fecha inicial!'),
            completo: Yup.bool().required('¡Campo Requerido!')
         })}
         onSubmit={ (values: { fecIniAsignacion: string, fecFinAsignacion: string, completo: any }, meta): void => {
            handleActionFilterListAsigsTmp('SAVE', values as Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>)
            handleActionFilteredAsigsGrupoCamposAnalisisTmp('SAVE', values)
         } }
         onReset={() => {
            handleActionFilterListAsigsTmp('RESET')
         }}
      >
         {() => (
            <Form>
               <Stack
                  m={ 1.5 }
                  direction='row'
                  alignItems='center'
                  spacing={ 1 }
                  divider={ <Divider orientation='vertical' flexItem /> }
               >
                  <MyTextField type='date' name='fecIniAsignacion' label='Fecha inicio asignación' width={ 8 } focused />
                  <MyTextField type='date' name='fecFinAsignacion' label='Fecha fin asignación' width={ 8 } />
                  <MySelect name='completo' label='Estado' width={ 8 } opt={ optEstadoAsig } />
                  <Button size='small' type='submit' variant='contained'>
                     <SearchRounded fontSize='small' />
                  </Button>
               </Stack>
            </Form>
         )}
      </Formik>
   )
}

export default function Default () {
   return (
      <AsignarExtraccionProvider>
         <AsignarExtraccionSubMod />
      </AsignarExtraccionProvider>
   )
}
