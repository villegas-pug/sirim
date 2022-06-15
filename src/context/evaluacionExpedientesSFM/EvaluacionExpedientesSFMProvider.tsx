import { FC, ReactElement, useEffect, useRef, useCallback, useReducer } from 'react'

import { EvaluarSolicitudSFM } from 'interfaces'

import { EvaluacionExpedientesSFMContext, evaluacionExpedientesSFMReducer } from 'context/evaluacionExpedientesSFM'

export type OpinionType = {
   hallazgo: Array<string>
   recomendacion: Array<string>
}

export type TipoOpinion = 'H' | 'R'

export interface EvaluacionExpedientesSFMState {
   evaluarSolicitudSFMTmp: Partial<EvaluarSolicitudSFM>
   opinionSolicitudTmp: Partial<OpinionType>
}

const INITIAL_STATE: EvaluacionExpedientesSFMState = {
   evaluarSolicitudSFMTmp: {} as EvaluarSolicitudSFM,
   opinionSolicitudTmp: {} as OpinionType
}

type EvaluacionExpedientesSFMProviderProps = {
   children: ReactElement | ReactElement[]
}

export const EvaluacionExpedientesSFMContextProvider: FC<EvaluacionExpedientesSFMProviderProps> = ({ children }) => {
   /* » HOOK'S  */
   const isMounted = useRef(false)
   const [state, dispatch] = useReducer(evaluacionExpedientesSFMReducer, INITIAL_STATE)

   /* » CUSTOM - HOOK'S  */

   /* » EFFECT'S */
   useEffect(() => {
      if (!isMounted.current) return
      dispatch({
         type: 'addToOpinionSolicitudTmp',
         payload: {
            hallazgo: state.evaluarSolicitudSFMTmp.hallazgo?.split(',') || [],
            recomendacion: state.evaluarSolicitudSFMTmp.recomendacion?.split(',') || []
         }
      })
   }, [state.evaluarSolicitudSFMTmp])

   useEffect(() => { isMounted.current = true }, [])

   /* » HANDLER'S  */
   const handleSaveEvaluarSolicitudSFMTmp = (evaluarSolicitudSFM: Partial<EvaluarSolicitudSFM>) => {
      dispatch({ type: 'saveEvaluarSolicitudSFMTmp', payload: evaluarSolicitudSFM })
   }

   const handleAddToOpinionSolicitudTmp = useCallback((opinion: string, tipo: TipoOpinion) => {
      if (!opinion.trim()) return

      const { opinionSolicitudTmp } = state

      switch (tipo) {
      case 'H':
         dispatch({
            type: 'addToOpinionSolicitudTmp',
            payload: { ...opinionSolicitudTmp, hallazgo: [...opinionSolicitudTmp.hallazgo!, opinion] }
         })
         break
      case 'R':
         dispatch({
            type: 'addToOpinionSolicitudTmp',
            payload: { ...opinionSolicitudTmp, recomendacion: [...opinionSolicitudTmp.recomendacion!, opinion] }
         })
         break
      }
   }, [state.opinionSolicitudTmp])

   const handleRemoveInOpinionSolicitudTmp = useCallback((opinion: string, tipo: TipoOpinion) => {
      const { opinionSolicitudTmp } = state

      switch (tipo) {
      case 'H':
         dispatch({
            type: 'addToOpinionSolicitudTmp',
            payload: { ...opinionSolicitudTmp, hallazgo: opinionSolicitudTmp.hallazgo?.filter(h => h !== opinion) }
         })
         break
      case 'R':
         dispatch({
            type: 'addToOpinionSolicitudTmp',
            payload: { ...opinionSolicitudTmp, recomendacion: opinionSolicitudTmp.recomendacion?.filter(r => r !== opinion) }
         })
         break
      }
   }, [state.opinionSolicitudTmp])

   return (
      <EvaluacionExpedientesSFMContext.Provider value={{
         ...state,
         handleSaveEvaluarSolicitudSFMTmp,
         handleAddToOpinionSolicitudTmp,
         handleRemoveInOpinionSolicitudTmp
      }}>
         { children }
      </EvaluacionExpedientesSFMContext.Provider>
   )
}
