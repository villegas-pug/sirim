import { RegistroTablaDinamicaDto } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

interface SaveCtrlCalCamposAnalisisLoading {
   type: '[Control-Calidad] Generate records to Control Calidad loading'
}

interface SaveCtrlCalCamposAnalisisSuccess {
   type: '[Control-Calidad] Generate records to Control Calidad success'
}

interface SaveCtrlCalCamposAnalisisError {
   type: '[Control-Calidad] Generate records to Control Calidad error'
   payload: string | null
}

interface FindTablaDinamicaByIdCtrlCalAndIdsLoading {
   type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds loading'
}

interface FindTablaDinamicaByIdCtrlCalAndIdsSuccess {
   type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds success'
   payload: Array<RegistroTablaDinamicaDto>
}

interface FindTablaDinamicaByIdCtrlCalAndIdsError {
   type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds error'
   payload: string | null
}

interface ValidateRecordAssignedLoading {
   type: '[Control-Calidad] validateRecordAssigned loading'
}

interface ValidateRecordAssignedSuccess {
   type: '[Control-Calidad] validateRecordAssigned success'
   payload: RegistroTablaDinamicaDto[]
}

interface ValidateRecordAssignedError {
   type: '[Control-Calidad] validateRecordAssigned error'
   payload: string | null
}

interface SaveMetaFieldIdErrorCsvLoading {
   type: '[Control-Calidad] saveMetaFieldIdErrorCsv loading'
}

interface SaveMetaFieldIdErrorCsvSuccess {
   type: '[Control-Calidad] saveMetaFieldIdErrorCsv success'
}

interface SaveMetaFieldIdErrorCsvError {
   type: '[Control-Calidad] saveMetaFieldIdErrorCsv error'
   payload: string | null
}

export type ControlCalidadAction =
   | ResponseHttpStatusType
   | SaveCtrlCalCamposAnalisisLoading
   | SaveCtrlCalCamposAnalisisSuccess
   | SaveCtrlCalCamposAnalisisError
   | FindTablaDinamicaByIdCtrlCalAndIdsLoading
   | FindTablaDinamicaByIdCtrlCalAndIdsSuccess
   | FindTablaDinamicaByIdCtrlCalAndIdsError
   | ValidateRecordAssignedLoading
   | ValidateRecordAssignedSuccess
   | ValidateRecordAssignedError
   | SaveMetaFieldIdErrorCsvLoading
   | SaveMetaFieldIdErrorCsvSuccess
   | SaveMetaFieldIdErrorCsvError
