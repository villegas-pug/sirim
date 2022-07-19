import { FC, useContext, useEffect, useId, useRef, useState } from 'react'

import {
   Box,
   Button,
   ButtonGroup,
   Divider,
   Grid,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemSecondaryAction,
   ListItemText,
   ListSubheader,
   Paper, Stack, Typography
} from '@mui/material'
import { styled } from '@mui/styles'
import {
   ArrowDownwardRounded,
   GroupAddRounded,
   GroupWorkRounded,
   ManageAccountsRounded,
   PeopleAltRounded,
   PeopleOutlineRounded,
   PersonRounded,
   RemoveCircleRounded,
   SaveRounded,
   TableViewRounded
} from '@mui/icons-material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import {
   ConfirmDialogModal,
   ConfirmDialogRefProps,
   GridContainer,
   LinearWithValueLabel,
   ModalLoader,
   MyAutocomplete,
   MyTextField,
   Scrollbar,
   SimpleModal,
   SimpleModalRefProps
} from 'components'

import { useAsignarExtraccion, useAuth } from 'hooks'

import {
   AsignarExtraccionProvider,
   AsignarExtraccionContext
} from 'context'

import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, Usuario } from 'interfaces'

const MainPaper = styled(Paper)({
   height: '100%'
})

const delayFadeTop: number = 200
const durationFadeTop: number = 500

