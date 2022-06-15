import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useDependencia = () => {
   /* » STORE-HOOK ... */
   const {
      data: dependenciaDb,
      loading: loadingDependenciaDb
   } = useAppSelector(state => state.dependencia)
   const { findAllDependencia } = useAppActions()

   return {
      dependenciaDb,
      loadingDependenciaDb,

      findAllDependencia
   }
}
