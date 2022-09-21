import { Pais } from 'interfaces'

export interface QueryClauseDto {
   mod: string
   fields: string
   where: string
   nameTable?: string
}

export interface WhereClauseControlMigraMod {
   fechaIni: string
   fechaFin: string
   tipo: string
   paisNac: Pais
   nombreTabla?: string
}
