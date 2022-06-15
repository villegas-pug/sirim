import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from 'hooks'

type PrivateRoutesType = {
   children: ReactElement
}

export const PrivateRoutes: FC<PrivateRoutesType> = ({ children }) => {
   const { isAuthenticated } = useAuth()

   return !isAuthenticated ? <Navigate to='/portal' /> : children
}
