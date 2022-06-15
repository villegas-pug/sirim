import { EvaluacionExpedientesSFMState, OpinionType } from 'context/evaluacionExpedientesSFM'

import { EvaluarSolicitudSFM } from 'interfaces'

type EvaluacionExpedientesSFMAction =
| { type: 'saveEvaluarSolicitudSFMTmp', payload: Partial<EvaluarSolicitudSFM> }
| { type: 'addToOpinionSolicitudTmp', payload: Partial<OpinionType> }

export const evaluacionExpedientesSFMReducer = (state: EvaluacionExpedientesSFMState, action: EvaluacionExpedientesSFMAction): EvaluacionExpedientesSFMState => {
   switch (action.type) {
   case 'saveEvaluarSolicitudSFMTmp':
      return { ...state, evaluarSolicitudSFMTmp: action.payload }
   case 'addToOpinionSolicitudTmp':
      return { ...state, opinionSolicitudTmp: action.payload }
   default:
      return state
   }
}
