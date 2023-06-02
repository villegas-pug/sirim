import { AsigGrupoCamposAnalisis } from './AsigGrupoCamposAnalisis'

export interface ProduccionAnalisis {
   idProdAnalisis: number
   asigGrupo: AsigGrupoCamposAnalisis
   idRegistroAnalisis: number
   completo: boolean
   terminado: boolean
   revisado: boolean
   rectificado: boolean
   observacionesCtrlCal: string
   metaFieldIdErrorCsv: string
   fechaFin: string
}
