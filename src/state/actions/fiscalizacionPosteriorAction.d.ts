import { ResponseHttpStatusType } from 'state/actions'

import { EvaluarSolicitudSFM, ExpedienteSFM, SolicitudSFM, TipoTramite } from 'interfaces'
import { MetadataExpediente } from 'types'

interface FindAllMetaOfExpeSolicitudFileLoading {
   type: '[Fiscalización-Posterior] Find-All metadata solicitudes loading'
}

interface FindAllMetaOfExpeSolicitudFileSuccess {
   type: '[Fiscalización-Posterior] Find-All metadata solicitudes success'
   payload : Array<MetadataExpediente>
}

interface FindAllMetaOfExpeSolicitudFileError {
   type: '[Fiscalización-Posterior] Find-All metadata solicitudes error'
   payload : string | null
}

interface SaveAllSolicitudFileLoading {
   type: '[Fiscalización-Posterior] Save-All file expedientes loading'
}

interface SaveAllSolicitudFileSuccess {
   type: '[Fiscalización-Posterior] Save-All file expedientes success'
   payload: Array<MetadataExpediente>
}

interface SaveAllSolicitudFileError {
   type: '[Fiscalización-Posterior] Save-All file expedientes error'
   payload: string | null
}

interface FindAllTipoTramiteLoading {
   type: '[Tipo-Trámite] Find-All tipo trámites loading'
}

interface FindAllTipoTramiteSuccess {
   type: '[Tipo-Trámite] Find-All tipo trámites success'
   payload: Array<TipoTramite>
}

interface FindAllTipoTramiteError {
   type: '[Tipo-Trámite] Find-All tipo trámites error'
   payload: string | null
}

interface FindByNumeroExpeLoading {
   type: '[Fiscalización-Posterior] Find por número expediente loading'
}

interface FindByNumeroExpeSuccess {
   type: '[Fiscalización-Posterior] Find por número expediente success'
   payload: ExpedienteSFM
}

interface FindByNumeroExpeError {
   type: '[Fiscalización-Posterior] Find por número expediente error'
   payload: string | null
}

interface ResetSolicitudValues {
   type: '[Fiscalización-Posterior] Reset solicitud values'
}

interface SaveSolicitudLoading {
   type: '[Fiscalización-Posterior] Recepcionar expediente loading'
}

interface SaveSolicitudSuccess {
   type: '[Fiscalización-Posterior] Recepcionar expediente success'
   payload: Array<SolicitudSFM>
}

interface SaveSolicitudError {
   type: '[Fiscalización-Posterior] Recepcionar expediente error'
   payload: string | null
}

interface FindAllBandejaEntradaLoading {
   type: '[Fiscalización-Posterior] Find all solicitudes loading'
}

interface FindAllBandejaEntradaSuccess {
   type: '[Fiscalización-Posterior] Find all solicitudes success'
   payload: Array<SolicitudSFM>
}

interface FindAllBandejaEntradaError {
   type: '[Fiscalización-Posterior] Find all solicitudes error'
   payload: string | null
}

interface AssignEvaluadorLoading {
   type: '[Fiscalización-Posterior] Asignar evaluador loading'
}

interface AssignEvaluadorSuccess {
   type: '[Fiscalización-Posterior] Asignar evaluador success'
   payload: Array<SolicitudSFM>
}

interface AssignEvaluadorError {
   type: '[Fiscalización-Posterior] Asignar evaluador error'
   payload: string | null
}

interface ReadAssignmentLoading {
   type: '[Fiscalización-Posterior] Leer asignación loading'
}

interface ReadAssignmentSuccess {
   type: '[Fiscalización-Posterior] Leer asignación success'
   payload: Array<EvaluarSolicitudSFM>
}

interface ReadAssignmentError {
   type: '[Fiscalización-Posterior] Leer asignación error'
   payload: string | null
}

interface DeleteSolicitudLoading {
   type: '[Fiscalización-Posterior] Eliminar solicitud loading'
}

interface DeleteSolicitudSuccess {
   type: '[Fiscalización-Posterior] Eliminar solicitud success'
   payload: Array<SolicitudSFM>
}

interface DeleteSolicitudError {
   type: '[Fiscalización-Posterior] Eliminar solicitud error'
   payload: string | null
}

interface FindAllBandejaEvaluacionLoading {
   type: '[Fiscalización-Posterior] Find all bandeja evaluación loading'
}

interface FindAllBandejaEvaluacionSuccess {
   type: '[Fiscalización-Posterior] Find all bandeja evaluación success'
   payload: Array<EvaluarSolicitudSFM>
}

interface FindAllBandejaEvaluacionError {
   type: '[Fiscalización-Posterior] Find all bandeja evaluación error'
   payload: string | null
}

interface SaveDiligenciaLoading {
   type: '[Fiscalización-Posterior] Save diligencia loading'
}

interface SaveDiligenciaSuccess {
   type: '[Fiscalización-Posterior] Save diligencia success'
   payload: Array<EvaluarSolicitudSFM>
}

