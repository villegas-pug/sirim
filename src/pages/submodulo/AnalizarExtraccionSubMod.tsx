import { ChangeEvent, FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react'

import {
   Box,
   Button,
   CircularProgress,
   Divider,
   IconButton,
   Paper,
   Stack,
   Switch,
   TextField,
   Tooltip,
   Typography,
   Checkbox,
   FormControlLabel
} from '@mui/material'
import {
   ArrowBackIosNewRounded,
   CachedRounded,
   CheckCircleRounded,
   CheckRounded,
   ClearRounded,
   CopyAllRounded,
   DoneAllRounded,
   DownloadOutlined,
   DownloadRounded,
   FileDownloadRounded,
   QueryStatsRounded,
   RemoveRedEyeRounded,
   ReportRounded,
   SaveAsRounded,
   SearchOffRounded,
   SyncProblemRounded,
   UnpublishedRounded,
   UpdateRounded
} from '@mui/icons-material'
import { GridColDef } from '@mui/x-data-grid'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
   InfoCard,
   LinearWithValueLabel,
   ModalLoader,
   MySelect,
   MyTextField,
   SimpleDataGrid,
   SimpleModal,
   SimpleModalRefProps,
   SpeedDialBackdrop,
   SpeedDialActionProps,
   StandarTooltip
} from 'components'
import { format } from 'date-fns'

import { AnalizarExtraccionProvider, useAnalizarExtraccionContext } from 'context'
import { useAnalizarExtraccion, useAuth, useBreakpoints, useControlCalidad, useLocalStorage } from 'hooks'

import { applyCommaThousands, noty, parseJsonDateToDate, parseJsonTimestampToStrDate, undecorateMetaFieldName } from 'helpers'
import { RecordsBetweenDatesDto, AsigGrupoCamposAnalisisDto, PrefixMetaFieldName, RegistroTablaDinamicaDto, ProduccionAnalisis } from 'interfaces'
import { optSelectItemMonthName } from 'constants/calendar'
import { useTipoLogico } from 'hooks/useTipoLogico'
import { messages, regex } from 'constants/'

export const AnalizarExtraccionSubMod: FC = () => {
   // ► Context ...
   const {
      bandeja,
      asigGrupoCamposAnalisisTmp
   } = useAnalizarExtraccionContext()

   // ► Hook's ...
   const modalDownloadRptMensual = useRef({} as SimpleModalRefProps)

   // ► Custom hook's ...
   const {
      loadingAsigGrupoCamposAnalisisDb,
      findAsigAnalisisByUsr,
      findTablaDinamicaByRangoFromIds
   } = useAnalizarExtraccion()

   const { findAllTipoLogico } = useTipoLogico()

   const [, setBandejaAnalisisNroPagina] = useLocalStorage('ANALIZAR_EXTRACCION_BANDEJA_ANALISIS_NRO_PAGINA')

   // » Effect's ...
   useEffect(() => { setBandejaAnalisisNroPagina(0) }, [])
   useEffect(() => { findAsigAnalisisByUsr(true) }, [])

   // ► Handler's ...
   const handleRefresh = async (asigUnfinished: boolean = false): Promise<void> => {
      await findAsigAnalisisByUsr(asigUnfinished)
      await findAllTipoLogico()
      findTablaDinamicaByRangoFromIds({
         asigGrupo: { idAsigGrupo: asigGrupoCamposAnalisisTmp.idAsigGrupo },
         regAnalisisIni: asigGrupoCamposAnalisisTmp.regAnalisisIni,
         regAnalisisFin: asigGrupoCamposAnalisisTmp.regAnalisisFin
      })
   }

   // ► Dep's ...
   const optSpeedDial = useMemo<SpeedDialActionProps[]>(() => ([
      {
         name: 'Listar_Todas_Asignaciones',
         icon: <UpdateRounded />,
         handleClick: async () => { handleRefresh() }
      }, {
         name: 'Listar_Asignaciones_Pendientes',
         icon: <SyncProblemRounded />,
         handleClick: async () => { handleRefresh(true) }
      }, {
         name: 'Descargar_Producción_Mensual',
         icon: <DownloadRounded />,
         handleClick: () => { modalDownloadRptMensual.current.setOpen(true) }
      }
   ]), [])

   return (
      <>
         { bandeja === 'ENTRADA' && <BandejaEntrada /> }
         { bandeja === 'ANALISIS' && <BandejaAnalisis /> }

         {/* ► MODAL: Loading ... */}
         { loadingAsigGrupoCamposAnalisisDb && <ModalLoader /> }

         {/* ► MODAL: SpeedDial ... */}
         <SpeedDialBackdrop actions={ optSpeedDial }/>

         {/* ► MODAL: Descargar reporte mensual de producción ... */}
         <SimpleModal ref={ modalDownloadRptMensual }>
            <FrmDownloadRptMensual />
         </SimpleModal>
      </>
   )
}

