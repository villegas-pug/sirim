import { ControlCalidadAction } from 'state/actions'

type ControlCalidadReducerState = {
   loading: boolean
   data: [],
   error: string | null
}

const INITIAL_STATE: ControlCalidadReducerState = {
   loading: false,
   data: [],
   error: null
}

export const controlCalidadReducer = (state: ControlCalidadReducerState = INITIAL_STATE, action: ControlCalidadAction): ControlCalidadReducerState => {
   switch (action.type) {
   case '[Control-Calidad] Generate records to Control Calidad loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Control-Calidad] Generate records to Control Calidad success':
      return { ...state, loading: false, data: [], error: null }
   case '[Control-Calidad] Generate records to Control Calidad error':
      return { ...state, loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
