import { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from 'hooks'

const NotFound: FC = () => {
   /* » CUSTOM-HOOK'S  */
   const { isAuthenticated } = useAuth()

   if (!isAuthenticated) return <Navigate to='/portal' />
   return <Navigate to='/' />
}

export default NotFound
