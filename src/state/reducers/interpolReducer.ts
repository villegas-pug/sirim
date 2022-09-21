import { InterpolAction } from 'state/actions'

import { Interpol } from 'interfaces'

type InterpolState = {
   loading: boolean
   data: Array<Interpol>
   error: string | null
}

const INITIAL_STATE: InterpolState = {
   loading: false,
   data: [],
   error: null
}

export const interpolReducer = (state: InterpolState = INITIAL_STATE, action: InterpolAction): InterpolState => {
   switch (action.type) {
   case '[Interpol] Find interpol by aprox loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Interpol] Find interpol by aprox success':
      return { ...state, loading: false, data: action.payload, error: null }
   case '[Interpol] Find interpol by aprox error':
      return { ...state, loading: false, data: [], error: action.payload }
   case '[Interpol] Save all interpol loading':
   case '[Interpol] Save interpol loading':
   case '[Interpol] Find screenshot interpol loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Interpol] Save all interpol success':
   case '[Interpol] Save interpol success':
   case '[Interpol] Find screenshot interpol success':
      return { ...state, loading: false, data: [], error: null }
   case '[Interpol] Save all interpol error':
   case '[Interpol] Save interpol error':
   case '[Interpol] Find screenshot interpol error':
      return { ...state, loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