const AsignarExtraccionSubMod: FC = () => {
   /* » CUSTOM-HOOK'S ... */
   const { loadingExtraccion, loadingTablasDinamicasDb, findAllTablaDinamica } = useAsignarExtraccion()
   const { findAllUser } = useAuth()

   /* ► EFFECT'S ...  */
   useEffect(() => { findAllTablaDinamica() }, [])
   useEffect(() => { findAllUser() }, [])

   return (
      <>
         <Fade duration={ 1500 }>
            <Paper sx={{ padding: 0.5 }} elevation={ 3 }>
               <GridContainer>

                  {/* ► Lista: Tablas Dinámicas ... */}
                  <Grid item xs={ 3 }>
                     <MainPaper variant='outlined'>
                        <Scrollbar height={ 70 }>
                           <ListaTablasExtraccion />
                        </Scrollbar>
                     </MainPaper>
                  </Grid>

                  <Grid item xs={ 4 }>
                     <MainPaper variant='outlined'>
                        <Scrollbar height={ 70 }>
                           <ListaGruposCamposAnalisis />
                        </Scrollbar>
                     </MainPaper>
                  </Grid>

                  <Grid item xs={ 5 }>
                     <MainPaper variant='outlined'>
                        <ListaAsignacionesGrupo />
                     </MainPaper>
                  </Grid>
               </GridContainer>
            </Paper>
         </Fade>

         {/* » MODAL: Loading ...  */}
         { loadingExtraccion && <ModalLoader /> }
         { loadingTablasDinamicasDb && <ModalLoader /> }
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
   const { tdDbFromCurrentUsr, countTablaDinamicaByNombre } = useAsignarExtraccion()

   return (
      <List
         subheader={ <ListSubheader>Bases disponibles</ListSubheader> }
      >
         {
            tdDbFromCurrentUsr.map((tablaDinamica, i) => (
               <Fade key={ tablaDinamica.nombre } top big delay={ delayFadeTop * (i + 1) } duration={ durationFadeTop }>
                  <ListItemButton
                     selected={ selectedItem === i }
                     onClick={ () => {
                        countTablaDinamicaByNombre(tablaDinamica.nombre)
                        handleAddTablaDinamicaTmp(tablaDinamica)
                        setSelectedItem(i)
                     } }
                  >
                     <ListItemIcon><TableViewRounded /></ListItemIcon>
                     <ListItemText primary={
                        <Typography variant='h5'>{ tablaDinamica.nombre }</Typography>
                     } />
                  </ListItemButton>
               </Fade>
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
      rangosToAsigMasivaTmp,
      handleAddGrupoCamposAnalisisTmp,
      handleAddAsigsGrupoCamposAnalisisTmp,
      handleTotalUsrsToAsigMasivaTmp,
      handleRangosToAsigMasivaTmp
   } = useContext(AsignarExtraccionContext)

   /* ► CUSTOM-HOOK'S ...  */

   /* ► HOOK'S  */
   const prefixItem = useId()
   const modalAssing = useRef({} as SimpleModalRefProps)
   const modalTotalAsignMasiva = useRef({} as SimpleModalRefProps)
   const [selectedItem, setSelectedItem] = useState(-1)

   /* ► CUSTOM-HOOK'S ... */

   /* ► EFFECT'S ... */
   useEffect(() => { /* ► Cleanup: Si cambia `tablaDinamicaTmp`, resetea selección ...  */
      setSelectedItem(-1)
   }, [tablaDinamicaTmp])

   /* ► HANDLER'S: Clean-up ... */
   const handleModalTotalAsignMasivaOnOpen = () => {
      handleTotalUsrsToAsigMasivaTmp('Reset')
      handleRangosToAsigMasivaTmp('Remove')
   }

   const handleModalAssingOnOpen = () => {
      handleRangosToAsigMasivaTmp('Remove')
   }

   return (
      <>
         {/* ►  */}
         <List
            subheader={ <ListSubheader>Grupos de analisis</ListSubheader> }
         >
            {
               gruposCamposAnalisisTmp.map((grupo, i) => (
                  <Fade key={ `${prefixItem}-${grupo.idGrupo}-${i}` } top big delay={ delayFadeTop * (i + 1) } duration={ durationFadeTop }>
                     <ListItemButton
                        selected={ i === selectedItem }
                        onClick={ () => {
                           setSelectedItem(i)
                           handleAddGrupoCamposAnalisisTmp(grupo)
                        } }
                     >

                        <ListItemIcon><GroupWorkRounded fontSize='small' /></ListItemIcon>

                        <ListItemText
                           onClick={ () => handleAddAsigsGrupoCamposAnalisisTmp(grupo.asigGrupoCamposAnalisis) }
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
                  </Fade>
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

               <ButtonGroup variant='contained' color='primary'>
                  <Button
                     startIcon={ <ArrowDownwardRounded /> }
                     onClick={ () => { handleRangosToAsigMasivaTmp('Remove') } }
                  >
                     Sugerir rango inicial
                  </Button>
                  <Button
                     startIcon={ <PeopleAltRounded /> }
                     onClick={ () => { modalTotalAsignMasiva.current.setOpen(true) } }
                  >
                     Asignación masiva
                  </Button>
                  <Button startIcon={ <PeopleOutlineRounded /> }>Asignar disponibles</Button>
               </ButtonGroup>

               <PoolAsigns rangosAsignaciones={ rangosToAsigMasivaTmp } />

            </Box>

         </SimpleModal>

         {/* ► MODAL: Número de analistas, para Asinación masiva ... */}
         <SimpleModal ref={ modalTotalAsignMasiva } onOpen={ handleModalTotalAsignMasivaOnOpen }>
            <Formik
               initialValues={{
                  totalAnalistas: ''
               }}
               validationSchema={Yup.object({
                  totalAnalistas: Yup.number().required('¡Campo requerido!')
                     .min(1, 'Debe ser mayor 0').max(8, '¡El Máximo es 8!')
               })

               }
               onSubmit={ ({ totalAnalistas }: { totalAnalistas: string }, meta): void => {
                  handleTotalUsrsToAsigMasivaTmp('Add', Number(totalAnalistas))
                  modalTotalAsignMasiva.current.setOpen(false)
               } }>
               {() => (
                  <Form>
                     <Stack direction='row' spacing={ 2 } alignItems='center' divider={ <Divider orientation='vertical' flexItem /> }>
                        <Typography variant='h3'>Número de analistas</Typography>
                        <MyTextField type='number' name='totalAnalistas' label='Analistas' width={ 8 } focused />
                        <Button type='submit' variant='outlined' size='large'><ManageAccountsRounded fontSize='large' /></Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

      </>
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
      grupoCamposAnalisisTmp
   } = useContext(AsignarExtraccionContext)

   /* ► HOOK'S  */
   // eslint-disable-next-line no-undef
   const debaunceRef = useRef<NodeJS.Timeout>()
   const [isEnabled, setIsEnabled] = useState(true)
   const [isEnabledDebaunce, setIsEnabledDebaunce] = useState(true)

   /* ► CUSTOM-HOOK'S ... */
   const { usersDb } = useAuth()
   const {
      errorTDDb,
      findAllTablaDinamica,
      assignedToGrupoAnalisis
   } = useAsignarExtraccion()

   /* ► EFFECT'S ... */
   useEffect(() => {
      if (isEnabled) return
      if (debaunceRef.current) clearTimeout(debaunceRef.current)
      debaunceRef.current = setTimeout(() => { setIsEnabledDebaunce(false) }, 1000)
   }, [isEnabled])

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
               })}
               onSubmit={ async (values: Partial<AsigGrupoCamposAnalisisDto>, meta): Promise<void> => {
                  const { idGrupo } = grupoCamposAnalisisTmp
                  await assignedToGrupoAnalisis({ ...values, grupo: { idGrupo } })
                  await findAllTablaDinamica()
                  /* ► Si no error en Asignación ... */
                  if (!errorTDDb) setIsEnabled(false)
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
                        <MyAutocomplete name='usrAnalista' label='Analista' width={ 30 } opt={ usersDb } { ...props } />
                        <Button type='submit' variant='outlined'><SaveRounded /></Button>
                     </Stack>
                  </Form>
               )}
            </Formik>
         </Fade>
      </Fade>
   )
}

const ListaAsignacionesGrupo: FC = () => {
   /* ► CONTEXT-HOOK ... */
   const {
      grupoCamposAnalisisTmp,
      totalAsigsByGrupoTmp,
      asigsGrupoCamposAnalisisTmp
   } = useContext(AsignarExtraccionContext)

   /* ► HOOK'S ... */
   const confirmEliminarAsign = useRef({} as ConfirmDialogRefProps)
   const [isConfirmEliminarAsign, setIsConfirmEliminarAsign] = useState(false)
   const [selectedAsign, setSelectedAsign] = useState({} as AsigGrupoCamposAnalisis)

   /* ► CUSTOM-HOOk'S ... */
   const {
      totalRegistrosTablaDinamica,
      deleteAssignedToGrupoAById
   } = useAsignarExtraccion()

   /* ► HOOK'S ... */
   const prefixItem = useId()
   const [selectedItem, setSelectedItem] = useState(-1)

   /* » EFFECT'S ... */
   useEffect(() => { /* ► Si acepta eliminar los rangos asignados ... */
      if (!isConfirmEliminarAsign) return
      deleteAssignedToGrupoAById(selectedAsign.idAsigGrupo)
      /* ► Clean-up ... */
      setIsConfirmEliminarAsign(false)
      setSelectedAsign({} as AsigGrupoCamposAnalisis)
   }, [isConfirmEliminarAsign])

   /* ► DEP'S ...  */
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

         {/* ► BODY: ... */}
         <List
            subheader={ <ListSubheader>Rangos asignados</ListSubheader> }
         >
            <Scrollbar height={ 60 }>
               {
                  asigsGrupoCamposAnalisisTmp.map((asign, i) => (
                     <Fade key={ `${prefixItem}-${asign.idAsigGrupo}` } top big delay={ delayFadeTop * (i + 1) } duration={ durationFadeTop }>
                        <ListItemButton
                           selected={ i === selectedItem }
                           onClick={ () => setSelectedItem(i) }
                        >

                           <ListItemIcon><PersonRounded fontSize='small' /></ListItemIcon>

                           <ListItemText
                              primary={
                                 <Stack direction='row' spacing={ 2 }>
                                    <Typography variant='h5'>{ asign.usrAnalista.nombres }</Typography>
                                    <LinearWithValueLabel progress={ 10 } width={ 100 } />
                                    <Typography variant='h5'>{ `${asign.regAnalisisIni}-${asign.regAnalisisFin}` }</Typography>
                                 </Stack>
                              }
                           />

                           <ListItemSecondaryAction>
                              <IconButton
                                 size='small'
                                 onClick={ () => {
                                    setSelectedAsign(asign)
                                    confirmEliminarAsign.current.setIsOpen(true)
                                 } }
                              >
                                 <RemoveCircleRounded fontSize='small' />
                              </IconButton>
                           </ListItemSecondaryAction>
                        </ListItemButton>
                     </Fade>
                  ))
               }
            </Scrollbar>
         </List>

         {/* » MODAL: Confirm ...  */}
         <ConfirmDialogModal ref={ confirmEliminarAsign } title={'¿Seguro de continuar?'} setIsAccept={ setIsConfirmEliminarAsign } />

      </>
   )
}

export default function Default () {
   return (
      <AsignarExtraccionProvider>
         <AsignarExtraccionSubMod />
      </AsignarExtraccionProvider>
   )
}
