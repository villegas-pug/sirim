import { ReportesAction } from 'state/actions'

import { RptAñosControlMigratorioDto, RptDependenciaControlMigratorioDto, RptEdadesControlMigratorioDto, RptNacionalidadControlMigratorioDto, RptProduccionDiariaDto } from 'interfaces'

type ReportesState = {
   loading: boolean
   rptAñosControlMigratorio: RptAñosControlMigratorioDto[]
   rptDependenciaControlMigratorio: RptDependenciaControlMigratorioDto[]
   rptEdadesControlMigratorioDto: RptEdadesControlMigratorioDto[]
   rptNacionalidadControlMigratorioDto: RptNacionalidadControlMigratorioDto[]
   rptProduccionDiaria: RptProduccionDiariaDto[]
   error: string | null
}

const INITIAL_STATE: ReportesState = {
   loading: false,
   rptAñosControlMigratorio: [],
   rptDependenciaControlMigratorio: [],
   rptEdadesControlMigratorioDto: [],
   rptNacionalidadControlMigratorioDto: [],
   error: null,
   rptProduccionDiaria: []
}

export const reportesReducer = (state: ReportesState = INITIAL_STATE, action: ReportesAction): ReportesState => {
   switch (action.type) {
   case '[Reportes] getRptAñosControlMigratorio loading':
      return { ...state, loading: true, rptAñosControlMigratorio: [], error: null }
   case '[Reportes] getRptAñosControlMigratorio success':
      return { ...state, loading: false, rptAñosControlMigratorio: action.payload, error: null }
   case '[Reportes] getRptAñosControlMigratorio error':
      return { ...state, loading: false, rptAñosControlMigratorio: [], error: action.payload }
   case '[Reportes] getRptDependenciaControlMigratorio loading':
      return { ...state, loading: true, rptDependenciaControlMigratorio: [], error: null }
   case '[Reportes] getRptDependenciaControlMigratorio success':
      return { ...state, loading: false, rptDependenciaControlMigratorio: action.payload, error: null }
   case '[Reportes] getRptDependenciaControlMigratorio error':
      return { ...state, loading: false, rptDependenciaControlMigratorio: [], error: action.payload }
   case '[Reportes] getRptEdadesControlMigratorio loading':
      return { ...state, loading: true, rptEdadesControlMigratorioDto: [], error: null }
   case '[Reportes] getRptEdadesControlMigratorio success':
      return { ...state, loading: false, rptEdadesControlMigratorioDto: action.payload, error: null }
   case '[Reportes] getRptEdadesControlMigratorio error':
      return { ...state, loading: false, rptEdadesControlMigratorioDto: [], error: action.payload }
   case '[Reportes] getRptNacionalidadControlMigratorio loading':
      return { ...state, loading: true, rptNacionalidadControlMigratorioDto: [], error: null }
   case '[Reportes] getRptNacionalidadControlMigratorio success':
      return { ...state, loading: false, rptNacionalidadControlMigratorioDto: action.payload, error: null }
   case '[Reportes] getRptNacionalidadControlMigratorio error':
      return { ...state, loading: false, rptNacionalidadControlMigratorioDto: [], error: action.payload }
   case '[Reportes] getRptProduccionDiaria loading':
      return { ...state, loading: true, error: null }
   case '[Reportes] getRptProduccionDiaria success':
      return { ...state, loading: false, rptProduccionDiaria: action.payload, error: null }
   case '[Reportes] getRptProduccionDiaria error':
      return { ...state, loading: false, error: action.payload }
   default:
      return state
   }
}
