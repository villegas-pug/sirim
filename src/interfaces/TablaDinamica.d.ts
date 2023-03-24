/* eslint-disable camelcase */
import { Usuario, GrupoCamposAnalisis, AsigGrupoCamposAnalisisDto } from 'interfaces'

export interface TablaDinamica {
   idTabla: number
   nombre: string
   metaFieldsCsv: string
   usrCreador: Usuario
   lstGrupoCamposAnalisis: GrupoCamposAnalisis[]
   porcentajeQC: number
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
   camposCsv: string
   alterTableType: AlterTableType
   grupoCamposAnalisis: Partial<GrupoCamposAnalisis>
}

export interface MetaCampoTablaDinamica {
   nombre: string
   tipo: MetaFieldSqlType
   info: string
   obligatorio: boolean
}

/* export interface AsigGrupoCamposAnalisisDto extends AsigGrupoCamposAnalisis {
   grupo: Partial<GrupoCamposAnalisis>
} */

export interface RegistroTablaDinamicaDto {
   nId: number
   nro?: number
   dFecha_Creacion: Date

   // ► Aux-1 ...
   idProdAnalisis: number
   fechaAnalisis: string
   analizado: boolean
   terminado: boolean
   revisado: boolean
   observacionesCtrlCal: string
   hasFieldError: boolean

   // ► Aux-2 ...
   nombreTabla: string
   regAnalisisIni: number
   regAnalisisFin: number

   // ► Aux-3 ...
   id: number
   values: string
   usrAnalista: Usuario
   asigGrupo: Partial<AsigGrupoCamposAnalisisDto>
   metaFieldIdErrorCsv: string

   // ► Aux-4 ...
   idCtrlCal: number;

}
