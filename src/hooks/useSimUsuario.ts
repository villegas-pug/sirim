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
      const simUsuarioNombreDb = simUsuarioDb
         .filter(({ idDependencia }) => idDependencia.trim() === '25')
         .map(({ nombre }) => nombre.trim())

      return Array.from(new Set(simUsuarioNombreDb))
   }, [simUsuarioDb])

   return {
      loadingSimUsuarioDb,
      simUsuarioDb,
      simUsuarioNombreDb,

      findAllSimUsuario
   }
}
