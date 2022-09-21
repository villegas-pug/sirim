
import { SimpleCardNavigate } from 'components/card'
import { Menu } from 'components/layout'

import { useAuth } from 'hooks'

import { Procedimiento } from 'interfaces/Procedimiento'
import { FC } from 'react'

const UtilidadesMod: FC = () => {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   if (!submodAuthenticated.UTILIDADES) return <></>

   return (
      <Menu>
         {
            submodAuthenticated.UTILIDADES.map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={ procedimiento.nombre } { ...procedimiento } />
            ))
         }
      </Menu>
   )
}

export default UtilidadesMod
