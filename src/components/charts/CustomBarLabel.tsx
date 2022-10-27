import { FC } from 'react'

import { Text } from 'recharts'
import { LabelProps } from 'recharts/types'

type BarLabelProps = {
   [k in keyof LabelProps]: LabelProps[k]
}

export const CustomBarLabel: FC<BarLabelProps> = (props) => {
   const { x, y, value, fontSize } = props
   return (
      <Text
         { ...props }
         x={ x }
         y={ y }
         fontSize={ fontSize ?? 11 }
      >
         { new Intl.NumberFormat('es-PE').format(parseInt(value as string)) }
      </Text>
   )
}
