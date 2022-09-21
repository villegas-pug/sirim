import { EventoAction } from 'state/actions'

import { Event } from 'interfaces'

type EventoState = {
   loading: boolean
   data: Event[]
   error: string | null
}

const INITIAL_STATE: EventoState = {
   loading: false,
   data: [],
   error: null
}

export const eventoReducer = (state: EventoState = INITIAL_STATE, action: EventoAction): EventoState => {
   switch (action.type) {
   case '[Evento] saveEvento loading':
   case '[Evento] deleteEventoById loading':
      return { ...state, loading: true, error: null }
   case '[Evento] saveEvento success':
   case '[Evento] deleteEventoById success':
      return { ...state, loading: false, error: null }
   case '[Evento] saveEvento error':
   case '[Evento] deleteEventoById error':
      return { ...state, loading: false, error: action.payload }
   case '[Evento] findEventoByUsuario loading':
      return { loading: true, data: [], error: null }
   case '[Evento] findEventoByUsuario success':
      return { loading: false, data: action.payload, error: null }
   case '[Evento] findEventoByUsuario error':
      return { loading: false, data: [], error: action.payload }
   default:
      return state
   }
}
