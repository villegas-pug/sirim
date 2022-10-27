import { NuevaDepuracionInfState } from 'context/nuevaDepuracionInf'

import { GrupoCamposAnalisis, MetaCampoTablaDinamica, TablaDinamicaDto } from 'interfaces'

type NuevaDepuracionInfAction =
   | { type: 'saveTablaDinamicaDto', payload: Partial<TablaDinamicaDto> }
   | { type: 'saveGruposAnalisisDto', payload: GrupoCamposAnalisis[] }
   | { type: 'saveCamposAnalisisTmp', payload: Array<MetaCampoTablaDinamica> }
   | { type: 'saveGrupoAnalisisTmp', payload: GrupoCamposAnalisis }
   | { type: '[metaFieldInfoTablaDinamicaTmp] Save metaFieldInfoTablaDinamicaTmp', payload: { [key: string]: string } }

export const nuevaDepuracionInfReducer = (state: NuevaDepuracionInfState, action: NuevaDepuracionInfAction): NuevaDepuracionInfState => {
   switch (action.type) {
   case 'saveTablaDinamicaDto':
      return { ...state, tablaDinamicaDto: action.payload }
   case 'saveGruposAnalisisDto':
      return { ...state, gruposAnalisisDto: action.payload }
   case 'saveCamposAnalisisTmp':
      return { ...state, camposAnalisisTmp: action.payload }
   case 'saveGrupoAnalisisTmp':
      return { ...state, grupoAnalisisTmp: action.payload }
   case '[metaFieldInfoTablaDinamicaTmp] Save metaFieldInfoTablaDinamicaTmp':
      return { ...state, metaFieldInfoTablaDinamicaTmp: action.payload }
   default:
      return state
   }
}
