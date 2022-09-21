import { Etapa } from 'interfaces'

import { EtapaAction } from 'state/actions'

type EtapaStateType = {
   loading: boolean
   data: Array<Etapa>
   error: string | null
}

const initialState: EtapaStateType = {
   loading: false,
   data: [],
   error: null
}

export const etapaReducer = (state: EtapaStateType = initialState, action: EtapaAction): EtapaStateType => {
   switch (action.type) {
   case '[Etapa] Find All loading':
      return { loading: true, data: [], error: null }
   case '[Etapa] Find All success':
      return { loading: false, data: action.payload, error: null }
   case '[Etapa] Find All error':
      return { loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
