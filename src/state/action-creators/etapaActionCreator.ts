import { Dispatch } from 'redux'

import { api } from 'config'
import { EtapaAction } from 'state/actions'

import { Etapa, Response } from 'interfaces'

import { localStorage } from 'constants/'
import { noty } from 'helpers'

const { AUTHORIZATION } = localStorage

export const findAllEtapa = () => async (dispatch: Dispatch<EtapaAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Etapa] Find All loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<Etapa[]>>({
         method: 'GET',
         url: '/microservicio-operativo/findAllEtapa',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Etapa] Find All success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Etapa] Find All error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Etapa] Find All error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}
