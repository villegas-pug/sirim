import { FC, useEffect, useMemo } from 'react'

import { Box, Button, Divider, Grid, Paper, Stack } from '@mui/material'
import { QueryStatsRounded } from '@mui/icons-material'
import { Formik, Form } from 'formik'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

import { Body, CustomTooltip, CustomValueTooltip, InfoCard, ModalLoader, MySelect, SimpleAutocomplete, SimpleBarChart, SimpleLineChart, SimpleRadarChart, VerticalChart } from 'components'
import { añosControlMigratorio } from 'db'
import { useBreakpoints, useExtraccion, usePais, useReportes } from 'hooks'
import { applyCommaThousands } from 'helpers'

export const RptControlMigratorioSubMod: FC = () => {
   // ► Custom hook's ...
   const { findAllPais } = usePais()
   const { loadingDnvDb } = useExtraccion()
   const { loadingReportesDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   // ► Effect's ...
   useEffect(() => { findAllPais() }, [])

   return (
      <>
         <Fade duration={ 1500 }>
            <Body>

               {/* ► Header: InfoCard's ... */}
               <InfoCardControlMigratorio />

               {/* ► Header: Filter ... */}
               <FilterRptControlMigratorio />

               <Grid height={ currentScreen === 'desktopWide' ? '78%' : '70%' } container p={ 1 }>

                  {/* ► Control Migratorio: Anual ... */}
                  <Grid item container xs={ 4 } justifyContent='center' alignItems='center'>
                     <RptControlMigratorioAnual />
                  </Grid>

                  {/* ► Control Migratorio: Mensual ... */}
                  <Grid item container xs={ 8 } justifyContent='center' alignItems='center'>
                     <RptControlMigratorioMensual />
                  </Grid>

                  {/* ► Control Migratorio: Dependencia ... */}
                  <Grid item container xs={ 4 } justifyContent='center' alignItems='center'>
                     <RptControlMigratorioDependencia />
                  </Grid>

                  {/* ► Control Migratorio: Nacionalidad ... */}
                  <Grid item container xs={ 4 } justifyContent='center' alignItems='center'>
                     <RptControlMigratorioNacionalidad />
                  </Grid>

                  {/* ► Control Migratorio: Rango Edades ... */}
                  <Grid item container xs={ 4 } justifyContent='center' alignItems='center'>
                     <RptControlMigratorioRangoEdad />
                  </Grid>

               </Grid>

            </Body>
         </Fade>

         {/* ► Modal: Loading ... */}
         { loadingDnvDb && <ModalLoader /> }
         { loadingReportesDb && <ModalLoader /> }
      </>
   )
}

const InfoCardControlMigratorio: FC = () => {
   // ► CONTEXT ...
   // ► HOOK'S ...

   // ► CUSTOM - HOOK'S ...
   const {
      rptControlMigratorioDb,
      loadingDnvDb
   } = useExtraccion()

   // ► Dep's ...
   const totalEntradas = useMemo(() => rptControlMigratorioDb.reduce((acc, { entradas }) => (acc += entradas, acc), 0), [rptControlMigratorioDb])
   const totalSalidas = useMemo(() => rptControlMigratorioDb.reduce((acc, { salidas }) => (acc += salidas, acc), 0), [rptControlMigratorioDb])
   const totalMasculino = useMemo(() => rptControlMigratorioDb[0]?.totalMasculino || 0, [rptControlMigratorioDb])
   const totalFemenino = useMemo(() => rptControlMigratorioDb[0]?.totalFemenino || 0, [rptControlMigratorioDb])

   return (
      <Fade top>
         <Fade top when={ !loadingDnvDb }>
            <Stack
               mb={ 1 }
               direction='row'
               justifyContent='space-around'
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               <InfoCard iconName='PlaneEntry' title='Total Entradas' value={ applyCommaThousands(totalEntradas) } />
               <InfoCard iconName='PlaneTakeOff' title='Total Salidas' value={ applyCommaThousands(totalSalidas) } />
               <InfoCard iconName='GirlRounded' title='Total Mujeres' value={ applyCommaThousands(totalFemenino) } />
               <InfoCard iconName='BoyRounded' title='Total Hombres' value={ applyCommaThousands(totalMasculino) } />
            </Stack>
         </Fade>
      </Fade>
   )
}

const FilterRptControlMigratorio: FC = () => {
   // ► Custom hook's ...
   const { nacionalidadDb } = usePais()
   const { getRptControlMigratorio } = useExtraccion()
   const {
      getRptAñosControlMigratorio,
      getRptDependenciaControlMigratorio,
      getRptEdadesControlMigratorio,
      getRptNacionalidadControlMigratorio
   } = useReportes()

   return (
      <Fade top>
         <Paper variant='outlined'>
            <Formik
               initialValues={{
                  año: 2022,
                  nacionalidad: ''
               }}
               onSubmit={ async (values: { año: number, nacionalidad: string }, meta): Promise<void> => {
                  await getRptAñosControlMigratorio()
                  await getRptControlMigratorio(values.año, values.nacionalidad)
                  await getRptDependenciaControlMigratorio(values.año, values.nacionalidad)
                  await getRptNacionalidadControlMigratorio(values.año)
                  getRptEdadesControlMigratorio(values.año, values.nacionalidad)
               } }>
               {(formikProps) => (
                  <Form>
                     <Box
                        p={ 1 }
                        display='flex'
                        alignItems='flex-start'
                        gap={ 1 }
                     >
                        <MySelect name='año' label='Año Control' width={ 7 } opt={ añosControlMigratorio } muiProps={{ autoFocus: true }} />
                        <SimpleAutocomplete name='nacionalidad' label='Nacionalidad' width={ 25 } opt={ nacionalidadDb } { ...formikProps } />

                        <Button
                           type='submit'
                           variant='outlined'
                           startIcon={ <QueryStatsRounded /> }
                        />
                     </Box>
                  </Form>
               )}

            </Formik>
         </Paper>
      </Fade>
   )
}

const RptControlMigratorioMensual: FC = () => {
   // ► Custom hock's ...
   const { rptControlMigratorioDb } = useExtraccion()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 1000 : 750, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 230 : 160, [currentScreen])

   return (
      <Zoom when={ rptControlMigratorioDb.length }>
         <SimpleLineChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptControlMigratorioDb }
            colorLineAxis={ '#999' }
            xAxisDataKey='mes'
            firstLineDataKey='entradas'
            secondLineDataKey='salidas'
            colorFirstLine={ '#6EADDC' }
            colorSecondLine={ '#FBB614' }
            titleXAxis={ 'Control Mensual' }
            showLegend
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Año Control:' } value={ payload.año } />
                        <CustomValueTooltip title={ 'Total Entradas:' } value={ payload.entradas } />
                        <CustomValueTooltip title={ 'Total Salidas:' } value={ payload.salidas } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

const RptControlMigratorioAnual: FC = () => {
   // ► Custom hock's ...
   const { rptAñosControlMigratorioDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 560 : 400, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 230 : 160, [currentScreen])

   return (
      <Zoom when={ rptAñosControlMigratorioDb.length }>
         <SimpleBarChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptAñosControlMigratorioDb }
            colorLineAxis={ '#999' }
            xAxisDataKey='añoControl'
            firstBarDataKey='entradas'
            secondBarDataKey='salidas'
            colorFirstBar={ '#6EADDC' }
            colorSecondBar={ '#FBB614' }
            titleXAxis={ 'Control Anual' }
            showLegend
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Año Control:' } value={ payload.añoControl } />
                        <CustomValueTooltip title={ 'Total Entradas:' } value={ payload.entradas } />
                        <CustomValueTooltip title={ 'Total Salidas:' } value={ payload.salidas } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

const RptControlMigratorioDependencia: FC = () => {
   // ► Custom hock's ...
   const { rptDependenciaControlMigratorioDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 350 : 300, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 240 : 160, [currentScreen])

   return (
      <Zoom when={ rptDependenciaControlMigratorioDb.length }>
         <SimpleRadarChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptDependenciaControlMigratorioDb }
            polarDataKey='dependencia'
            radarDataKey='totalCtrlMig'
            colorRadar={ '#FF5733' }
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Dependencia:' } value={ payload.dependencia } />
                        <CustomValueTooltip title={ 'Total Movimientos Migratorios:' } value={ payload.totalCtrlMig } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

const RptControlMigratorioNacionalidad: FC = () => {
   // ► Custom hock's ...
   const { rptNacionalidadControlMigratorioDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 500 : 400, [currentScreen])
   const HEIGHT_CHART = useMemo(() => rptNacionalidadControlMigratorioDb.length * 22, [currentScreen, rptNacionalidadControlMigratorioDb])
   const HEIGHT_CONTAINER = useMemo(() => currentScreen === 'desktopWide' ? 230 : 150, [currentScreen])

   return (
      <Zoom when={ rptNacionalidadControlMigratorioDb.length }>
         <Box height={ HEIGHT_CONTAINER } overflow='auto'>
            <VerticalChart
               w={ WIDTH_CHART }
               h={ HEIGHT_CHART }
               data={ rptNacionalidadControlMigratorioDb }
               titleYAxis='Nacionalidad'
               borderColorBar='#00E4FF'
               yAxisDataKey='nacionalidad'
               barDataKey='totalCtrlMig'
               barWidth={ 10 }
               customTooltip={(props) => (
                  <CustomTooltip { ...props }>
                     {({ payload }) => (
                        <>
                           <CustomValueTooltip title={ 'Nacionalidad:' } value={ payload.nacionalidad } />
                           <CustomValueTooltip title={ 'Total Movimientos Migratorios:' } value={ payload.totalCtrlMig } />
                        </>
                     )}
                  </CustomTooltip>
               )}
            />
         </Box>
      </Zoom>
   )
}

const RptControlMigratorioRangoEdad: FC = () => {
   // ► Custom hock's ...
   const { rptEdadesControlMigratorioDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 500 : 300, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 240 : 170, [currentScreen])

   return (
      <Zoom when={ rptEdadesControlMigratorioDb.length }>
         <SimpleBarChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptEdadesControlMigratorioDb }
            colorLineAxis='#999'
            xAxisDataKey='rangoEdad'
            firstBarDataKey='totalCtrlMig'
            colorFirstBar={ '#FF5733' }
            titleXAxis={ 'Rango Edad' }
            showLegend={ false }
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Rango de Edades:' } value={ payload.rangoEdad } />
                        <CustomValueTooltip title={ 'Total Movimientos Migratorios:' } value={ payload.totalCtrlMig } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

export default RptControlMigratorioSubMod
