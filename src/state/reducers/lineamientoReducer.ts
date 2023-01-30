import { Convenio } from 'interfaces'
import { LineamientoAction } from 'state/actions'

type LineamientoState = {
   loading: boolean
   convenios: Array<Convenio>
   error: string | null
}

const INITIAL_STATE: LineamientoState = {
   loading: false,
   convenios: [],
   error: null
}

export const lineamientoReducer = (state: LineamientoState = INITIAL_STATE, action: LineamientoAction): LineamientoState => {
   switch (action.type) {
   case '[Lineamiento] findAllConvenio loading':
      return { ...state, loading: true, error: null }
   case '[Lineamiento] findAllConvenio success':
      return { ...state, loading: false, convenios: action.payload, error: null }
   case '[Lineamiento] findAllConvenio error':
      return { ...state, loading: false, convenios: [], error: action.payload }
   case '[Lineamiento] saveConvenio loading':
   case '[Lineamiento] deleteConvenioById loading':
   case '[Lineamiento] saveDetConvenio loading':
   case '[Lineamiento] saveDetConvenioAnexo loading':
   case '[Lineamiento] downloadDetConvenioAnexo loading':
   case '[Lineamiento] deleteDetConvenio loading':
      return { ...state, loading: true, error: null }
   case '[Lineamiento] saveConvenio success':
   case '[Lineamiento] deleteConvenioById success':
   case '[Lineamiento] saveDetConvenio success':
   case '[Lineamiento] saveDetConvenioAnexo success':
   case '[Lineamiento] downloadDetConvenioAnexo success':
   case '[Lineamiento] deleteDetConvenio success':
      return { ...state, loading: false, error: null }
   case '[Lineamiento] saveConvenio error':
   case '[Lineamiento] deleteConvenioById error':
   case '[Lineamiento] saveDetConvenio error':
   case '[Lineamiento] saveDetConvenioAnexo error':
   case '[Lineamiento] downloadDetConvenioAnexo error':
   case '[Lineamiento] deleteDetConvenio error':
      return { ...state, loading: false, error: action.payload }
   default:
      return state
   }
}
