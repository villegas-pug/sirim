import { FC, ReactElement, useEffect, useReducer } from 'react'

import { AsignarExtraccionContext } from './AsignarExtraccionContext'
import { asignarExtraccionReducer } from './asignarExtraccionReducer'

import { AsigGrupoCamposAnalisis, GrupoCamposAnalisis, TablaDinamica } from 'interfaces'
import { useAsignarExtraccion } from 'hooks'

export interface AsignarExtraccionState {
   tablaDinamicaTmp: TablaDinamica
   gruposCamposAnalisisTmp: Array<GrupoCamposAnalisis>
   grupoCamposAnalisisTmp: GrupoCamposAnalisis
   asigsGrupoCamposAnalisisTmp: Array<AsigGrupoCamposAnalisis>
   totalAsigsByGrupoTmp: number
   totalUsrsToAsigMasivaTmp: number
   rangosToAsigMasivaTmp: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]
}

const INITIAL_STATE: AsignarExtraccionState = {
   tablaDinamicaTmp: {} as TablaDinamica,
   gruposCamposAnalisisTmp: [],
   grupoCamposAnalisisTmp: {} as GrupoCamposAnalisis,
   asigsGrupoCamposAnalisisTmp: [],
   totalAsigsByGrupoTmp: 0,
   totalUsrsToAsigMasivaTmp: 0,
   rangosToAsigMasivaTmp: []
}

export type Actions = 'Add' | 'Remove' | 'Reset'

type ProviderProps = {
   children: ReactElement | Array<ReactElement>
}

export const AsignarExtraccionProvider: FC<ProviderProps> = ({ children }) => {
   /* ► HOOK'S ... */
   const [state, dispatch] = useReducer(asignarExtraccionReducer, INITIAL_STATE)

   /* ► CUSTOM - HOOK'S ... */
   const { tablasDinamicasDb, totalRegistrosTablaDinamica: totalRegistrosTD } = useAsignarExtraccion()

   /* ► EFFECT'S ... */
   useEffect(() => { /* ► Actualizar: `tmp` ... */
      if (tablasDinamicasDb.length === 0) return
      dispatch({
         type: '[Add] GruposCamposAnalisisTmp',
         payload: tablasDinamicasDb.find(({ idTabla }) => idTabla === state.tablaDinamicaTmp.idTabla)?.lstGrupoCamposAnalisis || []
      })
   }, [tablasDinamicasDb])

   useEffect(() => { /* ► Actualizar: `tmp` ... */
      if (Object.entries(state.tablaDinamicaTmp).length === 0) return
      dispatch({
         type: '[Add] GruposCamposAnalisisTmp',
         payload: state.tablaDinamicaTmp.lstGrupoCamposAnalisis || []
      })
   }, [state.tablaDinamicaTmp])

   useEffect(() => { /* ► Actualizar: `tmp` ... */
      if (state.gruposCamposAnalisisTmp.length === 0) return
      dispatch({
         type: '[Add] asigsGrupoCamposAnalisisTmp',
         payload: state.gruposCamposAnalisisTmp.find(({ idGrupo }) => idGrupo === state.grupoCamposAnalisisTmp.idGrupo)?.asigGrupoCamposAnalisis || []
      })
   }, [state.gruposCamposAnalisisTmp])

   useEffect(() => { /* ► Actualizar: `tmp` ... */
      if (state.gruposCamposAnalisisTmp.length === 0) return
      dispatch({
         type: '[Add] GrupoCamposAnalisisTmp',
         payload: state.gruposCamposAnalisisTmp.find(({ idGrupo }) => idGrupo === state.grupoCamposAnalisisTmp.idGrupo) || {} as GrupoCamposAnalisis
      })
   }, [state.gruposCamposAnalisisTmp])

   useEffect(() => { /* ► Actualizar: `tmp`...  */
      dispatch({
         type: '[Add] totalAsigsByGrupoTmp',
         payload: getTotalAssigned(state.asigsGrupoCamposAnalisisTmp)
      })
   }, [state.asigsGrupoCamposAnalisisTmp])

   useEffect(() => { /* ► Actualizar `tmp`: Si cambia `totalUsrsToAsigMasivaTmp`, se actualizan los rangos disponibles ... */
      if (state.totalUsrsToAsigMasivaTmp === 0) return
      dispatch({
         type: '[Add] rangosToAsigMasivaTmp',
         payload: getAvailableRangesOfGroup(state.grupoCamposAnalisisTmp, totalRegistrosTD, state.totalUsrsToAsigMasivaTmp)
      })
   }, [state.totalUsrsToAsigMasivaTmp])

   /* ► HANDLER'S ...  */
   const handleAddTablaDinamicaTmp = (tablaDinamica: TablaDinamica) => {
      dispatch({ type: '[Add] TablaDinamicaTmp', payload: tablaDinamica })
   }

   const handleAddGruposCamposAnalisisTmp = (gruposCamposAnalisisTmp: GrupoCamposAnalisis[]) => {
      dispatch({ type: '[Add] GruposCamposAnalisisTmp', payload: gruposCamposAnalisisTmp })
   }

   const handleAddGrupoCamposAnalisisTmp = (grupoCamposAnalisisTmp: GrupoCamposAnalisis) => {
      dispatch({ type: '[Add] GrupoCamposAnalisisTmp', payload: grupoCamposAnalisisTmp })
   }

   const handleAddAsigsGrupoCamposAnalisisTmp = (asigsGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisis[]) => {
      dispatch({ type: '[Add] asigsGrupoCamposAnalisisTmp', payload: asigsGrupoCamposAnalisisTmp })
   }

   const handleTotalUsrsToAsigMasivaTmp = (action: Actions, totalUsrsToAsigMasiva?: number) => {
      switch (action) {
      case 'Add':
         dispatch({ type: '[Add] totalUsrsToAsigMasivaTmp', payload: totalUsrsToAsigMasiva! })
         break
      case 'Reset':
         dispatch({ type: '[Add] totalUsrsToAsigMasivaTmp', payload: 0 })
         break
      }
   }

   const handleRangosToAsigMasivaTmp = (action: Actions, rangos?: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]) => {
      switch (action) {
      case 'Add':
         dispatch({ type: '[Add] rangosToAsigMasivaTmp', payload: rangos! })
         break
      case 'Remove':
         dispatch({ type: '[Remove] rangosToAsigMasivaTmp' })
         break
      }
   }

   return <AsignarExtraccionContext.Provider value={{
      ...state,
      handleAddGruposCamposAnalisisTmp,
      handleAddGrupoCamposAnalisisTmp,
      handleAddTablaDinamicaTmp,
      handleAddAsigsGrupoCamposAnalisisTmp,
      handleTotalUsrsToAsigMasivaTmp,
      handleRangosToAsigMasivaTmp
   }}>
      { children }
   </AsignarExtraccionContext.Provider>
}

