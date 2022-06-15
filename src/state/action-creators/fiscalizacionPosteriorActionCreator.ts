import { Dispatch } from 'redux'

import { api } from 'config/axios'
import downloadFile from 'js-file-download'

import { FiscalizacionPosteriorAction } from 'state/actions/fiscalizacionPosteriorAction'

import { Etapa, EvaluarSolicitudSFM, ExpedienteSFM, Response, SolicitudSFM, TipoTramite } from 'interfaces'
import { noty } from 'helpers/'
import {
   localStorage,
   levelLog,
   httpStatus
} from 'constants/'
import { MetadataExpediente } from 'types'

const { AUTHORIZATION } = localStorage
const { SUCCESS, WARNING, ERROR } = levelLog

export const resetSolicitudValues = () => (dispatch: Dispatch<FiscalizacionPosteriorAction>): void => {
   dispatch({ type: '[Fiscalización-Posterior] Reset solicitud values' })
}

export const findAllMetaOfExpediente = () => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Find-All metadata solicitudes loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<MetadataExpediente[]>>({
         method: 'GET',
         url: '/microservicio-operativo/findAllMetaOfExpediente',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Find-All metadata solicitudes success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Find-All metadata solicitudes error', payload: message })
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const SaveAllSolicitudFile = (frmData: FormData) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Save-All file expedientes loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api({
         method: 'POST',
         url: '/microservicio-operativo/saveFileExpedienteSolicitud',
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Save-All file expedientes success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Save-All file expedientes error', payload: message })
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.respose?.status })
   }
}

export const findAllTipoTramite = () => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Tipo-Trámite] Find-All tipo trámites loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<TipoTramite[]>>({
         method: 'GET',
         url: '/microservicio-operativo/findAllTipoTramite',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Tipo-Trámite] Find-All tipo trámites success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Tipo-Trámite] Find-All tipo trámites error', payload: message })
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveSolicitud = (payload: Partial<SolicitudSFM>) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Recepcionar expediente loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<SolicitudSFM[]>>({
         method: 'POST',
         url: '/microservicio-operativo/saveSolicitud',
         data: payload,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Recepcionar expediente success', payload: data })
         noty('success', message)
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Recepcionar expediente error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Recepcionar expediente error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}

export const findByNumeroExpediente = (numeroExpediente: string) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Find por número expediente loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<ExpedienteSFM>>({
         method: 'GET',
         url: '/microservicio-operativo/findByNumeroExpediente',
         params: { numeroExpediente },
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Find por número expediente success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Find por número expediente error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const findAllSolicitud = () => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Find all solicitudes loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<SolicitudSFM[]>>({
         method: 'GET',
         url: '/microservicio-operativo/findAllBandejaEntrada',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Find all solicitudes success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Find all solicitudes error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Find all solicitudes error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const assignEvaluador = (evaluarSolicitudSFM: Partial<EvaluarSolicitudSFM>) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Asignar evaluador loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<SolicitudSFM[]>>({
         method: 'POST',
         url: '/microservicio-operativo/assignEvaluador',
         data: evaluarSolicitudSFM,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Asignar evaluador success', payload: data })
         noty('success', message)
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Asignar evaluador error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      noty('error', err?.message)
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const readAssignment = (evaluarSolicitudSFM: Partial<EvaluarSolicitudSFM>) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Leer asignación loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'PUT',
         url: `/microservicio-operativo/readAssignment/${evaluarSolicitudSFM.idVerifExp}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Leer asignación success', payload: data })
         noty('success', message)
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Leer asignación error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const deleteSolicitud = (idBandejaDoc: number) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Eliminar solicitud loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<SolicitudSFM[]>>({
         method: 'DELETE',
         url: `/microservicio-operativo/deleteSolicitud/${idBandejaDoc}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Eliminar solicitud success', payload: data })
         noty('success', message)
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Eliminar solicitud error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const findAllBandejaEvaluacion = () => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Find all bandeja evaluación loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'GET',
         url: '/microservicio-operativo/findAllBandejaEvaluacion',
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Find all bandeja evaluación success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Find all bandeja evaluación error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const saveDiligencia = (evaluarSolicitudSFM: Partial<EvaluarSolicitudSFM>) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Save diligencia loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'POST',
         url: '/microservicio-operativo/saveDiligencia',
         data: evaluarSolicitudSFM,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Save diligencia success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Save diligencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Save diligencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}

export const deleteDiligenciaById = (idDiligencia: number) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Delete diligencia loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'DELETE',
         url: `/microservicio-operativo/deleteDiligenciaById/${idDiligencia}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Delete diligencia success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Delete diligencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Delete diligencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}

export const saveArchivoDiligencia = (idDiligencia: number, file: File) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Save file diligencia loading' })

   const frmData = new FormData()
   frmData.append('file', file)

   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'PUT',
         url: `/microservicio-operativo/saveArchivoDiligencia/${idDiligencia}`,
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Save file diligencia success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Save file diligencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      noty('error', err?.message)
      dispatch({ type: '[Fiscalización-Posterior] Save file diligencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const downloadArchivoDiligencia = (idArchivoDiligencia: number) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Download file diligencia loading' })
   try {
      const { usuario: { token } } = getStore()
      const { headers, data, status, statusText } = await api({
         method: 'GET',
         url: '/microservicio-operativo/downloadArchivoDiligencia',
         params: { idArchivoDiligencia },
         headers: {
            [AUTHORIZATION]: token
         },
         responseType: 'blob'
      })

      let fileName: string

      switch (status) {
      case httpStatus.OK:
         fileName = headers['content-disposition'].split('=')[1].replaceAll('"', '')
         downloadFile(data, fileName)
         dispatch({ type: '[Fiscalización-Posterior] Download file diligencia success' })
         break
      default:
         dispatch({ type: '[Fiscalización-Posterior] Download file diligencia error', payload: statusText })
         noty('error', statusText)
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Download file diligencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}

export const deleteArchivoDiligencia = (idArchivoDiligencia: number) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Delete file diligencia loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'DELETE',
         url: '/microservicio-operativo/deleteArchivoDiligencia',
         params: { idArchivoDiligencia },
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Delete file diligencia success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Delete file diligencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Delete file diligencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}

export const updateEtapaSolicitud = (idVerifExp: number, etapa: Etapa) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Update etapa solicitud loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'PUT',
         url: `/microservicio-operativo/updateEtapaSolicitud/${idVerifExp}`,
         data: etapa,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[Fiscalización-Posterior] Update etapa solicitud success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[Fiscalización-Posterior] Update etapa solicitud error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Update etapa solicitud error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}

export const updateOpinionSolicitud = (evaluarSolicitudSFM: Partial<EvaluarSolicitudSFM>) => async (dispatch: Dispatch<FiscalizacionPosteriorAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Fiscalización-Posterior] Save opinión loading' })
   const { usuario: { token } } = getStore()
   try {
      const { data: { levelLog, data, message } } = await api.request<Response<EvaluarSolicitudSFM[]>>({
         method: 'PUT',
         url: '/microservicio-operativo/updateOpinionSolicitud',
         data: evaluarSolicitudSFM,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Fiscalización-Posterior] Save opinión success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Fiscalización-Posterior] Save opinión error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Fiscalización-Posterior] Save opinión error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
      noty('error', err?.message)
   }
}
