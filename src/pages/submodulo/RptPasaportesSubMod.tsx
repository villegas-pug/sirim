import { FC, useMemo } from 'react'

import { Divider, Grid, Stack } from '@mui/material'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

import { Body, CustomTooltip, CustomValueTooltip, InfoCard, ModalLoader, SimpleBarChart, SimpleLineChart, SpeedDialActionProps, SpeedDialBackdrop } from 'components'
import { applyCommaThousands } from 'helpers'

import { useBreakpoints, useReportes } from 'hooks'
import { UpdateRounded } from '@mui/icons-material'

export const RptPasaportesSubMod: FC = () => {
   // ► Custom hook's ...
   const {
      loadingReportesDb,
      getRptPasaportesIndicadores,
      getRptPasaportesEntregadosPorAños,
      getRptPasaportesEntregadosPor12UltimosMeses,
      getRptPasaportesEntregadosPor31UltimosDias
   } = useReportes()
   const { currentScreen } = useBreakpoints()

   // ► Effect's ...
   // ► Dep's ...
   const speedDialActions: SpeedDialActionProps[] = [
      {
         name: 'Actualizar',
         icon: <UpdateRounded />,
         handleClick: async () => {
            await getRptPasaportesIndicadores()
            await getRptPasaportesEntregadosPorAños()
            await getRptPasaportesEntregadosPor12UltimosMeses()
            getRptPasaportesEntregadosPor31UltimosDias()
         }
      }
   ]

   return (
      <>
         <Fade duration={ 1500 }>
            <Body>

               {/* ► Header: InfoCard's ... */}
               <InfoCardControlMigratorio />

               <Grid height={ currentScreen === 'desktopWide' ? '90%' : '82%' } container p={ 1 }>

                  {/* ► Pasaportes Entregados: Anual ... */}
                  <Grid item container xs={ 3 } justifyContent='center' alignItems='center'>
                     <RptPasaportesEntregadosAnual />
                  </Grid>

                  {/* ► Pasaportes Entregados: 12 ultimos Meses ... */}
                  <Grid item container xs={ 9 } justifyContent='center' alignItems='center'>
                     <RptPasaportesEntregados12UltimosMeses />
                  </Grid>

                  {/* ► Pasaportes Entregados: 31 ultimos días ... */}
                  <Grid item container xs={ 12 } justifyContent='center' alignItems='center'>
                     <RptPasaportesEntregados31UltimosDias />
                  </Grid>

               </Grid>

            </Body>
         </Fade>

         {/* ► SpeedDial ... */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* ► Modal: Loading ... */}
         { loadingReportesDb && <ModalLoader /> }
      </>
   )
}

const InfoCardControlMigratorio: FC = () => {
   // ► Context ...
   // ► Hook's ...

   // ► Custom - Hook's ...
   const {
      rptPasaportesIndicadoresDb: {
         entregados,
         vigentes,
         personas,
         mujeres,
         hombres
      },
      loadingReportesDb
   } = useReportes()

   // ► Dep's ...

   return (
      <Fade top>
         <Fade top when={ !loadingReportesDb }>
            <Stack
               mb={ 1 }
               direction='row'
               justifyContent='space-around'
               divider={ <Divider orientation='vertical' flexItem /> }
            >
               <InfoCard iconName='Passport' title='Entregados' value={ applyCommaThousands(entregados || 0) } />
               <InfoCard iconName='PassportValid' title='Vigentes' value={ applyCommaThousands(vigentes || 0) } />
               <InfoCard iconName='Persons' title='Personas' value={ applyCommaThousands(personas || 0) } />
               <InfoCard
                  iconName='GirlRounded'
                  title='(%) Mujeres'
                  value={ `${applyCommaThousands(((mujeres / personas) * 100) || 0)}%` }
               />
               <InfoCard
                  iconName='BoyRounded'
                  title='(%) Hombres'
                  value={ `${applyCommaThousands(((hombres / personas) * 100) || 0)}%` }
               />
            </Stack>
         </Fade>
      </Fade>
   )
}

const RptPasaportesEntregadosAnual: FC = () => {
   // ► Custom hock's ...
   const { rptPasaportesEntregadosPorAñosDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 490 : 330, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 250 : 180, [currentScreen])

   return (
      <Zoom when={ rptPasaportesEntregadosPorAñosDb.length }>
         <SimpleBarChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptPasaportesEntregadosPorAñosDb }
            colorLineAxis={ '#999' }
            xAxisDataKey='año'
            firstBarDataKey='entregados'
            colorFirstBar={ '#00E4FF' }
            titleXAxis={ 'Entregados por Año' }
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Año:' } value={ payload.año } />
                        <CustomValueTooltip title={ 'Total Entregados:' } value={ payload.entregados } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

const RptPasaportesEntregados12UltimosMeses: FC = () => {
   // ► Custom hock's ...
   const { rptPasaportesEntregadosPor12UltimosMesesDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 1050 : 850, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 250 : 180, [currentScreen])

   return (
      <Zoom when={ rptPasaportesEntregadosPor12UltimosMesesDb.length }>
         <SimpleLineChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptPasaportesEntregadosPor12UltimosMesesDb }
            colorLineAxis={ '#2E86C1' }
            xAxisDataKey='añomes'
            firstLineDataKey='entregados'
            colorFirstLine={ '#2E86C1' }
            titleXAxis={ 'Entregados por Mes' }
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Año:' } value={ payload.año } />
                        <CustomValueTooltip title={ 'Mes:' } value={ payload.mes } />
                        <CustomValueTooltip title={ 'Total Entregados:' } value={ payload.entregados } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

const RptPasaportesEntregados31UltimosDias: FC = () => {
   // ► Custom hock's ...
   const { rptPasaportesEntregadosPor31UltimosDiasDb } = useReportes()
   const { currentScreen } = useBreakpoints()

   const WIDTH_CHART = useMemo(() => currentScreen === 'desktopWide' ? 1300 : 1100, [currentScreen])
   const HEIGHT_CHART = useMemo(() => currentScreen === 'desktopWide' ? 250 : 180, [currentScreen])

   return (
      <Zoom when={ rptPasaportesEntregadosPor31UltimosDiasDb.length }>
         <SimpleLineChart
            w={ WIDTH_CHART }
            h={ HEIGHT_CHART }
            data={ rptPasaportesEntregadosPor31UltimosDiasDb }
            colorLineAxis={ '#5DADE2' }
            xAxisDataKey='diames'
            firstLineDataKey='entregados'
            colorFirstLine={ '#5DADE2' }
            titleXAxis={ 'Entregados por Día' }
            customTooltip={(props) => (
               <CustomTooltip { ...props }>
                  {({ payload }) => (
                     <>
                        <CustomValueTooltip title={ 'Mes:' } value={ payload.mes } />
                        <CustomValueTooltip title={ 'Día:' } value={ payload.dia } />
                        <CustomValueTooltip title={ 'Total Entregados:' } value={ payload.entregados } />
                     </>
                  )}
               </CustomTooltip>
            )}
         />
      </Zoom>
   )
}

export default RptPasaportesSubMod
