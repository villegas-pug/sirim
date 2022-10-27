import { ReactElement } from 'react'

import {
   YAxis,
   XAxis,
   Tooltip,
   Line,
   LineChart,
   CartesianGrid,
   Legend
} from 'recharts'

import { CustomBarLabel, CustomTooltipProps } from 'components'

const fontSizeAxis = 14
const colorLabelAxis = '#444'

type SimpleLineChartProps<T> = {
   w: number
   h: number
   data: T[]
   colorLineAxis: string
   xAxisDataKey: keyof T
   firstLineDataKey: keyof T
   colorFirstLine: string
   colorSecondLine: string
   titleXAxis: string
   secondLineDataKey: keyof T
   customTooltip?: (props: CustomTooltipProps<T>) => ReactElement | null
}

export const SimpleLineChart = <T extends unknown>(props: SimpleLineChartProps<T>): ReactElement => {
   // ► Dep's
   const { w, h, colorLineAxis, data, xAxisDataKey, firstLineDataKey, secondLineDataKey, titleXAxis, colorFirstLine, colorSecondLine, customTooltip: CustomTooltip } = props

   return (
      <LineChart
         width={ w }
         height={ h }
         data={ data }
      >
         <CartesianGrid
            stroke={ colorLineAxis }
            strokeDasharray='1'
         />

         <YAxis
            tickSize={ 3 }
            tick={{ fontSize: 10, fill: colorLabelAxis }}
            stroke={ colorLineAxis }
            domain={ [0, (dataMax: number) => Math.ceil(dataMax * 1.2)] }
         />

         <XAxis
            dataKey={ xAxisDataKey }
            stroke={ colorLineAxis }
            tick={{ fontSize: fontSizeAxis, fill: colorLabelAxis }}
            height={ 40 }
            label={{ fontSize: 14, value: titleXAxis, position: 'insideBottom', color: 'red' }}
         />

         <Line
            label={ <CustomBarLabel /> }
            type='monotone'
            dataKey={ firstLineDataKey }
            stroke={ colorFirstLine }
            activeDot={{ r: 8 }}
         />

         <Line
            label={ <CustomBarLabel /> }
            type='monotone'
            dataKey={ secondLineDataKey }
            stroke={ colorSecondLine }
         />

         <Legend />

         { CustomTooltip && <Tooltip content={ CustomTooltip } /> }

      </LineChart>
   )
}
