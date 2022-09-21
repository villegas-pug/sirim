import { Procedimiento } from 'interfaces'

export interface UsrProcedimiento {
   idUsrProcedimiento: number
   procedimiento: Procedimiento
   denegado: boolean
   fechaRegistro: Date
}

export type RimGrupo = 'ANALISIS' | 'DEPURACION'
export interface Usuario {
   idUsuario: string
   nombres: string
   usrProcedimiento?: UsrProcedimiento[]
   login: string
   password: string
   dependencia: string
   cargo: string
   grupo: RimGrupo
   area: string
   dni: string
   regimenLaboral: string
}
