import { EvaluarSolicitudSFM, Etapa } from 'interfaces'

export interface SolicitudSFM {
   idBandejaDoc: number
   evaluarSolicitud: EvaluarSolicitudSFM
   tipoDocumento: string
   numeroDocumento: string
   fechaIngresoSFM: string
   numeroExpediente: string
   fechaInicioTramite: string
   procedimiento: string
   subtipoProcedimiento: string
   administrado: string
   tipoDocumentoIdentidad: string
   numeroDocIdentidad: string
   nacionalidad: string
   domicilio: string
   distrito: string
   estado: String | null
   fechaHoraRegistro: string
   etapa: Etapa
}
