import { Dispatch } from 'redux'

import { api } from 'config'

import { ControlCalidadAction } from 'state/actions'

import { noty } from 'helpers'
import { localStorage } from 'constants/'
import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamicaDto, Response } from 'interfaces'

const { AUTHORIZATION } = localStorage

export const saveCtrlCalCamposAnalisis = (idAsigGrupo: number) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] Generate records to Control Calidad loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<[]>>({
         method: 'POST',
         url: '/microservicio-rimctrlcalidad/saveCtrlCalCamposAnalisis',
         params: { idAsigGrupo },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] Generate records to Control Calidad success', payload: data })
         noty('success', message)
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

export const findTablaDinamicaByIdCtrlCalAndIds = (idCtrlCal: number, idsCsv: string) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RegistroTablaDinamicaDto[]>>({
         method: 'GET',
         params: { idCtrlCal, idsCsv },
         url: '/microservicio-rimctrlcalidad/findTablaDinamicaByIdCtrlCalAndIds',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const validateRecordAssigned = (registroTablaDinamica: Partial<RegistroTablaDinamicaDto>) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] validateRecordAssigned loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RegistroTablaDinamicaDto[]>>({
         method: 'PUT',
         url: '/microservicio-rimctrlcalidad/validateRecordAssigned',
         data: registroTablaDinamica,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] validateRecordAssigned success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] validateRecordAssigned error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] validateRecordAssigned error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveMetaFieldIdErrorCsv = (registroTablaDinamica: Partial<RegistroTablaDinamicaDto>) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] saveMetaFieldIdErrorCsv loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<[]>>({
         method: 'PUT',
         url: '/microservicio-rimctrlcalidad/saveMetaFieldIdErrorCsv',
         data: registroTablaDinamica,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] saveMetaFieldIdErrorCsv success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] saveMetaFieldIdErrorCsv error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] saveMetaFieldIdErrorCsv error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findAsigGrupoCamposAnalisisById = (idAsigGrupo: number) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] findAsigGrupoCamposAnalisisById loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<AsigGrupoCamposAnalisisDto>>({
         method: 'GET',
         url: '/microservicio-rimctrlcalidad/findAsigGrupoCamposAnalisisById',
         params: { idAsigGrupo },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] findAsigGrupoCamposAnalisisById success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] findAsigGrupoCamposAnalisisById error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] findAsigGrupoCamposAnalisisById error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const setValidationResultOfCtrlCal = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] setValidationResultOfCtrlCal loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'PUT',
         url: '/microservicio-rimctrlcalidad/setValidationResultOfCtrlCal',
         data: asigGrupoCamposAnalisis,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] setValidationResultOfCtrlCal success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] setValidationResultOfCtrlCal error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] setValidationResultOfCtrlCal error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveRectificadoRecordAssigned = (idProdAnalisis: number) => async (dispatch: Dispatch<ControlCalidadAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Control-Calidad] saveRectificadoRecordAssigned loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, message } } = await api.request<Response<[]>>({
         method: 'PUT',
         url: `/microservicio-rimctrlcalidad/setValidationResultOfCtrlCal/${idProdAnalisis}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Control-Calidad] saveRectificadoRecordAssigned success' })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Control-Calidad] saveRectificadoRecordAssigned error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Control-Calidad] saveRectificadoRecordAssigned error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
