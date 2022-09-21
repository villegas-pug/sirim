/* eslint-disable camelcase */
import { Usuario, GrupoCamposAnalisis, AsigGrupoCamposAnalisisDto } from 'interfaces'

export interface TablaDinamica {
   idTabla: number
   nombre: string
   metaFieldsCsv: string
   usrCreador: Usuario
   lstGrupoCamposAnalisis: GrupoCamposAnalisis[]
   fechaCreacion: string
   activo: boolean
}

export type AlterTableType = 'ADD_COLUMN_E' | 'ADD_COLUMN_A' | 'ALTER_COLUMN_A' | 'ALTER_COLUMN_E' | 'DROP_COLUMN_E' | 'DROP_COLUMN_A'

export type PrefixMetaFieldName = 's' | 'n' | 'b' | 'd'

export type PrefixMetaFieldSqlType = {
   'VARCHAR(MAX)': 's',
   'int': 'n',
   'VARCHAR(55)': 'b',
   'date': 'd',
   'datetime': 'd',
   'bit': 'b'
}

export type MetaFieldSqlType = keyof PrefixMetaFieldSqlType
export interface TablaDinamicaDto extends TablaDinamica {
   camposCsv: String
   alterTableType: AlterTableType
   grupoCamposAnalisis: Partial<GrupoCamposAnalisis>
}

export interface MetaCampoTablaDinamica {
   nombre: string
   tipo: MetaFieldSqlType
   info: string
}

/* export interface AsigGrupoCamposAnalisisDto extends AsigGrupoCamposAnalisis {
   grupo: Partial<GrupoCamposAnalisis>
} */

export interface RecordAssignedDto {
   nombreTable: string
   id: number
   values: string
   usrAnalista: Usuario
   regAnalisisIni: number
   regAnalisisFin: number
   asigGrupo: Partial<AsigGrupoCamposAnalisisDto>

   revisado: boolean
   observacionesCtrlCal: string
   metaFieldIdErrorCsv: string
}

export interface RegistroTablaDinamica {
   nId: number
   dFecha_Creacion: Date
   nro?: number

   // ► Aux-1 ...
   fechaAnalisis: string
   analizado: boolean
   revisado: boolean
   observacionesCtrlCal: string

   // ► Aux-2 ...
   nombreTabla: string
   regAnalisisIni: number
   regAnalisisFin: number
}
