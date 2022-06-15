import { FiscalizacionPosteriorAction } from 'state/actions/fiscalizacionPosteriorAction'
import { FiscalizacionPosteriorStateType } from 'types'

const initialState: FiscalizacionPosteriorStateType = {
   loading: false,
   data: [],
   error: null,
   metadataFilesSolicitud: [],
   tipoTramite: {
      loading: false,
      data: [],
      error: null
   },
   solicitudValues: {
      numeroExpediente: '',
      procedimiento: '',
      administrado: '',
      paisNacionalidad: '',
      domicilio: '',
      distrito: ''
   },
   bandejaEntrada: {
      loading: false,
      data: [],
      error: null
   },
   bandejaEvaluacion: {
      loading: false,
      data: [],
      error: null,
      downloadProgress: {
         loading: false,
         error: null
      }
   }
}

export const fiscalizacionPosteriorReducer = (state = initialState, action: FiscalizacionPosteriorAction): FiscalizacionPosteriorStateType => {
   switch (action.type) {
   case '[Fiscalización-Posterior] Find-All metadata solicitudes loading':
   case '[Fiscalización-Posterior] Save-All file expedientes loading':
      return { ...state, loading: true, metadataFilesSolicitud: [], error: null }
   case '[Fiscalización-Posterior] Find-All metadata solicitudes success':
   case '[Fiscalización-Posterior] Save-All file expedientes success':
      return { ...state, loading: false, metadataFilesSolicitud: action.payload, error: null }
   case '[Fiscalización-Posterior] Find-All metadata solicitudes error':
   case '[Fiscalización-Posterior] Save-All file expedientes error':
      return { ...state, loading: false, metadataFilesSolicitud: [], error: action.payload }
   case '[Tipo-Trámite] Find-All tipo trámites loading':
      return { ...state, tipoTramite: { loading: true, data: [], error: null } }
   case '[Tipo-Trámite] Find-All tipo trámites success':
      return { ...state, tipoTramite: { loading: false, data: action.payload, error: null } }
   case '[Tipo-Trámite] Find-All tipo trámites error':
      return { ...state, tipoTramite: { loading: false, data: [], error: action.payload } }
   case '[Fiscalización-Posterior] Find por número expediente loading':
      return { ...state, loading: true, solicitudValues: {} as any, error: null }
   case '[Fiscalización-Posterior] Find por número expediente success':
      return { ...state, loading: false, solicitudValues: action.payload, error: null }
   case '[Fiscalización-Posterior] Find por número expediente error':
      return { ...state, loading: false, solicitudValues: {} as any, error: null }
   case '[Fiscalización-Posterior] Reset solicitud values':
      return { ...state, solicitudValues: { ...initialState.solicitudValues } }
   case '[Fiscalización-Posterior] Recepcionar expediente loading':
      return { ...state, bandejaEntrada: { loading: true, data: [], error: null } }
   case '[Fiscalización-Posterior] Recepcionar expediente success':
      return {
         ...state,
         bandejaEntrada: { loading: false, data: action.payload, error: null },
         solicitudValues: initialState.solicitudValues
      }
   case '[Fiscalización-Posterior] Recepcionar expediente error':
      return { ...state, bandejaEntrada: { loading: false, data: [], error: action.payload } }
   case '[Fiscalización-Posterior] Find all solicitudes loading':
   case '[Fiscalización-Posterior] Eliminar solicitud loading':
   case '[Fiscalización-Posterior] Asignar evaluador loading':
      return { ...state, bandejaEntrada: { loading: true, data: [], error: null } }
   case '[Fiscalización-Posterior] Find all solicitudes success':
   case '[Fiscalización-Posterior] Eliminar solicitud success':
   case '[Fiscalización-Posterior] Asignar evaluador success':
      return { ...state, bandejaEntrada: { loading: false, data: action.payload, error: null } }
   case '[Fiscalización-Posterior] Find all solicitudes error':
   case '[Fiscalización-Posterior] Eliminar solicitud error':
   case '[Fiscalización-Posterior] Asignar evaluador error':
      return { ...state, bandejaEntrada: { loading: false, data: [], error: action.payload } }
   case '[Fiscalización-Posterior] Find all bandeja evaluación loading':
   case '[Fiscalización-Posterior] Leer asignación loading':
   case '[Fiscalización-Posterior] Save diligencia loading':
   case '[Fiscalización-Posterior] Delete diligencia loading':
   case '[Fiscalización-Posterior] Save file diligencia loading':
   case '[Fiscalización-Posterior] Delete file diligencia loading':
   case '[Fiscalización-Posterior] Update etapa solicitud loading':
   case '[Fiscalización-Posterior] Save opinión loading':
      return { ...state, bandejaEvaluacion: { ...state.bandejaEvaluacion, loading: true, data: [], error: null } }
   case '[Fiscalización-Posterior] Find all bandeja evaluación success':
   case '[Fiscalización-Posterior] Leer asignación success':
   case '[Fiscalización-Posterior] Save diligencia success':
   case '[Fiscalización-Posterior] Delete diligencia success':
   case '[Fiscalización-Posterior] Save file diligencia success':
   case '[Fiscalización-Posterior] Delete file diligencia success':
   case '[Fiscalización-Posterior] Update etapa solicitud success':
   case '[Fiscalización-Posterior] Save opinión success':
      return { ...state, bandejaEvaluacion: { ...state.bandejaEvaluacion, loading: false, data: action.payload, error: null } }
   case '[Fiscalización-Posterior] Find all bandeja evaluación error':
   case '[Fiscalización-Posterior] Leer asignación error':
   case '[Fiscalización-Posterior] Save diligencia error':
   case '[Fiscalización-Posterior] Delete diligencia error':
   case '[Fiscalización-Posterior] Save file diligencia error':
   case '[Fiscalización-Posterior] Delete file diligencia error':
   case '[Fiscalización-Posterior] Update etapa solicitud error':
   case '[Fiscalización-Posterior] Save opinión error':
      return { ...state, bandejaEvaluacion: { ...state.bandejaEvaluacion, loading: false, data: [], error: action.payload } }
   case '[Fiscalización-Posterior] Download file diligencia loading':
      return { ...state, bandejaEvaluacion: { ...state.bandejaEvaluacion, downloadProgress: { loading: true, error: null } } }
   case '[Fiscalización-Posterior] Download file diligencia success':
      return { ...state, bandejaEvaluacion: { ...state.bandejaEvaluacion, downloadProgress: { loading: false, error: null } } }
   case '[Fiscalización-Posterior] Download file diligencia error':
      return { ...state, bandejaEvaluacion: { ...state.bandejaEvaluacion, downloadProgress: { loading: false, error: action.payload } } }
   default:
      return state
   }
}
