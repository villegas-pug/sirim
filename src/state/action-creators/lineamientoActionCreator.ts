import { Dispatch } from 'redux'

import { api } from 'config'
import { LineamientoAction } from 'state/actions'

import { Convenio, DetConvenio, LevelLog, Response } from 'interfaces'
import { localStorage } from 'constants/'
import { noty } from 'helpers'
import fileDownload from 'js-file-download'

const { AUTHORIZATION } = localStorage

export const saveConvenio = (convenio: Partial<Convenio>) => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] saveConvenio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rimmantenimiento/saveConvenio',
         data: convenio,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] saveConvenio success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] saveConvenio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] saveConvenio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveDetConvenio = (detConvenio: Partial<DetConvenio>) => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] saveDetConvenio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rimmantenimiento/saveDetConvenio',
         data: detConvenio,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] saveDetConvenio success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] saveDetConvenio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] saveDetConvenio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveDetConvenioAnexo = (idConvenio: number, idDetConvenio: number, anexo: FormData) => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] saveDetConvenioAnexo loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rimmantenimiento/saveDetConvenioAnexo',
         params: { idConvenio, idDetConvenio },
         data: anexo,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] saveDetConvenioAnexo success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] saveDetConvenioAnexo error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] saveDetConvenioAnexo error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findAllConvenio = () => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] findAllConvenio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Convenio[]>>({
         method: 'GET',
         url: '/microservicio-rimmantenimiento/findAllConvenio',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] findAllConvenio success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] findAllConvenio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] findAllConvenio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteConvenioById = (idConvenio: number) => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] deleteConvenioById loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Convenio[]>>({
         method: 'DELETE',
         url: '/microservicio-rimmantenimiento/deleteConvenioById',
         params: { idConvenio },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] deleteConvenioById success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] deleteConvenioById error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] deleteConvenioById error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const downloadDetConvenioAnexo = (idConvenio: number, idDetConvenio: number) => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] downloadDetConvenioAnexo loading' })
   try {
      const { usuario: { token } } = getState()
      const { data, headers } = await api({
         method: 'GET',
         url: '/microservicio-rimmantenimiento/downloadDetConvenioAnexo',
         params: { idConvenio, idDetConvenio },
         responseType: 'blob',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      const levelLog = headers['response-status'] as LevelLog
      const fileName = headers['content-disposition']?.split('=')[1].replaceAll(/[\\"_]/g, '')

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] downloadDetConvenioAnexo success' })
         noty('success', headers.message)
         fileDownload(data, fileName)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] downloadDetConvenioAnexo error', payload: headers.message })
         noty('error', headers.message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] downloadDetConvenioAnexo error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteDetConvenio = (detConvenio: Partial<DetConvenio>) => async (dispatch: Dispatch<LineamientoAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Lineamiento] deleteDetConvenio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Convenio[]>>({
         method: 'DELETE',
         url: '/microservicio-rimmantenimiento/deleteDetConvenio',
         data: detConvenio,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Lineamiento] deleteDetConvenio success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Lineamiento] deleteDetConvenio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Lineamiento] deleteDetConvenio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
