import { FC, ReactElement } from 'react'

import { Box, Skeleton } from '@mui/material'

type ListItemSkeletonProps = {
   loading: boolean
   skeletons: number
   children: ReactElement | ReactElement[]
}

export const ListSkeleton: FC<ListItemSkeletonProps> = ({ children, loading, skeletons }) => {
   // ► CUSTOM HOOK'S ...
   // ► DEP'S ...

   // ► Render conditional ...
   if (!loading) return <>{ children }</>

   return (
      <Box
         height={ '100%' }
         display={ 'flex' }
         flexDirection='column'
         justifyContent='center'
         p={ 4 }
      >
         {
            [...Array(skeletons)].map((_, i) => (
               <Skeleton key={ i } animation='pulse' />
            ))
         }

      </Box>
   )
}
