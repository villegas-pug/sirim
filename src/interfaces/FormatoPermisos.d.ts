import { Usuario } from 'interfaces'

export interface FormatoPermisos {
   idFormato: number;
   usrCreador: Usuario;
   jornadaLaboral: string;
   regimenLaboral: string;
   nombres: string;
   gerencia: string;
   subgerencia: string;
   unidad: string;
   tipoLicencia: string;
   desde: string;
   hasta: string;
   totalHoras: string;
   justificacion: string;
   fechaFormato: string;
   fechaCreacion: null | string;
   atendido: boolean
   recibido: boolean
   observaciones: string
   activo: boolean;
}

export type AttachmentType = 'FORMATO' | 'SUSTENTO'

export type ValidateType = 'ATENDIDO' | 'RECIBIDO'
