import { ControlPermisosDto, FormatoPermisos } from 'interfaces'
import { FormatoPermisosAction } from 'state/actions'

type FormatoPermisosState = {
   loading: boolean
   data: Array<FormatoPermisos>
   totalRecordsCtrlAsistenciaDb: number
   controlPermisosDb: Array<ControlPermisosDto>
   error: string | null
}

const INITIAL_STATE: FormatoPermisosState = {
   loading: false,
   data: [],
   controlPermisosDb: [],
   totalRecordsCtrlAsistenciaDb: 0,
   error: null
}

export const formatoPermisosReducer = (state: FormatoPermisosState = INITIAL_STATE, action: FormatoPermisosAction): FormatoPermisosState => {
   switch (action.type) {
   case '[formatoPermisos] saveFormatoPermisos loading':
   case '[formatoPermisos] findAllFormatoPermisos loading':
   case '[formatoPermisos] findFormatoPermisosByUsrCreador loading':
   case '[formatoPermisos] downloadFormatoLicenciaById loading':
   case '[formatoPermisos] deleteFormatoPermisosById loading':
   case '[formatoPermisos] validateFormatoPermisos loading':
   case '[formatoPermisos] uploadControlAsistencia loading':
   case '[formatoPermisos] deleteAllControlAsistencia loading':
   case '[formatoPermisos] countControlAsistencias loading':
   case '[formatoPermisos] uploadAttachment loading':
   case '[formatoPermisos] downlodAttachment loading':
   case '[formatoPermisos] saveObservacionesFormatoPermisos loading':
      return { ...state, loading: true, error: null }
   case '[formatoPermisos] saveFormatoPermisos success':
   case '[formatoPermisos] downloadFormatoLicenciaById success':
   case '[formatoPermisos] deleteFormatoPermisosById success':
   case '[formatoPermisos] validateFormatoPermisos success':
   case '[formatoPermisos] uploadAttachment success':
   case '[formatoPermisos] downlodAttachment success':
   case '[formatoPermisos] saveObservacionesFormatoPermisos success':
      return { ...state, loading: false }
   case '[formatoPermisos] saveFormatoPermisos error':
   case '[formatoPermisos] findAllFormatoPermisos error':
   case '[formatoPermisos] findFormatoPermisosByUsrCreador error':
   case '[formatoPermisos] downloadFormatoLicenciaById error':
   case '[formatoPermisos] deleteFormatoPermisosById error':
   case '[formatoPermisos] validateFormatoPermisos error':
   case '[formatoPermisos] uploadControlAsistencia error':
   case '[formatoPermisos] deleteAllControlAsistencia error':
   case '[formatoPermisos] countControlAsistencias error':
   case '[formatoPermisos] uploadAttachment error':
   case '[formatoPermisos] downlodAttachment error':
   case '[formatoPermisos] saveObservacionesFormatoPermisos error':
      return { ...state, loading: false, error: action.payload }
   case '[formatoPermisos] findAllFormatoPermisos success':
   case '[formatoPermisos] findFormatoPermisosByUsrCreador success':
      return { ...state, loading: false, data: action.payload }
   case '[formatoPermisos] uploadControlAsistencia success':
   case '[formatoPermisos] deleteAllControlAsistencia success':
   case '[formatoPermisos] countControlAsistencias success':
      return { ...state, loading: false, totalRecordsCtrlAsistenciaDb: action.payload, error: null }
   case '[formatoPermisos] findControlPermisosByServidor success':
      return { ...state, loading: false, controlPermisosDb: action.payload, error: null }
   default:
      return state
   }
}
