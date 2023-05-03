import { FC, ReactElement, useEffect, useReducer } from 'react'

import { format } from 'date-fns'

import { AsignarExtraccionContext } from './AsignarExtraccionContext'
import { asignarExtraccionReducer } from './asignarExtraccionReducer'

import { useAsignarExtraccion } from 'hooks'
import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, GrupoCamposAnalisis, TablaDinamica } from 'interfaces'
import { Action } from 'types'
import { generateArrNumbers, generateArrNumbersFromRange, noty } from 'helpers'
import { messages } from 'constants/'

export interface AsignarExtraccionState {
   tablaDinamicaTmp: TablaDinamica
   gruposCamposAnalisisTmp: Array<GrupoCamposAnalisis>
   grupoCamposAnalisisTmp: GrupoCamposAnalisis
   asigsGrupoCamposAnalisisTmp: Array<AsigGrupoCamposAnalisisDto>
   filteredAsigsAnalisisTmp: Array<AsigGrupoCamposAnalisisDto>
   filterListAsigsAnalisisTmp: Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>
   totalAsigsByGrupoTmp: number
   paramsToAsigMasivaTmp: { totalAnalistas: number, regPorAnalista: number }
   rangosToAssignMasivaTmp: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]
   rangosAvailableToAssignTmp: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]
}

const INITIAL_STATE: AsignarExtraccionState = {
   tablaDinamicaTmp: {} as TablaDinamica,
   gruposCamposAnalisisTmp: [],
   grupoCamposAnalisisTmp: {} as GrupoCamposAnalisis,
   asigsGrupoCamposAnalisisTmp: [],
   filteredAsigsAnalisisTmp: [],
   filterListAsigsAnalisisTmp: {
      fecIniAsignacion: format(new Date(), 'yyyy-MM-dd'),
      fecFinAsignacion: format(new Date(), 'yyyy-MM-dd'),
      completo: false
   } as Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>,
   totalAsigsByGrupoTmp: 0,
   paramsToAsigMasivaTmp: { totalAnalistas: 0, regPorAnalista: 0 } as { totalAnalistas: number, regPorAnalista: number },
   rangosToAssignMasivaTmp: [],
   rangosAvailableToAssignTmp: []
}

type ProviderProps = {
   children: ReactElement | Array<ReactElement>
}

