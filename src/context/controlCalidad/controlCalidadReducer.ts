import { ControlCalidadProviderState } from './ControlCalidadProvider'

import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, CtrlCalCamposAnalisis, RegistroTablaDinamicaDto } from 'interfaces'

type ControlcalidadAction =
   | { type: '[asigsGrupoCamposAnalisisTmp] Save', payload: AsigGrupoCamposAnalisisDto[] }
   | { type: '[asigGrupoCamposAnalisisTmp] Save', payload: AsigGrupoCamposAnalisisDto }
   | { type: '[filteredAsigsGrupoCamposAnalisisTmp] Save', payload: AsigGrupoCamposAnalisisDto[] }
   | { type: '[filterListAsigsTmp] Save', payload: Pick<AsigGrupoCamposAnalisis, 'fecIniAsignacion' | 'fecFinAsignacion' | 'ctrlCalConforme'> }
   | { type: '[ctrlsCalCamposAnalisisTmp] Save', payload: CtrlCalCamposAnalisis[] }
   | { type: '[ctrlCalCamposAnalisisTmp] Save', payload: CtrlCalCamposAnalisis }
   | { type: '[tablaCtrlCalidadTmp] Save', payload: RegistroTablaDinamicaDto[] }
   | { type: '[registroCtrlCalidadTmp] Save', payload: RegistroTablaDinamicaDto }

export const controlCalidadReducer = (state: ControlCalidadProviderState, action: ControlcalidadAction): ControlCalidadProviderState => {
   switch (action.type) {
   case '[asigsGrupoCamposAnalisisTmp] Save':
      return { ...state, asigsGrupoCamposAnalisisTmp: action.payload }
   case '[asigGrupoCamposAnalisisTmp] Save':
      return { ...state, asigGrupoCamposAnalisisTmp: action.payload }
   case '[filteredAsigsGrupoCamposAnalisisTmp] Save':
      return { ...state, filteredAsigsGrupoCamposAnalisisTmp: action.payload }
   case '[ctrlsCalCamposAnalisisTmp] Save':
      return { ...state, ctrlsCalCamposAnalisisTmp: action.payload }
   case '[ctrlCalCamposAnalisisTmp] Save':
      return { ...state, ctrlCalCamposAnalisisTmp: action.payload }
   case '[filterListAsigsTmp] Save':
      return { ...state, filterListAsigsTmp: action.payload }
   case '[tablaCtrlCalidadTmp] Save':
      return { ...state, tablaCtrlCalidadTmp: action.payload }
   case '[registroCtrlCalidadTmp] Save':
      return { ...state, registroCtrlCalidadTmp: action.payload }
   default:
      return state
   }
}
