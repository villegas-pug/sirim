import { AsigGrupoCamposAnalisis } from './AsigGrupoCamposAnalisis'

export interface ProduccionAnalisis {
   idProdAnalisis: number
   asigGrupo: AsigGrupoCamposAnalisis
   idRegistroAnalisis: number
   completo: boolean
   terminado: boolean
   revisado: boolean
   observacionesCtrlCal: string
   metaFieldIdErrorCsv: string
   fechaFin: string
}