export const AsignarExtraccionProvider: FC<ProviderProps> = ({ children }) => {
   // ► Hook's ...
   const [state, dispatch] = useReducer(asignarExtraccionReducer, INITIAL_STATE)

   // ► Custom hook's ...
   const {
      tablasDinamicasDb,
      /* errorTablaDinamicaDb, */
      totalRegistrosTablaDinamica:
      totalRegistrosTD
      /* findTablaDinamicaByUsrCreador */
   } = useAsignarExtraccion()

   /* useEffect(() => { // ► When request error, call `action-creator` ...
      Boolean(errorTablaDinamicaDb) && findTablaDinamicaByUsrCreador()
   }, [errorTablaDinamicaDb]) */

   // ► Effect's ...
   useEffect(() => { // ► Actualizar: `tmp` ...
      if (tablasDinamicasDb.length === 0) return
      dispatch({
         type: '[Add] GruposCamposAnalisisTmp',
         payload: tablasDinamicasDb.find(({ idTabla }) => idTabla === state.tablaDinamicaTmp.idTabla)?.lstGrupoCamposAnalisis || []
      })
   }, [tablasDinamicasDb])

   useEffect(() => { // ► Actualizar: `tmp` ...
      if (Object.entries(state.tablaDinamicaTmp).length === 0) return
      dispatch({
         type: '[Add] GruposCamposAnalisisTmp',
         payload: state.tablaDinamicaTmp.lstGrupoCamposAnalisis || []
      })
   }, [state.tablaDinamicaTmp])

   useEffect(() => { // ► Actualizar: `tmp` ...
      if (state.gruposCamposAnalisisTmp.length === 0) return
      dispatch({
         type: '[Add] GrupoCamposAnalisisTmp',
         payload: state.gruposCamposAnalisisTmp.find(({ idGrupo }) => idGrupo === state.grupoCamposAnalisisTmp.idGrupo) || {} as GrupoCamposAnalisis
      })
   }, [state.gruposCamposAnalisisTmp])

   useEffect(() => { // ► Actualizar: `tmp` ...
      if (state.gruposCamposAnalisisTmp.length === 0) return
      dispatch({
         type: '[Add] asigsGrupoCamposAnalisisTmp',
         payload: state.gruposCamposAnalisisTmp.find(({ idGrupo }) => idGrupo === state.grupoCamposAnalisisTmp.idGrupo)?.asigGrupoCamposAnalisis || []
      })
   }, [state.gruposCamposAnalisisTmp])

   useEffect(() => { // ► Update `tmp`: When `asigsGrupoCamposAnalisisTmp` change, `filteredAsigsAnalisisTmp` is updated ...
      dispatch({
         type: '[Add] filteredAsigsAnalisisTmp',
         payload: findAsigsGrupoCamposAnalisisByParams(state.asigsGrupoCamposAnalisisTmp, state.filterListAsigsAnalisisTmp)
      })
   }, [state.asigsGrupoCamposAnalisisTmp])

   useEffect(() => { /* ► Actualizar: `tmp`...  */
      dispatch({
         type: '[Add] totalAsigsByGrupoTmp',
         payload: getTotalAssigned(state.asigsGrupoCamposAnalisisTmp)
      })
   }, [state.asigsGrupoCamposAnalisisTmp])

   useEffect(() => { /* ► Actualizar `tmp`: Si cambia `paramsToAsigMasivaTmp`, se actualizan los rangos disponibles ... */
      if (state.paramsToAsigMasivaTmp.totalAnalistas === 0) return
      dispatch({
         type: '[Add] rangosToAssignMasivaTmp',
         payload: generateAvailableRangesFromGroup(
            state.grupoCamposAnalisisTmp,
            totalRegistrosTD,
            state.paramsToAsigMasivaTmp.totalAnalistas,
            state.paramsToAsigMasivaTmp.regPorAnalista
         )
      })
   }, [state.paramsToAsigMasivaTmp])

   useEffect(() => {
      if (Object.entries(state.grupoCamposAnalisisTmp).length === 0) return
      dispatch({
         type: '[Save] rangosAvailableToAssignTmp',
         payload: getAvailableRangesFromGroup(state.grupoCamposAnalisisTmp, totalRegistrosTD)
      })
   }, [state.grupoCamposAnalisisTmp])

   useEffect(() => { // ► Clean-up `tmp`: When change dep's, `filteredAsigsGrupoCamposAnalisisTmp` is reset ...
      handleActionFilteredAsigsGrupoCamposAnalisisTmp('RESET')
   }, [state.tablaDinamicaTmp])

   useEffect(() => { // ► Clean-up `tmp`: When change dep's, `filteredAsigsGrupoCamposAnalisisTmp` is reset ...
      handleAddAsigsGrupoCamposAnalisisTmp('RESET')
   }, [state.tablaDinamicaTmp])

   /* ► HANDLER'S ... */
   const handleAddTablaDinamicaTmp = (action: Action, tablaDinamica?: TablaDinamica) => {
      switch (action) {
      case 'ADD':
         dispatch({ type: '[Add] TablaDinamicaTmp', payload: tablaDinamica! })
         break
      case 'RESET':
         dispatch({ type: '[Add] TablaDinamicaTmp', payload: {} as TablaDinamica })
         break
      default:
         break
      }
   }

   const handleAddGruposCamposAnalisisTmp = (gruposCamposAnalisisTmp: GrupoCamposAnalisis[]) => {
      dispatch({ type: '[Add] GruposCamposAnalisisTmp', payload: gruposCamposAnalisisTmp })
   }

   const handleAddGrupoCamposAnalisisTmp = (grupoCamposAnalisisTmp: GrupoCamposAnalisis) => {
      dispatch({ type: '[Add] GrupoCamposAnalisisTmp', payload: grupoCamposAnalisisTmp })
   }

   const handleAddAsigsGrupoCamposAnalisisTmp = (action: Action, asigsGrupoCamposAnalisisTmp?: AsigGrupoCamposAnalisisDto[]) => {
      switch (action) {
      case 'ADD':
         dispatch({ type: '[Add] asigsGrupoCamposAnalisisTmp', payload: asigsGrupoCamposAnalisisTmp! })
         break
      case 'RESET':
         dispatch({ type: '[Add] asigsGrupoCamposAnalisisTmp', payload: [] })
         break
      default:
         break
      }
   }

   const handleActionParamsToAsigMasivaTmp = (action: Action, paramsToAsigMasiva?: { totalAnalistas: number, regPorAnalista: number }) => {
      switch (action) {
      case 'ADD':
         dispatch({ type: '[Add] paramsToAsigMasivaTmp', payload: paramsToAsigMasiva! })
         break
      case 'RESET':
         dispatch({ type: '[Add] paramsToAsigMasivaTmp', payload: { totalAnalistas: 0, regPorAnalista: 0 } as { totalAnalistas: number, regPorAnalista: number } })
         break
      }
   }

   const handleRangosToAsigMasivaTmp = (action: Action, rangos?: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]) => {
      switch (action) {
      case 'ADD':
         dispatch({ type: '[Add] rangosToAssignMasivaTmp', payload: rangos! })
         break
      case 'REMOVE':
         dispatch({ type: '[Remove] rangosToAssignMasivaTmp' })
         break
      }
   }

   const handleActionFilterListAsigsTmp = (action: Action, params?: Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>): void => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[Add] filterListAsigsAnalisisTmp', payload: params! })
         break
      case 'RESET':
         dispatch({ type: '[Add] filterListAsigsAnalisisTmp', payload: {} as Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'> })
      }
   }

   const handleActionFilteredAsigsGrupoCamposAnalisisTmp = (action: Action, filtro?: Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[Add] filteredAsigsAnalisisTmp', payload: findAsigsGrupoCamposAnalisisByParams(state.asigsGrupoCamposAnalisisTmp, filtro!) })
         break
      case 'RESET':
         dispatch({ type: '[Add] filteredAsigsAnalisisTmp', payload: [] })
         break
      }
   }

   return <AsignarExtraccionContext.Provider value={{
      ...state,
      handleAddGruposCamposAnalisisTmp,
      handleAddGrupoCamposAnalisisTmp,
      handleAddTablaDinamicaTmp,
      handleAddAsigsGrupoCamposAnalisisTmp,
      handleActionParamsToAsigMasivaTmp,
      handleRangosToAsigMasivaTmp,
      handleActionFilteredAsigsGrupoCamposAnalisisTmp,
      handleActionFilterListAsigsTmp
   }}>
      { children }
   </AsignarExtraccionContext.Provider>
}

