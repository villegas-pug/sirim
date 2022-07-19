import { Usuario } from 'interfaces'

export interface AsigGrupoCamposAnalisis {
   idAsigGrupo: number
   produccionAnalisis: Array<any>
   usrAnalista: Usuario
   regAnalisisIni: number
   regAnalisisFin: number
   fechaAsignacion: string
}

export interface GrupoCamposAnalisis {
   idGrupo: number
   asigGrupoCamposAnalisis: AsigGrupoCamposAnalisis[]
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

export interface AsigGrupoCamposAnalisisDto extends AsigGrupoCamposAnalisis {
   grupo: Partial<GrupoCamposAnalisis>
}
