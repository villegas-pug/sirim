import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, CtrlCalCamposAnalisis, Usuario } from 'interfaces'
import { createContext, useContext } from 'react'

import { Action, ControlCalidadProviderState } from './ControlCalidadProvider'

interface ControlCalidadContextProps extends ControlCalidadProviderState {
   handleActionAsigsGrupoCamposAnalisisTmp: (action: Action, usrAnalista?: Usuario) => void
   handleActionAsigGrupoCamposAnalisisTmp: (action: Action, asig?: AsigGrupoCamposAnalisisDto) => void
   handleActionFilteredAsigsGrupoCamposAnalisisTmp: (action: Action, filtro?: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>) => void
   handleActionCtrlsCalCamposAnalisis: (action: Action, ctrlsCal?: CtrlCalCamposAnalisis[]) => void
   handleActionFilterListAsigsTmp: (action: Action, params?: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>) => void
}

export const ControlCalidadContext = createContext({} as ControlCalidadContextProps)

export const useControlCalidadContext = () => useContext(ControlCalidadContext)
