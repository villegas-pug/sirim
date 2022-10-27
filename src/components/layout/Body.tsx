import { FC, ReactElement } from 'react'

import { Paper, SxProps } from '@mui/material'
import { styled } from '@mui/styles'

const CustomPaper = styled(Paper)({
   height: '82vh',
   padding: 10,
   overflow: 'auto'
})

type BodyProps = {
   children: ReactElement | Array<ReactElement>
   sx?: SxProps
}

export const Body: FC<BodyProps> = ({ children, sx }) => {
   return (
      <CustomPaper variant='outlined' sx={ sx }>
         { children }
      </CustomPaper>
   )
}
