import { FC, ReactElement, useEffect, useReducer } from 'react'

import { format } from 'date-fns'

import { ControlCalidadContext, controlCalidadReducer } from 'context'

import { useControlCalidad, useExtraccion } from 'hooks'
import {
   AsigGrupoCamposAnalisis,
   AsigGrupoCamposAnalisisDto,
   CtrlCalCamposAnalisis,
   RegistroTablaDinamicaDto,
   TablaDinamicaDto,
   Usuario
} from 'interfaces'

export interface ControlCalidadProviderState {
   asigsGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto[]
   asigGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto
   filteredAsigsGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto[]
   filterListAsigsTmp: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>
   ctrlsCalCamposAnalisisTmp: CtrlCalCamposAnalisis[]
   ctrlCalCamposAnalisisTmp: CtrlCalCamposAnalisis
   tablaCtrlCalidadTmp: RegistroTablaDinamicaDto[]
   registroCtrlCalidadTmp: RegistroTablaDinamicaDto
}

const INITIAL_STATE: ControlCalidadProviderState = {
   asigsGrupoCamposAnalisisTmp: [],
   asigGrupoCamposAnalisisTmp: {} as AsigGrupoCamposAnalisisDto,
   filteredAsigsGrupoCamposAnalisisTmp: [],
   filterListAsigsTmp: { fechaAsignacion: format(new Date(), 'yyyy-MM-dd'), ctrlCalConforme: false } as Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>,
   ctrlsCalCamposAnalisisTmp: [],
   ctrlCalCamposAnalisisTmp: {} as CtrlCalCamposAnalisis,
   tablaCtrlCalidadTmp: [],
   registroCtrlCalidadTmp: {} as RegistroTablaDinamicaDto
}

export type Action = 'SAVE' | 'RESET'

