import { ReactElement } from 'react'

import {
   Bar,
   CartesianGrid,
   ComposedChart,
   YAxis,
   XAxis,
   Line
} from 'recharts'

const fontSizeAxis = 10
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
   xAxisDataKey?: keyof T
}

export const VerticalChart = <T extends unknown>({ w, h, layout = 'vertical', borderColorBar, data, titleYAxis, yAxisDataKey, xAxisDataKey, barDataKey }: VerticalChartProps<T>): ReactElement => {
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
            width={ widthYAxis * 1.3 }
            tick={{ fontSize: 10, width: widthYAxis, fill: colorLabelAxis }}
            stroke={ borderColorBar }
            label={{ value: titleYAxis, position: 'insideLeft', angle: -90 }}
         />

         <Bar
            dataKey={ barDataKey }
            barSize={ 20 }
            label={{ fontSize: 14, position: 'right' }}
            fill={ borderColorBar }
            /* stroke={ borderColorBar } */
         />

         <Line type='linear' dataKey={ barDataKey } stroke='#ff7300' />

         <XAxis
            dataKey={ xAxisDataKey }
            type='number'
            stroke={ borderColorBar }
            tick={{ fontSize: fontSizeAxis, fill: colorLabelAxis }}
            domain={ [0, (dataMax: number) => Math.ceil(dataMax * 1.2)] }
         />

      </ComposedChart>
   )
}