const FrmDownloadRptMensual: FC = () => {
   /* ► CUSTOM - HOOK'S ... */
   const {
      downloadReporteMensualProduccionByParams,
      loadingAsigGrupoCamposAnalisisDb
   } = useAnalizarExtraccion()

   return (
      <Formik
         initialValues={{
            month: '',
            year: 2022
         }}
         validationSchema={Yup.object({
            month: Yup.string().required('¡Mes requerido!'),
            year: Yup.number().required('¡Año requerido!')
         })}
         onSubmit={ async (values: { month: string, year: number }, meta): Promise<void> => {
            await downloadReporteMensualProduccionByParams(parseInt(values.month), values.year)
            meta.setValues({ month: '', year: 2022 })
         } }>
         {() => (
            <Form>
               <Stack
                  direction='row'
                  gap={ 2 }
                  alignItems='flex-start'
                  divider={ <Divider orientation='vertical' flexItem /> }
               >
                  <MySelect name={'month'} label={'Mes'} width={ 8 } opt={ optSelectItemMonthName } muiProps={{ autoFocus: true }} />
                  <MyTextField type='number' name='year' label='Año' width={ 5 } muiProps={{ disabled: true }} />
                  <Button
                     type='submit'
                     variant='outlined'
                     color='primary'
                     size='medium'
                     disabled={ loadingAsigGrupoCamposAnalisisDb }
                  >
                     <FileDownloadRounded />
                  </Button>
               </Stack>
            </Form>
         )}
      </Formik>
   )
}

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const hasErrInQC = (asig: AsigGrupoCamposAnalisisDto) => !asig.ctrlCalConforme && asig.produccionAnalisis.some(p => p.revisado && p.metaFieldIdErrorCsv)

type QCResult = { totalRecords: number, totalFields: number, margenErr: number }

const getQCResult = (asig: AsigGrupoCamposAnalisisDto): QCResult => {
   // ►  Dep's ...
   const totalFieldsA = asig.grupo.metaFieldsCsv?.split(/[,]/g).length || 0
   const prodErr: ProduccionAnalisis[] = asig.produccionAnalisis.filter(p => p.revisado && p.metaFieldIdErrorCsv)

   const totalRecords = prodErr.length
   const totalFields = prodErr.reduce((acc, p) => (acc += p.metaFieldIdErrorCsv.split(/[,]/g).length, acc), 0)
   const margenErr = ((prodErr.reduce((acc, p) => (acc += p.metaFieldIdErrorCsv.split(/[,]/g).length / totalFieldsA, acc), 0)) / prodErr.length) * 100

   // ► ...
   return { totalRecords, totalFields, margenErr }
}

const renderShowResultOfQCAction = (asig: AsigGrupoCamposAnalisisDto) => {
   // ► Hook's ...
   const modalQCResult = useRef({} as SimpleModalRefProps)
   const [qcResult, setQCResult] = useState({} as QCResult)

   // ► Conditional render ...
   if (!hasErrInQC(asig)) return <></>

   return (
      <>
         <StandarTooltip title='Ver resultado de Q.C.'>
            <IconButton
               onClick={() => {
                  setQCResult(getQCResult(asig))
                  modalQCResult.current.setOpen(true)
               }}
            >
               <SearchOffRounded />
            </IconButton>
         </StandarTooltip>

         <SimpleModal ref={ modalQCResult }>

            <Stack
               p={ 1 }
               direction='row'
               spacing={ 5 }
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               <Box display='flex' alignItems='center'>
                  <Typography variant='h4' color='gray'>Registros Observados: </Typography>
                  <Typography variant='h2' color='red' sx={{ ml: 1 }}>{ qcResult.totalRecords }</Typography>
               </Box>

               <Box display='flex' alignItems='center'>
                  <Typography variant='h4' color='gray'>Campos Observados: </Typography>
                  <Typography variant='h2' color='red' sx={{ ml: 1 }}>{ qcResult.totalFields }</Typography>
               </Box>

               <Box display='flex' alignItems='center'>
                  <Typography variant='h4' color='gray'>(%) Margen Error: </Typography>
                  <Typography variant='h2' color='red' sx={{ ml: 1 }}>{ `${Math.round(qcResult.margenErr)}%` }</Typography>
               </Box>
            </Stack>

         </SimpleModal>
      </>
   )
}

