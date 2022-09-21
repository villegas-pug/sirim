import { FC, ReactElement } from 'react'

import { Paper } from '@mui/material'
import { styled } from '@mui/styles'

const CustomPaper = styled(Paper)({
   height: '82vh',
   padding: 20,
   overflow: 'auto'
})

type PropsType = {
   children: ReactElement | Array<ReactElement>
}

export const Body: FC<PropsType> = ({ children }) => {
   return (
      <CustomPaper variant='outlined'>
         { children }
      </CustomPaper>
   )
}
