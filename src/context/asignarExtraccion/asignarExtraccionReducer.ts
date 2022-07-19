
import { AsignarExtraccionState } from './AsignarExtraccionProvider'

import { AsigGrupoCamposAnalisis, GrupoCamposAnalisis, TablaDinamica } from 'interfaces'

type AsignarExtraccionAction =
   | { type: '[Add] TablaDinamicaTmp', payload: TablaDinamica }
   | { type: '[Add] GruposCamposAnalisisTmp', payload: Array<GrupoCamposAnalisis> }
   | { type: '[Add] GrupoCamposAnalisisTmp', payload: GrupoCamposAnalisis }
   | { type: '[Add] asigsGrupoCamposAnalisisTmp', payload: Array<AsigGrupoCamposAnalisis> }
   | { type: '[Add] totalAsigsByGrupoTmp', payload: number }
   | { type: '[Add] totalUsrsToAsigMasivaTmp', payload: number }
   | { type: '[Add] rangosToAsigMasivaTmp', payload: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] }
   | { type: '[Remove] rangosToAsigMasivaTmp' }

export const asignarExtraccionReducer = (state: AsignarExtraccionState, action: AsignarExtraccionAction): AsignarExtraccionState => {
   switch (action.type) {
   case '[Add] TablaDinamicaTmp':
      return { ...state, tablaDinamicaTmp: action.payload }
   case '[Add] GruposCamposAnalisisTmp':
      return { ...state, gruposCamposAnalisisTmp: action.payload }
   case '[Add] GrupoCamposAnalisisTmp':
      return { ...state, grupoCamposAnalisisTmp: action.payload }
   case '[Add] asigsGrupoCamposAnalisisTmp':
      return { ...state, asigsGrupoCamposAnalisisTmp: action.payload }
   case '[Add] totalAsigsByGrupoTmp':
      return { ...state, totalAsigsByGrupoTmp: action.payload }
   case '[Add] totalUsrsToAsigMasivaTmp':
      return { ...state, totalUsrsToAsigMasivaTmp: action.payload }
   case '[Add] rangosToAsigMasivaTmp':
      return { ...state, rangosToAsigMasivaTmp: action.payload }
   case '[Remove] rangosToAsigMasivaTmp':
      return { ...state, rangosToAsigMasivaTmp: [] }
   default:
      return state
   }
}
