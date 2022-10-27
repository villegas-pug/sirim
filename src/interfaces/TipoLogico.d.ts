import { Grupo } from './Usuario'

export interface TipoLogico {

   idTipo: number
   nombre: string
   grupo: Grupo
   valoresCsv: string
   longitud: number
   activo: boolean
   fechaRegistro: string

}
