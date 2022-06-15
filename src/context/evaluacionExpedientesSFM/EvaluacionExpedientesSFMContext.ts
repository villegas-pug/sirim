import { createContext } from 'react'

import { EvaluarSolicitudSFM } from 'interfaces'

import { EvaluacionExpedientesSFMState, TipoOpinion } from 'context/evaluacionExpedientesSFM'

interface EvaluacionExpedientesSFMContextType extends EvaluacionExpedientesSFMState {
   handleSaveEvaluarSolicitudSFMTmp: (evaluarSolicitudDFM: Partial<EvaluarSolicitudSFM>) => void
   handleAddToOpinionSolicitudTmp: (opinion: string, tipo: TipoOpinion) => void
   handleRemoveInOpinionSolicitudTmp: (opinion: string, tipo: TipoOpinion) => void
}

export const EvaluacionExpedientesSFMContext = createContext({} as EvaluacionExpedientesSFMContextType)
