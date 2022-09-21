import { AsigGrupoCamposAnalisis } from './AsigGrupoCamposAnalisis'

export interface CtrlCalCamposAnalisis {
   idCtrlCal: number
   asigGrupoCamposAnalisis: AsigGrupoCamposAnalisis
   idsCtrlCalCsv: string
   completo: boolean
   totalRevisados: number
   totalRegistros: number
   fechaRegistro: string
}
