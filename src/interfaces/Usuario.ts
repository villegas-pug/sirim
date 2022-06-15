import { Dependencia, Procedimiento } from 'interfaces'

export interface UsrProcedimiento {
   idUsrProcedimiento: number
   procedimiento: Procedimiento
   denegado: boolean
   fechaRegistro: Date
}

export interface Usuario {
   idUsuario: string;
   nombres: string;
   usrProcedimiento?: UsrProcedimiento[];
   login: string;
   password: string;
   dependencia: Dependencia;
   cargo: string;
   area: string;
   dni: string;
   regimenLaboral: string;
}
