import { Dispatch } from 'redux'

import { ReportesAction } from 'state/actions'

import { api } from 'config'
import { localStorage } from 'constants/'
import { Response, RptAñosControlMigratorioDto, RptDependenciaControlMigratorioDto, RptEdadesControlMigratorioDto, RptNacionalidadControlMigratorioDto, RptPasaportesIndicadoresDto, RptPasaportesPor12UltimosMesesDto, RptPasaportesPor31UltimosDiasDto, RptPasaportesPorAñosDto, RptProduccionDiariaDto, RptProyeccionAnalisis } from 'interfaces'
import { noty } from 'helpers'

const { AUTHORIZATION } = localStorage

export const getRptAñosControlMigratorio = () => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptAñosControlMigratorio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptAñosControlMigratorioDto[]>>({
         method: 'GET',
         url: '/microservicio-rimreportes/getRptAñosControlMigratorio',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptAñosControlMigratorio success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptAñosControlMigratorio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptAñosControlMigratorio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptDependenciaControlMigratorio = (año: number, nacionalidad: string) => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptDependenciaControlMigratorio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptDependenciaControlMigratorioDto[]>>({
         method: 'GET',
         url: '/microservicio-rimreportes/getRptDependenciaControlMigratorio',
         params: { año, nacionalidad },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptDependenciaControlMigratorio success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptDependenciaControlMigratorio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptDependenciaControlMigratorio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptEdadesControlMigratorio = (año: number, nacionalidad: string) => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptEdadesControlMigratorio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptEdadesControlMigratorioDto[]>>({
         method: 'GET',
         url: '/microservicio-rimreportes/getRptEdadesControlMigratorio',
         params: { año, nacionalidad },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptEdadesControlMigratorio success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptEdadesControlMigratorio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptEdadesControlMigratorio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptNacionalidadControlMigratorio = (año: number) => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptNacionalidadControlMigratorio loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptNacionalidadControlMigratorioDto[]>>({
         method: 'GET',
         url: '/microservicio-rimreportes/getRptNacionalidadControlMigratorio',
         params: { año },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptNacionalidadControlMigratorio success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptNacionalidadControlMigratorio error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptNacionalidadControlMigratorio error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptProduccionDiaria = (fecIni: string, fecFin: string) => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptProduccionDiaria loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptProduccionDiariaDto[]>>({
         method: 'GET',
         url: '/microservicio-rimreportes/getRptProduccionDiaria',
         params: { fecIni, fecFin },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptProduccionDiaria success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptProduccionDiaria error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptProduccionDiaria error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptPasaportesIndicadores = () => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptPasaportesIndicadores loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptPasaportesIndicadoresDto>>({
         method: 'GET',
         url: '/microservicio-rimsim/getRptPasaportesIndicadores',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptPasaportesIndicadores success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptPasaportesIndicadores error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptPasaportesIndicadores error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptPasaportesEntregadosPorAños = () => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptPasaportesEntregadosPorAños loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptPasaportesPorAñosDto[]>>({
         method: 'GET',
         url: '/microservicio-rimsim/getRptPasaportesEntregadosPorAños',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptPasaportesEntregadosPorAños success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptPasaportesEntregadosPorAños error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptPasaportesEntregadosPorAños error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptPasaportesEntregadosPor12UltimosMeses = () => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptPasaportesPor12UltimosMesesDto[]>>({
         method: 'GET',
         url: '/microservicio-rimsim/getRptPasaportesEntregadosPor12UltimosMeses',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptPasaportesEntregadosPor31UltimosDias = () => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptPasaportesPor31UltimosDiasDto[]>>({
         method: 'GET',
         url: '/microservicio-rimsim/getRptPasaportesEntregadosPor31UltimosDias',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}

export const getRptProyeccionAnalisis = (año: number) => async (dispatch: Dispatch<ReportesAction>, getState: () => any): Promise<void> => {
   dispatch({ type: '[Reportes] getRptProyeccionAnalisis loading' })
   try {
      const { usuario: { token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<RptProyeccionAnalisis[]>>({
         method: 'GET',
         url: '/microservicio-rimreportes/getRptProyeccionAnalisis',
         params: { año },
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case 'SUCCESS':
         dispatch({ type: '[Reportes] getRptProyeccionAnalisis success', payload: data })
         break
      case 'WARNING':
      case 'ERROR':
         dispatch({ type: '[Reportes] getRptProyeccionAnalisis error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[Reportes] getRptProyeccionAnalisis error', payload: err?.message })
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
