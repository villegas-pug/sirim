import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, CtrlCalCamposAnalisis, RegistroTablaDinamicaDto, Usuario } from 'interfaces'
import { createContext, useContext } from 'react'

import { Action, ControlCalidadProviderState } from './ControlCalidadProvider'

interface ControlCalidadContextProps extends ControlCalidadProviderState {
   handleActionAsigsGrupoCamposAnalisisTmp: (action: Action, usrAnalista?: Usuario) => void
   handleActionAsigGrupoCamposAnalisisTmp: (action: Action, asig?: AsigGrupoCamposAnalisisDto) => void
   handleActionFilteredAsigsGrupoCamposAnalisisTmp: (action: Action, filtro?: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>) => void
   handleActionCtrlsCalCamposAnalisisTmp: (action: Action, ctrlsCal?: CtrlCalCamposAnalisis[]) => void
   handleActionCtrlCalCamposAnalisisTmp: (action: Action, ctrlCal?: CtrlCalCamposAnalisis) => void
   handleActionFilterListAsigsTmp: (action: Action, params?: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>) => void
   handleActionRegistroCtrlCalidadTmp: (action: Action, registroCtrlCalidad?: RegistroTablaDinamicaDto) => void
}

export const ControlCalidadContext = createContext({} as ControlCalidadContextProps)

export const useControlCalidadContext = () => useContext(ControlCalidadContext)
