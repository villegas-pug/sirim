
import { SimpleCardNavigate } from 'components/card'
import { Menu } from 'components/layout'

import { useAuth } from 'hooks'

import { getArrPropOfObject } from 'helpers'

import { moduloNames } from 'constants/'
import { Procedimiento } from 'interfaces/Procedimiento'
const { PROCESOS } = moduloNames

export default function ProcesosMod () {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            getArrPropOfObject(submodAuthenticated, PROCESOS)?.map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={procedimiento.nombre} {...procedimiento} />
            ))
         }
      </Menu>
   )
}
