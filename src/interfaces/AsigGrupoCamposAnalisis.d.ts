import { GrupoCamposAnalisis, Usuario, ProduccionAnalisis, CtrlCalCamposAnalisis } from 'interfaces'

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

export interface AnalizadosDto {
   idAsigGrupo: number
   fecIni: string
   fecFin: string
}