interface SaveDiligenciaError {
   type: '[Fiscalización-Posterior] Save diligencia error'
   payload: string | null
}

interface DeleteDiligenciaByIdLoading {
   type: '[Fiscalización-Posterior] Delete diligencia loading'
}

interface DeleteDiligenciaByIdSuccess {
   type: '[Fiscalización-Posterior] Delete diligencia success'
   payload: Array<EvaluarSolicitudSFM>
}

interface DeleteDiligenciaByIdError {
   type: '[Fiscalización-Posterior] Delete diligencia error'
   payload: string | null
}

interface SaveArchivoDiligenciaLoading {
   type: '[Fiscalización-Posterior] Save file diligencia loading'
}

interface SaveArchivoDiligenciaSuccess {
   type: '[Fiscalización-Posterior] Save file diligencia success',
   payload: Array<EvaluarSolicitudSFM>
}

interface SaveArchivoDiligenciaError {
   type: '[Fiscalización-Posterior] Save file diligencia error',
   payload: string | null
}

interface DownloadArchivoDiligenciaLoading {
   type: '[Fiscalización-Posterior] Download file diligencia loading'
}

interface DownloadArchivoDiligenciaSuccess {
   type: '[Fiscalización-Posterior] Download file diligencia success'
}

interface DownloadArchivoDiligenciaError {
   type: '[Fiscalización-Posterior] Download file diligencia error'
   payload: string | null
}

interface DeleteArchivoDiligenciaLoading {
   type: '[Fiscalización-Posterior] Delete file diligencia loading'
}

interface DeleteArchivoDiligenciaSuccess {
   type: '[Fiscalización-Posterior] Delete file diligencia success'
   payload: Array<EvaluarSolicitudSFM>
}

interface DeleteArchivoDiligenciaError {
   type: '[Fiscalización-Posterior] Delete file diligencia error'
   payload: string | null
}

interface UpdateEtapaSolicitudLoading {
   type: '[Fiscalización-Posterior] Update etapa solicitud loading'
}

interface UpdateEtapaSolicitudSuccess {
   type: '[Fiscalización-Posterior] Update etapa solicitud success'
   payload: Array<EvaluarSolicitudSFM>
}

interface UpdateEtapaSolicitudError {
   type: '[Fiscalización-Posterior] Update etapa solicitud error'
   payload: string | null
}

interface UpdateOpinionSolicitudLoading {
   type: '[Fiscalización-Posterior] Save opinión loading'
}

interface UpdateOpinionSolicitudSuccess {
   type: '[Fiscalización-Posterior] Save opinión success'
   payload: Array<EvaluarSolicitudSFM>
}

interface UpdateOpinionSolicitudError {
   type: '[Fiscalización-Posterior] Save opinión error'
   payload: string | null
}

export type FiscalizacionPosteriorAction =
   | ResponseHttpStatusType
   | FindAllMetaOfExpeSolicitudFileLoading
   | FindAllMetaOfExpeSolicitudFileSuccess
   | FindAllMetaOfExpeSolicitudFileError
   | SaveAllSolicitudFileLoading
   | SaveAllSolicitudFileSuccess
   | SaveAllSolicitudFileError
   | FindAllTipoTramiteLoading
   | FindAllTipoTramiteSuccess
   | FindAllTipoTramiteError
   | FindByNumeroExpeLoading
   | FindByNumeroExpeSuccess
   | FindByNumeroExpeError
   | ResetSolicitudValues
   | SaveSolicitudLoading
   | SaveSolicitudSuccess
   | SaveSolicitudError
   | FindAllBandejaEntradaLoading
   | FindAllBandejaEntradaSuccess
   | FindAllBandejaEntradaError
   | AssignEvaluadorLoading
   | AssignEvaluadorSuccess
   | AssignEvaluadorError
   | ReadAssignmentLoading
   | ReadAssignmentSuccess
   | ReadAssignmentError
   | DeleteSolicitudLoading
   | DeleteSolicitudSuccess
   | DeleteSolicitudError
   | FindAllBandejaEvaluacionLoading
   | FindAllBandejaEvaluacionSuccess
   | FindAllBandejaEvaluacionError
   | SaveDiligenciaLoading
   | SaveDiligenciaSuccess
   | SaveDiligenciaError
   | DeleteDiligenciaByIdLoading
   | DeleteDiligenciaByIdSuccess
   | DeleteDiligenciaByIdError
   | SaveArchivoDiligenciaLoading
   | SaveArchivoDiligenciaSuccess
   | SaveArchivoDiligenciaError
   | DownloadArchivoDiligenciaLoading
   | DownloadArchivoDiligenciaSuccess
   | DownloadArchivoDiligenciaError
   | DeleteArchivoDiligenciaLoading
   | DeleteArchivoDiligenciaSuccess
   | DeleteArchivoDiligenciaError
   | UpdateEtapaSolicitudLoading
   | UpdateEtapaSolicitudSuccess
   | UpdateEtapaSolicitudError
   | UpdateOpinionSolicitudLoading
   | UpdateOpinionSolicitudSuccess
   | UpdateOpinionSolicitudError
