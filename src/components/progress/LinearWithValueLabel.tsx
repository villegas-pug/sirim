import {
   LinearProgress,
   LinearProgressProps,
   Typography,
   Box,
   SxProps
} from '@mui/material'
import { FC } from 'react'

function LinearProgressWithLabel (props: LinearProgressProps & { value: number }) {
   return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant='determinate' {...props} />
         </Box>
         <Box sx={{ minWidth: 35 }}>
            <Typography
               variant='body2'
               color='text.secondary'
            >
               { `${Math.round(props.value)}%` }
            </Typography>
         </Box>
      </Box>
   )
}

type Props = {
   progress: number
   width: number | string
   sx?: SxProps
}

export const LinearWithValueLabel: FC<Props> = ({ progress, width }) => {
   return (
      <Box sx={{ width }}>
         <LinearProgressWithLabel value={ progress } />
      </Box>
   )
}
