import React, { FC, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { Portal, NotFound } from 'pages/portal'
import { PrivateRoutes, PublicRoutes } from 'routers'

import { useAuth, useHttpStatus } from 'hooks'

import { components } from 'config'
import { httpStatus } from 'constants/'

import './style.css'

const App: FC = () => {
   /* » CUSTOM HOOK'S...  */
   const {
      token,
      redirectComponentsAuth,
      findUserByLogin,
      logout
   } = useAuth()
   const { status } = useHttpStatus()

   /* » EFFECT'S:  */
   useEffect(() => { findUserByLogin() }, [token])
   useEffect(() => { if (status === httpStatus.FORBIDDEN) { logout() } }, [status])

   return (
      <BrowserRouter basename='/sirim'>
         <Routes>
            <Route path='/' element={ <PrivateRoutes /> }>
               {redirectComponentsAuth?.map(({ idProcedimiento, nombre, rutaPrincipal }) => (
                  <Route key={idProcedimiento} path={rutaPrincipal} element={components[nombre]} />
               ))}
            </Route>
            <Route path='/portal' element={ <PublicRoutes /> }>
               <Route index element={ <Portal /> } />
            </Route>
            <Route path='*' element={ <NotFound /> } />
         </Routes>
         <Toaster />
      </BrowserRouter>
   )
}

export default App
