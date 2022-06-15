import { Distrito } from 'interfaces'
import { DistritoAction } from 'state/actions'

type DistritoState = {
   loading: boolean,
   data: Array<Distrito>,
   error: string | null
}

const initialState: DistritoState = {
   loading: false,
   data: [],
   error: null
}

export const distritoReducer = (state = initialState, action: DistritoAction): DistritoState => {
   switch (action.type) {
   case '[Distrito] Find all distrito loading':
      return { loading: true, data: [], error: null }
   case '[Distrito] Find all distrito success':
      return { loading: false, data: action.payload, error: null }
   case '[Distrito] Find all distrito error':
      return { loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
