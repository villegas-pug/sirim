import { FC, useEffect, useRef, useState } from 'react'

import {
   ArrowBackIosNewRounded,
   ArrowForwardIosRounded,
   CachedRounded,
   QueryStatsRounded
} from '@mui/icons-material'
import { Box, Button, ButtonGroup, Divider, Grid, Stack } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { GridColDef } from '@mui/x-data-grid'
import { format } from 'date-fns'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

import {
   Body,
   InfoCard,
   LinearWithValueLabel,
   ModalLoader,
   MyTextField,
   SimpleDataGrid,
   SpeedDialActionProps,
   SpeedDialBackdrop,
   VerticalChart
} from 'components'

import {
   useBreakpoints,
   useExtraccion,
   useProduccionAnalisis,
   useRptProduccionDiario
} from 'hooks'
import { RptTiempoPromedioAnalisisDto } from 'interfaces'

export const RptProduccionDiarioSubMod: FC = () => {
   // ► HOOK'S ...
   const refResetFrm = useRef({} as HTMLInputElement)
   const [asideRptProduccionDiaria, setAsideRptProduccionDiaria] = useState<'RptProduccionDiaria »Aside-01' | 'RptProduccionDiaria »Aside-02'>('RptProduccionDiaria »Aside-01')

   // ► CUSTOM - HOOK'S ...
   const {
      totalProduccionAnalisis,
      totalProduccionDepuracion,
      findProduccionDiariaByDateParams
   } = useRptProduccionDiario()

   const { loadingExtraccionDb, findAllTablaDinamica } = useExtraccion()

   const { loadingRptTiempoPromedioAnalisisDb } = useProduccionAnalisis()

   // ► HANDLER'S ...

   // ► DEP'S ...
   const optSpeelDial: SpeedDialActionProps[] = [
      {
         name: 'Actualizar',
         icon: <CachedRounded />,
         handleClick: async () => {
            await findAllTablaDinamica()
            refResetFrm.current.click()
            findProduccionDiariaByDateParams(format(new Date(), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd'))
         }
      }
   ]

   return (
      <>
         <Fade>
            <Body>
               {/* ► Header: Card's ... */}
               <Fade top delay={ 500 }>
                  <Stack
                     direction='row'
                     justifyContent='space-around'
                     divider={ <Divider orientation='vertical' flexItem /> }
                  >
                     <InfoCard iconName={'AccountTree'} title={'Total Analisis'} value={ totalProduccionAnalisis } />
                     <InfoCard iconName={'AccountTree'} title={'Total Depuración'} value={ totalProduccionDepuracion } />
                  </Stack>
               </Fade>

               {/* ► HEADER: Navigate's ... */}
               <ButtonGroup
                  variant='contained'
                  color='primary'
                  size='small'
                  sx={{ mb: 1.5 }}
               >
                  <Button
                     startIcon={ <ArrowBackIosNewRounded /> }
                     onClick={ () => setAsideRptProduccionDiaria('RptProduccionDiaria »Aside-01') }
                     disabled={ asideRptProduccionDiaria === 'RptProduccionDiaria »Aside-01' }
                  />
                  <Button
                     endIcon={ <ArrowForwardIosRounded /> }
                     onClick={ () => setAsideRptProduccionDiaria('RptProduccionDiaria »Aside-02') }
                     disabled={ asideRptProduccionDiaria === 'RptProduccionDiaria »Aside-02' }
                  />
               </ButtonGroup>

               {/* ► BODY ... */}
               <Box>
                  { asideRptProduccionDiaria === 'RptProduccionDiaria »Aside-01' && <Fade left><LeftAsideRptProduccionDiaria /></Fade> }
                  { asideRptProduccionDiaria === 'RptProduccionDiaria »Aside-02' && <Fade right><RigthAsideRptProduccionDiariaAvg /></Fade> }
               </Box>
            </Body>
         </Fade>

         <SpeedDialBackdrop actions={ optSpeelDial } />

         {/* ► MODAL: Loading  */}
         { loadingExtraccionDb && <ModalLoader /> }
         { loadingRptTiempoPromedioAnalisisDb && <ModalLoader /> }
      </>
   )
}

const LeftAsideRptProduccionDiaria: FC = () => {
   // ► HOOK'S ...
   const refResetFrm = useRef({} as HTMLInputElement)

   // ► CUSTOM - HOOK'S ...
   const {
      produccionAnalisis,
      produccionDepuracion,
      findProduccionDiariaByDateParams
   } = useRptProduccionDiario()

   const { currentScreen } = useBreakpoints()

   // ► EFFECT'S ...
   useEffect(() => {
      findProduccionDiariaByDateParams(format(new Date(), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd'))
   }, [])

   return (

      <Grid container>
         {/* ► Header: Filter ... */}
         <Grid item xs={ 12 }>
            <Formik
               initialValues={{
                  fecIni: format(new Date(), 'yyyy-MM-dd'),
                  fecFin: format(new Date(), 'yyyy-MM-dd')
               }}
               validationSchema={ Yup.object({
                  fecIni: Yup.date().required('¡Fecha requerida!').max(Yup.ref('fecFin'), '¡Debe ser menor a fecha final!'),
                  fecFin: Yup.date().required('¡Fecha requerida!').min(Yup.ref('fecIni'), '¡Debe ser mayor o igual a fecha inicial!')
               })}
               onSubmit={ (values: { fecIni: string, fecFin: string }, meta): void => {
                  findProduccionDiariaByDateParams(values.fecIni, values.fecFin)
               }}>
               {() => (
                  <Form>
                     <Box
                        mb={ 1 }
                        display='flex'
                        alignItems='flex-start'
                        gap={ 1 }
                     >
                        <MyTextField type='date' name='fecIni' label='Fecha inicio' width={ 15 } focused />
                        <MyTextField type='date' name='fecFin' label='Fecha fin' width={ 15 } />
                        <Button type='submit' variant='contained'><QueryStatsRounded /></Button>
                        <input type='reset' ref={ refResetFrm } hidden />
                     </Box>
                  </Form>
               )}
            </Formik>
         </Grid>

         {/* ► Body: ...   */}
         {/* ► Grupo: Analisis  */}
         <Grid item container xs={ 6 } justifyContent='center'>
            <VerticalChart
               w={ currentScreen === 'tabletLandscape' || currentScreen === 'desktop' ? 550 : 750 }
               h={ currentScreen === 'tabletLandscape' || currentScreen === 'desktop' ? 305 : 530 }
               data={produccionAnalisis}
               titleYAxis='ANALISIS'
               borderColorBar={ '#900C3F' }
               yAxisDataKey='usrAnalista'
               barDataKey='totalAnalizados'
            />
         </Grid>

         {/* ► Grupo: Depuración  */}
         <Grid item container xs={ 6 } justifyContent='center' alignItems='center'>
            <VerticalChart
               w={ currentScreen === 'tabletLandscape' || currentScreen === 'desktop' ? 550 : 750 }
               h={ currentScreen === 'tabletLandscape' || currentScreen === 'desktop' ? 305 : 530 }
               data={ produccionDepuracion }
               titleYAxis='DEPURACIÓN'
               borderColorBar={ '#FF5733' }
               yAxisDataKey='usrAnalista'
               barDataKey='totalAnalizados' />

         </Grid>

      </Grid>

   )
}

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const RigthAsideRptProduccionDiariaAvg: FC = () => {
   // ► CUSTOM - HOOK'S ...
   const {
      loadingRptTiempoPromedioAnalisisDb,
      rptTiempoPromedioAnalisisDb,
      getRptTiempoPromedioAnalisisByParms
   } = useProduccionAnalisis()
   const { currentScreen } = useBreakpoints()

   // ► DEP'S ...
   const columns: GridColDef<RptTiempoPromedioAnalisisDto>[] = [
      {
         field: 'nro',
         width: 70,
         ...commonGridColDef
      }, {
         field: 'usrAnalista',
         headerName: 'Analista',
         minWidth: 250,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'grupo',
         headerName: 'Grupo',
         minWidth: 100,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'base',
         headerName: 'Base',
         minWidth: 200,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'fechaAnalisis',
         headerName: 'Fecha Analisis',
         type: 'date',
         minWidth: 130,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'totalAsignados',
         headerName: 'Asignados',
         type: 'number',
         minWidth: 100,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'totalAnalizados',
         headerName: 'Analizados',
         type: 'number',
         minWidth: 100,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'fechaHoraAnalisisAvg',
         headerName: 'T. Prom. Analisis',
         type: 'date',
         minWidth: 100,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'fechaHoraAnalisisSum',
         headerName: 'T. Total Analisis',
         type: 'date',
         minWidth: 100,
         flex: 1,
         ...commonGridColDef
      }, {
         field: 'Progreso Analisis',
         minWidth: 200,
         ...commonGridColDef,
         renderCell: ({ row: { totalAsignados, totalAnalizados } }) => {
            return <LinearWithValueLabel
               progress={ (totalAnalizados / totalAsignados) * 100 }
               width={ '100%' }
            />
         }
      }
   ]

   return (
      <>
         {/* ► HEADER ...  */}
         <Formik
            initialValues={{
               fecIni: format(new Date(), 'yyyy-MM-dd'),
               fecFin: format(new Date(), 'yyyy-MM-dd')
            }}
            validationSchema={ Yup.object({
               fecIni: Yup.date().required('¡Fecha requerida!').max(Yup.ref('fecFin'), '¡Debe ser menor a fecha final!'),
               fecFin: Yup.date().required('¡Fecha requerida!').min(Yup.ref('fecIni'), '¡Debe ser mayor o igual a fecha inicial!')
            })}
            onSubmit={ (values: { fecIni: string, fecFin: string }, meta): void => {
               getRptTiempoPromedioAnalisisByParms(values.fecIni, values.fecFin)
            }}>
            {() => (
               <Form>
                  <Box
                     mb={ 1 }
                     display='flex'
                     alignItems='flex-start'
                     gap={ 1 }
                  >
                     <MyTextField type='date' name='fecIni' label='Fecha inicio' width={ 15 } focused />
                     <MyTextField type='date' name='fecFin' label='Fecha fin' width={ 15 } />
                     <Button type='submit' variant='contained'><QueryStatsRounded /></Button>
                  </Box>
               </Form>
            )}
         </Formik>

         {/* ► BODY ...  */}
         <Zoom when={ !loadingRptTiempoPromedioAnalisisDb }>
            <SimpleDataGrid
               columns={ columns }
               rows={ rptTiempoPromedioAnalisisDb }
               getRowId={(row => row.nro)}
               pageSize={
                  currentScreen === 'desktopLarge'
                     ? 8
                     : currentScreen === 'desktopWide'
                        ? 10
                        : 5
               }
               localStoragePageKey='RPT_PRODUCCION_DIARIO_NRO_PAGINA'
            />
         </Zoom>
      </>
   )
}

export default RptProduccionDiarioSubMod
