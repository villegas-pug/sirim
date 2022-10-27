import { useMemo } from 'react'

import { useAppActions, useAppSelector } from 'hooks'

export const usePais = () => {
   /* » HOOK'S - STORE  */
   const { data: paisDb } = useAppSelector(store => store.pais)
   const { findAllPais } = useAppActions()

   /* » HANDLER'S  */
   /* » DEP'S  */

   const nacionalidadDb = useMemo(() => {
      return paisDb
         .map(({ nacionalidad }) => nacionalidad)
         .filter(nac => nac.trim())
   }, [paisDb])

   return {
      paisDb,
      nacionalidadDb,

      findAllPais
   }
}
