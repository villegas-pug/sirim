import { FC, ReactElement } from 'react'

import { Box } from '@mui/material'
import { PuffLoader } from 'react-spinners'

type ListPuffLoaderProps = {
   loading: boolean
   children: ReactElement
   size?: number
}

export const ListPuffLoader: FC<ListPuffLoaderProps> = ({ loading, children, size }) => {
   /* ► Render conditional ... */
   if (!loading) return children

   return (
      <Box
         height='100%'
         display='flex'
         justifyContent='center'
         alignItems='center'
      >
         <PuffLoader color='#004795' size={ size ?? 80 } />
      </Box>
   )
}
