
import { SimpleCardNavigate } from 'components/card'
import { Menu } from 'components/layout'

import { useAuth } from 'hooks'

import { Procedimiento } from 'interfaces/Procedimiento'
import { FC } from 'react'

const LineamientosMod: FC = () => {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   if (!submodAuthenticated.LINEAMIENTOS) return <></>

   return (
      <Menu>
         {
            submodAuthenticated.LINEAMIENTOS.map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={ procedimiento.nombre } { ...procedimiento } />
            ))
         }
      </Menu>
   )
}

export default LineamientosMod
