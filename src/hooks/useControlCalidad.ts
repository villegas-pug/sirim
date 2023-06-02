import { useAppActions, useAppSelector } from 'hooks'

export const useControlCalidad = () => {
   // ► STORE - HOOK'S ...
   const {
      loading: loadingControlCalidadDb,
      tabla: tablaCtrlCalDb,
      asig: asigGrupoCamposAnalisisDb
   } = useAppSelector(store => store.controlCalidad)

   const {
      findTablaDinamicaByIdCtrlCalAndIds,
      saveCtrlCalCamposAnalisis,
      validateRecordAssigned,
      saveMetaFieldIdErrorCsv,
      findAsigGrupoCamposAnalisisById,
      setValidationResultOfCtrlCal,
      saveRectificadoRecordAssigned
   } = useAppActions()

   // ► Handler's ...

   return {
      loadingControlCalidadDb,
      tablaCtrlCalDb,
      asigGrupoCamposAnalisisDb,

      findTablaDinamicaByIdCtrlCalAndIds,
      saveCtrlCalCamposAnalisis,
      validateRecordAssigned,
      saveMetaFieldIdErrorCsv,
      findAsigGrupoCamposAnalisisById,
      setValidationResultOfCtrlCal,
      saveRectificadoRecordAssigned
   }
}
