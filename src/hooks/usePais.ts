import { useMemo } from 'react'
import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const usePais = () => {
   /* » HOOK'S - STORE  */
   const { data: paisDb } = useAppSelector(store => store.pais)
   const { findAllPais } = useAppActions()

   /* » HANDLER'S  */

   /* » DEP'S  */
   const nacionalidadDb = useMemo(() => paisDb.map(({ nacionalidad }) => nacionalidad), [paisDb])

   return {
      paisDb,
      nacionalidadDb,

      findAllPais
   }
}
