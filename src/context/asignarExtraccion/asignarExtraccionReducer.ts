
import { AsignarExtraccionState } from './AsignarExtraccionProvider'

import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, GrupoCamposAnalisis, TablaDinamica } from 'interfaces'

type AsignarExtraccionAction =
   | { type: '[Add] TablaDinamicaTmp', payload: TablaDinamica }
   | { type: '[Add] GruposCamposAnalisisTmp', payload: Array<GrupoCamposAnalisis> }
   | { type: '[Add] GrupoCamposAnalisisTmp', payload: GrupoCamposAnalisis }
   | { type: '[Add] asigsGrupoCamposAnalisisTmp', payload: Array<AsigGrupoCamposAnalisisDto> }
   | { type: '[Add] filteredAsigsAnalisisTmp', payload: AsigGrupoCamposAnalisisDto[] }
   | { type: '[Add] filterListAsigsAnalisisTmp', payload: Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'> }
   | { type: '[Add] totalAsigsByGrupoTmp', payload: number }
   | { type: '[Add] paramsToAsigMasivaTmp', payload: { totalAnalistas: number, regPorAnalista: number } }
   | { type: '[Add] rangosToAssignMasivaTmp', payload: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] }
   | { type: '[Remove] rangosToAssignMasivaTmp' }
   | { type: '[Save] rangosAvailableToAssignTmp', payload: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] }

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
   case '[Add] filteredAsigsAnalisisTmp':
      return { ...state, filteredAsigsAnalisisTmp: action.payload }
   case '[Add] filterListAsigsAnalisisTmp':
      return { ...state, filterListAsigsAnalisisTmp: action.payload }
   case '[Add] totalAsigsByGrupoTmp':
      return { ...state, totalAsigsByGrupoTmp: action.payload }
   case '[Add] paramsToAsigMasivaTmp':
      return { ...state, paramsToAsigMasivaTmp: action.payload }
   case '[Add] rangosToAssignMasivaTmp':
      return { ...state, rangosToAssignMasivaTmp: action.payload }
   case '[Remove] rangosToAssignMasivaTmp':
      return { ...state, rangosToAssignMasivaTmp: [] }
   case '[Save] rangosAvailableToAssignTmp':
      return { ...state, rangosAvailableToAssignTmp: action.payload }
   default:
      return state
   }
}
