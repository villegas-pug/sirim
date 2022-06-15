import { Usuario } from 'interfaces'

export interface GrupoCamposAnalisis {
   idGrupo: number
   asigGrupoCamposAnalisis: any[]
   nombre: string
   metaFieldsCsv: null | string
   fechaCreacion: Date
   activo: boolean
}

export interface TablaDinamica {
   idTabla: number;
   nombre: string;
   usrCreador: Usuario;
   lstGrupoCamposAnalisis: GrupoCamposAnalisis[];
   fechaCreacion: string;
   activo: boolean;
}

type AlterTableType = 'ADD_COLUMN_E' | 'ADD_COLUMN_A' | 'ALTER_COLUMN_A' | 'ALTER_COLUMN_E' | 'DROP_COLUMN_E' | 'DROP_COLUMN_A'

export interface TablaDinamicaDto extends TablaDinamica {
   camposCsv: String
   alterTableType: AlterTableType
   grupoCamposAnalisis: Partial<GrupoCamposAnalisis>
}

export type CampoType = 'int' | 'VARCHAR(MAX)'

export interface MetaCampoTablaDinamica {
   nombre: string
   tipo: CampoType
}
