import { FC, ReactElement, useEffect, useReducer } from 'react'

import { ConvenioContext, convenioReducer } from 'context'

import { Convenio, DetConvenio } from 'interfaces'
import { Action } from 'types'

import { useConvenio } from 'hooks'

export interface ConvenioProviderState {
   convenioTmp: Convenio
   detsConvenioTmp: DetConvenio[]
   detConvenioTmp: DetConvenio
}

const INITIAL_STATE: ConvenioProviderState = {
   convenioTmp: {} as Convenio,
   detsConvenioTmp: [],
   detConvenioTmp: {} as DetConvenio
}

export const ConvenioProvider: FC<{ children: ReactElement }> = ({ children }) => {
   // ► Hook's ...
   const [state, dispatch] = useReducer(convenioReducer, INITIAL_STATE)

   // ► Custom hook's ...
   const { conveniosDb } = useConvenio()

   // ► Effect's ...
   useEffect(() => {
      if (conveniosDb.length === 0) return
      dispatch({
         type: '[detsConvenioTmp] Save',
         payload: conveniosDb.find(convenio => convenio.idConvenio === state.convenioTmp.idConvenio)?.detConvenio || []
      })
   }, [conveniosDb])

   // ► handler's ...
   const handleActionConvenioTmp = (action: Action, convenio?: Convenio) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[convenioTmp] Save', payload: convenio! })
         break
      }
   }

   const handleActionDetsConvenioTmp = (action: Action, detsConvenio?: DetConvenio[]) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[detsConvenioTmp] Save', payload: detsConvenio! })
         break
      }
   }

   const handleActionDetConvenioTmp = (action: Action, detConvenio?: DetConvenio) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[detConvenioTmp] Save', payload: detConvenio! })
         break
      }
   }

   return (
      <ConvenioContext.Provider value={ {
         ...state,
         handleActionConvenioTmp,
         handleActionDetsConvenioTmp,
         handleActionDetConvenioTmp
      } }>
         { children }
      </ConvenioContext.Provider>
   )
}
