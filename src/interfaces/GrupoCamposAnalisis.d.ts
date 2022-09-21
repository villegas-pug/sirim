import { AsigGrupoCamposAnalisisDto, TablaDinamica } from 'interfaces'

export interface GrupoCamposAnalisis {
   idGrupo: number
   tablaDinamica: TablaDinamica
   asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto[]
   nombre: string
   metaFieldsCsv: null | string
   fechaCreacion: Date
   obligatorio: boolean
   activo: boolean
}
