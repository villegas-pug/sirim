import { Dependencia } from './Dependencia'
import { Pais } from './Pais'

export interface RequestParamsDnv {
   pais: Pais
   dependencia: Dependencia
   tipoMov: string
   fecIni: string
   fecFin: string
}

export type TipoMovMigra = {
   '%': '-Todos-',
   'E': 'Entrada',
   'S': 'Salida'
}
