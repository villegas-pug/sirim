import { useMemo } from 'react'

import { useAppActions, useAppSelector } from 'hooks'

export const useDistrito = () => {
   /* » HOOK'S STORE  */
   const { data: distritoDb } = useAppSelector(store => store.distrito)
   const { findAllDistrito } = useAppActions()

   /* » HANDLER'S  */

   /* » DEP'S  */
   const simpleDistritoDb = useMemo(() => distritoDb.map(({ nombre }) => nombre), [distritoDb])

   return {
      distritoDb,
      simpleDistritoDb,

      findAllDistrito
   }
}
