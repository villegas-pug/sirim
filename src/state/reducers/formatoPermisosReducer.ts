import { FormatoPermisos } from 'interfaces'
import { FormatoPermisosAction } from 'state/actions'

type FormatoPermisosState = {
   loading: boolean
   data: Array<FormatoPermisos>
   error: string | null
}

const INITIAL_STATE: FormatoPermisosState = {
   loading: false,
   data: [],
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
      return { ...state, loading: true, error: null }
   case '[formatoPermisos] saveFormatoPermisos success':
   case '[formatoPermisos] downloadFormatoLicenciaById success':
   case '[formatoPermisos] deleteFormatoPermisosById success':
   case '[formatoPermisos] validateFormatoPermisos success':
      return { ...state, loading: false }
   case '[formatoPermisos] saveFormatoPermisos error':
   case '[formatoPermisos] findAllFormatoPermisos error':
   case '[formatoPermisos] findFormatoPermisosByUsrCreador error':
   case '[formatoPermisos] downloadFormatoLicenciaById error':
   case '[formatoPermisos] deleteFormatoPermisosById error':
   case '[formatoPermisos] validateFormatoPermisos error':
      return { ...state, loading: false, error: action.payload }
   case '[formatoPermisos] findAllFormatoPermisos success':
   case '[formatoPermisos] findFormatoPermisosByUsrCreador success':
      return { ...state, loading: false, data: action.payload }
   default:
      return state
   }
}
