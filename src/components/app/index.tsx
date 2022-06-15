import { FC, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './style.css'

import {
   DashboardRouters,
   PrivateRoutes,
   PublicRoutes
} from 'routers'

import { Drawer } from 'components/layout'
import { Portal } from 'pages/Portal'

import { useAuth, useHttpStatus } from 'hooks'

import { httpStatus } from 'constants/'

export const App: FC = () => {
   /* » CUSTOM HOOK'S...  */
   const {
      token,
      findUserByLogin,
      logout
   } = useAuth()
   const { status } = useHttpStatus()

   /* » EFFECT'S:  */
   useEffect(() => { findUserByLogin() }, [token])

   useEffect(() => {
      if (status === httpStatus.FORBIDDEN) { logout() }
   }, [status])

   return (
      <BrowserRouter basename='/sirim'>
         <Drawer>
            <Routes>
               <Route path='/portal' element={
                  <PublicRoutes>
                     <Portal />
                  </PublicRoutes>
               }
               />
               <Route path='/*' element={
                  <PrivateRoutes>
                     <DashboardRouters />
                  </PrivateRoutes>
               } />
            </Routes>
         </Drawer>
         <Toaster />
      </BrowserRouter>
   )
}
