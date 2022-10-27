import { FC, ReactElement } from 'react'

import { Box } from '@mui/material'
import { SyncLoader } from 'react-spinners'

type ListSyncLoaderProps = {
   loading: boolean
   children: ReactElement
}

export const ListSyncLoader: FC<ListSyncLoaderProps> = ({ loading, children }) => {
   /* ► Render conditional ... */
   if (!loading) return children

   return (
      <Box
         height='100%'
         display='flex'
         justifyContent='center'
         alignItems='center'
      >
         <SyncLoader color='#004795' />
      </Box>
   )
}
