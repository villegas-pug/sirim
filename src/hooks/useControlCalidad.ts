import { useAppActions, useAppSelector } from 'hooks'

export const useControlCalidad = () => {
   /* ► STORE - HOOK'S ... */
   const { loading: loadingTablaDinamicaDb } = useAppSelector(store => store.extraccion)

   const { loading: loadingControlCalidadDb } = useAppSelector(store => store.controlCalidad)

   const { saveCtrlCalCamposAnalisis } = useAppActions()

   const { findAllTablaDinamica } = useAppActions()

   return {
      loadingControlCalidadDb,
      loadingTablaDinamicaDb,
      findAllTablaDinamica,
      saveCtrlCalCamposAnalisis
   }
}
