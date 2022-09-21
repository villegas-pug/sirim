import { RimGrupo } from './Usuario'

export interface TipoLogico {

   idTipo: number
   nombre: string
   grupo: RimGrupo
   valoresCsv: string
   longitud: number
   activo: boolean
   fechaRegistro: string

}
