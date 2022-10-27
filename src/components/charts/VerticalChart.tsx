import { ReactElement } from 'react'

import {
   Bar,
   CartesianGrid,
   ComposedChart,
   YAxis,
   XAxis,
   Line,
   Tooltip
} from 'recharts'
import { CustomTooltipProps } from 'components'

const fontSizeAxis = 14
const widthYAxis = 140
const colorLabelAxis = '#444'

type VerticalChartProps<T> = {
   w: number
   h: number
   data: T[]
   titleYAxis: string
   borderColorBar: string
   yAxisDataKey: keyof T
   barDataKey: keyof T
   layout?: 'vertical' | 'horizontal'
   barWidth?: number
   xAxisDataKey?: keyof T
   customTooltip?: (props: CustomTooltipProps<T>) => ReactElement | null
}

export const VerticalChart = <T extends unknown>({ w, h, data, titleYAxis, borderColorBar, yAxisDataKey, barDataKey, layout = 'vertical', barWidth, xAxisDataKey, customTooltip: CustomTooltip }: VerticalChartProps<T>): ReactElement => {
   return (
      <ComposedChart
         layout={ layout }
         width={ w }
         height={ h }
         data={ data }
      >
         <CartesianGrid
            stroke={ borderColorBar }
            strokeDasharray='1'
         />

         <YAxis
            dataKey={ yAxisDataKey }
            type='category'
            tickSize={ 3 }
            width={ widthYAxis }
            tick={{ fontSize: 10, width: widthYAxis, fill: colorLabelAxis }}
            stroke={ borderColorBar }
            label={{ value: titleYAxis, position: 'insideLeft', angle: -90 }}
         />

         <Bar
            dataKey={ barDataKey }
            barSize={ barWidth ?? 40 }
            label={{ fontSize: 10, position: 'right' }}
            fill={ borderColorBar }
         />

         <Line type='step' dataKey={ barDataKey } stroke='#ff7300' />

         <XAxis
            dataKey={ xAxisDataKey }
            type='number'
            stroke={ borderColorBar }
            tick={{ fontSize: fontSizeAxis, fill: colorLabelAxis }}
            domain={ [0, (dataMax: number) => Math.ceil(dataMax * 1.2)] }
         />

         { CustomTooltip && <Tooltip content={ CustomTooltip } /> }

      </ComposedChart>
   )
}
