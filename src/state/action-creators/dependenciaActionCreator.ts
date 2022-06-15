import { Dispatch } from 'redux'

import { api } from 'config'
import { Dependencia, Response } from 'interfaces'
import { localStorage } from 'constants/'
import { noty } from 'helpers'

import { DependenciaAction } from 'state/actions/dependenciaAction'

const { AUTHORIZATION } = localStorage

export const findAllDependencia = () => async (dispatch: Dispatch<DependenciaAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Dependencia] Find all dependencia loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Dependencia[]>>({
         method: 'GET',
         url: '/microservicio-generic/findAllDependencia',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Dependencia] Find all dependencia success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Dependencia] Find all dependencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Dependencia] Find all dependencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
