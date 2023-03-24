import { FC, ReactElement, useEffect, useReducer } from 'react'

import { AnalizarExtraccionContext } from './AnalizarExtraccionContext'
import { analizarExtraccionReducer } from './analizarExtraccionReducer'

import { RegistroTablaDinamicaDto, AsigGrupoCamposAnalisisDto } from 'interfaces'
import { useAnalizarExtraccion } from 'hooks'
import { Action } from 'types'

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

   // ► Custom Hook's ...
   const { tablaAsignadaDb, asigGrupoCamposAnalisisDb } = useAnalizarExtraccion()

   useEffect(() => { // ► Update `tmp`: Si tmp `asigGrupoCamposAnalisisTmp` cambia, actualiza `tablaAsignadaTmp` ...
      if (Object.entries(asigGrupoCamposAnalisisDb).length === 0) return
      if (tablaAsignadaDb.length === 0) return

      dispatch({
         type: '[tablaAsignadaTmp] Save tabla dinámica asignada',
         payload: assignPropsToTablaAsignada(asigGrupoCamposAnalisisDb, tablaAsignadaDb)
      })
   }, [asigGrupoCamposAnalisisDb, tablaAsignadaDb])

   // ► Handler's ...
   const handleChangePage = (page: AnalizarExtraccionBandeja) => {
      dispatch({ type: '[Bandeja] Change page', payload: page })
   }

   const handleSaveAsigGrupoCamposAnalisisTmp = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto) => {
      dispatch({ type: '[asigGrupoCamposAnalisisTmp] Save grupo asignado de Campos de analisis', payload: asigGrupoCamposAnalisis })
   }

   const handleActionRegistroDinamicoAsignadoTmp = (action: Action, registroDinamicoAsignadoTmp?: RegistroTablaDinamicaDto, filterId?: number) => {
      let payload = {} as RegistroTablaDinamicaDto
      switch (action) {
      case 'SAVE':
         payload = registroDinamicoAsignadoTmp!
         break
      case 'FILTER':
         payload = tablaAsignadaDb.find(({ nId }) => nId === filterId) || {} as RegistroTablaDinamicaDto
         break
      }

      dispatch({ type: '[registroDinamicoAsignadoTmp] Save registro dinámico asignado', payload })
   }

   return (
      <AnalizarExtraccionContext.Provider value={{
         ...state,
         handleChangePage,
         handleSaveAsigGrupoCamposAnalisisTmp,
         handleActionRegistroDinamicoAsignadoTmp
      } }>
         { children }
      </AnalizarExtraccionContext.Provider>
   )
}

/* ► Private - Method's ... */
type SomeFieldsFromProduccionAnalisis = { [key: number]: Pick<RegistroTablaDinamicaDto, 'idProdAnalisis' | 'fechaAnalisis' | 'analizado' | 'terminado' | 'hasFieldError' | 'metaFieldIdErrorCsv' | 'observacionesCtrlCal'> }
const assignPropsToTablaAsignada = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto, tablaAsignada: RegistroTablaDinamicaDto[]): RegistroTablaDinamicaDto[] => {
   // ► Dep's: ...
   if (Object.entries(asigGrupoCamposAnalisis).length === 0) return []
   const someFieldsFromProduccionAnalisis: SomeFieldsFromProduccionAnalisis =
   asigGrupoCamposAnalisis?.produccionAnalisis.reduce((map, prod) => {
      map[prod.idRegistroAnalisis] = {
         idProdAnalisis: prod.idProdAnalisis,
         fechaAnalisis: prod.fechaFin || '',
         analizado: prod.completo,
         terminado: prod.terminado,
         hasFieldError: prod.revisado && Boolean(prod.metaFieldIdErrorCsv),
         metaFieldIdErrorCsv: prod.metaFieldIdErrorCsv,
         observacionesCtrlCal: prod.observacionesCtrlCal
      }
      return map
   }, {} as SomeFieldsFromProduccionAnalisis)

   // ► ...
   return tablaAsignada.map((record, i) => ({ ...record, ...someFieldsFromProduccionAnalisis[record.nId], nro: i + 1 }))
}
