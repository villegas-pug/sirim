import { ReactElement } from 'react'

import {
   YAxis,
   XAxis,
   Tooltip,
   BarChart,
   Bar,
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
   firstBarDataKey: keyof T
   colorFirstBar: string
   titleXAxis: string
   secondBarDataKey?: keyof T
   colorSecondBar?: string
   showLegend?: boolean
   customTooltip?: (props: CustomTooltipProps<T>) => ReactElement | null
}

export const SimpleBarChart = <T extends unknown>(props: SimpleLineChartProps<T>): ReactElement => {
   // ► Dep's
   const { w, h, colorLineAxis, data, xAxisDataKey, firstBarDataKey, secondBarDataKey, colorFirstBar, colorSecondBar, titleXAxis, showLegend = true, customTooltip: CustomTooltip } = props

   return (
      <BarChart
         width={ w }
         height={ h }
         data={ data }
      >

         <CartesianGrid strokeDasharray='3 3' />

         <YAxis
            tickSize={ 3 }
            tick={{ fontSize: 10, fill: colorLabelAxis }}
            stroke={ colorLineAxis }
            domain={ [0, (dataMax: number) => Math.ceil(dataMax * 1.4)] }
         />

         <XAxis
            dataKey={ xAxisDataKey }
            stroke={ colorLineAxis }
            tick={{ fontSize: fontSizeAxis, fill: colorLabelAxis }}
            height={ 40 }
            label={{ fontSize: 14, value: titleXAxis, position: 'insideBottom' }}
         />

         { CustomTooltip && <Tooltip content={ CustomTooltip } /> }

         { showLegend && <Legend /> }

         <Bar
            dataKey={ firstBarDataKey }
            barSize={ 20 }
            label={ <CustomBarLabel fontSize={ 9 } dx={ 10 } textAnchor='middle' angle={ -90 } /> }
            fill={ colorFirstBar }
         />

         {
            secondBarDataKey && (
               <Bar
                  dataKey={ secondBarDataKey }
                  barSize={ 20 }
                  label={ <CustomBarLabel fontSize={ 9 } angle={ -90 } textAnchor='middle' dx={ 10 } /> }
                  fill={ colorSecondBar }
               />
            )
         }

      </BarChart>
   )
}
