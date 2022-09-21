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

export type ControlCalidadAction =
   | ResponseHttpStatusType
   | SaveCtrlCalCamposAnalisisLoading
   | SaveCtrlCalCamposAnalisisSuccess
   | SaveCtrlCalCamposAnalisisError
