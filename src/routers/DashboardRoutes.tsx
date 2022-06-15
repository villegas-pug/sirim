import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from 'hooks'

import { components } from 'config'

export const DashboardRouters: FC = () => {
   /* » CUSTOM HOOK'S  */
   const { redirectComponentsAuth } = useAuth()

   return (
      <Routes>
         {
            redirectComponentsAuth?.map(({ idProcedimiento, nombre, rutaPrincipal }) => (
               <Route
                  key={idProcedimiento}
                  path={rutaPrincipal}
                  element={components[nombre]}
               />
            ))
         }
      </Routes>
   )
}
