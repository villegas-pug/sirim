import { FormatoPermisos } from 'interfaces'
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
