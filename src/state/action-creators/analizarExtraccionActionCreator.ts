import { Dispatch } from 'redux'

import fileDownload from 'js-file-download'

import { api } from 'config'
import { AnalizarExtraccionAction } from 'state/actions'

import { noty } from 'helpers'
import { AnalizadosDto, AsigGrupoCamposAnalisisDto, LevelLog, RecordAssignedDto, RegistroTablaDinamica, Response } from 'interfaces'
import { localStorage } from 'constants/'

const { AUTHORIZATION } = localStorage

export const findAsigAnalisisByUsr = () => async (dispatch: Dispatch<AnalizarExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Analizar-Extracción] Find asignaciones by usuario loading' })
   try {
      const { usuario: { token, userCredentials } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<AsigGrupoCamposAnalisisDto[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/findAsigAnalisisByUsr',
         data: userCredentials,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Analizar-Extracción] Find asignaciones by usuario success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Analizar-Extracción] Find asignaciones by usuario error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Analizar-Extracción] Find asignaciones by usuario error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findTablaDinamicaByRangoFromIds = ({ nombreTabla, regAnalisisIni, regAnalisisFin }: Partial<RegistroTablaDinamica>) => async (dispatch: Dispatch<AnalizarExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Analizar-Extracción] Find tabla dinamica by rango of ids loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RegistroTablaDinamica[]>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/findTablaDinamicaByRangoFromIds',
         params: { nombreTabla, regAnalisisIni, regAnalisisFin },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Analizar-Extracción] Find tabla dinamica by rango of ids success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Analizar-Extracción] Find tabla dinamica by rango of ids error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Analizar-Extracción] Find tabla dinamica by rango of ids error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveRecordAssigned = (recordAssignedDto: Partial<RecordAssignedDto>) => async (dispatch: Dispatch<AnalizarExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Analizar-Extracción] Save record assigned loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Array<{}>>>({
         method: 'PUT',
         url: '/microservicio-rimextraccion/saveRecordAssigned',
         data: { ...recordAssignedDto },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Analizar-Extracción] Save record assigned success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Analizar-Extracción] Save record assigned error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Analizar-Extracción] Save record assigned error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const downloadAnalisadosByDates = (analizadosDto: AnalizadosDto) => async (dispatch: Dispatch<AnalizarExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Analizar-Extracción] Download analisados by dates loading' })
   try {
      const { usuario: { token } } = getState()
      const { data, headers } = await api({
         method: 'POST',
         url: '/microservicio-rimextraccion/downloadAnalisadosByDates',
         data: analizadosDto,
         responseType: 'blob',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      const levelLog = headers['response-status'] as LevelLog
      const fileName = headers['content-disposition']?.split('=')[1].replaceAll(/[\\"]/g, '').replaceAll(/[_]/g, ' ')

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Analizar-Extracción] Download analisados by dates success' })
         noty('success', headers.message)
         fileDownload(data, fileName)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Analizar-Extracción] Download analisados by dates error', payload: headers.message })
         noty('error', headers.message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Analizar-Extracción] Download analisados by dates error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const downloadReporteMensualProduccionByParams = (month: number, year: number) => async (dispatch: Dispatch<AnalizarExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Analizar-Extracción] Download reporte mensual de producción loading' })
   try {
      const { usuario: { token, userCredentials: { login } } } = getState()
      const { data, headers } = await api({
         method: 'GET',
         url: '/microservicio-rimextraccion/downloadReporteMensualProduccionByParams',
         params: { login, month, year },
         responseType: 'blob',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      const levelLog = headers['response-status'] as LevelLog
      const fileName = headers['content-disposition']?.split('=')[1].replaceAll(/[\\"_]/g, '')

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Analizar-Extracción] Download reporte mensual de producción success' })
         noty('success', headers.message)
         fileDownload(data, fileName)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Analizar-Extracción] Download reporte mensual de producción error', payload: headers.message })
         noty('error', headers.message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Analizar-Extracción] Download reporte mensual de producción error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
