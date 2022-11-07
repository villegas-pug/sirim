import { ReportesAction } from 'state/actions'

import { RptAñosControlMigratorioDto, RptDependenciaControlMigratorioDto, RptEdadesControlMigratorioDto, RptNacionalidadControlMigratorioDto, RptPasaportesIndicadoresDto, RptPasaportesPor12UltimosMesesDto, RptPasaportesPor31UltimosDiasDto, RptPasaportesPorAñosDto, RptProduccionDiariaDto } from 'interfaces'

type ReportesState = {
   loading: boolean
   rptAñosControlMigratorio: RptAñosControlMigratorioDto[]
   rptDependenciaControlMigratorio: RptDependenciaControlMigratorioDto[]
   rptEdadesControlMigratorioDto: RptEdadesControlMigratorioDto[]
   rptNacionalidadControlMigratorioDto: RptNacionalidadControlMigratorioDto[]
   rptProduccionDiaria: RptProduccionDiariaDto[]
   rptPasaportesIndicadores: RptPasaportesIndicadoresDto
   rptPasaportesEntregadosPorAños: RptPasaportesPorAñosDto[]
   rptPasaportesEntregadosPor12UltimosMeses: RptPasaportesPor12UltimosMesesDto[]
   rptPasaportesEntregadosPor31UltimosDias: RptPasaportesPor31UltimosDiasDto[]
   error: string | null
}

const INITIAL_STATE: ReportesState = {
   loading: false,
   rptAñosControlMigratorio: [],
   rptDependenciaControlMigratorio: [],
   rptEdadesControlMigratorioDto: [],
   rptNacionalidadControlMigratorioDto: [],
   rptProduccionDiaria: [],
   rptPasaportesIndicadores: {} as RptPasaportesIndicadoresDto,
   rptPasaportesEntregadosPorAños: [],
   rptPasaportesEntregadosPor12UltimosMeses: [],
   rptPasaportesEntregadosPor31UltimosDias: [],
   error: null
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
   case '[Reportes] getRptPasaportesIndicadores loading':
      return { ...state, loading: true, rptPasaportesIndicadores: {} as RptPasaportesIndicadoresDto, error: null }
   case '[Reportes] getRptPasaportesIndicadores success':
      return { ...state, loading: false, rptPasaportesIndicadores: action.payload, error: null }
   case '[Reportes] getRptPasaportesIndicadores error':
      return { ...state, loading: false, rptPasaportesIndicadores: {} as RptPasaportesIndicadoresDto, error: action.payload }
   case '[Reportes] getRptPasaportesEntregadosPorAños loading':
      return { ...state, loading: true, rptPasaportesEntregadosPorAños: [], error: null }
   case '[Reportes] getRptPasaportesEntregadosPorAños success':
      return { ...state, loading: false, rptPasaportesEntregadosPorAños: action.payload, error: null }
   case '[Reportes] getRptPasaportesEntregadosPorAños error':
      return { ...state, loading: false, rptPasaportesEntregadosPorAños: [], error: action.payload }
   case '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses loading':
      return { ...state, loading: true, rptPasaportesEntregadosPor12UltimosMeses: [], error: null }
   case '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses success':
      return { ...state, loading: false, rptPasaportesEntregadosPor12UltimosMeses: action.payload, error: null }
   case '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses error':
      return { ...state, loading: false, rptPasaportesEntregadosPor12UltimosMeses: [], error: action.payload }
   case '[Reportes] getRptPasaportesEntregadosPor31UltimosDias loading':
      return { ...state, loading: true, rptPasaportesEntregadosPor31UltimosDias: [], error: null }
   case '[Reportes] getRptPasaportesEntregadosPor31UltimosDias success':
      return { ...state, loading: false, rptPasaportesEntregadosPor31UltimosDias: action.payload, error: null }
   case '[Reportes] getRptPasaportesEntregadosPor31UltimosDias error':
      return { ...state, loading: false, rptPasaportesEntregadosPor31UltimosDias: [], error: action.payload }
   default:
      return state
   }
}
