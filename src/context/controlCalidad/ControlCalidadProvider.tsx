import { FC, ReactElement, useEffect, useReducer } from 'react'

import { format } from 'date-fns'

import { ControlCalidadContext } from './ControlCalidadContext'
import { controlCalidadReducer } from './controlCalidadReducer'

import { useExtraccion } from 'hooks'
import { AsigGrupoCamposAnalisis, AsigGrupoCamposAnalisisDto, CtrlCalCamposAnalisis, TablaDinamicaDto, Usuario } from 'interfaces'

export interface ControlCalidadProviderState {
   asigsGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto[]
   asigGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto
   filteredAsigsGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisisDto[]
   filterListAsigsTmp: Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>
   ctrlsCalCamposAnalisis: CtrlCalCamposAnalisis[]
}

const INITIAL_STATE: ControlCalidadProviderState = {
   asigsGrupoCamposAnalisisTmp: [],
   asigGrupoCamposAnalisisTmp: {} as AsigGrupoCamposAnalisisDto,
   filteredAsigsGrupoCamposAnalisisTmp: [],
   filterListAsigsTmp: { fechaAsignacion: format(new Date(), 'yyyy-MM-dd'), ctrlCalConforme: false } as Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>,
   ctrlsCalCamposAnalisis: []
}

export type Action = 'SAVE' | 'RESET'

export const ControlCalidadProvider: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
   /* ► STATE - HOOK'S ... */
   const [state, dispatch] = useReducer(controlCalidadReducer, INITIAL_STATE)

   /* ► CUSTOM - HOOK'S ...  */
   const { extraccionDb: tablaDinamicaDb } = useExtraccion()

   /* ► EFFECT'S ... */
   useEffect(() => { // ► Update `tmp`: When `tablaDinamicaDb` change, `asigsGrupoCamposAnalisisTmp` is Updated ...
      if (tablaDinamicaDb.length === 0) return
      if (state.asigsGrupoCamposAnalisisTmp.length === 0) return

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

   useEffect(() => {
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

   useEffect(() => { // ► Clean-up: When ...
      handleActionCtrlsCalCamposAnalisis('RESET')
   }, [state.asigsGrupoCamposAnalisisTmp])

   useEffect(() => () => { // ► Clean-up: Cuando el hook es desmontado ...
      handleActionFilterListAsigsTmp('RESET')
   }, [])

   useEffect(() => () => { // ► Clean-up: Cuando el hook es desmontado ...
      handleActionFilteredAsigsGrupoCamposAnalisisTmp('RESET')
   }, [])

   useEffect(() => () => { // ► Clean-up: Cuando el hook es desmontado ...
      handleActionCtrlsCalCamposAnalisis('RESET')
   }, [])

   useEffect(() => () => { // ► Clean-up: Cuando el hook es desmontado ...
      handleActionAsigsGrupoCamposAnalisisTmp('RESET')
   }, [])

   /* ► HANDLER'S ... */
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

   const handleActionCtrlsCalCamposAnalisis = (action: Action, ctrlsCal?: CtrlCalCamposAnalisis[]): void => {
      switch (action) {
      case 'SAVE':
         dispatch({
            type: '[ctrlsCalCamposAnalisis] Save',
            payload: ctrlsCal!
         })
         break
      case 'RESET':
         dispatch({ type: '[ctrlsCalCamposAnalisis] Save', payload: [] })
         break
      }
   }

   return (
      <ControlCalidadContext.Provider value={{
         ...state,
         handleActionAsigsGrupoCamposAnalisisTmp,
         handleActionAsigGrupoCamposAnalisisTmp,
         handleActionFilteredAsigsGrupoCamposAnalisisTmp,
         handleActionFilterListAsigsTmp,
         handleActionCtrlsCalCamposAnalisis
      }}>
         { children }
      </ControlCalidadContext.Provider>
   )
}

/* ► Private method's ...  */
const findAsigsGrupoCamposAnalisisByUsr = (tablaDinamica: TablaDinamicaDto[], usr: Usuario): AsigGrupoCamposAnalisisDto[] => {
   const asigsGrupoCamposAnalisis = tablaDinamica
      .map(td => td.lstGrupoCamposAnalisis)
      .flat()
      .map(g => g.asigGrupoCamposAnalisis)
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
