import { Dispatch } from 'redux'

import { api } from 'config'

import { SimUsuarioAction } from 'state/actions'

import { noty } from 'helpers'
import { localStorage } from 'constants/'
import { SimUsuario, Response } from 'interfaces'

const { AUTHORIZATION } = localStorage

export const findAllSimUsuario = () => async (dispatch: Dispatch<SimUsuarioAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[simUsuario] findAllSimUsuario loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<SimUsuario[]>>({
         method: 'GET',
         url: '/microservicio-rimsim/findAllSimUsuario',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[simUsuario] findAllSimUsuario success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[simUsuario] findAllSimUsuario error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[simUsuario] findAllSimUsuario error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
