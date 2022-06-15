import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useEtapa = () => {
   /* » STATE - HOOK'S  */
   const {
      loading: etapaDbLoading,
      data: etapaDb
   } = useAppSelector(store => store.etapa)
   const { findAllEtapa } = useAppActions()

   return {
      etapaDbLoading,
      etapaDb,

      findAllEtapa
   }
}
