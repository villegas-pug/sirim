
import { Dispatch } from 'redux'

import { DistritoAction } from 'state/actions'

import { api } from 'config'
import { noty } from 'helpers'

import { Distrito, Response } from 'interfaces'
import { levelLog, localStorage } from 'constants/'

const { SUCCESS, WARNING, ERROR } = levelLog
const { AUTHORIZATION } = localStorage

export const findAllDistrito = () => async (dispatch: Dispatch<DistritoAction>, getStore: () => any): Promise<void> => {
   try {
      dispatch({ type: '[Distrito] Find all distrito loading' })
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api.request<Response<Distrito[]>>({
         method: 'GET',
         url: '/microservicio-dependencia/findAll',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Distrito] Find all distrito success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Distrito] Find all distrito error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Distrito] Find all distrito error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}
