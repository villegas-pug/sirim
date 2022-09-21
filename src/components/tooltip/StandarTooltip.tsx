import { FC } from 'react'

import { Tooltip, TooltipProps } from '@mui/material'

type Props = {
   [key in keyof TooltipProps]: TooltipProps[key]
}

export const StandarTooltip: FC<Props> = ({ children, title, ...rest }) => {
   return (
      <Tooltip title={ title } placement='top-start' arrow { ...rest } >
         { children }
      </Tooltip>
   )
}
