import { FC, ReactElement } from 'react'

import { Grid, GridTypeMap } from '@mui/material'

type Props = {
   children: ReactElement | Array<ReactElement>
}

type GridProps = {
   [k in keyof GridTypeMap['props']]?: GridTypeMap['props'][k]
}

export const GridContainer: FC<Props & GridProps> = ({ children, ...rest }) => {
   return (
      <Grid container height='calc(100vh - 7.5rem)' spacing={0.5} { ...rest }>
         { children }
      </Grid>
   )
}
