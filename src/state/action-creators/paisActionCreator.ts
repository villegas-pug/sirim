
import { Dispatch } from 'redux'

import { PaisAction } from 'state/actions'

import { api } from 'config'
import { noty } from 'helpers'

import { Pais, Response } from 'interfaces'
import { localStorage } from 'constants/'

const { AUTHORIZATION } = localStorage

export const findAllPais = () => async (dispatch: Dispatch<PaisAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Pais] Find all pais loading' })
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api.request<Response<Pais[]>>({
         method: 'GET',
         url: '/microservicio-generic/findAllPais',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Pais] Find all pais success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Pais] Find all pais error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Pais] Find all pais error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}
