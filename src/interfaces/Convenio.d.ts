import { DetConvenio } from 'interfaces'

export interface Convenio {

   idConvenio: number
   detConvenio: Array<DetConvenio>
   nombre: string
   completo: boolean
   activo: boolean
   fechaCreacion: string

}
