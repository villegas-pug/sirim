
import { SimpleCardNavigate } from 'components/card'
import { Menu } from 'components/layout'

import { useAuth } from 'hooks'

import { getArrPropOfObject } from 'helpers'

import { moduloNames } from 'constants/'
import { Procedimiento } from 'interfaces/Procedimiento'
const { GESTION_TRAMITES } = moduloNames

export default function GestionTramitesMod () {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            getArrPropOfObject(submodAuthenticated, GESTION_TRAMITES)?.map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={procedimiento.nombre} {...procedimiento} />
            ))
         }
      </Menu>
   )
}
