import { createContext, useContext } from 'react'

import { ConvenioProviderState } from 'context'
import { Action } from 'types'
import { Convenio, DetConvenio } from 'interfaces'

interface ConvenioContextProps extends ConvenioProviderState {
   handleActionConvenioTmp: (action: Action, convenio?: Convenio) => void
   handleActionDetsConvenioTmp: (action: Action, detsConvenio?: DetConvenio[]) => void
   handleActionDetConvenioTmp: (action: Action, detConvenio?: DetConvenio) => void
}

export const ConvenioContext = createContext({} as ConvenioContextProps)

export const useConvenioContext = () => useContext(ConvenioContext)
