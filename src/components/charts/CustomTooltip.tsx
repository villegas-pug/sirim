import { FC, ReactElement, useMemo } from 'react'

import { Paper, Box, Typography } from '@mui/material'
import { applyCommaThousands } from 'helpers'

export type CustomTooltipProps<T> = {
   children: (props: { payload: T, color: string }) => ReactElement
   payload?: { payload: T, color: string }[]
}

export const CustomTooltip = <T extends unknown>({ children, payload }: CustomTooltipProps<T>): ReactElement | null => {
   // ► Render conditional ...
   if (!payload) return null
   if (payload.length === 0) return null

   // Dep's ...
   const record = useMemo(() => payload[0], [payload])

   return (
      <Paper variant='outlined' sx={{ maxWidth: 250, opacity: 0.8 }}>
         <Box
            p={ 1 }
         >
            { children(record) }
         </Box>
      </Paper>
   )
}

type CustomValueTooltipProps = {
   title: string
   value: string | number
   color?: string
}

export const CustomValueTooltip: FC<CustomValueTooltipProps> = ({ title, value, color }) => {
   return (
      <Box
         display='flex'
         justifyContent='space-between'
      >
         <Typography variant='h5' color={ color ?? 'GrayText' }>{ title }</Typography>
         <Typography variant='h2' color={ color ?? 'GrayText' }>{ typeof value === 'number' ? applyCommaThousands(value) : value }</Typography>
      </Box>
   )
}