const BandejaEntrada: FC = () => {
   // ► Context ...
   const {
      asigGrupoCamposAnalisisTmp,
      handleChangePage,
      handleSaveAsigGrupoCamposAnalisisTmp
   } = useAnalizarExtraccionContext()

   // ► Hook's ...
   const modalDownloadAnalizados = useRef({} as SimpleModalRefProps)

   // ► Custom hook's ...
   const {
      asigsGrupoCamposAnalisisDb,
      findAsigById,
      findTablaDinamicaByRangoFromIds,
      downloadAnalisadosByDates
   } = useAnalizarExtraccion()

   const { currentScreen } = useBreakpoints()

   // » Dep's ...
   const dgColumns = useMemo<GridColDef<AsigGrupoCamposAnalisisDto>[]>(() => [
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Ver grupo asignado' placement='top-start' arrow>
            <IconButton
               onClick={ async () => {
                  handleSaveAsigGrupoCamposAnalisisTmp(row)
                  await findAsigById(row.idAsigGrupo)
                  await findTablaDinamicaByRangoFromIds({
                     asigGrupo: { idAsigGrupo: row.idAsigGrupo },
                     regAnalisisIni: row.regAnalisisIni,
                     regAnalisisFin: row.regAnalisisFin
                  })
                  handleChangePage('ANALISIS')
               } }
            >
               <RemoveRedEyeRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Descargar analizados' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  handleSaveAsigGrupoCamposAnalisisTmp(row)
                  modalDownloadAnalizados.current.setOpen(true)
               } }
            >
               <DownloadRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Descargar plantilla' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  downloadAnalisadosByDates({
                     idAsigGrupo: row.idAsigGrupo,
                     isAssignedTemplate: true
                  })
               } }
            >
               <DownloadOutlined />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => renderShowResultOfQCAction(row)
      }, {
         field: 'fechaAsignacion',
         headerName: 'Fecha Asignación',
         width: 110,
         type: 'date',
         valueGetter: (params) => parseJsonDateToDate(params.value),
         ...commonGridColDef
      }, {
         field: 'Estado',
         type: 'boolean',
         width: 80,
         ...commonGridColDef,
         valueGetter: ({ row }) => row.totalAsignados === row.totalAnalizados,
         renderCell: ({ row }) => row.totalAsignados === row.totalAnalizados ? <CheckCircleRounded color='success' /> : <UnpublishedRounded color='disabled' />
      }, {
         field: 'Estado Q.C.',
         type: 'boolean',
         width: 80,
         ...commonGridColDef,
         valueGetter: ({ row }) => hasErrInQC(row),
         renderCell: ({ row }) => hasErrInQC(row) ? <ReportRounded color='error' /> : <DoneAllRounded color='success' />
      }, {
         field: 'Base',
         minWidth: 250,
         flex: 1,
         renderCell: ({ row }) => row.grupo?.tablaDinamica?.nombre,
         ...commonGridColDef
      }, {
         field: 'Grupo',
         minWidth: 200,
         flex: 1,
         renderCell: ({ row }) => row.grupo.nombre,
         ...commonGridColDef
      }, {
         field: 'Rango asignado',
         minWidth: 100,
         flex: 1,
         renderCell: ({ row }) => `${applyCommaThousands(row.regAnalisisIni)} - ${applyCommaThousands(row.regAnalisisFin)}`,
         ...commonGridColDef
      }, {
         field: 'Total asignados',
         minWidth: 100,
         flex: 1,
         renderCell: ({ row }) => `${applyCommaThousands(row.totalAsignados)}`,
         ...commonGridColDef
      }, {
         field: 'Analizados',
         minWidth: 100,
         flex: 1,
         renderCell: ({ row }) => applyCommaThousands(row.totalAnalizados),
         ...commonGridColDef
      }, {
         field: 'Pendientes',
         minWidth: 100,
         flex: 1,
         renderCell: ({ row }) => applyCommaThousands(row.totalPendientes),
         ...commonGridColDef
      }, {
         field: 'Progreso Analisis',
         minWidth: 150,
         flex: 1,
         renderCell: ({ row }) => <LinearWithValueLabel progress={ (row.totalAnalizados / row.totalAsignados) * 100 } width={ '100%' } />,
         ...commonGridColDef
      }
   ], [asigsGrupoCamposAnalisisDb])

   return (
      <>
         {/* ► HEADER: Card-Info ... */}
         <HeaderBandejaEntrada />

         {/* ► BODY ... */}
         <Zoom>
            <SimpleDataGrid
               columns={ dgColumns }
               rows={ asigsGrupoCamposAnalisisDb }
               pageSize={ currentScreen === 'desktopLarge'
                  ? 8
                  : currentScreen === 'desktopWide'
                     ? 11
                     : 4
               }
               getRowId={ row => row.idAsigGrupo }
               localStoragePageKey='ANALIZAR_EXTRACCION_BANDEJA_ENTRADA_NRO_PAGINA'
            />
         </Zoom>

         {/* ► MODAL: Download analizados ...  */}
         <SimpleModal ref={ modalDownloadAnalizados }>

            <Formik
               initialValues={{
                  fecIni: '',
                  fecFin: ''
               }}
               validationSchema={Yup.object({
                  fecIni: Yup.date().required('¡Fecha requerida!').max(Yup.ref('fecFin'), '¡Fecha debe ser menor a la final!'),
                  fecFin: Yup.date().required('¡Fecha requerida!').min(Yup.ref('fecIni'), '¡Fecha debe ser mayor a la inicial!')
               })}
               onSubmit={ async (values: Pick<RecordsBetweenDatesDto, 'fecIni' | 'fecFin'>, meta): Promise<void> => {
                  downloadAnalisadosByDates({
                     idAsigGrupo: asigGrupoCamposAnalisisTmp.idAsigGrupo!,
                     ...values
                  })
               } }
            >
               {() => (
                  <>
                     {/* ► Title ... */}
                     <Typography variant='h4' color='gray'>INGRESA FECHAS DE ANALISIS</Typography>
                     <Divider sx={{ mb: 3 }} />

                     {/* ► Body ... */}
                     <Form>
                        <Stack
                           width={ 625 }
                           direction='row'
                           justifyContent='space-between'
                           alignItems='flex-start'
                           divider={ <Divider orientation='vertical' flexItem /> }
                        >
                           <MyTextField type='date' name='fecIni' label='Fecha Inicio Analisis' width={ 15 } focused />
                           <MyTextField type='date' name='fecFin' label='Fecha Fin Analisis' width={ 15 } />
                           <Button type='submit' variant='outlined' color='primary'><DownloadRounded /></Button>
                        </Stack>
                     </Form>
                  </>
               )}
            </Formik>
         </SimpleModal>
      </>
   )
}

