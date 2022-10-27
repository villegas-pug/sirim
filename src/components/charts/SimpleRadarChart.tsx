import { ReactElement } from 'react'

import {
   ResponsiveContainer,
   RadarChart,
   PolarGrid,
   PolarAngleAxis,
   PolarRadiusAxis,
   Radar,
   Tooltip
} from 'recharts'

import { CustomTooltipProps } from 'components'

type SimpleLineChartProps<T> = {
   w: number
   h: number
   data: T[]
   polarDataKey: keyof T,
   radarDataKey: keyof T,
   colorRadar: string
   customTooltip?: (props: CustomTooltipProps<T>) => ReactElement | null
}

export const SimpleRadarChart = <T extends unknown>(props: SimpleLineChartProps<T>): ReactElement => {
   // ► Dep's
   const { w, h, data, polarDataKey, radarDataKey, colorRadar, customTooltip: CustomTooltip } = props

   return (
      <ResponsiveContainer width={ w } height={ h }>
         <RadarChart
            outerRadius='75%'
            data={ data }
         >

            <PolarGrid />

            <PolarAngleAxis
               type='category'
               dataKey={ polarDataKey }
               tick={{ fontSize: 12 }}
            />

            <PolarRadiusAxis />

            <Radar
               name='Control Migratorio'
               dataKey={ radarDataKey }
               stroke={ colorRadar }
               fill={ colorRadar }
               fillOpacity={ 0.6 }
            />

            { CustomTooltip && <Tooltip content={ CustomTooltip } /> }

         </RadarChart>
      </ResponsiveContainer>
   )
}
