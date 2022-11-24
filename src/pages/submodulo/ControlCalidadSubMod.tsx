import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import {
   Divider,
   Grid,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   ListSubheader,
   Paper,
   Typography,
   Stack,
   Button,
   Box,
   ListItemSecondaryAction,
   IconButton,
   Tooltip,
   CircularProgress,
   Checkbox
} from '@mui/material'
import {
   CheckRounded,
   ClearRounded,
   DeleteForeverRounded,
   DoneAllRounded,
   HistoryToggleOffRounded,
   PersonOutlineRounded,
   PlaylistAddCheckCircleRounded,
   QueryStatsRounded,
   RemoveDoneRounded,
   SearchRounded,
   TroubleshootRounded,
   VerifiedRounded
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import { Form, Formik } from 'formik'
import { format, parseISO } from 'date-fns'
import Zoom from 'react-reveal/Zoom'

import { ControlCalidadProvider, useControlCalidadContext } from 'context'

import { BandejaProcesos, BootstrapTooltip, LinearWithValueLabel, ListItemFade, ModalLoader, MySelect, MySelectItem, MyTextField, Scrollbar, SimpleDataGrid, SimpleModal, SimpleModalRefProps, StandarTooltip } from 'components'

import { useAuth, useControlCalidad, useExtraccion, useTipoLogico } from 'hooks'
import { applyCommaThousands, undecorateMetaFieldName } from 'helpers'
import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, PrefixMetaFieldName, RegistroTablaDinamicaDto } from 'interfaces'
import { GridColDef } from '@mui/x-data-grid'

const MainPaper = styled(Paper)({
   height: '100%'
})

const ControlCalidadSubMod: FC = () => {
   // ► CUSTOM-HOOK'S ...
   const { loadingExtraccionDb, findTablaDinamicaByUsrCreador } = useExtraccion()
   const { loadingControlCalidadDb } = useControlCalidad()
   const { findAllUser, authLoading } = useAuth()

   // ► EFFECT'S ...
   useEffect(() => { findTablaDinamicaByUsrCreador() }, [])
   useEffect(() => { findAllUser() }, [])

   return (
      <>
         <BandejaProcesos>

            {/* ► Lista: Analistas ... */}
            <Grid item xs={ 3 }>
               <MainPaper variant='outlined'>
                  <Scrollbar>
                     <ListaUsuarios />
                  </Scrollbar>
               </MainPaper>
            </Grid>

            {/* ► Lista: Asignaciones ... */}
            <Grid item xs={ 5 }>
               <MainPaper variant='outlined'>
                  <Scrollbar>
                     <ListaAsignaciones />
                  </Scrollbar>
               </MainPaper>
            </Grid>

            {/* ► Lista: Grupo de registros para Control-Calidad ... */}
            <Grid item xs={ 4 }>
               <MainPaper variant='outlined'>
                  <Scrollbar>
                     <ListaControlCalidad />
                  </Scrollbar>
               </MainPaper>
            </Grid>
         </BandejaProcesos>

         {/* » MODAL: Loading ...  */}
         { loadingControlCalidadDb && <ModalLoader /> }
         { loadingExtraccionDb && <ModalLoader /> }
         { authLoading && <ModalLoader /> }
      </>
   )
}

const ListaUsuarios: FC = () => {
   // ► CONTEXT-HOOK'S ...
   const { handleActionAsigsGrupoCamposAnalisisTmp } = useControlCalidadContext()

   // ► HOOK'S ...
   const [selectedItem, setSelectedItem] = useState(-1)

   // ► CUSTOM-HOOK'S ...
   const { userscurrentGroupDb } = useAuth()

   // ► EFFECT'S ...

   return (
      <List
         subheader={ <ListSubheader>Servidores</ListSubheader> }
      >
         {
            userscurrentGroupDb.map((usrAnalista, i) => (
               <ListItemFade key={ usrAnalista.idUsuario } i={ i } direction='top'>
                  <ListItemButton
                     selected={ selectedItem === i }
                     onClick={ () => {
                        setSelectedItem(i)
                        handleActionAsigsGrupoCamposAnalisisTmp('SAVE', usrAnalista)
                     } }
                  >
                     <ListItemIcon><PersonOutlineRounded /></ListItemIcon>
                     <ListItemText primary={
                        <Typography variant='h5'>{ `${i + 1}► ${usrAnalista.nombres}` }</Typography>
                     } />
                  </ListItemButton>
               </ListItemFade>
            ))
         }
      </List>
   )
}

