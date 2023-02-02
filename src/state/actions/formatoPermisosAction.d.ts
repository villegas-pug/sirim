import { ControlPermisosDto, FormatoPermisos } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

interface SaveFormatoPermisosLoading {
   type: '[formatoPermisos] saveFormatoPermisos loading'
}

interface SaveFormatoPermisosSuccess {
   type: '[formatoPermisos] saveFormatoPermisos success'
}

interface SaveFormatoPermisosError {
   type: '[formatoPermisos] saveFormatoPermisos error'
   payload: string | null
}

interface FindAllFormatoPermisosLoading {
   type: '[formatoPermisos] findAllFormatoPermisos loading'
}

interface FindAllFormatoPermisosSuccess {
   type: '[formatoPermisos] findAllFormatoPermisos success'
   payload: Array<FormatoPermisos>
}

interface FindAllFormatoPermisosError {
   type: '[formatoPermisos] findAllFormatoPermisos error'
   payload: string | null
}

interface FindFormatoPermisosByUsrCreadorLoading {
   type: '[formatoPermisos] findFormatoPermisosByUsrCreador loading'
}

interface FindFormatoPermisosByUsrCreadorSuccess {
   type: '[formatoPermisos] findFormatoPermisosByUsrCreador success'
   payload: Array<FormatoPermisos>
}

interface FindFormatoPermisosByUsrCreadorError {
   type: '[formatoPermisos] findFormatoPermisosByUsrCreador error'
   payload: string | null
}

interface DownloadFormatoLicenciaByIdLoading {
   type: '[formatoPermisos] downloadFormatoLicenciaById loading'
}

interface DownloadFormatoLicenciaByIdSuccess {
   type: '[formatoPermisos] downloadFormatoLicenciaById success'
}

interface DownloadFormatoLicenciaByIdError {
   type: '[formatoPermisos] downloadFormatoLicenciaById error'
   payload: string | null
}

interface DeleteFormatoPermisosByIdLoading {
   type: '[formatoPermisos] deleteFormatoPermisosById loading'
}

interface DeleteFormatoPermisosByIdSuccess {
   type: '[formatoPermisos] deleteFormatoPermisosById success'
}

interface DeleteFormatoPermisosByIdError {
   type: '[formatoPermisos] deleteFormatoPermisosById error'
   payload: string | null
}

interface ValidateFormatoPermisosLoading {
   type: '[formatoPermisos] validateFormatoPermisos loading'
}

interface ValidateFormatoPermisosSuccess {
   type: '[formatoPermisos] validateFormatoPermisos success'
}

interface ValidateFormatoPermisosError {
   type: '[formatoPermisos] validateFormatoPermisos error'
   payload: string | null
}

interface UploadControlAsistenciaLoading {
   type: '[formatoPermisos] uploadControlAsistencia loading'
}

interface UploadControlAsistenciaSuccess {
   type: '[formatoPermisos] uploadControlAsistencia success'
   payload: number
}

interface UploadControlAsistenciaError {
   type: '[formatoPermisos] uploadControlAsistencia error'
   payload: string | null
}

interface DeleteAllControlAsistenciaLoading {
   type: '[formatoPermisos] deleteAllControlAsistencia loading'
}

interface DeleteAllControlAsistenciaSuccess {
   type: '[formatoPermisos] deleteAllControlAsistencia success'
   payload: number
}

interface DeleteAllControlAsistenciaError {
   type: '[formatoPermisos] deleteAllControlAsistencia error'
   payload: string | null
}

interface CountControlAsistenciasLoading {
   type: '[formatoPermisos] countControlAsistencias loading'
}

interface CountControlAsistenciasSuccess {
   type: '[formatoPermisos] countControlAsistencias success'
   payload: number
}

interface CountControlAsistenciasError {
   type: '[formatoPermisos] countControlAsistencias error'
   payload: string | null
}

interface FindControlPermisosByServidorLoading {
   type: '[formatoPermisos] findControlPermisosByServidor loading'
}

interface FindControlPermisosByServidorSuccess {
   type: '[formatoPermisos] findControlPermisosByServidor success'
   payload: Array<ControlPermisosDto>
}

interface FindControlPermisosByServidorError {
   type: '[formatoPermisos] findControlPermisosByServidor error'
   payload: string | null
}

interface UploadAttachmentLoading {
   type: '[formatoPermisos] uploadAttachment loading'
}

interface UploadAttachmentSuccess {
   type: '[formatoPermisos] uploadAttachment success'
}

interface UploadAttachmentError {
   type: '[formatoPermisos] uploadAttachment error'
   payload: string | null
}

interface DownlodAttachmentLoading {
   type: '[formatoPermisos] downlodAttachment loading'
}

interface DownlodAttachmentSuccess {
   type: '[formatoPermisos] downlodAttachment success'
}

interface DownlodAttachmentError {
   type: '[formatoPermisos] downlodAttachment error'
   payload: string | null
}

interface SaveObservacionesFormatoPermisosLoading {
   type: '[formatoPermisos] saveObservacionesFormatoPermisos loading'
}

interface SaveObservacionesFormatoPermisosSuccess {
   type: '[formatoPermisos] saveObservacionesFormatoPermisos success'
}

interface SaveObservacionesFormatoPermisosError {
   type: '[formatoPermisos] saveObservacionesFormatoPermisos error'
   payload: string | null
}

export type FormatoPermisosAction =
   | ResponseHttpStatusType
   | SaveFormatoPermisosLoading
   | SaveFormatoPermisosSuccess
   | SaveFormatoPermisosError
   | FindAllFormatoPermisosLoading
   | FindAllFormatoPermisosSuccess
   | FindAllFormatoPermisosError
   | FindFormatoPermisosByUsrCreadorLoading
   | FindFormatoPermisosByUsrCreadorSuccess
   | FindFormatoPermisosByUsrCreadorError
   | DownloadFormatoLicenciaByIdLoading
   | DownloadFormatoLicenciaByIdSuccess
   | DownloadFormatoLicenciaByIdError
   | DeleteFormatoPermisosByIdLoading
   | DeleteFormatoPermisosByIdSuccess
   | DeleteFormatoPermisosByIdError
   | ValidateFormatoPermisosLoading
   | ValidateFormatoPermisosSuccess
   | ValidateFormatoPermisosError
   | UploadControlAsistenciaLoading
   | UploadControlAsistenciaSuccess
   | UploadControlAsistenciaError
   | DeleteAllControlAsistenciaLoading
   | DeleteAllControlAsistenciaSuccess
   | DeleteAllControlAsistenciaError
   | CountControlAsistenciasLoading
   | CountControlAsistenciasSuccess
   | CountControlAsistenciasError
   | FindControlPermisosByServidorLoading
   | FindControlPermisosByServidorSuccess
   | FindControlPermisosByServidorError
   | UploadAttachmentLoading
   | UploadAttachmentSuccess
   | UploadAttachmentError
   | DownlodAttachmentLoading
   | DownlodAttachmentSuccess
   | DownlodAttachmentError
   | SaveObservacionesFormatoPermisosLoading
   | SaveObservacionesFormatoPermisosSuccess
   | SaveObservacionesFormatoPermisosError
