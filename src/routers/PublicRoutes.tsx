import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from 'hooks'

type PublicRoutesType = {
   children: ReactElement
}

export const PublicRoutes: FC<PublicRoutesType> = ({ children }) => {
   const { isAuthenticated } = useAuth()

   return isAuthenticated ? <Navigate to='/' /> : children
}
