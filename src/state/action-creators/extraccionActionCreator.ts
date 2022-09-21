import { Dispatch } from 'redux'
import fileDownload from 'js-file-download'

import { AsignarExtraccionAction, ExtraccionAction } from 'state/actions'

import { api } from 'config'
import { noty } from 'helpers'
import { localStorage, httpStatus } from 'constants/'

import {
   Response,
   TablaDinamica,
   TablaDinamicaDto,
   MetaCampoTablaDinamica,
   BaseDatos,
   ModuloDto,
   QueryClauseDto,
   QueryString,
   RequestParamsDnv
} from 'interfaces'

const { AUTHORIZATION } = localStorage

export const createTablaExtraccion = (values: Partial<TablaDinamicaDto>) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Create new table loading' })
   try {
      const { usuario: { token, userCredentials } } = getState()
      values.usrCreador = userCredentials
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/createTablaDinamica',
         data: values,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Create new table success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Create new table error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Create new table error', payload: err?.message })
      noty('error', err?.message)
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findAllTablaDinamica = () => async (dispatch: Dispatch<ExtraccionAction | AsignarExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Find all tabla dinámica loading' })
   dispatch({ type: '[Asignar-Extracción] Find all tabla dinámica loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/findAllTablaDinamica',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Find all tabla dinámica success', payload: data })
         dispatch({ type: '[Asignar-Extracción] Find all tabla dinámica success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Find all tabla dinamica error', payload: message })
         dispatch({ type: '[Asignar-Extracción] Find all tabla dinamica error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Find all tabla dinamica error', payload: err.response?.status })
      dispatch({ type: '[Asignar-Extracción] Find all tabla dinamica error', payload: err.response?.status })
      dispatch({ type: '[http-status] Response status', payload: err.response?.status })
   }
}

export const updateNameTablaDinamica = (values: Partial<TablaDinamica>) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Update name tabla loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'PUT',
         url: '/microservicio-rimextraccion/updateNameTablaDinamica',
         data: values,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Update name tabla success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Update name tabla error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const deleteTablaExtraccion = (values: Partial<TablaDinamica>) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Delete tabla loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'DELETE',
         url: '/microservicio-rimextraccion/deleteTablaDinamica',
         data: values,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Delete tabla success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Delete tabla error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Delete tabla error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
      noty('error', err?.message)
   }
}

export const alterTablaDinamica = (tablaDinamicaDto: Partial<TablaDinamicaDto>) => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Alter tabla loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<MetaCampoTablaDinamica[]>>({
         method: 'PUT',
         url: '/microservicio-rimextraccion/alterTablaDinamica',
         data: tablaDinamicaDto,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Alter tabla success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Alter tabla error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Alter tabla error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
      noty('error', err?.message)
   }
}

export const findMetaTablaDinamica = (tablaDinamicaDto: Partial<TablaDinamicaDto>) => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Find metadatos extracción loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<MetaCampoTablaDinamica[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/findMetaTablaDinamica',
         data: tablaDinamicaDto,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Find metadatos extracción success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Find metadatos extracción error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Find metadatos extracción error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
      noty('error', err?.message)
   }
}

export const uploadExtraccion = (nombreTabla: string, file: File) => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Upload extracción loading' })
   try {
      const frmData = new FormData()
      frmData.append('file', file)
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<number>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/uploadExtraccion',
         params: { nombreTabla },
         data: frmData,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Upload extracción success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Upload extracción error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Upload extracción error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
      noty('error', err?.message)
   }
}

export const saveGrupoCamposAnalisis = (tablaDinamica: Partial<TablaDinamicaDto>) => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Save grupo analisis loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/saveGrupoCamposAnalisis',
         data: tablaDinamica,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Save grupo analisis success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Save grupo analisis error', payload: message })
         dispatch({ type: '[Extracción] Find all tabla dinámica success', payload: data })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Save grupo analisis error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
      noty('error', err?.message)
   }
}