/* ► Custom method's ... */
const getTotalAssigned = (asigsGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto[]): number => {
   return asigsGrupoCamposAnalisis.reduce((total, { regAnalisisIni, regAnalisisFin }) => {
      const assigned: number = (regAnalisisFin - regAnalisisIni) + 1
      return total + assigned
   }, 0)
}

const generateAvailableRangesFromGroup = ({ asigGrupoCamposAnalisis }: GrupoCamposAnalisis, totalRegistrosTD: number, chunks: number, recordsByChunk: number): Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] => {
   /* ► Dep's: ... */
   // ------------------------------------------------------------------------------------------------------------

   const availableRangesOfGroup: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] = []

   let lastRecordAssigned = asigGrupoCamposAnalisis.reduce((lastRegAsig, nextAsig) => {
      return Math.max(lastRegAsig, nextAsig.regAnalisisFin)
   }, 0)

   // ► Extraer parte entera ...
   const chunkAvailable = totalRegistrosTD - lastRecordAssigned
   const chunksToAssign = chunks * recordsByChunk

   // ------------------------------------------------------------------------------------------------------------

   /* ► Validación ... */
   // ------------------------------------------------------------------------------------------------------------
   if (chunkAvailable === 0 || chunksToAssign > chunkAvailable) {
      noty('error', messages.ASSIGN_NOT_AVAILABLE)
      return []
   }
   // ------------------------------------------------------------------------------------------------------------

   /* ► Gestionar asignación ... */
   // -------------------------------------------------------------------------------------------------------------------------------
   for (let r = 1; r <= chunks; r++) {
      availableRangesOfGroup.push({ regAnalisisIni: lastRecordAssigned + 1, regAnalisisFin: lastRecordAssigned + recordsByChunk })
      lastRecordAssigned += recordsByChunk
   }
   // -------------------------------------------------------------------------------------------------------------------------------

   return availableRangesOfGroup
}

const getAvailableRangesFromGroup = ({ asigGrupoCamposAnalisis }: Partial<GrupoCamposAnalisis>, totalRecordsTD: number): Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[] => {
   /* ► Dep's: Rangos disponible inicial ... */
   let initAvailableRangesCsv: string = generateArrNumbers(totalRecordsTD).toString()

   /* ► Rango disponible actual ... */
   asigGrupoCamposAnalisis?.forEach(({ regAnalisisIni, regAnalisisFin }) => {
      const assignedRangeCsv = generateArrNumbersFromRange(regAnalisisIni, regAnalisisFin)

      /* ► Validación: Los id's asignados, deben ser más de 2 ... */
      if (assignedRangeCsv.length > 2) {
         initAvailableRangesCsv = initAvailableRangesCsv.replace(assignedRangeCsv.toString(), '|')
      }
   })

   return initAvailableRangesCsv
      .split(/\|/g)
      .map(rg => rg.split(',').filter(Boolean))
      .filter(rg => rg.length > 0)
      .map(rg => rg.map(id => parseInt(id)))
      .map(rg => ({ regAnalisisIni: rg.at(0)!, regAnalisisFin: rg.at(-1)! }))
}

type ParamsFiltro = Pick<AsigGrupoCamposAnalisisDto, 'fecIniAsignacion' | 'fecFinAsignacion' | 'completo'>
const findAsigsGrupoCamposAnalisisByParams = (asigs: AsigGrupoCamposAnalisisDto[], filtro: ParamsFiltro): AsigGrupoCamposAnalisisDto[] => {
   // ► Si recibe filtros vacios ...
   if (!filtro.fecIniAsignacion && !filtro.fecFinAsignacion && String(filtro.completo) === '') return asigs

   const asigsGrupoCamposAnalisis = asigs
      .filter(({ fechaAsignacion, totalAnalizados, totalAsignados }) => {
         if (filtro.completo) {
            return fechaAsignacion >= filtro.fecIniAsignacion && fechaAsignacion <= filtro.fecFinAsignacion && totalAnalizados === totalAsignados
         } else {
            return fechaAsignacion >= filtro.fecIniAsignacion && fechaAsignacion <= filtro.fecFinAsignacion && totalAnalizados < totalAsignados
         }
      })

   return asigsGrupoCamposAnalisis
}
