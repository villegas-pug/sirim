import { ResponseHttpStatusType } from './httpStatusAction'
import { Event } from 'interfaces'

interface SaveEventoLoading {
   type: '[Evento] saveEvento loading'
}

interface SaveEventoSuccess {
   type: '[Evento] saveEvento success'
}

interface SaveEventoError {
   type: '[Evento] saveEvento error'
   payload: string | null
}

interface FindEventoByUsuarioLoading {
   type: '[Evento] findEventoByUsuario loading'
}

interface FindEventoByUsuarioSuccess {
   type: '[Evento] findEventoByUsuario success'
   payload: Event[]
}

interface FindEventoByUsuarioError {
   type: '[Evento] findEventoByUsuario error'
   payload: string | null
}

interface DeleteEventoByIdLoading {
   type: '[Evento] deleteEventoById loading'
}

interface DeleteEventoByIdSuccess {
   type: '[Evento] deleteEventoById success'
}

interface DeleteEventoByIdError {
   type: '[Evento] deleteEventoById error'
   payload: string | null
}

export type EventoAction =
   | ResponseHttpStatusType
   | SaveEventoLoading
   | SaveEventoSuccess
   | SaveEventoError
   | FindEventoByUsuarioLoading
   | FindEventoByUsuarioSuccess
   | FindEventoByUsuarioError
   | DeleteEventoByIdLoading
   | DeleteEventoByIdSuccess
   | DeleteEventoByIdError
