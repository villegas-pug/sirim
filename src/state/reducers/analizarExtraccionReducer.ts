import { AnalizarExtraccionAction } from 'state/actions/analizarExtraccionAction'

import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamicaDto } from 'interfaces'

type AnalizarExtraccionState = {
   loading: boolean
   asigs: Array<AsigGrupoCamposAnalisisDto>
   asig: AsigGrupoCamposAnalisisDto
   tabla: Array<RegistroTablaDinamicaDto>
   error: string | null
}

const INITIAL_STATE: AnalizarExtraccionState = {
   loading: false,
   asigs: [],
   asig: {} as AsigGrupoCamposAnalisisDto,
   tabla: [],
   error: null
}

export const analizarExtraccionReducer = (state: AnalizarExtraccionState = INITIAL_STATE, action: AnalizarExtraccionAction): AnalizarExtraccionState => {
   switch (action.type) {
   case '[Analizar-Extracción] Find asignaciones by usuario loading':
      return { ...state, loading: true, error: null }
   case '[Analizar-Extracción] Find asignaciones by usuario success':
      return { ...state, loading: false, asigs: action.payload, error: null }
   case '[Analizar-Extracción] Find asignaciones by usuario error':
      return { ...state, loading: false, error: action.payload }
   case '[Analizar-Extracción] findAsigById loading':
      return { ...state, loading: true, error: null }
   case '[Analizar-Extracción] findAsigById success':
      return { ...state, loading: false, asig: action.payload, error: null }
   case '[Analizar-Extracción] findAsigById error':
      return { ...state, loading: false, error: action.payload }
   case '[Analizar-Extracción] Find tabla dinamica by rango of ids loading':
   case '[Analizar-Extracción] Save record assigned loading':
      return { ...state, loading: true, tabla: [], error: null }
   case '[Analizar-Extracción] Find tabla dinamica by rango of ids success':
   case '[Analizar-Extracción] Save record assigned success':
      return { ...state, loading: false, tabla: action.payload, error: null }
   case '[Analizar-Extracción] Find tabla dinamica by rango of ids error':
   case '[Analizar-Extracción] Save record assigned error':
      return { ...state, loading: false, tabla: [], error: action.payload }
   case '[Analizar-Extracción] Download analisados by dates loading':
   case '[Analizar-Extracción] Download reporte mensual de producción loading':
      return { ...state, loading: true }
   case '[Analizar-Extracción] Download analisados by dates success':
   case '[Analizar-Extracción] Download reporte mensual de producción success':
      return { ...state, loading: false }
   case '[Analizar-Extracción] Download analisados by dates error':
   case '[Analizar-Extracción] Download reporte mensual de producción error':
      return { ...state, loading: false, error: action.payload }
   default:
      return state
   }
}
