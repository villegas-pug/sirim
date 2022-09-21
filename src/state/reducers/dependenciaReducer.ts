import { Dependencia } from 'interfaces'
import { DependenciaAction } from 'state/actions/dependenciaAction'

type DependenciaState = {
   loading: boolean
   data: Array<Dependencia>
   error: string | null
}

const INITIAL_STATE: DependenciaState = {
   loading: false,
   data: [],
   error: null
}

export const dependenciaReducer = (state: DependenciaState = INITIAL_STATE, action: DependenciaAction): DependenciaState => {
   switch (action.type) {
   case '[Dependencia] Find all dependencia loading':
      return { loading: true, data: [], error: null }
   case '[Dependencia] Find all dependencia success':
      return { loading: false, data: action.payload, error: null }
   case '[Dependencia] Find all dependencia error':
      return { loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
