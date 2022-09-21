import { ControlCalidadProviderState } from './ControlCalidadProvider'

import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, CtrlCalCamposAnalisis } from 'interfaces'

type ControlcalidadAction =
   | { type: '[asigsGrupoCamposAnalisisTmp] Save', payload: AsigGrupoCamposAnalisisDto[] }
   | { type: '[asigGrupoCamposAnalisisTmp] Save', payload: AsigGrupoCamposAnalisisDto }
   | { type: '[filteredAsigsGrupoCamposAnalisisTmp] Save', payload: AsigGrupoCamposAnalisisDto[] }
   | { type: '[filterListAsigsTmp] Save', payload: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'> }
   | { type: '[ctrlsCalCamposAnalisis] Save', payload: CtrlCalCamposAnalisis[] }

export const controlCalidadReducer = (state: ControlCalidadProviderState, action: ControlcalidadAction): ControlCalidadProviderState => {
   switch (action.type) {
   case '[asigsGrupoCamposAnalisisTmp] Save':
      return { ...state, asigsGrupoCamposAnalisisTmp: action.payload }
   case '[asigGrupoCamposAnalisisTmp] Save':
      return { ...state, asigGrupoCamposAnalisisTmp: action.payload }
   case '[filteredAsigsGrupoCamposAnalisisTmp] Save':
      return { ...state, filteredAsigsGrupoCamposAnalisisTmp: action.payload }
   case '[ctrlsCalCamposAnalisis] Save':
      return { ...state, ctrlsCalCamposAnalisis: action.payload }
   case '[filterListAsigsTmp] Save':
      return { ...state, filterListAsigsTmp: action.payload }
   default:
      return state
   }
}
