import { AnalizarExtraccionAction } from 'state/actions/analizarExtraccionAction'

import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamica } from 'interfaces'

type AnalisarExtraccionState = {
   asignacion: {
      loading: boolean
      data: Array<AsigGrupoCamposAnalisisDto>
      tabla: Array<RegistroTablaDinamica>
      error: string | null
   }
}

const INITIAL_STATE: AnalisarExtraccionState = {
   asignacion: {
      loading: false,
      data: [],
      tabla: [],
      error: null
   }
}

export const analizarExtraccionReducer = (state: AnalisarExtraccionState = INITIAL_STATE, action: AnalizarExtraccionAction): AnalisarExtraccionState => {
   switch (action.type) {
   case '[Analizar-Extracción] Find asignaciones by usuario loading':
      return { ...state, asignacion: { ...state.asignacion, loading: true, data: [], error: null } }
   case '[Analizar-Extracción] Find asignaciones by usuario success':
      return { ...state, asignacion: { ...state.asignacion, loading: false, data: action.payload, error: null } }
   case '[Analizar-Extracción] Find asignaciones by usuario error':
      return { ...state, asignacion: { ...state.asignacion, loading: false, data: [], error: action.payload } }
   case '[Analizar-Extracción] Find tabla dinamica by rango of ids loading':
   case '[Analizar-Extracción] Save record assigned loading':
      return { ...state, asignacion: { ...state.asignacion, loading: true, tabla: [], error: null } }
   case '[Analizar-Extracción] Find tabla dinamica by rango of ids success':
   case '[Analizar-Extracción] Save record assigned success':
      return { ...state, asignacion: { ...state.asignacion, loading: false, tabla: action.payload, error: null } }
   case '[Analizar-Extracción] Find tabla dinamica by rango of ids error':
   case '[Analizar-Extracción] Save record assigned error':
      return { ...state, asignacion: { ...state.asignacion, loading: false, tabla: [], error: action.payload } }
   case '[Analizar-Extracción] Download analisados by dates loading':
   case '[Analizar-Extracción] Download reporte mensual de producción loading':
      return { ...state, asignacion: { ...state.asignacion, loading: true } }
   case '[Analizar-Extracción] Download analisados by dates success':
   case '[Analizar-Extracción] Download reporte mensual de producción success':
      return { ...state, asignacion: { ...state.asignacion, loading: false } }
   case '[Analizar-Extracción] Download analisados by dates error':
   case '[Analizar-Extracción] Download reporte mensual de producción error':
      return { ...state, asignacion: { ...state.asignacion, loading: false, error: action.payload } }
   default:
      return state
   }
}
