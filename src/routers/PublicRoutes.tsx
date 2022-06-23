import { FC } from 'react'
import {
   Navigate,
   Outlet
} from 'react-router-dom'

import { useAuth } from 'hooks'

const PublicRoutes: FC = () => {
   /* ► CUSTOM-HOOK'S ... */
   const { isAuthenticated } = useAuth()

   if (isAuthenticated) return <Navigate to='/' />

   return <Outlet />
}

export default PublicRoutes
