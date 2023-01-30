import { Procedimiento } from 'interfaces'

export interface UsrProcedimiento {
   idUsrProcedimiento: number
   procedimiento: Procedimiento
   denegado: boolean
   fechaRegistro: Date
}

export type Grupo = 'ANALISIS' | 'DEPURACION' | 'ADMINISTRADORES'
export interface Usuario {
   idUsuario: string
   nombres: string
   usrProcedimiento?: UsrProcedimiento[]
   login: string
   password: string
   dependencia: string
   cargo: string
   grupo: Grupo
   area: string
   dni: string
   regimenLaboral: string
   foto: string
}

export interface SimUsuario {
   login: string
   nombre: string
   siglas: string
   idDependencia: string
   dni: string
   idDocumento: string
}
