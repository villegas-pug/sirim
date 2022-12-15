import { Convenio } from 'interfaces'

export interface DetConvenio {

   idDetConvenio: number
   convenio: Partial<Convenio>
   descripcion: string
   activo: boolean
   fechaDocumento: string
   nombreAnexo: string
   anexo: string
   fechaRegistro: string

}