export const deleteGrupoCamposAnalisisbyId = (idGrupo: number) => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Delete grupo analisis by id loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<TablaDinamicaDto[]>>({
         method: 'DELETE',
         url: `/microservicio-rimextraccion/deleteGrupoCamposAnalisisbyId/${idGrupo}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Delete grupo analisis by id success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Delete grupo analisis by id error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Delete grupo analisis by id error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findAllBasesDatos = () => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Find all bases de datos Migraciones loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<BaseDatos[]>>({
         url: '/microservicio-rimextraccion/findAllBasesDatos',
         method: 'GET',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Find all bases de datos Migraciones success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Find all bases de datos Migraciones error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Find all bases de datos Migraciones error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const saveQueryString = (modulo: Partial<ModuloDto>) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Save queryString loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<BaseDatos[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/saveQueryString',
         data: modulo,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Save queryString success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Save queryString error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Save queryString error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const dynamicJoinStatementTest = (queryClauseDto: QueryClauseDto) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Dynamic-Join-Statement loading' })
   try {
      const { usuario: { token } } = getState()
      const { data, headers, status } = await api({
         method: 'POST',
         url: '/microservicio-rimextraccion/dynamicJoinStatement',
         data: queryClauseDto,
         headers: {
            [AUTHORIZATION]: token
         },
         responseType: 'blob'
      })

      switch (status) {
      case httpStatus.OK:
         fileDownload(data, headers['content-disposition'].split('"')[1])
         break
      case httpStatus.NO_CONTENT:
         dispatch({ type: '[Extracción] Dynamic-Join-Statement error', payload: headers.warning })
         noty('error', headers.warning)
         break
      }

      /* dispatch({ type: '[Extracción] Dynamic-Join-Statement success' }) */
   } catch (err: any) {
      dispatch({ type: '[Extracción] Dynamic-Join-Statement error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const dynamicJoinStatement = (queryClauseDto: QueryClauseDto) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Dynamic-Join-Statement loading' })
   try {
      const { usuario: { token, userCredentials } } = getState()
      const tablaDinamicaDto: Partial<TablaDinamicaDto> = {
         nombre: queryClauseDto.nameTable,
         usrCreador: userCredentials
      }

      const { data: { levelLog, data, message } } = await api.request<Response<Object[]>>({
         method: 'POST',
         url: '/microservicio-rimextraccion/dynamicJoinStatement',
         data: { queryClauseDto, tablaDinamicaDto },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Dynamic-Join-Statement success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Dynamic-Join-Statement error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Dynamic-Join-Statement error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const removeAllExtraccion = () => async (dispatch: Dispatch<ExtraccionAction>): Promise<void> => {
   dispatch({ type: '[Extracción] Remove-All Extracción Download' })
}

export const removeAllDepuracion = () => async (dispatch: Dispatch<ExtraccionAction>): Promise<void> => {
   dispatch({ type: '[Extracción] Remove-All Depuración' })
}

export const deleteQueryStringById = (idQStr: number) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Delete queryString loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<BaseDatos[]>>({
         method: 'DELETE',
         url: `/microservicio-rimextraccion/deleteQueryStringById/${idQStr}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Delete queryString success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Delete queryString error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Delete queryString error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const updateQueryString = (queryString: Partial<QueryString>) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Update queryString loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<BaseDatos[]>>({
         method: 'PUT',
         url: '/microservicio-rimextraccion/updateQueryString',
         data: queryString,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Update queryString success', payload: data })
         noty('success', message)
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Update queryString error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Update queryString error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findDnvByParams = (params: RequestParamsDnv) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Find all dnv by params loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<any[]>>({
         method: 'POST',
         url: '/microservicio-rimsim/findDnvByParams',
         data: params,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Find all dnv by params success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Find all dnv by params error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Find all dnv by params error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const findTablaDinamicaBySuffixOfField = (nombreTabla: String, suffix?: String) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Find tabla dinámica by suffix loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Array<Object>>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/findTablaDinamicaBySuffixOfField',
         params: { nombreTabla, suffix },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Find tabla dinámica by suffix success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Find tabla dinámica by suffix error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Find tabla dinámica by suffix error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const countTablaDinamicaByNombre = (nombreTabla: string) => async (dispatch: Dispatch<ExtraccionAction>, getState: any): Promise<void> => {
   dispatch({ type: '[Extracción] Count tabla by nombre loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<number>>({
         method: 'GET',
         url: '/microservicio-rimextraccion/countTablaByNombre',
         params: { nombreTabla },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Extracción] Count tabla by nombre success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Extracción] Count tabla by nombre error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Extracción] Count tabla by nombre error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const removeCamposTablaDinamica = () => async (dispatch: Dispatch<ExtraccionAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Extracción] Remove campos tabla dinámica', payload: [] })
}