const HeaderBandejaEntrada: FC = () => {
   // ► Context ...
   // ► Hook's ...

   // ► Custom hook's ...
   const {
      asigsGrupoCamposAnalisisDb,
      asigSummaryDb,
      loadingAsigGrupoCamposAnalisisDb
   } = useAnalizarExtraccion()

   const { currentScreen } = useBreakpoints()

   // Effect's ...

   // ► Dep's ...
   const asigsNoConformeQA = useMemo(() => asigsGrupoCamposAnalisisDb.filter(asig => {
      return !asig.ctrlCalConforme && asig.produccionAnalisis.some(p => p.revisado && p.metaFieldIdErrorCsv)
   }).length, [asigsGrupoCamposAnalisisDb])

   // ► RENDER CONDITIONAL ...
   if (currentScreen === 'mobileLandscape') return <></>

   return (
      <Fade top>
         <Fade top when={ !loadingAsigGrupoCamposAnalisisDb }>
            <Stack
               mb={ 1 }
               direction='row'
               justifyContent='space-around'
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               <InfoCard iconName='Assignment' title='Total Asignados' value={ asigSummaryDb.totalAsignados } />
               <InfoCard iconName='AssignmentComplete' title='Total Analizados' value={ asigSummaryDb.totalAnalizados } />
               <InfoCard iconName='AssignmentPendent' title='Total Pendientes' value={ asigSummaryDb.totalPendientes } />
               <InfoCard iconName='ErrQC' title='Total Observados en Q.C.' value={ asigsNoConformeQA } />
            </Stack>
         </Fade>
      </Fade>
   )
}

