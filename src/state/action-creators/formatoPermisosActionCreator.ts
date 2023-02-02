import { Dispatch } from 'redux'

import { api } from 'config'

import { FormatoPermisosAction } from 'state/actions'

import { noty } from 'helpers'
import { localStorage } from 'constants/'
import { Response, FormatoPermisos, LevelLog, ControlPermisosDto, AttachmentType, ValidateType } from 'interfaces'
import fileDownload from 'js-file-download'

const { AUTHORIZATION } = localStorage

export const saveFormatoPermisos = (formatoPermisos: Partial<FormatoPermisos>) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] saveFormatoPermisos loading' })
   try {
      const { usuario: { token, userCredentials } } = getState()
      formatoPermisos.usrCreador = userCredentials
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rrhh/saveFormatoPermisos',
         data: formatoPermisos,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] saveFormatoPermisos success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] saveFormatoPermisos error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] saveFormatoPermisos error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findAllFormatoPermisos = () => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] findAllFormatoPermisos loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<FormatoPermisos[]>>({
         method: 'GET',
         url: '/microservicio-rrhh/findAllFormatoPermisos',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] findAllFormatoPermisos success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] findAllFormatoPermisos error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] findAllFormatoPermisos error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findFormatoPermisosByUsrCreador = () => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] findFormatoPermisosByUsrCreador loading' })
   try {
      const { usuario: { token, userCredentials } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<FormatoPermisos[]>>({
         method: 'POST',
         url: '/microservicio-rrhh/findFormatoPermisosByUsrCreador',
         data: userCredentials,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] findFormatoPermisosByUsrCreador success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] findFormatoPermisosByUsrCreador error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] findFormatoPermisosByUsrCreador error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const downloadFormatoLicenciaById = (idFormato: number) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] downloadFormatoLicenciaById loading' })
   try {
      const { usuario: { token } } = getState()
      const { data, headers } = await api({
         method: 'GET',
         url: '/microservicio-rrhh/downloadFormatoLicenciaById',
         params: { idFormato },
         responseType: 'blob',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      const levelLog = headers['response-status'] as LevelLog
      const fileName = headers['content-disposition']?.split('=')[1].replaceAll(/[\\"]/g, '')

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] downloadFormatoLicenciaById success' })
         noty('success', headers.message)
         fileDownload(data, fileName)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] downloadFormatoLicenciaById error', payload: headers.message })
         noty('error', headers.message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] downloadFormatoLicenciaById error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteFormatoPermisosById = (idFormato: number) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] deleteFormatoPermisosById loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'DELETE',
         url: '/microservicio-rrhh/deleteFormatoPermisosById',
         params: { idFormato },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] deleteFormatoPermisosById success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] deleteFormatoPermisosById error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteFormatoPermisosById error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const validateFormatoPermisos = (idFormato: number, type: ValidateType) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] validateFormatoPermisos loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'PUT',
         url: '/microservicio-rrhh/validateFormatoPermisos',
         params: { idFormato, type },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] validateFormatoPermisos success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] validateFormatoPermisos error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] validateFormatoPermisos error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const uploadControlAsistencia = (frmData: FormData) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] uploadControlAsistencia loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<number>>({
         method: 'POST',
         url: '/microservicio-rrhh/uploadControlAsistencia',
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] uploadControlAsistencia success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] uploadControlAsistencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] uploadControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteAllControlAsistencia = () => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<number>>({
         method: 'DELETE',
         url: '/microservicio-rrhh/deleteAllControlAsistencia',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const countControlAsistencias = () => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] countControlAsistencias loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<number>>({
         method: 'GET',
         url: '/microservicio-rrhh/countControlAsistencias',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] countControlAsistencias success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] countControlAsistencias error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findControlPermisosByServidor = (servidor: string) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] findControlPermisosByServidor loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<ControlPermisosDto[]>>({
         method: 'GET',
         url: '/microservicio-rrhh/findControlPermisosByServidor',
         params: { servidor },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] findControlPermisosByServidor success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] findControlPermisosByServidor error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const uploadAttachment = (frmData: FormData, type: AttachmentType, idFormato: number) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] uploadAttachment loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'PUT',
         url: `/microservicio-rrhh/uploadAttachment/${idFormato}/${type}`,
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] uploadAttachment success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] uploadAttachment error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const downlodAttachment = (type: AttachmentType, idFormato: number) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] downlodAttachment loading' })
   try {
      const { usuario: { token } } = getState()
      const { data, headers } = await api({
         method: 'GET',
         url: `/microservicio-rrhh/downlodAttachment/${idFormato}/${type}`,
         responseType: 'blob',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      const levelLog = headers['response-status'] as LevelLog
      const fileName = headers['content-disposition']?.split('=')[1]

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] downlodAttachment success' })
         fileDownload(data, fileName)
         noty('success', headers.message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] downlodAttachment error', payload: headers.message })
         noty('error', headers.message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveObservacionesFormatoPermisos = (idFormato: number, observaciones: string) => async (dispatch: Dispatch<FormatoPermisosAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[formatoPermisos] saveObservacionesFormatoPermisos loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'PUT',
         url: '/microservicio-rrhh/saveObservacionesFormatoPermisos',
         params: { idFormato, observaciones },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[formatoPermisos] saveObservacionesFormatoPermisos success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[formatoPermisos] saveObservacionesFormatoPermisos error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[formatoPermisos] deleteAllControlAsistencia error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