/* ► Custom method's ... */
const getTotalAssigned = (asigsGrupoCamposAnalisis: AsigGrupoCamposAnalisis[]): number => {
   return asigsGrupoCamposAnalisis.reduce((total, { regAnalisisIni, regAnalisisFin }) => {
      const assigned: number = Math.max(regAnalisisFin - regAnalisisIni, 1)
      return total + assigned
   }, 0)
}

const getAvailableRangesOfGroup = ({ asigGrupoCamposAnalisis }: GrupoCamposAnalisis, totalRegistrosTDTmp: number, chunks: number): Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] => {
   /* ► Obtener el ultimo rango asignado ... */
   let ultimoRangoAsignado = asigGrupoCamposAnalisis.reduce((prevRango, nextRangos) => {
      const rangoFin = nextRangos.regAnalisisFin
      return rangoFin >= prevRango ? rangoFin : prevRango
   }, 0)

   const chunkSize = Math.trunc((totalRegistrosTDTmp - ultimoRangoAsignado) / chunks)/* ► Math.trunc: Extrae parte entera ... */
   const availableRangesOfGroup: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] = []

   /* ► Validació: Si `chunkSize` es 0, interrumpe el flujo ...  */
   if (chunkSize === 0) return []

   for (let r = 1; r <= chunks; r++) {
      availableRangesOfGroup.push({ regAnalisisIni: ultimoRangoAsignado + 1, regAnalisisFin: ultimoRangoAsignado + chunkSize })
      ultimoRangoAsignado += chunkSize
   }

   return availableRangesOfGroup
}
