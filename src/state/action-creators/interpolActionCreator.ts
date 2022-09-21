import { Dispatch } from 'redux'

import { api } from 'config/axios'

import { noty } from 'helpers'

import { localStorage } from 'constants/'

import fileDownload from 'js-file-download'

import { InterpolAction } from 'state/actions'
import { Interpol, Response } from 'interfaces'

const { AUTHORIZATION } = localStorage

export const findInterpolByApprox = (interpol: Partial<Interpol>) => async (dispatch: Dispatch<InterpolAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Interpol] Find interpol by aprox loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message, data } } = await api.request<Response<Interpol[]>>({
         method: 'POST',
         url: 'microservicio-interpol/findInterpolByApprox',
         data: interpol,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Interpol] Find interpol by aprox success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Interpol] Find interpol by aprox error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Interpol] Find interpol by aprox error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const saveAllInterpol = (frmData: FormData) => async (dispatch: Dispatch<InterpolAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Interpol] Save all interpol loading' })
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message } } = await api.request<Response<null>>({
         method: 'POST',
         url: '/microservicio-interpol/saveAllInterpol',
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Interpol] Save all interpol success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Interpol] Save all interpol error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Interpol] Save all interpol error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const saveInterpol = (frmData: FormData) => async (dispatch: Dispatch<InterpolAction>, getStore: () => any): Promise<any> => {
   dispatch({ type: '[Interpol] Save interpol loading' })
   try {
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message } } = await api.request<Response<null>>({
         method: 'POST',
         url: '/microservicio-interpol/saveInterpol',
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })
      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Interpol] Save interpol success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Interpol] Save interpol error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Interpol] Save interpol error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}

export const findInterpolScreenshotById = (idInterpol: number) => async (dispatch: Dispatch<InterpolAction>, getStore: () => any): Promise<void> => {
   dispatch({ type: '[Interpol] Find screenshot interpol loading' })
   try {
      const { usuario: { token } } = getStore()
      const { data, headers } = await api({
         method: 'GET',
         url: '/microservicio-interpol/findInterpolScreenshotById',
         params: { idInterpol },
         headers: {
            [AUTHORIZATION]: token
         },
         responseType: 'blob'
      })

      const fileName = headers['content-disposition'].split('=')[1].replaceAll('"', '')
      fileDownload(data, fileName)
      dispatch({ type: '[Interpol] Find screenshot interpol success' })
   } catch (err: any) {
      dispatch({ type: '[Interpol] Find screenshot interpol error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response.status })
   }
}