const BandejaAnalisis: FC = () => {
   // ► Context ...
   const {
      tablaAsignadaTmp,
      handleChangePage,
      handleActionRegistroDinamicoAsignadoTmp
   } = useAnalizarExtraccionContext()

   // ► Hook's ...
   const modalAnalisis = useRef({} as SimpleModalRefProps)

   // ► Custom hook's ...
   const { currentScreen } = useBreakpoints()
   const { findAllTipoLogico } = useTipoLogico()
   const { setTerminadoProduccionAnalisis } = useAnalizarExtraccion()
   const { saveRectificadoRecordAssigned } = useControlCalidad()

   // ► Effect's ...
   useEffect(() => { findAllTipoLogico() }, [])

   // » Dep's ...
   const dgColumns = useMemo<Array<GridColDef<RegistroTablaDinamicaDto>>>(() => ([
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Analizar' placement='left-start' arrow>
            <IconButton
               onClick={ () => {
                  handleActionRegistroDinamicoAsignadoTmp('SAVE', row)
                  modalAnalisis.current.setOpen(true)
               } }
            >
               <QueryStatsRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>',
         type: 'boolean',
         width: 90,
         ...commonGridColDef,
         renderCell: ({ row }) => (
            <Tooltip title='Terminar analisis' placement='left-start' arrow>
               <Checkbox
                  disabled={ !row.analizado }
                  checked={ row.terminado }
                  onClick={ () => {
                     setTerminadoProduccionAnalisis(row.idProdAnalisis)
                  } }
               />
            </Tooltip>
         )
      }, {
         field: '>>>',
         type: 'boolean',
         width: 90,
         ...commonGridColDef,
         renderCell: ({ row }) => {
            if (!row.hasFieldError) return <></>
            return (
               <Tooltip title='Rectificar analisis' placement='left-start' arrow>
                  <Checkbox
                     checked={ row.rectificado }
                     onClick={ () => {
                        saveRectificadoRecordAssigned(row.idProdAnalisis)
                     } }
                  />
               </Tooltip>
            )
         }
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
         ...commonGridColDef,
         renderCell: ({ row }) => applyCommaThousands(row.nId)
      }, {
         field: 'hasFieldError',
         headerName: 'Estado Q.C.',
         type: 'boolean',
         width: 150,
         ...commonGridColDef,
         renderCell: ({ row }) => row.hasFieldError ? <ReportRounded color='error' /> : <DoneAllRounded color='success' />
      }, {
         field: 'analizado',
         headerName: '¿Analizado?',
         width: 150,
         type: 'boolean',
         ...commonGridColDef,
         renderCell: ({ row }) => row.analizado ? <CheckRounded color='success' /> : <ClearRounded color='error' />
      }, {
         field: 'rectificado',
         headerName: '¿Rectificado?',
         width: 150,
         type: 'boolean',
         ...commonGridColDef,
         renderCell: ({ row }) => row.rectificado ? <CheckRounded color='success' /> : <></>
      }, {
         field: 'fechaAnalisis',
         headerName: 'Fecha Analisis',
         width: 180,
         type: 'date',
         ...commonGridColDef
      },
      ...getGridColDefByTablaDinamicaAsignada(tablaAsignadaTmp, '_e')
   ]), [tablaAsignadaTmp])

   return (
      <>
         {/* ► HEADER: Card-Info ... */}
         <HeaderBandejaAnalisis />

         {/* ► NAVIGATE  */}
         <Fade left big>
            <Button
               startIcon={ <ArrowBackIosNewRounded fontSize='small' /> }
               size='small'
               onClick={ () => {
                  handleChangePage('ENTRADA')
               } }
            >
               <Typography variant='h5'>Ir a Bandeja Entrada</Typography>
            </Button>
         </Fade>

         {/* ► BODY ... */}
         <Zoom>
            <SimpleDataGrid
               columns={ dgColumns }
               rows={ tablaAsignadaTmp }
               pageSize={ currentScreen === 'desktop' ? 4 : 10 }
               getRowId={ row => row.nId }
               localStoragePageKey='ANALIZAR_EXTRACCION_BANDEJA_ANALISIS_NRO_PAGINA'
            />
         </Zoom>

         {/* ► MODAL: Analisis ... */}
         <SimpleModal ref={ modalAnalisis }>
            <AnalizarExtraccion />
         </SimpleModal>
      </>
   )
}

const HeaderBandejaAnalisis: FC = () => {
   // ► CONTEXT ...
   const {
      asigGrupoCamposAnalisisTmp,
      tablaAsignadaTmp
   } = useAnalizarExtraccionContext()

   // ► HOOK'S ...

   // ► CUSTOM - HOOK'S ...
   const { loadingAsigGrupoCamposAnalisisDb } = useAnalizarExtraccion()
   const { currentScreen } = useBreakpoints()

   // ► EFFECT'S ...

   // ► DEP'S ...
   const countRecordsAnalizadosToday = useMemo(() => tablaAsignadaTmp.filter(({ fechaAnalisis }) => {
      return parseJsonTimestampToStrDate(fechaAnalisis) === format(new Date(), 'yyyy-MM-dd')
   }).length
   , [tablaAsignadaTmp])

   // ► RENDER CONDITIONAL ...
   if (currentScreen === 'mobileLandscape') return <></>

   return (
      <Fade top>
         <Fade top when={ !loadingAsigGrupoCamposAnalisisDb }>
            <Stack
               mb={ 1 }
               direction='row'
               justifyContent='space-around'
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               <InfoCard iconName='Assignment' title='Total Asignados' value={ asigGrupoCamposAnalisisTmp.totalAsignados } />
               <InfoCard iconName='AssignmentComplete' title='Total Analizados' value={ asigGrupoCamposAnalisisTmp.totalAnalizados } />
               <InfoCard iconName='AssignmentPendent' title='Total Pendientes' value={ asigGrupoCamposAnalisisTmp.totalPendientes } />
               <InfoCard iconName='AssignmentCompleteToday' title='Analizados hoy' value={ countRecordsAnalizadosToday } />
            </Stack>
         </Fade>
      </Fade>
   )
}

