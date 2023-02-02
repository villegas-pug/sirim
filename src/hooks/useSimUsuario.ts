import { useMemo } from 'react'

import { useAppSelector, useAppActions } from 'hooks'

export const useSimUsuario = () => {
   // » Store hook's ...
   const {
      loading: loadingSimUsuarioDb,
      data: simUsuarioDb
   } = useAppSelector(store => store.simUsuario)

   const { findAllSimUsuario } = useAppActions()

   // » Effect's ...

   // » Dep's ...
   const simUsuarioNombreDb = useMemo(() => {
      return simUsuarioDb.map(({ nombre }) => nombre.trim())
   }, [simUsuarioDb])

   return {
      loadingSimUsuarioDb,
      simUsuarioDb,
      simUsuarioNombreDb,

      findAllSimUsuario
   }
}
