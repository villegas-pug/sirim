import { Dispatch } from 'redux'

import { AsignarExtraccionAction } from 'state/actions'
import { api } from 'config'

import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, Response, TablaDinamicaDto } from 'interfaces'
import { localStorage } from 'constants/'
import { noty } from 'helpers'

const { AUTHORIZATION } = localStorage

export const assignedToGrupoAnalisis = (asigGrupoDto: Partial<AsigGrupoCamposAnalisisDto>) => async (dispatch: Dispatch<AsignarExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Asignar-Extracción] Asignar usuario a grupo de analisis loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/assignedToGrupoAnalisis',
         data: { ...asigGrupoDto },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Asignar-Extracción] Asignar usuario a grupo de analisis success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Asignar-Extracción] Asignar usuario a grupo de analisis error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Asignar-Extracción] Asignar usuario a grupo de analisis error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteAssignedToGrupoAById = (idAsign: number) => async (dispatch: Dispatch<AsignarExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Asignar-Extracción] Eliminar asignación de grupo analisis loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'DELETE',
         url: `/microservicio-rimextraccion/deleteAssignedToGrupoAById/${idAsign}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Asignar-Extracción] Eliminar asignación de grupo analisis success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Asignar-Extracción] Eliminar asignación de grupo analisis error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Asignar-Extracción] Eliminar asignación de grupo analisis error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const reasignToGrupoAnalisis = (reasign: Pick<AsigGrupoCamposAnalisis, 'idAsigGrupo' | 'usrAnalista'>) => async (dispatch: Dispatch<AsignarExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Asignar-Extracción] Reasign to grupo analisis loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'PUT',
         url: '/microservicio-rimextraccion/reasignToGrupoAnalisis',
         data: reasign,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Asignar-Extracción] Reasign to grupo analisis success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Asignar-Extracción] Reasign to grupo analisis error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Asignar-Extracción] Reasign to grupo analisis error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
