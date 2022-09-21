import { Dispatch } from 'redux'

import { EventoAction } from 'state/actions'

import { api } from 'config'
import { noty } from 'helpers'
import { localStorage } from 'constants/'

import { Event, Response } from 'interfaces'

const { AUTHORIZATION } = localStorage

export const saveEvento = (evento: Partial<Event>) => async (dispatch: Dispatch<EventoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Evento] saveEvento loading' })
   try {
      const { usuario: { token, userCredentials: usuario } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/saveEvento',
         data: { ...evento, usuario },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Evento] saveEvento success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Evento] saveEvento error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Evento] saveEvento error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findEventoByUsuario = () => async (dispatch: Dispatch<EventoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Evento] findEventoByUsuario loading' })
   try {
      const { usuario: { token, userCredentials: { idUsuario } } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Event[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/findEventoByUsuario',
         data: { idUsuario },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Evento] findEventoByUsuario success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Evento] findEventoByUsuario error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Evento] findEventoByUsuario error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteEventoById = (idEvento: number) => async (dispatch: Dispatch<EventoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Evento] deleteEventoById loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'DELETE',
         url: `/microservicio-rimextraccion/deleteEventoById/${idEvento}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Evento] deleteEventoById success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Evento] deleteEventoById error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Evento] deleteEventoById error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
