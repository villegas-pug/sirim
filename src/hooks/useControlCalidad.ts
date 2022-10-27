import { useAppActions, useAppSelector } from 'hooks'

export const useControlCalidad = () => {
   // ► STORE - HOOK'S ...
   const {
      loading: loadingControlCalidadDb,
      tabla: tablaCtrlCalDb
   } = useAppSelector(store => store.controlCalidad)

   const {
      findTablaDinamicaByIdCtrlCalAndIds,
      saveCtrlCalCamposAnalisis,
      validateRecordAssigned,
      saveMetaFieldIdErrorCsv
   } = useAppActions()

   // ► Handler's ...

   return {
      loadingControlCalidadDb,
      tablaCtrlCalDb,

      findTablaDinamicaByIdCtrlCalAndIds,
      saveCtrlCalCamposAnalisis,
      validateRecordAssigned,
      saveMetaFieldIdErrorCsv
   }
}
