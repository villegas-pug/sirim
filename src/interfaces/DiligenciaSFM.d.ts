import { EvaluarSolicitudSFM } from 'interfaces'

export interface ArchivoSFM {
   idArchivoDiligencia: number
   nombre: string
   tipoArchivo: string
   fechaRegistro: string
   activo: boolean
}

export interface DiligenciaSFM {
   idDiligencia: number
   evaluarSolicitud: EvaluarSolicitudSFM
   archivos: Array<ArchivoSFM>
   tipoDocumento: String
   numeroDocumento: String
   fechaDocumento: string
   solicitudExterna: number | string
   fechaSolicitud: String
   dependenciaDestino: String
   fechaRespuesta: String
   respuesta: boolean
   fechaHoraRegistro: Date
}
