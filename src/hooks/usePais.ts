import { useMemo } from 'react'

import { useAppActions, useAppSelector } from 'hooks'

export const usePais = () => {
   /* » HOOK'S - STORE  */
   const { data: paisDb } = useAppSelector(store => store.pais)
   const { findAllPais } = useAppActions()

   /* » HANDLER'S  */
   /* » DEP'S  */

   const nacionalidadDb = useMemo(() => {
      const nacionalidades = paisDb
         .map(({ nacionalidad }) => nacionalidad)
         .filter(nac => nac.trim())

      return Array.from(new Set(nacionalidades))
   }, [paisDb])

   return {
      paisDb,
      nacionalidadDb,

      findAllPais
   }
}
