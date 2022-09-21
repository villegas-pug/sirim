import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types'
import { format } from 'date-fns'
import { Event } from 'interfaces'
import { useMemo } from 'react'
import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useEvento = () => {
   // ► HOOK'S - STORE ...
   const {
      loading: loadingEventosDb,
      data: eventosDbUserAuth
   } = useAppSelector(store => store.evento)

   const {
      saveEvento,
      findEventoByUsuario,
      deleteEventoById
   } = useAppActions()

   // ► DEP'S ...
   const processedEventsUserAuth = useMemo<ProcessedEvent[]>(() => eventosDbUserAuth.map((evento) => {
      return { ...evento, start: new Date(evento.start), end: new Date(evento.end) }
   }), [eventosDbUserAuth])

   return {
      loadingEventosDb,
      eventosDbUserAuth,
      processedEventsUserAuth,

      saveEvento,
      findEventoByUsuario,
      deleteEventoById,

      assignProcessEventToEvent
   }
}

const assignProcessEventToEvent = (processEvent: ProcessedEvent): Event => {
   return {
      ...processEvent,
      start: format(processEvent.start, 'yyyy-MM-dd HH:mm'),
      end: format(processEvent.end, 'yyyy-MM-dd HH:mm')
   }
}
