import { FC, ReactElement } from 'react'

import { Box, Paper } from '@mui/material'
import { styled } from '@mui/styles'

const CustomPaper = styled(Paper)({
   height: '100%',
   padding: 20
})

type PropsType = {
   children: ReactElement | Array<ReactElement>
}

export const Body: FC<PropsType> = ({ children }) => {
   return (
      <Box
         height='82vh'
         overflow='hidden'
      >
         <CustomPaper variant='outlined'>
            { children }
         </CustomPaper>
      </Box>
   )
}
