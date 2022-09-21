import { Dispatch } from 'redux'

import { api } from 'config'
import { ProduccionAnalisisAction } from 'state/actions'

import { Response, RptProduccionHoraLaboralDto, RptTiempoPromedioAnalisisDto } from 'interfaces'
import { localStorage } from 'constants/'
import { noty } from 'helpers'

const { AUTHORIZATION } = localStorage

export const getRptTiempoPromedioAnalisisByParms = (fecIni: string, fecFin: string) => async (dispatch: Dispatch<ProduccionAnalisisAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptTiempoPromedioAnalisisDto[]>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/getRptTiempoPromedioAnalisisByParms',
         params: { fecIni, fecFin },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptProduccionHorasLaboralesPorAnalista = (fechaAnalisis: string, grupo: string) => async (dispatch: Dispatch<ProduccionAnalisisAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptProduccionHoraLaboralDto[]>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/getRptProduccionHorasLaboralesPorAnalista',
         params: { fechaAnalisis, grupo },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
