import { ProduccionAnalisisAction } from 'state/actions'

import { RptProduccionHoraLaboralDto, RptTiempoPromedioAnalisisDto } from 'interfaces'

type ProduccionAnalisisState = {
   loading: boolean
   rptTiempoPromedioAnalisis: {
      loading: boolean
      data: RptTiempoPromedioAnalisisDto[]
      error: string | null
   }
   rptProduccionHoraLaboral: {
      loading: boolean
      data: RptProduccionHoraLaboralDto[]
      error: string | null
   }
   error: string | null
}

const INITIAL_STATE: ProduccionAnalisisState = {
   loading: false,
   rptTiempoPromedioAnalisis: {
      loading: false,
      data: [],
      error: null
   },
   rptProduccionHoraLaboral: {
      loading: false,
      data: [],
      error: null
   },
   error: null
}

export const produccionAnalisisReducer = (state: ProduccionAnalisisState = INITIAL_STATE, action: ProduccionAnalisisAction): ProduccionAnalisisState => {
   switch (action.type) {
   case '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms loading':
      return { ...state, rptTiempoPromedioAnalisis: { loading: true, data: [], error: null } }
   case '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms success':
      return { ...state, rptTiempoPromedioAnalisis: { loading: false, data: action.payload, error: null } }
   case '[Producción-Analisis] GetRptTiempoPromedioAnalisisByParms error':
      return { ...state, rptTiempoPromedioAnalisis: { loading: false, data: [], error: action.payload } }
   case '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista loading':
      return { ...state, rptProduccionHoraLaboral: { loading: true, data: [], error: null } }
   case '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista success':
      return { ...state, rptProduccionHoraLaboral: { loading: false, data: action.payload, error: null } }
   case '[Producción-Analisis] getRptProduccionHorasLaboralesPorAnalista error':
      return { ...state, rptProduccionHoraLaboral: { ...state.rptProduccionHoraLaboral, loading: false, error: action.payload } }
   default:
      return state
   }
}