export const ControlCalidadProvider: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
   // ► STATE - HOOK'S ...
   const [state, dispatch] = useReducer(controlCalidadReducer, INITIAL_STATE)

   // ► CUSTOM - HOOK'S ...
   const { extraccionDb: tablaDinamicaDb } = useExtraccion()
   const { tablaCtrlCalDb } = useControlCalidad()

   // ► EFFECT'S ...
   useEffect(() => { // ► Update `tmp`: When `tablaDinamicaDb` change, `asigsGrupoCamposAnalisisTmp` is Updated ...
      if (tablaDinamicaDb.length === 0 || state.asigsGrupoCamposAnalisisTmp.length === 0) return

      dispatch({
         type: '[asigsGrupoCamposAnalisisTmp] Save',
         payload: findAsigsGrupoCamposAnalisisByUsr(tablaDinamicaDb, getUsrFromAsigsGrupoCamposAnalisisTmp(state.asigsGrupoCamposAnalisisTmp))
      })
   }, [tablaDinamicaDb])

   useEffect(() => { // ► Update `tmp`: When `asigsGrupoCamposAnalisisTmp` change, `filteredAsigsGrupoCamposAnalisisTmp` is updated ...
      dispatch({
         type: '[filteredAsigsGrupoCamposAnalisisTmp] Save',
         payload: findAsigsGrupoCamposAnalisisByParams(state.asigsGrupoCamposAnalisisTmp, state.filterListAsigsTmp)
      })
   }, [state.asigsGrupoCamposAnalisisTmp])

   useEffect(() => { // ► ...
      if (state.filteredAsigsGrupoCamposAnalisisTmp.length === 0) {
         handleActionAsigGrupoCamposAnalisisTmp('RESET')
         return
      }

      dispatch({
         type: '[asigGrupoCamposAnalisisTmp] Save',
         payload: state.filteredAsigsGrupoCamposAnalisisTmp
            .find(({ idAsigGrupo }) => idAsigGrupo === state.asigGrupoCamposAnalisisTmp.idAsigGrupo) || {} as AsigGrupoCamposAnalisisDto
      })
   }, [state.filteredAsigsGrupoCamposAnalisisTmp])

   useEffect(() => { // ► ...
      if (tablaCtrlCalDb.length === 0 || Object.entries(state.asigGrupoCamposAnalisisTmp).length === 0) return
      dispatch({
         type: '[tablaCtrlCalidadTmp] Save',
         payload: assignPropsToTablaCtrlCalTmp(state.asigGrupoCamposAnalisisTmp, tablaCtrlCalDb)
      })
   }, [tablaCtrlCalDb, state.asigGrupoCamposAnalisisTmp])

   useEffect(() => { // ► ...
      if (state.tablaCtrlCalidadTmp.length === 0 || Object.entries(state.registroCtrlCalidadTmp).length === 0) return
      dispatch({
         type: '[registroCtrlCalidadTmp] Save',
         payload: state.tablaCtrlCalidadTmp.find(({ nId }) => nId === state.registroCtrlCalidadTmp.nId) || {} as RegistroTablaDinamicaDto
      })
   }, [state.tablaCtrlCalidadTmp])

   useEffect(() => { // ► Clean-up: When ...
      handleActionCtrlsCalCamposAnalisisTmp('RESET')
   }, [state.asigsGrupoCamposAnalisisTmp])

   useEffect(() => () => { // ► Clean-up: Cuando el hook es desmontado ...
      handleActionFilterListAsigsTmp('RESET')
      handleActionFilteredAsigsGrupoCamposAnalisisTmp('RESET')
      handleActionCtrlsCalCamposAnalisisTmp('RESET')
      handleActionAsigsGrupoCamposAnalisisTmp('RESET')
   }, [])

   // ► HANDLER'S ...
   const handleActionAsigsGrupoCamposAnalisisTmp = (action: Action, usrAnalista?: Usuario) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[asigsGrupoCamposAnalisisTmp] Save', payload: findAsigsGrupoCamposAnalisisByUsr(tablaDinamicaDb, usrAnalista!) })
         break
      case 'RESET':
         dispatch({ type: '[asigsGrupoCamposAnalisisTmp] Save', payload: [] })
         break
      }
   }

   const handleActionAsigGrupoCamposAnalisisTmp = (action: Action, asig?: AsigGrupoCamposAnalisisDto): void => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[asigGrupoCamposAnalisisTmp] Save', payload: asig! })
         break
      case 'RESET':
         dispatch({ type: '[asigGrupoCamposAnalisisTmp] Save', payload: {} as AsigGrupoCamposAnalisisDto })
         break
      }
   }

   const handleActionFilterListAsigsTmp = (action: Action, params?: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>): void => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[filterListAsigsTmp] Save', payload: params! })
         break
      case 'RESET':
         dispatch({ type: '[filterListAsigsTmp] Save', payload: {} as Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'> })
      }
   }

   const handleActionFilteredAsigsGrupoCamposAnalisisTmp = (action: Action, filtro?: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[filteredAsigsGrupoCamposAnalisisTmp] Save', payload: findAsigsGrupoCamposAnalisisByParams(state.asigsGrupoCamposAnalisisTmp, filtro!) })
         break
      case 'RESET':
         dispatch({ type: '[filteredAsigsGrupoCamposAnalisisTmp] Save', payload: [] })
         break
      }
   }

   const handleActionCtrlsCalCamposAnalisisTmp = (action: Action, ctrlsCal?: CtrlCalCamposAnalisis[]): void => {
      switch (action) {
      case 'SAVE':
         dispatch({
            type: '[ctrlsCalCamposAnalisisTmp] Save',
            payload: ctrlsCal!
         })
         break
      case 'RESET':
         dispatch({ type: '[ctrlsCalCamposAnalisisTmp] Save', payload: [] })
         break
      }
   }

   const handleActionCtrlCalCamposAnalisisTmp = (action: Action, ctrlCal?: CtrlCalCamposAnalisis): void => {
      switch (action) {
      case 'SAVE':
         dispatch({
            type: '[ctrlCalCamposAnalisisTmp] Save',
            payload: ctrlCal!
         })
         break
      case 'RESET':
         dispatch({ type: '[ctrlCalCamposAnalisisTmp] Save', payload: {} as CtrlCalCamposAnalisis })
         break
      }
   }

   const handleActionRegistroCtrlCalidadTmp = (action: Action, registroCtrlCalidad?: RegistroTablaDinamicaDto) => {
      switch (action) {
      case 'SAVE':
         dispatch({
            type: '[registroCtrlCalidadTmp] Save',
            payload: registroCtrlCalidad!
         })
         break
      case 'RESET':
         dispatch({
            type: '[registroCtrlCalidadTmp] Save',
            payload: {} as RegistroTablaDinamicaDto
         })
      }
   }

   return (
      <ControlCalidadContext.Provider value={{
         ...state,
         handleActionAsigsGrupoCamposAnalisisTmp,
         handleActionAsigGrupoCamposAnalisisTmp,
         handleActionFilteredAsigsGrupoCamposAnalisisTmp,
         handleActionFilterListAsigsTmp,
         handleActionCtrlsCalCamposAnalisisTmp,
         handleActionCtrlCalCamposAnalisisTmp,
         handleActionRegistroCtrlCalidadTmp
      }}>
         { children }
      </ControlCalidadContext.Provider>
   )
}

