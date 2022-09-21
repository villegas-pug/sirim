import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import {
   Box,
   Button,
   CircularProgress,
   Divider,
   IconButton,
   Paper,
   Stack,
   Switch,
   Tooltip,
   Typography
} from '@mui/material'
import {
   CachedRounded,
   CheckRounded,
   ClearRounded,
   DownloadRounded,
   ExitToAppRounded,
   FastRewindRounded,
   FileDownloadRounded,
   QueryStatsRounded,
   SaveAsRounded
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
   SpeedDialActionProps
} from 'components'

import { AnalizarExtraccionProvider, useAnalizarExtraccionContext } from 'context'
import { useAnalizarExtraccion, useBreakpoints } from 'hooks'

import { applyCommaThousands, parseJsonDateToDate, parseJsonTimestampToStrDate, undecorateMetaFieldName } from 'helpers'
import { AnalizadosDto, AsigGrupoCamposAnalisisDto, PrefixMetaFieldName, RegistroTablaDinamica } from 'interfaces'
import { optSelectItemMonthName } from 'constants/calendar'
import { format } from 'date-fns'
import { useTipoLogico } from 'hooks/useTipoLogico'

export const AnalizarExtraccionSubMod: FC = () => {
   /* ► CONTEXT ... */
   const {
      bandeja,
      asigGrupoCamposAnalisisTmp
   } = useAnalizarExtraccionContext()

   /* ► HOOK'S ... */
   const modalDownloadRptMensual = useRef({} as SimpleModalRefProps)

   /* ► CUSTOM - HOOK'S ...  */
   const {
      loadingAsigGrupoCamposAnalisisDb,
      findAsigAnalisisByUsr,
      findTablaDinamicaByRangoFromIds
   } = useAnalizarExtraccion()

   /* ► DEP'S ... */
   const optSpeedDial = useMemo<SpeedDialActionProps[]>(() => ([
      {
         name: 'Refrescar_Bandeja',
         icon: <CachedRounded />,
         handleClick: async () => {
            await findAsigAnalisisByUsr()
            findTablaDinamicaByRangoFromIds({
               nombreTabla: asigGrupoCamposAnalisisTmp.grupo.tablaDinamica?.nombre,
               regAnalisisIni: asigGrupoCamposAnalisisTmp.regAnalisisIni,
               regAnalisisFin: asigGrupoCamposAnalisisTmp.regAnalisisFin
            })
         }
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

const BandejaEntrada: FC = () => {
   /* ► CONTEXT ... */
   const {
      asigGrupoCamposAnalisisTmp,
      handleChangePage,
      handleSaveAsigGrupoCamposAnalisisTmp
   } = useAnalizarExtraccionContext()

   /* ► HOOK'S ... */
   const modalDownloadAnalizados = useRef({} as SimpleModalRefProps)

   /* ► CUSTOM - HOOK'S ... */
   const {
      asigGrupoCamposAnalisisDb,
      findAsigAnalisisByUsr,
      findTablaDinamicaByRangoFromIds,
      downloadAnalisadosByDates
   } = useAnalizarExtraccion()
   const { currentScreen } = useBreakpoints()

   /* ► EFFECT'S ...  */
   useEffect(() => { findAsigAnalisisByUsr() }, [])

   /* » DEP'S ... */
   const dgColumns = useMemo<GridColDef<AsigGrupoCamposAnalisisDto>[]>(() => [
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Ver grupo asignado' placement='top-start' arrow>
            <IconButton
               onClick={ async () => {
                  handleSaveAsigGrupoCamposAnalisisTmp(row)
                  await findTablaDinamicaByRangoFromIds({
                     nombreTabla: row.grupo.tablaDinamica?.nombre,
                     regAnalisisIni: row.regAnalisisIni,
                     regAnalisisFin: row.regAnalisisFin
                  })
                  handleChangePage('ANALISIS')
               } }
            >
               <ExitToAppRounded />
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
         field: 'fechaAsignacion',
         headerName: 'Fecha Asignación',
         width: 150,
         type: 'date',
         valueGetter: (params) => parseJsonDateToDate(params.value),
         ...commonGridColDef
      }, {
         field: 'Base',
         minWidth: 250,
         flex: 1,
         renderCell: ({ row }) => row.grupo?.tablaDinamica?.nombre,
         ...commonGridColDef
      }, {
         field: 'Grupo',
         minWidth: 250,
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
   ], [asigGrupoCamposAnalisisDb])

   return (
      <>
         {/* ► HEADER: Card-Info ... */}
         <HeaderBandejaEntrada />

         {/* ► BODY ... */}
         <Zoom bottom>
            <SimpleDataGrid
               columns={ dgColumns }
               rows={ asigGrupoCamposAnalisisDb }
               pageSize={ currentScreen === 'desktopLarge'
                  ? 8
                  : currentScreen === 'desktopWide'
                     ? 10
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
               onSubmit={ async (values: Omit<AnalizadosDto, 'idAsigGrupo'>, meta): Promise<void> => {
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
   /* ► CONTEXT ... */
   /* ► HOOK'S ... */

   /* ► CUSTOM - HOOK'S ... */
   const {
      asigSummaryDb,
      loadingAsigGrupoCamposAnalisisDb
   } = useAnalizarExtraccion()

   const { currentScreen } = useBreakpoints()

   /* ► RENDER CONDITIONAL ... */
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
               <InfoCard iconName='Assignment' title='Total Asignados' value={ applyCommaThousands(asigSummaryDb.totalAsignados) } />
               <InfoCard iconName='AssignmentComplete' title='Total Analizados' value={ applyCommaThousands(asigSummaryDb.totalAnalizados) } />
               <InfoCard iconName='AssignmentPendent' title='Total Pendientes' value={ applyCommaThousands(asigSummaryDb.totalPendientes) } />
            </Stack>
         </Fade>
      </Fade>
   )
}

const BandejaAnalisis: FC = () => {
   /* ► CONTEXT ... */
   const {
      tablaAsignadaTmp,
      handleChangePage,
      handleSaveRegistroDinamicoAsignadoTmp
   } = useAnalizarExtraccionContext()

   /* ► HOOK'S ...  */
   const modalAnalisis = useRef({} as SimpleModalRefProps)

   /* ► CUSTOM - HOOK'S ... */
   const { currentScreen } = useBreakpoints()
   const { findAllTipoLogico } = useTipoLogico()

   /* ► EFFECT'S ... */

   /* » DEP'S ... */
   const dgColumns = useMemo<Array<GridColDef<RegistroTablaDinamica>>>(() => ([
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Analizar' placement='left-start' arrow>
            <IconButton
               onClick={ async () => {
                  await findAllTipoLogico()
                  handleSaveRegistroDinamicoAsignadoTmp(row)
                  modalAnalisis.current.setOpen(true)
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
         field: 'analizado',
         headerName: '¿Analizado?',
         width: 150,
         type: 'boolean',
         ...commonGridColDef,
         renderCell: ({ row }) => row.analizado ? <CheckRounded fontSize='small' /> : <ClearRounded fontSize='small' />
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
               variant='contained'
               startIcon={ <FastRewindRounded fontSize='small' /> }
               size='small'
               onClick={ () => { handleChangePage('ENTRADA') } }
            />
         </Fade>

         {/* ► BODY ... */}
         <Zoom bottom>
            <SimpleDataGrid
               columns={ dgColumns }
               rows={ tablaAsignadaTmp }
               pageSize={
                  currentScreen === 'desktopLarge'
                     ? 8
                     : currentScreen === 'desktopWide'
                        ? 10
                        : 4
               }
               localStoragePageKey='ANALIZAR_EXTRACCION_BANDEJA_ANALISIS_NRO_PAGINA'
               getRowId={ row => row.nId }
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
   /* ► CONTEXT ... */
   const {
      asigGrupoCamposAnalisisTmp,
      tablaAsignadaTmp
   } = useAnalizarExtraccionContext()

   /* ► HOOK'S ...  */

   /* ► CUSTOM - HOOK'S ... */
   const { loadingAsigGrupoCamposAnalisisDb } = useAnalizarExtraccion()
   const { currentScreen } = useBreakpoints()

   /* ► EFFECT'S ...  */

   /* » DEP'S ... */
   const countRecordsAnalizadosToday = useMemo(() => tablaAsignadaTmp.filter(({ fechaAnalisis }) => {
      return parseJsonTimestampToStrDate(fechaAnalisis) === format(new Date(), 'yyyy-MM-dd')
   }).length
   , [tablaAsignadaTmp])

   /* ► RENDER CONDITIONAL ...  */
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
   /* ► CONTEXT ... */
   const {
      registroDinamicoAsignadoTmp,
      asigGrupoCamposAnalisisTmp
   } = useAnalizarExtraccionContext()

   /* ► HOOK'S ... */
   const refAnalizarExtraccionSubmit = useRef({} as HTMLInputElement)
   const [showDatosExtraccion, setShowDatosExtraccion] = useState(true)

   /* ► CUSTOM - HOOK'S ... */
   /* const { currentScreen } = useBreakpoints() */
   const { loadingAsigGrupoCamposAnalisisDb, saveRecordAssigned } = useAnalizarExtraccion()

   /* ► HANDLER'S ... */
   const handleShowCamposExtraccion = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      setShowDatosExtraccion(checked)
   }

   /* ► DEP'S ... */
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
                        Object.entries(registroDinamicoAsignadoTmp).filter(([k]) => k.endsWith('_e')).map(([k, v]) => (
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
            )
         }

         {/* ► BODY ... */}
         <Typography variant='h4' color='GrayText' sx={{ mt: 2 }} gutterBottom>DATOS DE ANALISIS</Typography>
         <Button
            variant='outlined'
            startIcon={ loadingAsigGrupoCamposAnalisisDb ? <CircularProgress size={ 20 } /> : <SaveAsRounded /> }
            disabled={ loadingAsigGrupoCamposAnalisisDb }
            sx={{ ml: 'auto', mb: 2, width: 120 }}
            onClick={ () => { refAnalizarExtraccionSubmit.current.click() } }
         >
            <Typography variant='h4'>Guardar</Typography>
         </Button>
         <Box overflow='auto'>
            <Formik
               initialValues={ { ...getInitialValuesFromCsv(metaFieldsNameAssigned!, registroDinamicoAsignadoTmp) } }
               validationSchema={ Yup.object({ ...getValidationSchemaFromCsv(metaFieldsNameAssigned!, asigGrupoCamposAnalisisTmp.grupo.obligatorio!) }) }
               onSubmit={ async (values: any, meta): Promise<void> => {
                  await saveRecordAssigned({
                     nombreTable: asigGrupoCamposAnalisisTmp.grupo.tablaDinamica?.nombre,
                     id: registroDinamicoAsignadoTmp.nId,
                     values: JSON.stringify(values),
                     regAnalisisIni: asigGrupoCamposAnalisisTmp.regAnalisisIni,
                     regAnalisisFin: asigGrupoCamposAnalisisTmp.regAnalisisFin,
                     asigGrupo: { idAsigGrupo: asigGrupoCamposAnalisisTmp.idAsigGrupo }
                  })
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
         </Box>
      </Box>
   )
}

const InputAnalisis: FC<{k: string}> = ({ k }) => {
   /* ► CONTEXT ...  */
   const { asigGrupoCamposAnalisisTmp } = useAnalizarExtraccionContext()

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

   const restProps = useMemo(() => ({
      name: k,
      label,
      muiProps: {
         helperText: infoFromfieldsAssigned[k]
      }
   }), [label])

   return (
      <>
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
      </>
   )
}

export default function Default () {
   return <AnalizarExtraccionProvider>
      <AnalizarExtraccionSubMod />
   </AnalizarExtraccionProvider>
}

/* ► Private Method's ... */
const getGridColDefByTablaDinamicaAsignada = (tablaDinamicaAsignada: RegistroTablaDinamica[], fieldSuffix: '_a' | '_e'): Array<GridColDef> => {
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
   const initialValues: { [k: string]: string } = {}
   metaFieldsNameCsv
      .split(',')
      .map(k => k.trim())
      .forEach(k => {
         initialValues[k] = registroDinamicoAsignado[k] || ''
      })

   return initialValues
}

const getValidationSchemaFromCsv = (metaFieldsNameCsv: string, obligatorio: boolean): {} => {
   // ► Validación: ...
   if (!metaFieldsNameCsv || typeof obligatorio === 'undefined') return {}

   const schemaValues: { [k: string]: Yup.StringSchema | Yup.NumberSchema } = {}
   metaFieldsNameCsv
      .split(',')
      .map(k => k.trim())
      .forEach(k => {
         if (k.startsWith('s') || k.startsWith('b')) {
            schemaValues[k] = Yup.string().matches(/^[^:,|]*$/g, 'Caracteres no permitidos: (,), (:) y (|).')
         }

         if (k.startsWith('n')) {
            schemaValues[k] = Yup.number().min(0, '¡El valor mínimo es 0!')
         }

         if (k.startsWith('d')) {
            schemaValues[k] = Yup.string().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g, '¡Formato incorrecto!')
            return
         }

         if (obligatorio) {
            schemaValues[k] = schemaValues[k].required('¡Campo requerido!')
         }
      })

   return schemaValues
}
