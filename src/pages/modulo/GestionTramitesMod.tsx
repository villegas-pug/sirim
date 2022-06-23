
import { SimpleCardNavigate } from 'components/card'
import { Menu } from 'components/layout'

import { useAuth } from 'hooks'

import { Procedimiento } from 'interfaces/Procedimiento'

export default function GestionTramitesMod () {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   if (!submodAuthenticated['GESTIÓN TRÁMITES']) return <></>

   return (
      <Menu>
         {
            submodAuthenticated['GESTIÓN TRÁMITES'].map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={ procedimiento.nombre } { ...procedimiento } />
            ))
         }
      </Menu>
   )
}