/* ► Private method's ...  */
const findAsigsGrupoCamposAnalisisByUsr = (tablaDinamica: TablaDinamicaDto[], usr: Usuario): AsigGrupoCamposAnalisisDto[] => {
   const asigsGrupoCamposAnalisis = tablaDinamica
      .map(t => {
         t.lstGrupoCamposAnalisis.forEach(g => {
            const { lstGrupoCamposAnalisis, usrCreador, ...restTabla } = t
            g.tablaDinamica = restTabla as TablaDinamicaDto
         })

         return t.lstGrupoCamposAnalisis
      })
      .flat()
      .map(g => {
         g.asigGrupoCamposAnalisis.forEach(a => {
            const { asigGrupoCamposAnalisis, ...restGrupo } = g
            a.grupo = restGrupo
         })

         return g.asigGrupoCamposAnalisis
      })
      .flat()
      .filter(({ usrAnalista: { idUsuario } }) => idUsuario === usr.idUsuario) || []

   return asigsGrupoCamposAnalisis
}

type ParamsFiltro = Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>
const findAsigsGrupoCamposAnalisisByParams = (asigs: AsigGrupoCamposAnalisisDto[], filtro: Partial<ParamsFiltro>): AsigGrupoCamposAnalisisDto[] => {
   // ► Si recibe filtros vacios ...
   if (!filtro.fechaAsignacion && !filtro.ctrlCalConforme) return asigs

   const asigsGrupoCamposAnalisis = asigs
      .filter(({ fechaAsignacion, ctrlCalConforme }) => {
         // ► Si únicamente recibe filtro `fechaAsignacion` ...
         if (filtro.fechaAsignacion && !filtro.ctrlCalConforme) {
            return fechaAsignacion === filtro.fechaAsignacion
         // ► Si únicamente recibe filtro `ctrlCalConforme` ...
         } else if (!filtro.fechaAsignacion && filtro.ctrlCalConforme) {
            return ctrlCalConforme === filtro.ctrlCalConforme
         }

         return fechaAsignacion === filtro.fechaAsignacion && ctrlCalConforme === filtro.ctrlCalConforme
      })

   return asigsGrupoCamposAnalisis
}

const getUsrFromAsigsGrupoCamposAnalisisTmp = (asigs: AsigGrupoCamposAnalisisDto[]): Usuario => {
   const usr = asigs.filter((_, i) => i === 0)
      .find((_, i) => i === 0)
      ?.usrAnalista || {} as Usuario
   return usr
}

/* ► Private - Method's ... */
type SomeFieldsFromProduccionAnalisis = { [key: number]: Pick<RegistroTablaDinamicaDto, 'revisado' | 'observacionesCtrlCal' | 'metaFieldIdErrorCsv'> }
const assignPropsToTablaCtrlCalTmp = (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto, tablaCtrlCalidad: RegistroTablaDinamicaDto[]): RegistroTablaDinamicaDto[] => {
   // ► Dep's: ...
   if (Object.entries(asigGrupoCamposAnalisis).length === 0) return []

   const someFieldsFromProduccionAnalisis: SomeFieldsFromProduccionAnalisis =
   asigGrupoCamposAnalisis?.produccionAnalisis.reduce((map, prod) => {
      map[prod.idRegistroAnalisis] = {
         revisado: prod.revisado,
         metaFieldIdErrorCsv: prod.metaFieldIdErrorCsv,
         observacionesCtrlCal: prod.observacionesCtrlCal
      }
      return map
   }, {} as SomeFieldsFromProduccionAnalisis)

   // ► ...
   return tablaCtrlCalidad.map((record, i) => ({ ...record, ...someFieldsFromProduccionAnalisis[record.nId], nro: i + 1 }))
}
