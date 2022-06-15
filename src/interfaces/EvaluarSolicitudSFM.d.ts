import { SolicitudSFM, Usuario, DiligenciaSFM } from 'interfaces'

export interface EvaluarSolicitudSFM {
   idVerifExp: number
   bandejaDoc: SolicitudSFM
   diligencia: Array<Partial<DiligenciaSFM>> | Partial<DiligenciaSFM>
   fechaRegistro: Date
   fechaDerivacion: Date
   operadorDesig: Usuario
   fechaTermino: Date
   leido: boolean
   activo: boolean
   completado: boolean
   hallazgo: String | null
   recomendacion: String | null
}
