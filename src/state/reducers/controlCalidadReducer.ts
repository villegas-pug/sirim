import { ControlCalidadAction } from 'state/actions'

import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamicaDto } from 'interfaces'

type ControlCalidadReducerState = {
   loading: boolean
   data: [],
   tabla: Array<RegistroTablaDinamicaDto>
   asig: AsigGrupoCamposAnalisisDto
   error: string | null
}

const INITIAL_STATE: ControlCalidadReducerState = {
   loading: false,
   data: [],
   tabla: [],
   asig: {} as AsigGrupoCamposAnalisisDto,
   error: null
}

export const controlCalidadReducer = (state: ControlCalidadReducerState = INITIAL_STATE, action: ControlCalidadAction): ControlCalidadReducerState => {
   switch (action.type) {
   case '[Control-Calidad] Generate records to Control Calidad loading':
      return { ...state, loading: true, data: [], error: null }
   case '[Control-Calidad] Generate records to Control Calidad success':
      return { ...state, loading: false, data: [], error: null }
   case '[Control-Calidad] Generate records to Control Calidad error':
      return { ...state, loading: false, data: [], error: action.payload }
   case '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds loading':
   case '[Control-Calidad] validateRecordAssigned loading':
      return { ...state, loading: true, tabla: [], error: null }
   case '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds success':
   case '[Control-Calidad] validateRecordAssigned success':
      return { ...state, loading: false, tabla: action.payload, error: null }
   case '[Control-Calidad] findTablaDinamicaByIdCtrlCalAndIds error':
   case '[Control-Calidad] validateRecordAssigned error':
      return { ...state, loading: false, tabla: [], error: action.payload }
   case '[Control-Calidad] saveMetaFieldIdErrorCsv loading':
   case '[Control-Calidad] setValidationResultOfCtrlCal loading':
      return { ...state, loading: true }
   case '[Control-Calidad] saveMetaFieldIdErrorCsv success':
   case '[Control-Calidad] setValidationResultOfCtrlCal success':
      return { ...state, loading: false }
   case '[Control-Calidad] saveMetaFieldIdErrorCsv error':
   case '[Control-Calidad] setValidationResultOfCtrlCal error':
      return { ...state, loading: false, error: action.payload }
   case '[Control-Calidad] findAsigGrupoCamposAnalisisById loading':
      return { ...state, loading: true, error: null }
   case '[Control-Calidad] findAsigGrupoCamposAnalisisById success':
      return { ...state, loading: false, asig: action.payload, error: null }
   case '[Control-Calidad] findAsigGrupoCamposAnalisisById error':
      return { ...state, loading: false, error: action.payload }
   default:
      return state
   }
}
