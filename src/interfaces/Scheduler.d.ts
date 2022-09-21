import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types'
import { Usuario } from './Usuario'

export interface Event extends ProcessedEvent {
   start: string
   end: string
   usuario?: Usuario
}
