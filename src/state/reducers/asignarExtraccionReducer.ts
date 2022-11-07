import { AsignarExtraccionAction } from 'state/actions'

import { TablaDinamicaDto } from 'interfaces'

type AsignarExtraccionState = {
   tablaDinamica:{
      loading: boolean
      data: Array<TablaDinamicaDto>
      error: string | null
   }
}

const INITIAL_STATE: AsignarExtraccionState = {
   tablaDinamica: {
      loading: false,
      data: [],
      error: null
   }
}

export const asignarExtraccionReducer = (state: AsignarExtraccionState = INITIAL_STATE, action: AsignarExtraccionAction): AsignarExtraccionState => {
   switch (action.type) {
   case '[Asignar-Extracción] Asignar usuario a grupo de analisis loading':
   case '[Asignar-Extracción] findTablaDinamicaByUsrCreador loading':
   case '[Asignar-Extracción] Eliminar asignación de grupo analisis loading':
   case '[Asignar-Extracción] Reasign to grupo analisis loading':
      return { ...state, tablaDinamica: { ...state.tablaDinamica, loading: true, error: null } }
   case '[Asignar-Extracción] Asignar usuario a grupo de analisis success':
   case '[Asignar-Extracción] Eliminar asignación de grupo analisis success':
   case '[Asignar-Extracción] Reasign to grupo analisis success':
      return { ...state, tablaDinamica: { ...state.tablaDinamica, loading: false, error: null } }
   case '[Asignar-Extracción] Asignar usuario a grupo de analisis error':
   case '[Asignar-Extracción] findTablaDinamicaByUsrCreador error':
   case '[Asignar-Extracción] Eliminar asignación de grupo analisis error':
   case '[Asignar-Extracción] Reasign to grupo analisis error':
      return { ...state, tablaDinamica: { ...state.tablaDinamica, loading: false, error: action.payload } }
   case '[Asignar-Extracción] findTablaDinamicaByUsrCreador success':
      return { ...state, tablaDinamica: { loading: false, data: action.payload, error: null } }
   default:
      return state
   }
}
