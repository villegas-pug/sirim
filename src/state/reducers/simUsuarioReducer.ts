import { SimUsuario } from 'interfaces'
import { SimUsuarioAction } from 'state/actions'

type SimUsuarioState = {
   loading: boolean
   data: Array<SimUsuario>
   error: string | null
}

const INITIAL_STATE: SimUsuarioState = {
   loading: false,
   data: [],
   error: null
}

export const simUsuarioReducer = (state: SimUsuarioState = INITIAL_STATE, action: SimUsuarioAction): SimUsuarioState => {
   switch (action.type) {
   case '[simUsuario] findAllSimUsuario loading':
      return { ...state, loading: true, error: null }
   case '[simUsuario] findAllSimUsuario success':
      return { ...state, loading: false, data: action.payload }
   case '[simUsuario] findAllSimUsuario error':
      return { ...state, loading: false, error: action.payload }
   default:
      return state
   }
}
