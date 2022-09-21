import { RimGrupo } from './Usuario'

export interface ProduccionDiaria {
   usrAnalista: string
   grupo: RimGrupo
   totalAnalizados: number
}

export interface RptTiempoPromedioAnalisisDto {
   nro: number
   usrAnalista: string
   grupo: string
   base: string
   fechaAnalisis: string
   totalAsignados: number
   totalAnalizados: number
   fechaHoraAnalisisAvg: string
   fechaHoraAnalisisSum: string
}

export interface RptProduccionHoraLaboralDto {
   fechaAnalisis: Date
   horaAnalisis: number
   idUsuario: string
   nombres: string
   grupo: string
   base: string
   eventos: string
   totalAnalizados: number
}
