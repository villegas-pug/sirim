import { SimpleCardNavigate, Menu } from 'components'

import { useAuth } from 'hooks'

import { Procedimiento } from 'interfaces/Procedimiento'

export default function ProcesosMod () {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   if (!submodAuthenticated.REPORTES) return <></>

   return (
      <Menu>
         {
            submodAuthenticated.REPORTES
               .sort(({ secuencia: a }: Procedimiento, { secuencia: b }: Procedimiento) => a < b ? -1 : 1)
               .map((procedimiento: Procedimiento) => (
                  <SimpleCardNavigate key={ procedimiento.nombre } { ...procedimiento } />
               ))
         }
      </Menu>
   )
}
