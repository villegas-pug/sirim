import { Grupo } from 'interfaces'

export interface ProyeccionAnalisis {
    idProyeccion: number;
    grupo: Grupo;
    mes: string;
    total: number;
    activo: boolean;
 }

export interface RptProyeccionAnalisis {

    grupo: Grupo
    año: number
    mes: number
    analizados: number
    proyeccion: number

 }
