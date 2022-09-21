import { FC, ReactElement } from 'react'

import { Paper } from '@mui/material'
import Fade from 'react-reveal/Fade'

import { GridContainer } from 'components'

type BandejaProcesosProps = {
   children: ReactElement | ReactElement[]
}

export const BandejaProcesos: FC<BandejaProcesosProps> = ({ children }) => {
   return (
      <Fade duration={ 1500 }>
         <Paper sx={{ padding: 0.5 }} elevation={ 3 }>
            <GridContainer>
               { children }
            </GridContainer>
         </Paper>
      </Fade>
   )
}