const AnalizarExtraccion: FC = () => {
   // ► Context ...
   const { registroDinamicoAsignadoTmp } = useAnalizarExtraccionContext()

   // ► Hook's ...
   const firstRender = useRef(false)
   const [showDatosExtraccion, setShowDatosExtraccion] = useState(true)
   /* const [isFieldAOptional, setFieldAOptional] = useState() */

   // ► Custom hook's ...
   const registroDinamicoAsignadoTmpFirstRender = useRef(registroDinamicoAsignadoTmp)

   // » Effect's ...
   useEffect(() => { firstRender.current = true }, [])

   // ► Handler's ...
   const handleShowCamposExtraccion = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      setShowDatosExtraccion(checked)
   }

   // ► Dep's ...

   return (
      <Box
         width={ '93vw' }
         maxHeight={ '82vh' }
         display='flex'
         flexDirection='column'
      >
         {/* ► Header's ... */}
         <Typography variant='h4' color='GrayText' gutterBottom>DATOS DE EXTRACCIÓN</Typography>
         <Switch size='small' checked={ showDatosExtraccion } onChange={ handleShowCamposExtraccion } />
         {
            showDatosExtraccion &&
            (
               <Paper elevation={ 1 } sx={{ p: 2 }}>
                  <Stack
                     direction='row'
                     flexWrap='wrap'
                     justifyContent='space-between'
                     gap={ 2 }
                     divider={ <Divider orientation='vertical' flexItem /> }
                  >
                     {
                        Object.entries(registroDinamicoAsignadoTmpFirstRender.current).filter(([k]) => k.endsWith('_e')).map(([k, v]) => (
                           <Box
                              key={ v }
                              display='flex'
                              flexDirection='row'
                              alignItems='baseline'
                              gap={ 1 }
                           >
                              <Typography variant='h4' color='primary'>{ `${undecorateMetaFieldName(k, 'prefix | underscore | suffix')}: ` }</Typography>
                              <Typography variant='h4' color='GrayText'>{ v }</Typography>
                           </Box>
                        ))
                     }
                  </Stack>
               </Paper>
            )
         }

         {/* ► Body ... */}
         <Typography variant='h4' color='GrayText' sx={{ mt: 2 }} gutterBottom>DATOS DE ANALISIS</Typography>

         <FormControlLabel control={ <Switch /> } label='Campos opcionales' />

         <FrmAnalizarExtraccion registroDinamicoAsignadoTmpFirstRender={ registroDinamicoAsignadoTmpFirstRender.current } />

         {/* ► Observaciones ... */
            registroDinamicoAsignadoTmp.hasFieldError && (
               <TextField
                  type='text'
                  variant='filled'
                  label='Observaciones'
                  value={ registroDinamicoAsignadoTmpFirstRender.current.observacionesCtrlCal }
                  rows={ 3 }
                  fullWidth
                  multiline
                  disabled
               />
            )
         }
      </Box>
   )
}

