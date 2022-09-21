import { TipoLogico } from 'interfaces/TipoLogico'
import { TipoLogicoAction } from 'state/actions'

type TipoLogicoState = {
   loading: boolean
   data: TipoLogico[]
   error: string | null
}

const INITIAL_STATE: TipoLogicoState = {
   loading: false,
   data: [],
   error: null
}

export const tipoLogicoReducer = (state: TipoLogicoState = INITIAL_STATE, action: TipoLogicoAction): TipoLogicoState => {
   switch (action.type) {
   case '[Tipo-Lógico] findAllTipoLogico loading':
   case '[Tipo-Lógico] saveTipoLogico loading':
   case '[Tipo-Lógico] DeleteTipoLogicoById loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Tipo-Lógico] findAllTipoLogico success':
   case '[Tipo-Lógico] saveTipoLogico success':
   case '[Tipo-Lógico] DeleteTipoLogicoById success':
      return { ...state, loading: false, data: action.payload, error: null }
   case '[Tipo-Lógico] findAllTipoLogico error':
   case '[Tipo-Lógico] saveTipoLogico error':
   case '[Tipo-Lógico] DeleteTipoLogicoById error':
      return { ...state, loading: false, error: action.payload }
   default:
      return state
   }
}
