
import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamica } from 'interfaces'
import { AnalizarExtraccionBandeja, AnalizarExtraccionState } from './AnalizarExtraccionProvider'

type AnalizarExtraccionAction =
   | { type: '[Bandeja] Change page', payload: AnalizarExtraccionBandeja }
   | { type: '[asigGrupoCamposAnalisisTmp] Save grupo asignado de Campos de analisis', payload: AsigGrupoCamposAnalisisDto }
   | { type: '[registroDinamicoAsignadoTmp] Save registro dinámico asignado', payload: RegistroTablaDinamica }
   | { type: '[tablaAsignadaTmp] Save tabla dinámica asignada', payload: RegistroTablaDinamica[] }

export const analizarExtraccionReducer = (state: AnalizarExtraccionState, action: AnalizarExtraccionAction): AnalizarExtraccionState => {
   switch (action.type) {
   case '[Bandeja] Change page':
      return { ...state, bandeja: action.payload }
   case '[asigGrupoCamposAnalisisTmp] Save grupo asignado de Campos de analisis':
      return { ...state, asigGrupoCamposAnalisisTmp: action.payload }
   case '[registroDinamicoAsignadoTmp] Save registro dinámico asignado':
      return { ...state, registroDinamicoAsignadoTmp: action.payload }
   case '[tablaAsignadaTmp] Save tabla dinámica asignada':
      return { ...state, tablaAsignadaTmp: action.payload }
   default:
      return state
   }
}