const FrmAnalizarExtraccion: FC<{ registroDinamicoAsignadoTmpFirstRender: RegistroTablaDinamicaDto }> = ({ registroDinamicoAsignadoTmpFirstRender }) => {
   // ► Context ...
   const { asigGrupoCamposAnalisisTmp, registroDinamicoAsignadoTmp, tablaAsignadaTmp, handleActionRegistroDinamicoAsignadoTmp } = useAnalizarExtraccionContext()

   // ► Hook's ...
   const refAnalizarExtraccionSubmit = useRef({} as HTMLInputElement)
   const templateIdRecordAssigned = useRef<number>()
   const [toRenderFrmAnalizarExtraccion, setToRenderFrmAnalizarExtraccion] = useState(true)

   // ► Custom hook's ...
   const { userCredentials } = useAuth()

   const { loadingAsigGrupoCamposAnalisisDb, findAsigById, saveRecordAssigned } = useAnalizarExtraccion()
   const [prevIdRecordAssigned, setPrevIdRecordAssigned] = useLocalStorage('REGISTRO_DINAMICO_ASIGNADO_PREV_ID')
   const [recordAssignedTemplate, setRecordAssignedTemplate] = useLocalStorage('REGISTRO_DINAMICO_ASIGNADO_TEMPLATE')

   // » Effect's ...
   useEffect(() => { // ...
      if (tablaAsignadaTmp.length === 0) return
      if (!templateIdRecordAssigned.current) return

      setRecordAssignedTemplate(tablaAsignadaTmp.find(t => t.nId === templateIdRecordAssigned.current))
      templateIdRecordAssigned.current = 0 // Cleanup ...
   }, [tablaAsignadaTmp])

   // » Handler's ...
   const handleSaveRegistroDinamicoAsignadoTmp = (type: 'SAVE' | 'FILTER') => {
      setToRenderFrmAnalizarExtraccion(false)

      switch (type) {
      case 'FILTER':
         handleActionRegistroDinamicoAsignadoTmp('FILTER', {} as RegistroTablaDinamicaDto, prevIdRecordAssigned)
         break
      case 'SAVE':
         if (!recordAssignedTemplate) {
            noty('error', '¡No existe una plantilla!')
            break
         }

         handleActionRegistroDinamicoAsignadoTmp('SAVE', recordAssignedTemplate as RegistroTablaDinamicaDto)
         break
      }

      setTimeout(() => { setToRenderFrmAnalizarExtraccion(true) }, 0)
   }

   const handleSubmitAndIdRecordAssignedToTemplate = () => {
      refAnalizarExtraccionSubmit.current.click()
      templateIdRecordAssigned.current = registroDinamicoAsignadoTmpFirstRender.nId
   }

   // » Dep's ...
   const metaFieldsNameAssigned = useMemo(() => (asigGrupoCamposAnalisisTmp.grupo.metaFieldsCsv?.split(',')
      .map(i => i.trim())
      .map(i => i.split('|')[0].trim())
      .join(',')
   ), [asigGrupoCamposAnalisisTmp])

   const metaFieldsRequiredAssigned = useMemo(() => {
      const metaFieldsRequired: { [k: string]: boolean } = {}

      asigGrupoCamposAnalisisTmp.grupo.metaFieldsCsv?.split(',')
         .map(i => i.trim())
         .forEach(i => {
            metaFieldsRequired[i.split('|')[0].trim()] = i.split('|')[3]?.trim() === 'true'
         })

      return metaFieldsRequired
   }, [asigGrupoCamposAnalisisTmp])

   // ► Render conditional ...
   if (!toRenderFrmAnalizarExtraccion) return <></>

   return (
      <>

         <Box mb={ 2 } display='flex' justifyContent='flex-end' gap={ 0.5 }>

            <ActionsAuxAnalisis toRender={ userCredentials.grupo === 'DEPURACION' }>
               <Button
                  variant='outlined'
                  color='info'
                  startIcon={ <CopyAllRounded /> }
                  disabled={ loadingAsigGrupoCamposAnalisisDb }
                  onClick={ () => { handleSaveRegistroDinamicoAsignadoTmp('SAVE') } }
               >
                  <Typography variant='h4'>Cargar plantilla</Typography>
               </Button>

               <Button
                  variant='outlined'
                  startIcon={ <CachedRounded /> }
                  disabled={ loadingAsigGrupoCamposAnalisisDb }
                  onClick={ () => { handleSaveRegistroDinamicoAsignadoTmp('FILTER') } }
               >
                  <Typography variant='h4'>Analisis Anterior</Typography>
               </Button>

               <Button
                  variant='contained'
                  color='info'
                  startIcon={ loadingAsigGrupoCamposAnalisisDb ? <CircularProgress size={ 20 } /> : <SaveAsRounded /> }
                  disabled={ loadingAsigGrupoCamposAnalisisDb }
                  onClick={ () => { handleSubmitAndIdRecordAssignedToTemplate() } }
               >
                  <Typography variant='h4'>Guardar como plantilla</Typography>
               </Button>
            </ActionsAuxAnalisis>

            <Button
               variant='contained'
               startIcon={ loadingAsigGrupoCamposAnalisisDb ? <CircularProgress size={ 20 } /> : <SaveAsRounded /> }
               disabled={ loadingAsigGrupoCamposAnalisisDb }
               onClick={ () => { refAnalizarExtraccionSubmit.current.click() } }
            >
               <Typography variant='h4'>Guardar</Typography>
            </Button>

         </Box>

         <Box overflow='auto'>
            <Fade duration={ 1250 }>
               <Formik
                  initialValues={ { ...getInitialValuesFromCsv(metaFieldsNameAssigned!, registroDinamicoAsignadoTmp) } }
                  validationSchema={ Yup.object({ ...getValidationSchemaFromCsv(metaFieldsNameAssigned!, metaFieldsRequiredAssigned) }) }
                  onSubmit={ async (values: any, meta): Promise<void> => {
                     await saveRecordAssigned({
                        nombreTabla: asigGrupoCamposAnalisisTmp.grupo.tablaDinamica?.nombre,
                        id: registroDinamicoAsignadoTmpFirstRender.nId,
                        values: JSON.stringify(values),
                        regAnalisisIni: asigGrupoCamposAnalisisTmp.regAnalisisIni,
                        regAnalisisFin: asigGrupoCamposAnalisisTmp.regAnalisisFin,
                        asigGrupo: { idAsigGrupo: asigGrupoCamposAnalisisTmp.idAsigGrupo }
                     })

                     await findAsigById(asigGrupoCamposAnalisisTmp.idAsigGrupo)
                     setPrevIdRecordAssigned(registroDinamicoAsignadoTmpFirstRender.nId)
                  } }>
                  {(formikprops) => (
                     <Form>
                        <Box
                           p={ 1 }
                           display='flex'
                           flexWrap='wrap'
                           justifyContent='space-between'
                           gap={ 2 }
                        >
                           {
                              Object.entries(registroDinamicoAsignadoTmp).filter(([k]) => metaFieldsNameAssigned?.includes(k)).map(([k, v]) => (
                                 <InputAnalisis key={ k } k={ k } />
                              ))
                           }
                        </Box>
                        <input type='submit' ref={ refAnalizarExtraccionSubmit } hidden />
                     </Form>
                  )}
               </Formik>
            </Fade>
         </Box>

      </>

   )
}

