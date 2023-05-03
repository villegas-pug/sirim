import { createContext, useContext } from 'react'

import { AsignarExtraccionState } from './AsignarExtraccionProvider'
import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, GrupoCamposAnalisis, TablaDinamica } from 'interfaces'
import { Action } from 'types'

interface AsignarExtraccionContextProps extends AsignarExtraccionState {
   handleAddTablaDinamicaTmp: (action: Action, tablaDinamica?: TablaDinamica) => void
   handleAddGruposCamposAnalisisTmp: (gruposCamposAnalisisTmp: GrupoCamposAnalisis[]) => void
   handleAddGrupoCamposAnalisisTmp: (grupoCamposAnalisisTmp: GrupoCamposAnalisis) => void
   handleAddAsigsGrupoCamposAnalisisTmp: (action: Action, asigsGrupoCamposAnalisisTmp?: AsigGrupoCamposAnalisisDto[]) => void
   handleActionParamsToAsigMasivaTmp: (action: Action, paramsToAsigMasiva?: { totalAnalistas: number, regPorAnalista: number }) => void
   handleRangosToAsigMasivaTmp: (action: Action, rangos?: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]) => void
   handleActionFilterListAsigsTmp: (action: Action, params?: Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>) => void
   handleActionFilteredAsigsGrupoCamposAnalisisTmp: (action: Action, filtro?: Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>) => void
}

export const AsignarExtraccionContext = createContext({} as AsignarExtraccionContextProps)

export const useAsignarExtraccionContext = () => useContext(AsignarExtraccionContext)
