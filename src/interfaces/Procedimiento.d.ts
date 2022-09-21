import { IconAppTypes } from 'constants/'

type TipoModulo = 'MODULO' | 'SUB_MODULO' | 'ITEM' | 'SUB_ITEM'

export interface Procedimiento {
   idProcedimiento: number
   tipo: TipoModulo
   nombre: string
   informacion: null | string
   descripcion: null | string
   icono: IconAppTypes
   activo: boolean
   rutaMod: string
   rutaSubmod: string
   refItem: string | null
   disposicion: null | string
   rutaPrincipal: string
   secuencia: number
}
