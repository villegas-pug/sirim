import { Pais } from 'interfaces'

export interface QueryClauseDto {
   mod: string
   fields: string
   where: string
}

export interface WhereClauseControlMigraMod {
   fechaIni: string
   fechaFin: string
   tipo: string
   paisNac: Pais
}
