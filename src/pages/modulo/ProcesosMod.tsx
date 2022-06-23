import { SimpleCardNavigate, Menu } from 'components'

import { useAuth } from 'hooks'

import { Procedimiento } from 'interfaces/Procedimiento'

export default function ProcesosMod () {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   if (!submodAuthenticated.PROCESOS) return <></>

   return (
      <Menu>
         {
            submodAuthenticated.PROCESOS.map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={ procedimiento.nombre } { ...procedimiento } />
            ))
         }
      </Menu>
   )
}
