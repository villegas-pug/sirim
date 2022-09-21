import { ExtraccionDatosProviderState } from 'context/extraccionDatos'

import { BaseDatos, Modulo, Tabla } from 'interfaces'

type ExtraccionDatosAction =
| { type: 'saveBaseDatosTmp', payload: BaseDatos }
| { type: 'saveModuloTmp', payload: Modulo }
| { type: 'saveTablaTmp', payload: Tabla }
| { type: 'saveCamposTmp', payload: Array<string> }
| { type: 'saveCamposSeleccionadosTmp', payload: { [key: string]: string } }
| { type: 'cleanCamposSeleccionadosTmp' }

export const extraccionDatosReducer = (state: ExtraccionDatosProviderState, action: ExtraccionDatosAction): ExtraccionDatosProviderState => {
   switch (action.type) {
   case 'saveBaseDatosTmp':
      return { ...state, baseDatosTmp: action.payload }
   case 'saveModuloTmp':
      return { ...state, moduloTmp: action.payload }
   case 'saveTablaTmp':
      return { ...state, tablaTmp: action.payload }
   case 'saveCamposTmp':
      return { ...state, camposTmp: action.payload }
   case 'saveCamposSeleccionadosTmp':
      return { ...state, camposSeleccionadosTmp: action.payload }
   case 'cleanCamposSeleccionadosTmp':
      return { ...state, camposSeleccionadosTmp: {} }
   default:
      return state
   }
}