type ActionsAuxAnalisisProps = {
   children: ReactElement | ReactElement[],
   toRender: boolean
}

const ActionsAuxAnalisis: FC<ActionsAuxAnalisisProps> = ({ children, toRender }) => {
   if (!toRender) return <></>
   return <>{ children }</>
}

const InputAnalisis: FC<{k: string}> = ({ k }) => {
   /* ► CONTEXT ...  */
   const { asigGrupoCamposAnalisisTmp, registroDinamicoAsignadoTmp } = useAnalizarExtraccionContext()

   /* ► CUSTOM - HOOK'S ... */
   const { optValoresTiposCurrentGrupoAuth } = useTipoLogico()

   /* ► DEP'S ... */
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
   const isFieldError = useMemo(() => registroDinamicoAsignadoTmp.metaFieldIdErrorCsv?.includes(label), [registroDinamicoAsignadoTmp, label])

   const restProps = useMemo(() => ({
      name: k,
      label,
      muiProps: {
         helperText: infoFromfieldsAssigned[k]
      }
   }), [label])

   return (
      <Box
         sx={{
            background: isFieldError ? 'linear-gradient(15deg, #FF0000, #fff 15%)' : ''
         }}
      >
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
      </Box>
   )
}

export default function Default () {
   return <AnalizarExtraccionProvider>
      <AnalizarExtraccionSubMod />
   </AnalizarExtraccionProvider>
}

// ► Private Method's ...
const getGridColDefByTablaDinamicaAsignada = (tablaDinamicaAsignada: RegistroTablaDinamicaDto[], fieldSuffix: '_a' | '_e'): Array<GridColDef> => {
   return Object.keys(tablaDinamicaAsignada.find((_, i) => i === 0) || {}).filter(field => field.endsWith(fieldSuffix)).map(field => ({
      field,
      headerName: undecorateMetaFieldName(field, 'prefix | underscore | suffix'),
      type: field.startsWith('d') ? 'date' : 'string',
      minWidth: field.length * 10,
      flex: 1,
      ...commonGridColDef
   }))
}

const getInitialValuesFromCsv = (metaFieldsNameCsv: string, registroDinamicoAsignado: any): {} => {
   const initialValues: Record<string, string> = {}
   metaFieldsNameCsv
      .split(',')
      .map(k => k.trim())
      .forEach((k) => {
         initialValues[k] = registroDinamicoAsignado[k] || ''
      })

   return initialValues
}

const getValidationSchemaFromCsv = (metaFieldsNameCsv: string, metaFieldsRequiredAssigned: { [k: string]: boolean }): {} => {
   // ► Validación: ...
   if (!metaFieldsNameCsv || typeof metaFieldsRequiredAssigned === 'undefined') return {}

   const schemaValues: { [k: string]: Yup.StringSchema | Yup.NumberSchema } = {}
   metaFieldsNameCsv
      .split(',')
      .map(k => k.trim())
      .forEach(k => {
         if (k.startsWith('s') || k.startsWith('b')) {
            schemaValues[k] = Yup.string().matches(regex.INPUT_FIELD_TEXT_REGEX, messages.INPUT_FIELD_TEXT_REGEX_VALIDATION)
         }

         if (k.startsWith('n')) {
            schemaValues[k] = Yup.number().min(0, '¡El valor mínimo es 0!')
         }

         if (k.startsWith('d')) {
            schemaValues[k] = Yup.string().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g, '¡Formato incorrecto!')
         }

         if (metaFieldsRequiredAssigned[k]) {
            schemaValues[k] = schemaValues[k].required('¡Campo requerido!')
         }
      })

   return schemaValues
}
