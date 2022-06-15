import { Pais } from 'interfaces'
import { PaisAction } from 'state/actions'

type PaisState = {
   loading: boolean,
   data: Array<Pais>,
   error: string | null
}

const initialState: PaisState = {
   loading: false,
   data: [],
   error: null
}

export const paisReducer = (state: PaisState = initialState, action: PaisAction): PaisState => {
   switch (action.type) {
   case '[Pais] Find all pais loading':
      return { loading: true, data: [], error: null }
   case '[Pais] Find all pais success':
      return { loading: false, data: action.payload, error: null }
   case '[Pais] Find all pais error':
      return { loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
