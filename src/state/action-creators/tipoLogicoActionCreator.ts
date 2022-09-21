import { Dispatch } from 'redux'

import { api } from 'config'
import { TipoLogicoAction } from 'state/actions'

import { Response } from 'interfaces'
import { localStorage } from 'constants/'
import { noty } from 'helpers'
import { TipoLogico } from 'interfaces/TipoLogico'

const { AUTHORIZATION } = localStorage

export const findAllTipoLogico = () => async (dispatch: Dispatch<TipoLogicoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Tipo-Lógico] findAllTipoLogico loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TipoLogico[]>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/findAllTipoLogico',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Tipo-Lógico] findAllTipoLogico success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Tipo-Lógico] findAllTipoLogico error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Tipo-Lógico] findAllTipoLogico error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveTipoLogico = (tipoLogico: Partial<TipoLogico>) => async (dispatch: Dispatch<TipoLogicoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Tipo-Lógico] saveTipoLogico loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TipoLogico[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/saveTipoLogico',
         data: { ...tipoLogico },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Tipo-Lógico] saveTipoLogico success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Tipo-Lógico] saveTipoLogico error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Tipo-Lógico] saveTipoLogico error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteTipoLogicoById = (idTipo: number) => async (dispatch: Dispatch<TipoLogicoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Tipo-Lógico] DeleteTipoLogicoById loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TipoLogico[]>>({
         method: 'DELETE',
         url: `/microservicio-rimextraccion/deleteTipoLogicoById/${idTipo}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Tipo-Lógico] DeleteTipoLogicoById success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Tipo-Lógico] DeleteTipoLogicoById error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Tipo-Lógico] DeleteTipoLogicoById error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
