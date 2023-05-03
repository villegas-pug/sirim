import {
   GrupoCamposAnalisis,
   Usuario,
   ProduccionAnalisis,
   CtrlCalCamposAnalisis
} from 'interfaces'

export interface AsigGrupoCamposAnalisis {
   idAsigGrupo: number
   grupo: GrupoCamposAnalisis
   produccionAnalisis: Array<ProduccionAnalisis>
   ctrlsCalCamposAnalisis: Array<CtrlCalCamposAnalisis>;
   usrAnalista: Usuario
   regAnalisisIni: number
   regAnalisisFin: number
   ctrlCalConforme: boolean
   fechaAsignacion: string

   // ► Aux ...
   fecIniAsignacion: string
   fecFinAsignacion: string
}

export interface AsigGrupoCamposAnalisisDto extends AsigGrupoCamposAnalisis {
   grupo: Partial<GrupoCamposAnalisis>
   totalAnalizados: number
   totalAsignados: number
   totalPendientes: number
   ctrlCalCamposAnalisis: CtrlCalCamposAnalisis

   // ► Transient: No es una propiedad `Dto` y `Entity` ...
   completo: boolean
}

export interface RecordsBetweenDatesDto {
   idAsigGrupo: number
   fecIni: string
   fecFin: string

   // ► Aux-1: Propiedades para el reporte de `Administrador` ...
   nombreTabla: string
   usr: Usuario

   // ► Aux-2 ...
   isAssignedTemplate: boolean
}
