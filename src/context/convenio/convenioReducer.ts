
import { ConvenioProviderState } from 'context'

import { Convenio, DetConvenio } from 'interfaces'

type ConvenioAction =
   | { type: '[convenioTmp] Save', payload: Convenio }
   | { type: '[detsConvenioTmp] Save', payload: DetConvenio[] }
   | { type: '[detConvenioTmp] Save', payload: DetConvenio }

export const convenioReducer = (state: ConvenioProviderState, action: ConvenioAction): ConvenioProviderState => {
   switch (action.type) {
   case '[convenioTmp] Save':
      return { ...state, convenioTmp: action.payload }
   case '[detsConvenioTmp] Save':
      return { ...state, detsConvenioTmp: action.payload }
   case '[detConvenioTmp] Save':
      return { ...state, detConvenioTmp: action.payload }
   default:
      return state
   }
}
