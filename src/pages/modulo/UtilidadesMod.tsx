
import { SimpleCardNavigate } from 'components/card'
import { Menu } from 'components/layout'

import { useAuth } from 'hooks'

import { getArrPropOfObject } from 'helpers'

import { moduloNames } from 'constants/'
import { Procedimiento } from 'interfaces/Procedimiento'
import { FC } from 'react'
const { UTILIDADES } = moduloNames

const UtilidadesMod: FC = () => {
   /* » HOOK'S  */
   const { submodAuthenticated } = useAuth()

   return (
      <Menu>
         {
            getArrPropOfObject(submodAuthenticated, UTILIDADES)?.map((procedimiento: Procedimiento) => (
               <SimpleCardNavigate key={procedimiento.nombre} {...procedimiento} />
            ))
         }
      </Menu>
   )
}

export default UtilidadesMod
