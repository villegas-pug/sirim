import { EvaluarSolicitudSFM, SolicitudSFM, TipoTramite } from 'interfaces'

type SolicitudInputs = {
   numeroExpediente: string
   procedimiento: string
   administrado: string
   paisNacionalidad: string
   domicilio: string
   distrito: string
}

export type MetadataExpediente = {
   fileName: string
   fechaRegistro: Date
   contar: number
}

export type FiscalizacionPosteriorStateType = {
   loading: boolean,
   data: Array<any>,
   error: string | null,
   metadataFilesSolicitud: Array<any>,
   tipoTramite: {
      loading: boolean,
      data: Array<TipoTramite>,
      error: string | null,
   },
   solicitudValues: Partial<SolicitudInputs>,
   bandejaEntrada: {
      loading: boolean,
      data: Array<SolicitudSFM>,
      error: string | null
   },
   bandejaEvaluacion: {
      loading: boolean,
      data: Array<EvaluarSolicitudSFM>,
      error: string | null,
      downloadProgress: {
         loading: boolean
         error: string | null
      }
   }
}
