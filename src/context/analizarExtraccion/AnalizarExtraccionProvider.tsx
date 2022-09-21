import { FC, ReactElement, useEffect, useReducer } from 'react'

import { AnalizarExtraccionContext } from './AnalizarExtraccionContext'
import { analizarExtraccionReducer } from './analizarExtraccionReducer'

import { RegistroTablaDinamica, AsigGrupoCamposAnalisisDto } from 'interfaces'
import { useAnalizarExtraccion } from 'hooks'

export type AnalizarExtraccionBandeja = 'ENTRADA' | 'ANALISIS'

export interface AnalizarExtraccionState {
   bandeja: AnalizarExtraccionBandeja,
   asigGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto
   tablaAsignadaTmp: RegistroTablaDinamica[]
   registroDinamicoAsignadoTmp: RegistroTablaDinamica
}

const INITIAL_STATE: AnalizarExtraccionState = {
   bandeja: 'ENTRADA',
   asigGrupoCamposAnalisisTmp: {} as AsigGrupoCamposAnalisisDto,
   registroDinamicoAsignadoTmp: {} as RegistroTablaDinamica,
   tablaAsignadaTmp: []
}

type ProviderProps = {
   children: ReactElement | ReactElement[]
}

export const AnalizarExtraccionProvider: FC<ProviderProps> = ({ children }) => {
   /* ► HOOK - STATE ... */
   const [state, dispatch] = useReducer(analizarExtraccionReducer, INITIAL_STATE)

   /* ► CUSTOM - HOOK'S  */
   const { tablaAsignadaDb, asigGrupoCamposAnalisisDb, findAsigAnalisisByUsr } = useAnalizarExtraccion()

   /* » EFFECT'S ...  */
   useEffect(() => { // ► Update `store`: Si store `tablaAsignadaDb` cambia, llama a `findAsigAnalisisByUsr()` ...
      if (tablaAsignadaDb.length === 0) return
      findAsigAnalisisByUsr()
   }, [tablaAsignadaDb])

   useEffect(() => { // ► Update `tmp`: Si store `asigGrupoCamposAnalisisDb` cambia, actualiza `asigGrupoCamposAnalisisTmp` ...
      if (asigGrupoCamposAnalisisDb.length === 0) return
      dispatch({
         type: '[asigGrupoCamposAnalisisTmp] Save grupo asignado de Campos de analisis',
         payload: asigGrupoCamposAnalisisDb.find(asig => asig.idAsigGrupo === state.asigGrupoCamposAnalisisTmp.idAsigGrupo) || {} as AsigGrupoCamposAnalisisDto
      })
   }, [asigGrupoCamposAnalisisDb])

   useEffect(() => { // ► Update `tmp`: Si tmp `asigGrupoCamposAnalisisTmp` cambia, actualiza `tablaAsignadaTmp` ...
      if (tablaAsignadaDb.length === 0) return
      dispatch({
         type: '[tablaAsignadaTmp] Save tabla dinámica asignada',
         payload: assignPropsToTablaAsignada(state.asigGrupoCamposAnalisisTmp, tablaAsignadaDb)
      })
   }, [state.asigGrupoCamposAnalisisTmp])

   /* ► HANDLER'S ... */
   const handleChangePage = (page: AnalizarExtraccionBandeja) => {
      dispatch({ type: '[Bandeja] Change page', payload: page })
   }

   const handleSaveAsigGrupoCamposAnalisisTmp = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto) => {
      dispatch({ type: '[asigGrupoCamposAnalisisTmp] Save grupo asignado de Campos de analisis', payload: asigGrupoCamposAnalisis })
   }

   const handleSaveRegistroDinamicoAsignadoTmp = (registroDinamicoAsignadoTmp: RegistroTablaDinamica) => {
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
type SomeFieldsFromProduccionAnalisis = { [key: number]: Pick<RegistroTablaDinamica, 'fechaAnalisis' | 'analizado'> }
const assignPropsToTablaAsignada = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto, tablaAsignada: RegistroTablaDinamica[]): RegistroTablaDinamica[] => {
   // ► Dep's: ...
   if (Object.entries(asigGrupoCamposAnalisis).length === 0) return []
   const someFieldsFromProduccionAnalisis: SomeFieldsFromProduccionAnalisis =
   asigGrupoCamposAnalisis?.produccionAnalisis.reduce((map, prod) => {
      map[prod.idRegistroAnalisis] = { analizado: prod.completo, fechaAnalisis: prod.fechaFin || '' }
      return map
   }, {} as SomeFieldsFromProduccionAnalisis)

   // ► ...
   return tablaAsignada.map((record, i) => ({ ...record, ...someFieldsFromProduccionAnalisis[record.nId], nro: i + 1 }))
}
