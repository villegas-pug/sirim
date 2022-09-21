import { createContext, useContext } from 'react'

import { CrearTipoLogicoState } from './CrearTipoLogicoProvider'

import { TipoLogico } from 'interfaces/TipoLogico'
import { Action } from 'types'

interface CrearTipoLogicoContextProps extends CrearTipoLogicoState {
  handleActionTipoLogicoTmp: (action: Action, tipoLogico?: TipoLogico) => void
}

export const CrearTipoLogicoContext = createContext({} as CrearTipoLogicoContextProps)

export const useCrearTipoLogicoContext = () => useContext(CrearTipoLogicoContext)
