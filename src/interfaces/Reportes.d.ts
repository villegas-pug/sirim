import { Grupo } from './Usuario'

export interface ProduccionDiaria {
   usrAnalista: string
   grupo: Grupo
   totalAsignados: number
   totalAnalizados: number
   totalPendientes: number
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

export interface RptControlMigratorioDto {
   año: number
   mes: number
   entradas: number
   salidas: number
   totalFemenino: number
   totalMasculino: number
}

export interface RptAñosControlMigratorioDto {
   añoControl: number
   entradas: number
   salidas: number
}

export interface RptDependenciaControlMigratorioDto {
   dependencia: string
   totalCtrlMig: number
}

export interface RptEdadesControlMigratorioDto {
   rangoEdad: string
   totalCtrlMig: number
}

export interface RptNacionalidadControlMigratorioDto {

   nacionalidad: string
   totalCtrlMig: number

}

export interface RptProduccionDiariaDto {

   usrAnalista: string
   grupo: Grupo
   totalAnalizados: number

}
