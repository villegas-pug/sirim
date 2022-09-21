import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Drawer } from 'components'

import { useAuth } from 'hooks'

const PrivateRoutes: FC = () => {
   /* ► CUSTOM-HOOK'S ... */
   const { isAuthenticated } = useAuth()

   if (!isAuthenticated) return <Navigate to='/portal' />

   return (
      <Drawer>
         <Outlet />
      </Drawer>
   )
}

export default PrivateRoutes
