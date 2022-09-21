import { TipoLogico } from 'interfaces/TipoLogico'
import { CrearTipoLogicoState } from './CrearTipoLogicoProvider'

type CrearTipoLogicoAction =
   | { type: '[tipoLogicoTmp] Save', payload: TipoLogico }

export const crearTipoLogicoReducer = (state: CrearTipoLogicoState, action: CrearTipoLogicoAction): CrearTipoLogicoState => {
   switch (action.type) {
   case '[tipoLogicoTmp] Save':
      return { ...state, tipoLogicoTmp: action.payload }
   default:
      return state
   }
}
