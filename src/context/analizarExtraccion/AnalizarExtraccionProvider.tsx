import { FC, ReactElement, useEffect, useReducer } from 'react'

import { AnalizarExtraccionContext } from './AnalizarExtraccionContext'
import { analizarExtraccionReducer } from './analizarExtraccionReducer'

import { RegistroTablaDinamicaDto, AsigGrupoCamposAnalisisDto } from 'interfaces'
import { useAnalizarExtraccion } from 'hooks'

export type AnalizarExtraccionBandeja = 'ENTRADA' | 'ANALISIS'

export interface AnalizarExtraccionState {
   bandeja: AnalizarExtraccionBandeja,
   asigGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto
   tablaAsignadaTmp: RegistroTablaDinamicaDto[]
   registroDinamicoAsignadoTmp: RegistroTablaDinamicaDto
}

const INITIAL_STATE: AnalizarExtraccionState = {
   bandeja: 'ENTRADA',
   asigGrupoCamposAnalisisTmp: {} as AsigGrupoCamposAnalisisDto,
   registroDinamicoAsignadoTmp: {} as RegistroTablaDinamicaDto,
   tablaAsignadaTmp: []
}

export const AnalizarExtraccionProvider: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
   // ► Hook's ...
   const [state, dispatch] = useReducer(analizarExtraccionReducer, INITIAL_STATE)

   // ► CUSTOM - HOOK'S ...
   const { tablaAsignadaDb, asigGrupoCamposAnalisisDb } = useAnalizarExtraccion()

   useEffect(() => { // ► Update `tmp`: Si tmp `asigGrupoCamposAnalisisTmp` cambia, actualiza `tablaAsignadaTmp` ...
      if (Object.entries(asigGrupoCamposAnalisisDb).length === 0) return
      if (tablaAsignadaDb.length === 0) return

      dispatch({
         type: '[tablaAsignadaTmp] Save tabla dinámica asignada',
         payload: assignPropsToTablaAsignada(asigGrupoCamposAnalisisDb, tablaAsignadaDb)
      })
   }, [asigGrupoCamposAnalisisDb, tablaAsignadaDb])

   // ► HANDLER'S ...
   const handleChangePage = (page: AnalizarExtraccionBandeja) => {
      dispatch({ type: '[Bandeja] Change page', payload: page })
   }

   const handleSaveAsigGrupoCamposAnalisisTmp = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto) => {
      dispatch({ type: '[asigGrupoCamposAnalisisTmp] Save grupo asignado de Campos de analisis', payload: asigGrupoCamposAnalisis })
   }

   const handleSaveRegistroDinamicoAsignadoTmp = (registroDinamicoAsignadoTmp: RegistroTablaDinamicaDto) => {
      dispatch({ type: '[registroDinamicoAsignadoTmp] Save registro dinámico asignado', payload: registroDinamicoAsignadoTmp })
   }

   return (
      <AnalizarExtraccionContext.Provider value={{
         ...state,
         handleChangePage,
         handleSaveAsigGrupoCamposAnalisisTmp,
         handleSaveRegistroDinamicoAsignadoTmp
      } }>
         { children }
      </AnalizarExtraccionContext.Provider>
   )
}

/* ► Private - Method's ... */
type SomeFieldsFromProduccionAnalisis = { [key: number]: Pick<RegistroTablaDinamicaDto, 'fechaAnalisis' | 'analizado' | 'hasFieldError' | 'metaFieldIdErrorCsv' | 'observacionesCtrlCal'> }
const assignPropsToTablaAsignada = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto, tablaAsignada: RegistroTablaDinamicaDto[]): RegistroTablaDinamicaDto[] => {
   // ► Dep's: ...
   if (Object.entries(asigGrupoCamposAnalisis).length === 0) return []
   const someFieldsFromProduccionAnalisis: SomeFieldsFromProduccionAnalisis =
   asigGrupoCamposAnalisis?.produccionAnalisis.reduce((map, prod) => {
      map[prod.idRegistroAnalisis] = {
         analizado: prod.completo,
         fechaAnalisis: prod.fechaFin || '',
         hasFieldError: prod.revisado && Boolean(prod.metaFieldIdErrorCsv),
         metaFieldIdErrorCsv: prod.metaFieldIdErrorCsv,
         observacionesCtrlCal: prod.observacionesCtrlCal
      }
      return map
   }, {} as SomeFieldsFromProduccionAnalisis)

   // ► ...
   return tablaAsignada.map((record, i) => ({ ...record, ...someFieldsFromProduccionAnalisis[record.nId], nro: i + 1 }))
}
