import { BaseDatos, MetaCampoTablaDinamica, TablaDinamica } from 'interfaces'
import { ExtraccionAction } from 'state/actions'

type ExtraccionState = {
   loading: boolean
   data: TablaDinamica[]
   error: string | null
   camposTablaDinamica: {
      loading: boolean
      data: Array<MetaCampoTablaDinamica>
      error: string | null
   }
   tablaDinamica: {
      loading: boolean
      totalRegistros: number
      data: any[]
      error: string | null
   },
   basesDatos: {
      loading: boolean
      data: Array<BaseDatos>
      error: string | null
   },
   extraccion: {
      loading: boolean
      totalRegistros?: number
      data: Array<Object>
      error: string | null
   },
   depuracion: {
      loading: boolean
      data: Array<Object>
      error: string | null
   },
   dnv: {
      loading: boolean
      data: Array<any>
      error: string | null
   }
}

const initialState: ExtraccionState = {
   loading: false,
   data: [],
   error: null,
   camposTablaDinamica: {
      loading: false,
      data: [],
      error: null
   },
   tablaDinamica: {
      loading: false,
      totalRegistros: 0,
      data: [],
      error: null
   },
   basesDatos: {
      loading: false,
      data: [],
      error: null
   },
   extraccion: {
      loading: false,
      totalRegistros: 0,
      data: [],
      error: null
   },
   depuracion: {
      loading: false,
      data: [],
      error: null
   },
   dnv: {
      loading: false,
      data: [],
      error: null
   }
}

export const extraccionReducer = (state: ExtraccionState = initialState, action: ExtraccionAction): ExtraccionState => {
   switch (action.type) {
   case '[Extracción] Create new table loading':
   case '[Extracción] Find all tabla dinámica loading':
   case '[Extracción] Save grupo analisis loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Extracción] Create new table success':
   case '[Extracción] Find all tabla dinámica success':
   case '[Extracción] Save grupo analisis success':
      return { ...state, loading: false, data: action.payload, error: null }
   case '[Extracción] Create new table error':
   case '[Extracción] Find all tabla dinamica error':
   case '[Extracción] Save grupo analisis error':
      return { ...state, loading: false, data: [], error: action.payload }
   case '[Extracción] Update name tabla loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Extracción] Update name tabla success':
      return { ...state, loading: false, data: action.payload, error: null }
   case '[Extracción] Update name tabla error':
      return { ...state, loading: false, data: [], error: action.payload }
   case '[Extracción] Delete tabla loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Extracción] Delete tabla success':
      return { ...state, loading: false, data: action.payload, error: null }
   case '[Extracción] Delete tabla error':
      return { ...state, loading: false, data: [], error: action.payload }
   case '[Extracción] Alter tabla loading':
   case '[Extracción] Find metadatos extracción loading':
      return { ...state, camposTablaDinamica: { loading: true, data: [], error: null } }
   case '[Extracción] Alter tabla success':
   case '[Extracción] Find metadatos extracción success':
      return { ...state, camposTablaDinamica: { loading: false, data: action.payload, error: null } }
   case '[Extracción] Alter tabla error':
   case '[Extracción] Find metadatos extracción error':
      return { ...state, camposTablaDinamica: { loading: false, data: [], error: action.payload } }
   case '[Extracción] Upload extracción loading':
      return { ...state, tablaDinamica: { loading: true, totalRegistros: 0, data: [], error: null } }
   case '[Extracción] Upload extracción success':
      return { ...state, tablaDinamica: { loading: false, totalRegistros: action.payload, data: [], error: null } }
   case '[Extracción] Upload extracción error':
      return { ...state, tablaDinamica: { loading: false, totalRegistros: 0, data: [], error: action.payload } }
   case '[Extracción] Find all bases de datos Migraciones loading':
   case '[Extracción] Save queryString loading':
   case '[Extracción] Delete queryString loading':
      return { ...state, basesDatos: { loading: true, data: [], error: null } }
   case '[Extracción] Find all bases de datos Migraciones success':
   case '[Extracción] Save queryString success':
   case '[Extracción] Delete queryString success':
      return { ...state, basesDatos: { loading: false, data: action.payload, error: null } }
   case '[Extracción] Find all bases de datos Migraciones error':
   case '[Extracción] Save queryString error':
   case '[Extracción] Delete queryString error':
      return { ...state, basesDatos: { loading: false, data: [], error: action.payload } }
   case '[Extracción] Dynamic-Join-Statement loading':
      return { ...state, extraccion: { ...state.extraccion, loading: true, error: null } }
   case '[Extracción] Dynamic-Join-Statement success':
      return { ...state, extraccion: { ...state.extraccion, loading: false, data: action.payload, error: null } }
   case '[Extracción] Dynamic-Join-Statement error':
      return { ...state, extraccion: { ...state.extraccion, loading: false, error: action.payload } }
   case '[Extracción] Remove-All Extracción Download':
      return { ...state, extraccion: { ...state.extraccion, loading: false, data: [], error: null } }
   case '[Extracción] Update queryString loading':
      return { ...state, basesDatos: { ...state.basesDatos, loading: true, error: null } }
   case '[Extracción] Update queryString success':
      return { ...state, basesDatos: { loading: false, data: action.payload, error: null } }
   case '[Extracción] Update queryString error':
      return { ...state, basesDatos: { ...state.basesDatos, loading: false, error: action.payload } }
   case '[Extracción] Find all dnv by params loading':
      return { ...state, dnv: { loading: true, data: [], error: null } }
   case '[Extracción] Find all dnv by params success':
      return { ...state, dnv: { loading: false, data: action.payload, error: null } }
   case '[Extracción] Find all dnv by params error':
      return { ...state, dnv: { loading: false, data: [], error: action.payload } }
   case '[Extracción] Find tabla dinámica by suffix loading':
      return { ...state, depuracion: { loading: true, data: [], error: null } }
   case '[Extracción] Find tabla dinámica by suffix success':
      return { ...state, depuracion: { loading: false, data: action.payload, error: null } }
   case '[Extracción] Find tabla dinámica by suffix error':
      return { ...state, depuracion: { loading: false, data: [], error: action.payload } }
   case '[Extracción] Remove-All Depuración':
      return { ...state, depuracion: { loading: false, data: [], error: null } }
   case '[Extracción] Count tabla by nombre loading':
      return { ...state, extraccion: { ...state.extraccion, loading: true, error: null } }
   case '[Extracción] Count tabla by nombre success':
      return { ...state, extraccion: { ...state.extraccion, totalRegistros: action.payload, loading: false, error: null } }
   case '[Extracción] Count tabla by nombre error':
      return { ...state, extraccion: { ...state.extraccion, loading: false, error: action.payload } }
   default:
      return state
   }
}
