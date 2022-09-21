import { BaseDatos, Tabla, QueryString } from 'interfaces'

export interface Modulo {
   idMod: number;
   baseDato: BaseDatos
   tablas: Array<Tabla>;
   queryStrings: Array<QueryString>
   nombre: string;
   activo: boolean;
   fechaRegistro: string;

}

export interface ModuloDto extends Modulo {
   queryString: Partial<QueryString>
}