const ListaAsignaciones: FC = () => {
   // ► CONTEXT-HOOK'S ...
   const {
      filteredAsigsGrupoCamposAnalisisTmp,
      handleActionAsigGrupoCamposAnalisisTmp,
      handleActionCtrlsCalCamposAnalisisTmp
   } = useControlCalidadContext()

   // ► HOOK'S ...
   const [selectedItem, setSelectedItem] = useState(-1)

   // ► CUSTOM-HOOK'S ...
   const { findTablaDinamicaByUsrCreador } = useExtraccion()

   const { saveCtrlCalCamposAnalisis, setValidationResultOfCtrlCal } = useControlCalidad()

   // ► EFFECT'S ...
   useEffect(() => { // ► Clean-up: When `filteredAsigsGrupoCamposAnalisisTmp` change, selectItem is updated ...
      if (filteredAsigsGrupoCamposAnalisisTmp.length === 0) setSelectedItem(-1)
   }, [filteredAsigsGrupoCamposAnalisisTmp])

   // ► HANDLER'S ...
   const handleGenerateRecordsToCtrlCal = async (idAsigGrupo: number): Promise<void> => {
      await saveCtrlCalCamposAnalisis(idAsigGrupo)
      findTablaDinamicaByUsrCreador()
   }

   const handleSelectedAsig = async (asig: AsigGrupoCamposAnalisisDto) => {
      handleActionAsigGrupoCamposAnalisisTmp('SAVE', asig)
      handleActionCtrlsCalCamposAnalisisTmp('SAVE', asig.ctrlsCalCamposAnalisis)
   }

   const handleSetValidationResultOfCtrlCal = async (asig: AsigGrupoCamposAnalisisDto) => {
      asig.ctrlCalConforme = true
      await setValidationResultOfCtrlCal(asig)
      findTablaDinamicaByUsrCreador()
   }

   const isDisabledBtnGenerarRegistros = (asig: AsigGrupoCamposAnalisisDto) => asig.totalPendientes > 0 || asig.ctrlsCalCamposAnalisis.length > 0

   return (
      <>
         { /* ► Aside - Filter ... */ }
         <FrmFilterListaAsignaciones />

         { /* ► ... */ }
         <List
            subheader={ <ListSubheader>Asignaciones para Control de Calidad</ListSubheader> }
         >
            {
               filteredAsigsGrupoCamposAnalisisTmp.map((asig, i) => (
                  <ListItemFade key={ asig.idAsigGrupo } i={ i } direction='top'>
                     <ListItemButton
                        selected={ selectedItem === i }
                        onClick={ () => {
                           setSelectedItem(i)
                           handleSelectedAsig(asig)
                        } }
                     >
                        <ListItemIcon>
                           { asig.ctrlCalConforme ? <DoneAllRounded /> : <RemoveDoneRounded /> }
                        </ListItemIcon>
                        <ListItemText primary={
                           <Stack
                              direction='row'
                              gap={ 1 }
                              divider={ <Divider orientation='vertical' flexItem /> }
                           >
                              <Typography variant='h5'>
                                 { format(parseISO(asig.fechaAsignacion), 'dd-MM-yyyy') }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Asignados: ${applyCommaThousands(asig.totalAsignados)}` }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Analizados: ${applyCommaThousands(asig.totalAnalizados)}` }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Pendientes: ${applyCommaThousands(asig.totalPendientes)}` }
                              </Typography>
                           </Stack>
                        } />

                        {/* ► Action's ...  */}
                        <ListItemSecondaryAction>
                           <StandarTooltip title={ `Generar el ${asig.grupo.tablaDinamica?.porcentajeQC}% de registros, para Q.C.` }>
                              <IconButton
                                 size='large'
                                 disabled={ isDisabledBtnGenerarRegistros(asig) }
                                 onClick={ () => handleGenerateRecordsToCtrlCal(asig.idAsigGrupo) }
                              >
                                 <Typography
                                    variant='h6'
                                    color={ isDisabledBtnGenerarRegistros(asig) ? '#D2D2D2' : '#004795' }
                                    sx={{ width: 18 }}
                                 >
                                    { `${asig.grupo.tablaDinamica?.porcentajeQC}%` }
                                 </Typography>
                              </IconButton>
                           </StandarTooltip>
                           <StandarTooltip title='Calidad conforme'>
                              <IconButton
                                 size='large'
                                 disabled={
                                    asig.totalPendientes > 0 ||
                                    asig.ctrlsCalCamposAnalisis.length === 0 ||
                                    asig.produccionAnalisis.some(p => p.revisado) === false ||
                                    asig.ctrlCalConforme
                                 }
                                 onClick={ () => handleSetValidationResultOfCtrlCal(asig) }
                              >
                                 <VerifiedRounded />
                              </IconButton>
                           </StandarTooltip>
                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>
      </>
   )
}

const optCtrlCal: MySelectItem[] = [
   { label: 'Conforme', value: 1 },
   { label: 'No conforme', value: 0 }
]

const FrmFilterListaAsignaciones: FC = () => {
   /* ► CONTEXT ... */
   const {
      handleActionFilteredAsigsGrupoCamposAnalisisTmp,
      handleActionFilterListAsigsTmp
   } = useControlCalidadContext()

   return (
      <Formik
         initialValues={{
            fechaAsignacion: '',
            ctrlCalConforme: ''
         }}
         onSubmit={ (values: { fechaAsignacion: string, ctrlCalConforme: any }, meta): void => {
            handleActionFilterListAsigsTmp('SAVE', values as Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>)
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
                  justifyContent='space-between'
                  alignItems='center'
                  divider={ <Divider orientation='vertical' flexItem /> }
               >
                  <MyTextField type='date' name='fechaAsignacion' label='Fecha asignación' width={ 8 } focused />
                  <MySelect name='ctrlCalConforme' label='Estado' width={ 8 } opt={ optCtrlCal } />
                  <Box display='flex' flexDirection='column' gap={ 0.5 }>
                     <Button size='small' type='submit' variant='contained'>
                        <SearchRounded fontSize='small' />
                     </Button>
                     <Button size='small' type='reset' variant='outlined' color='warning'>
                        <DeleteForeverRounded fontSize='small' />
                     </Button>
                  </Box>
               </Stack>
            </Form>
         )}
      </Formik>
   )
}

const ListaControlCalidad: FC = () => {
   // ► CONTEXT-HOOK'S ...
   const { asigGrupoCamposAnalisisTmp, handleActionCtrlCalCamposAnalisisTmp } = useControlCalidadContext()

   // ► HOOK'S ...
   const modalBandejaControlCalidad = useRef({} as SimpleModalRefProps)
   const [selectedItem, setSelectedItem] = useState(-1)

   // ► CUSTOM-HOOK'S ...
   const { findTablaDinamicaByIdCtrlCalAndIds } = useControlCalidad()

   // ► EFFECT'S ...
   // ► HANDLER'S ...

   // ► Dep's ...
   const ctrlsCalidadCamposAnalisis = useMemo(() => asigGrupoCamposAnalisisTmp.ctrlsCalCamposAnalisis ?? [], [asigGrupoCamposAnalisisTmp])

   const totalCamposAnalisis = useMemo(() => {
      return asigGrupoCamposAnalisisTmp.grupo?.metaFieldsCsv?.split(/[,]/g).length || 0
   }, [asigGrupoCamposAnalisisTmp])

   const avgMetaFieldIdErrorCsv = useMemo(() => {
      if (Object.entries(asigGrupoCamposAnalisisTmp).length === 0) return 0

      const failedProd = asigGrupoCamposAnalisisTmp.produccionAnalisis.filter(({ revisado, metaFieldIdErrorCsv }) => revisado && metaFieldIdErrorCsv)
      if (!failedProd.length) return 0

      const totalFailedProd = failedProd.reduce((totalErr, prodErr) => {
         totalErr += prodErr.metaFieldIdErrorCsv.split(/[,]/g).length / totalCamposAnalisis
         return totalErr
      }, 0)
      return totalFailedProd / failedProd.length
   }, [asigGrupoCamposAnalisisTmp, totalCamposAnalisis])

   return (
      <>
         { /* ► ... */ }
         <List
            subheader={ <ListSubheader>Registros aleatorios, para Control de Calidad</ListSubheader> }
         >
            {
               ctrlsCalidadCamposAnalisis.map((ctrlCal, i) => (
                  <ListItemFade key={ ctrlCal.idCtrlCal } i={ i } direction='top'>
                     <ListItemButton
                        selected={ selectedItem === i }
                        onClick={ () => { setSelectedItem(i) } }
                     >

                        <ListItemIcon>
                           { ctrlCal.completo ? <PlaylistAddCheckCircleRounded /> : <HistoryToggleOffRounded /> }
                        </ListItemIcon>

                        <ListItemText primary={
                           <Stack
                              direction='row'
                              gap={ 1 }
                              divider={ <Divider orientation='vertical' flexItem /> }
                           >
                              <Typography variant='h5'>
                                 { format(parseISO(ctrlCal.fechaRegistro), 'dd-MM-yyyy') }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Registros: ${applyCommaThousands(ctrlCal.totalRegistros)}` }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Revisados: ${applyCommaThousands(ctrlCal.totalRevisados)}` }
                              </Typography>
                              <LinearWithValueLabel progress={ avgMetaFieldIdErrorCsv * 100 } width={ '25%' } />
                           </Stack>
                        } />

                        {/* ► Action's ...  */}
                        <ListItemSecondaryAction>

                           <Tooltip title='Ver registros' placement='top-start' arrow>
                              <IconButton
                                 size='small'
                                 onClick={ async () => {
                                    await findTablaDinamicaByIdCtrlCalAndIds(ctrlCal.idCtrlCal, ctrlCal.idsCtrlCalCsv)
                                    handleActionCtrlCalCamposAnalisisTmp('SAVE', ctrlCal)
                                    modalBandejaControlCalidad.current.setOpen(true)
                                 } }
                              >
                                 <TroubleshootRounded />
                              </IconButton>

                           </Tooltip>

                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>

         {/* ► Modal: Bandeja Control Calidad ...  */}
         <SimpleModal ref={ modalBandejaControlCalidad }>
            <BandejaControlCalidad />
         </SimpleModal>
      </>
   )
}

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const BandejaControlCalidad: FC = () => {
   // ► CONTEXT ...
   const {
      tablaCtrlCalidadTmp,
      handleActionRegistroCtrlCalidadTmp
   } = useControlCalidadContext()

   // ► HOOK'S ...
   const modalCtrlCalidad = useRef({} as SimpleModalRefProps)

   // ► CUSTOM - HOOK'S ...
   const { findAllTipoLogico } = useTipoLogico()

   // ► EFFECT'S ...
   useEffect(() => { findAllTipoLogico() }, [])

   // ► DEP'S ...
   const totalCamposAnalisis = useMemo(() => {
      if (tablaCtrlCalidadTmp.length === 0) return 0
      return Object.keys(tablaCtrlCalidadTmp[0]).filter(k => k.endsWith('_a')).length
   }, [tablaCtrlCalidadTmp])

   const dgColumns = useMemo<Array<GridColDef<RegistroTablaDinamicaDto>>>(() => ([
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Revisar' placement='left-start' arrow>
            <IconButton
               onClick={ async () => {
                  handleActionRegistroCtrlCalidadTmp('SAVE', row)
                  modalCtrlCalidad.current.setOpen(true)
               } }
            >
               <QueryStatsRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: 'nro',
         headerName: 'Nro',
         width: 50,
         type: 'number',
         ...commonGridColDef
      }, {
         field: 'nId',
         headerName: 'Id',
         width: 80,
         type: 'number',
         ...commonGridColDef
      }, {
         field: 'revisado',
         headerName: '¿Revisado?',
         width: 150,
         type: 'boolean',
         ...commonGridColDef,
         renderCell: ({ row }) => row.revisado ? <CheckRounded color='success' /> : <ClearRounded color='error' />
      }, {
         field: 'metaFieldIdErrorCsv',
         headerName: 'Campos observados',
         minWidth: 250,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'observacionesCtrlCal',
         headerName: 'Observaciones',
         minWidth: 300,
         flex: 1,
         ...commonGridColDef
      }, {
         field: '(%) Margen error',
         width: 150,
         ...commonGridColDef,
         renderCell: ({ row }) => {
            const percentErr = row.metaFieldIdErrorCsv
               ? row.metaFieldIdErrorCsv.split(/[,]/g).length
               : 0
            return <LinearWithValueLabel progress={ (percentErr / totalCamposAnalisis) * 100 } width={ '100%' } />
         }
      }
   ]), [tablaCtrlCalidadTmp])

   return (
      <>
         {/* ► HEADER: Card-Info ... */}
         {/* <HeaderBandejaAnalisis /> */}

         {/* ► BODY ... */}
         <Zoom when={ tablaCtrlCalidadTmp.length }>
            <SimpleDataGrid
               columns={ dgColumns }
               rows={ tablaCtrlCalidadTmp }
               pageSize={ 4 }
               getRowId={ row => row.nId }
               localStoragePageKey='CONTROL_CALIDAD_BANDEJA_CTRLCAL_NROPAG'
               sx={{ width: '95vw' }}
            />
         </Zoom>

         {/* ► MODAL: Analisis ... */}
         <SimpleModal ref={ modalCtrlCalidad }>
            <ControlCalidad />
         </SimpleModal>
      </>
   )
}

const ControlCalidad: FC = () => {
   // ► CONTEXT ...
   const {
      registroCtrlCalidadTmp,
      asigGrupoCamposAnalisisTmp,
      ctrlCalCamposAnalisisTmp
   } = useControlCalidadContext()

   // ► HOOK'S ...
   const refAnalizarExtraccionSubmit = useRef({} as HTMLInputElement)

   // ► CUSTOM - HOOK'S ...
   const {
      loadingControlCalidadDb,
      validateRecordAssigned
   } = useControlCalidad()

   const { findTablaDinamicaByUsrCreador } = useExtraccion()

   // ► HANDLER'S ...

   // ► DEP'S ...
   const metaFieldsNameAssigned = useMemo(() => (asigGrupoCamposAnalisisTmp.grupo.metaFieldsCsv?.split(',')
      .map(i => i.trim())
      .map(i => i.split('|')[0].trim())
      .join(',')
   ), [asigGrupoCamposAnalisisTmp])

   return (
      <Box
         width={ '93vw' }
         maxHeight={ '82vh' }
         display='flex'
         flexDirection='column'
      >
         {/* ► HEADER ... */}
         <Typography variant='h4' color='GrayText' gutterBottom>DATOS DE EXTRACCIÓN</Typography>
         <Paper elevation={ 1 } sx={{ p: 2 }}>
            <Stack
               direction='row'
               flexWrap='wrap'
               justifyContent='space-between'
               gap={ 2 }
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               {
                  Object.entries(registroCtrlCalidadTmp).filter(([k]) => k.endsWith('_e')).map(([k, v]) => (
                     <Box
                        key={ v }
                        display='flex'
                        flexDirection='row'
                        alignItems='baseline'
                        gap={ 1 }
                     >
                        <Typography variant='h4' color='primary'>{ `${undecorateMetaFieldName(k, 'prefix | underscore | suffix')}: ` }</Typography>
                        <Typography variant='h5' color='GrayText'>{ v }</Typography>
                     </Box>
                  ))
               }
            </Stack>
         </Paper>

         {/* ► BODY ... */}
         <Typography variant='h4' color='GrayText' sx={{ mt: 2 }} gutterBottom>DATOS DE ANALISIS</Typography>

         <Button
            variant='outlined'
            startIcon={ loadingControlCalidadDb ? <CircularProgress size={ 20 } /> : <DoneAllRounded /> }
            disabled={ loadingControlCalidadDb }
            sx={{ ml: 'auto', mb: 0.5, width: 120 }}
            onClick={ () => { refAnalizarExtraccionSubmit.current.click() } }
         >
            <Typography variant='h4'>Revalidar</Typography>
         </Button>

         <Formik
            initialValues={ { ...getInitialValuesFromCsv(metaFieldsNameAssigned!, registroCtrlCalidadTmp) } }
            onSubmit={ async ({ observacionesCtrlCal, ...restValues }: Partial<RegistroTablaDinamicaDto>, meta): Promise<void> => {
               await validateRecordAssigned({
                  nombreTabla: asigGrupoCamposAnalisisTmp.grupo.tablaDinamica?.nombre,
                  id: registroCtrlCalidadTmp.nId,
                  values: JSON.stringify(restValues),
                  regAnalisisIni: asigGrupoCamposAnalisisTmp.regAnalisisIni,
                  regAnalisisFin: asigGrupoCamposAnalisisTmp.regAnalisisFin,
                  asigGrupo: { idAsigGrupo: asigGrupoCamposAnalisisTmp.idAsigGrupo },
                  idCtrlCal: ctrlCalCamposAnalisisTmp.idCtrlCal,
                  observacionesCtrlCal
               })

               findTablaDinamicaByUsrCreador()
            } }>
            {(formikprops) => (
               <Form>
                  <Box
                     height={ '25vh' }
                     p={ 1 }
                     display='flex'
                     flexWrap='wrap'
                     justifyContent='space-between'
                     alignItems='flex-start'
                     gap={ 2 }
                     overflow='auto'
                  >
                     {
                        Object.entries(registroCtrlCalidadTmp).filter(([k]) => metaFieldsNameAssigned?.includes(k)).map(([k, v]) => (
                           <InputControlCalidad key={ k } k={ k } />
                        ))
                     }
                  </Box>

                  <Divider sx={{ m: 2 }}>
                     <Typography variant='h4' color='GrayText'>OBSERVACIONES</Typography>
                  </Divider>

                  <MyTextField
                     type='text'
                     name='observacionesCtrlCal'
                     label='Observaciones'
                     muiProps={{
                        variant: 'filled',
                        fullWidth: true,
                        multiline: true,
                        rows: 3
                     }}
                  />

                  <input type='submit' ref={ refAnalizarExtraccionSubmit } hidden />
               </Form>
            )}
         </Formik>
      </Box>
   )
}

const InputControlCalidad: FC<{k: string}> = ({ k }) => {
   // ► CONTEXT ...
   const {
      asigGrupoCamposAnalisisTmp,
      registroCtrlCalidadTmp
   } = useControlCalidadContext()

   // ► CUSTOM - HOOK'S ...
   const { optValoresTiposCurrentGrupoAuth } = useTipoLogico()
   const { saveMetaFieldIdErrorCsv } = useControlCalidad()
   const { findTablaDinamicaByUsrCreador } = useExtraccion()

   // ► DEP'S ...
   const prefix = useMemo(() => k.substring(0, 1) as PrefixMetaFieldName, [k])

   const infoFromfieldsAssigned = useMemo(() => {
      const infos: {[key: string]: string} = {}
      asigGrupoCamposAnalisisTmp.grupo.metaFieldsCsv?.split(',')
         .map(i => i.trim())
         .forEach(i => {
            infos[i.split('|')[0].trim()] = i.split('|')[2].trim()
         })
      return infos
   }, [asigGrupoCamposAnalisisTmp])

   const tipoFromfieldsAssigned = useMemo(() => {
      const tipos: {[key: string]: string} = {}
      asigGrupoCamposAnalisisTmp.grupo.metaFieldsCsv?.split(',')
         .map(i => i.trim())
         .forEach(i => {
            tipos[i.split('|')[0].trim()] = i.split('|')[1].trim()
         })
      return tipos
   }, [asigGrupoCamposAnalisisTmp])

   const label = useMemo(() => undecorateMetaFieldName(k, 'prefix | underscore | suffix'), [k])

   const restProps = useMemo(() => ({
      name: k,
      label,
      muiProps: {
         helperText: infoFromfieldsAssigned[k]
      }
   }), [label])

   const isCheckedFieldError = useMemo(() => registroCtrlCalidadTmp.metaFieldIdErrorCsv?.includes(label), [registroCtrlCalidadTmp, label])

   // ► HANDLER'S ...
   const handleChangeFieldError = async (e: ChangeEvent<HTMLInputElement>) => {
      await saveMetaFieldIdErrorCsv({
         asigGrupo: { idAsigGrupo: asigGrupoCamposAnalisisTmp.idAsigGrupo },
         id: registroCtrlCalidadTmp.nId,
         metaFieldIdErrorCsv: label,
         hasFieldError: e.target.checked
      })
      findTablaDinamicaByUsrCreador()
   }

   return (
      <Paper
         variant={ isCheckedFieldError ? 'elevation' : 'outlined' }
         square
         sx={{ background: isCheckedFieldError ? 'linear-gradient(15deg, #FF0000, #fff 20%)' : '' }}
         elevation={ isCheckedFieldError ? 5 : 0 }
      >
         <Box p={ 1 } display='flex' gap={ 1 } alignItems='flex-start'>

            {/* ► ... */}
            {

               prefix === 's'
                  ? <MyTextField type='text' width={ k.length * 0.8 } { ...restProps } />
                  : prefix === 'n'
                     ? <MyTextField type='number' width={ k.length * 0.5 } { ...restProps } />
                     : prefix === 'b'
                        ? <MySelect name={ k } label={ label } width={ 17 } opt={ optValoresTiposCurrentGrupoAuth[tipoFromfieldsAssigned[k]] } helperText={ infoFromfieldsAssigned[k] } />
                        : prefix === 'd'
                           ? <MyTextField type='date' width={ k.length * 0.5 } { ...restProps } />
                           : <></>

            }

            {/* ► ...  */}
            <BootstrapTooltip title={ '¡Dale check, para observar el campo!' } placement='top-start'>
               <Checkbox
                  size='small'
                  color='info'
                  checked={ isCheckedFieldError }
                  onChange={ handleChangeFieldError }
               />
            </BootstrapTooltip>
         </Box>
      </Paper>
   )
}

export default function Default () {
   return (
      <ControlCalidadProvider>
         <ControlCalidadSubMod />
      </ControlCalidadProvider>
   )
}

// ► Private Method's ...
const getInitialValuesFromCsv = (metaFieldsNameCsv: string, registroDinamicoAsignado: any): Partial<RegistroTablaDinamicaDto> => {
   const initialValues: { [k: string]: string } = {}
   metaFieldsNameCsv
      .split(',')
      .map(k => k.trim())
      .forEach(k => {
         initialValues[k] = registroDinamicoAsignado[k] || ''
      })

   return {
      ...initialValues,
      observacionesCtrlCal: registroDinamicoAsignado.observacionesCtrlCal ?? ''
   }
}
