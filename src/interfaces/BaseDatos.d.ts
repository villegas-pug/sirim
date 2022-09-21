import { Modulo } from 'interfaces'

export interface Tabla {
   idTabla: number;
   nombre: string;
   camposCsv: string;
   activo: boolean;
   fechaRegistro: string;
}

export interface BaseDatos {
   idBD: number;
   modulos: Modulo[];
   nombre: string;
   activo: boolean;
   fechaRegistro: string;
}

export interface QueryString {
   idQStr: number
   modulo: Modulo
   nombre: string
   queryString: string
   activo: boolean
   fechaRegistro: string
}
