import { Dispatch } from 'redux'

import { api } from 'config'

import { ControlCalidadAction } from 'state/actions'

import { noty } from 'helpers'
import { localStorage } from 'constants/'
import { Response } from 'interfaces'

const { AUTHORIZATION } = localStorage

export const saveCtrlCalCamposAnalisis = (idAsigGrupo: number) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] Generate records to Control Calidad loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/saveCtrlCalCamposAnalisis',
         params: { idAsigGrupo },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] Generate records to Control Calidad success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] Generate records to Control Calidad error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] Generate records to Control Calidad error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
