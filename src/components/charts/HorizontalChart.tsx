import { FC, ReactElement } from 'react'

import { Box, Paper, Typography } from '@mui/material'
import { RptProduccionHoraLaboralDto } from 'interfaces'

import {
   Bar,
   CartesianGrid,
   ComposedChart,
   YAxis,
   XAxis,
   Tooltip,
   Line
} from 'recharts'

import { LabelProps } from 'recharts/types'

const fontSizeAxis = 10
const colorLabelAxis = '#444'

type VerticalChartProps<T> = {
   w: number
   h: number
   data: T[]
   colorBar: string
   xAxisDataKey: keyof T
   barDataKey: keyof T
   titleXAxis: string
   showTooltip?: boolean
}

export const HorizontalChart = <T extends unknown>({ w, h, colorBar, data, xAxisDataKey, barDataKey, titleXAxis, showTooltip = false }: VerticalChartProps<T>): ReactElement => {
   return (
      <ComposedChart
         layout='horizontal'
         width={ w }
         height={ h }
         data={ data }
      >
         <CartesianGrid
            stroke={ colorBar }
            strokeDasharray='1'
         />

         <YAxis
            tickSize={ 3 }
            tick={{ fontSize: 10, fill: colorLabelAxis }}
            stroke={ colorBar }
            domain={ [0, (dataMax: number) => Math.ceil(dataMax * 1.2)] }
         />

         <Bar
            dataKey={ barDataKey }
            barSize={ 35 }
            /* label={{ fontSize: 12, position: 'top' }} */
            label={ <CustomBarLabel /> }
            fill={ colorBar }
         />

         <XAxis
            dataKey={ xAxisDataKey }
            stroke={ colorBar }
            tick={{ fontSize: fontSizeAxis, fill: colorLabelAxis }}
            height={ 50 }
            label={{ fontSize: 11, value: titleXAxis, position: 'center' }}
         />

         <Line type='step' dataKey={ barDataKey } stroke={ '#AFAFAF' } />

         { showTooltip && <Tooltip content={ <CustomTooltip /> } /> }

      </ComposedChart>
   )
}

type CustomTooltipProps = {
   payload?: { payload: RptProduccionHoraLaboralDto, color: string }[]
}

const CustomTooltip: FC<CustomTooltipProps> = ({ payload }) => {
   // ► Render conditional ...
   if (!payload) return null
   if (payload.length === 0) return null

   return (
      <Paper variant='outlined' sx={{ maxWidth: 200, opacity: 0.9 }}>
         <Box
            p={ 1 }
         >
            <Box display='flex' gap={ 1 } alignItems='center'>
               <Typography variant='h5' color={ payload[0].color }>Fecha: </Typography>
               <Typography variant='h3'>{ payload[0].payload.fechaAnalisis.toLocaleString('es-PE', { timeZone: 'America/Lima' }) }</Typography>
            </Box>
            <Box display='flex' gap={ 1 } alignItems='center'>
               <Typography variant='h5' color={ payload[0].color }>Hora: </Typography>
               <Typography variant='h2'>{ `${payload[0].payload.horaAnalisis}:00` }</Typography>
            </Box>
            <Box display='flex' gap={ 1 } alignItems='center'>
               <Typography variant='h5' color={ payload[0].color }>Total Analizados: </Typography>
               <Typography variant='h2'>{ payload[0].payload.totalAnalizados }</Typography>
            </Box>

            <Typography variant='h3' gutterBottom>Eventos</Typography>
            <ListaEventos eventos={ payload[0].payload.eventos } />

         </Box>
      </Paper>
   )
}

const ListaEventos: FC<{ eventos: string }> = ({ eventos }) => {
   // ► Conditional rendering ...
   if (!eventos) return <Typography variant='h6' color='GrayText'>No hay eventos</Typography>

   return (
      <Box display='flex' flexDirection='column' gap={ 3 }>
         {
            eventos?.split(/\|/g).map((e, i) => (
               <Typography key={ i } variant='h5' color='GrayText'>- { e } </Typography>
            ))
         }
      </Box>
   )
}

type BarLabelProps = {
   [k in keyof LabelProps]: LabelProps[k]
}

const CustomBarLabel: FC<BarLabelProps> = (props) => {
   const { x, y, value } = props
   return (
      <text
         x={ x }
         y={ y }
         dy={ -4 }
         fontSize={ 11 }
      >
         { new Intl.NumberFormat('es-PE').format(parseInt(value as string)) }
      </text>
   )
}
