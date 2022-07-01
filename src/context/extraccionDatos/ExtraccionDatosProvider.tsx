import { FC, ReactElement, useCallback, useEffect, useReducer } from 'react'

import { BaseDatos, Modulo, Tabla } from 'interfaces'

import { ExtraccionDatosContext, extraccionDatosReducer } from 'context/extraccionDatos'
import { useExtraccion } from 'hooks'
import { convertJSON } from 'helpers'

export interface ExtraccionDatosProviderState {
   baseDatosTmp: BaseDatos
   moduloTmp: Modulo
   tablaTmp: Tabla
   camposTmp: Array<string>
   camposSeleccionadosTmp: { [key: string]: string }
}

const INITIAL_STATE: ExtraccionDatosProviderState = {
   baseDatosTmp: {} as BaseDatos,
   moduloTmp: {} as Modulo,
   tablaTmp: {} as Tabla,
   camposTmp: [],
   camposSeleccionadosTmp: {}
}

type Props = {
   children: ReactElement | ReactElement[]
}

const convertCsvToArrayStr = (csv: string): Array<string> => csv.split(',').map(str => str.trim())

export const ExtraccionDatosProvider: FC<Props> = ({ children }) => {
   /* ► HOOK'S  */
   const [state, dispatch] = useReducer(extraccionDatosReducer, INITIAL_STATE)

   /* ► CUSTOM - HOOK'S  */
   const { basesDatosDb } = useExtraccion()

   /* ► EFFECT'S  */
   useEffect(() => { /* ► Dispatch `baseDatosTmp`, si `basesDatosDb`  es mutada ...  */
      if (basesDatosDb.length === 0) return
      dispatch({
         type: 'saveBaseDatosTmp',
         payload: basesDatosDb.find(({ idBD }) => idBD === state.baseDatosTmp.idBD) || {} as BaseDatos
      })
   }, [basesDatosDb])

   useEffect(() => { /* ► Dispatch `moduloTmp`, si `basesDatosDb` es mutada ...  */
      if (basesDatosDb.length === 0) return
      dispatch({
         type: 'saveModuloTmp',
         payload: basesDatosDb
            .find(({ idBD }) => idBD === state.baseDatosTmp.idBD)?.modulos
            .find(({ idMod }) => idMod === state.moduloTmp.idMod) || {} as Modulo
      })
   }, [basesDatosDb])

   useEffect(() => { /* ► Update: Estado `CamposTmp` ... */
      if (Object.keys(state.tablaTmp).length === 0) return
      dispatch({ type: 'saveCamposTmp', payload: convertCsvToArrayStr(state.tablaTmp.camposCsv) })
   }, [state.tablaTmp])

   /* ► Cleanup: On-Selected ... */
   useEffect(() => { dispatch({ type: 'cleanCamposSeleccionadosTmp' }) }, [state.baseDatosTmp])
   useEffect(() => { dispatch({ type: 'cleanCamposSeleccionadosTmp' }) }, [state.moduloTmp])
   useEffect(() => { dispatch({ type: 'saveTablaTmp', payload: {} as Tabla }) }, [state.moduloTmp])
   useEffect(() => { dispatch({ type: 'saveCamposTmp', payload: [] }) }, [state.moduloTmp])

   /* ► HANDLER'S  */
   const handleSaveBaseDatosTmp = useCallback((baseDatos: BaseDatos) => {
      dispatch({ type: 'saveBaseDatosTmp', payload: baseDatos })
   }, [])

   const handleSaveModuloTmp = useCallback((modulo: Modulo) => {
      dispatch({ type: 'saveModuloTmp', payload: modulo })
   }, [])

   const handleSaveTablaTmp = useCallback((tabla: Tabla) => {
      dispatch({ type: 'saveTablaTmp', payload: tabla })
   }, [])

   const handleUpdateCamposSeleccionadosTmp = useCallback(({ nombre, camposCsv }: Partial<Tabla>, tipo: 'Add' | 'Delete'| 'Add-All') => {
      const { camposSeleccionadosTmp } = state
      let camposSeleccionadosNew

      switch (tipo) {
      case 'Add':
         camposSeleccionadosNew = {
            ...camposSeleccionadosTmp,
            [nombre!]: camposSeleccionadosTmp[nombre!] ? `${camposSeleccionadosTmp[nombre!]}, ${camposCsv}` : camposCsv!
         }
         break
      case 'Delete':
         camposSeleccionadosNew = {
            ...camposSeleccionadosTmp,
            [nombre!]: camposSeleccionadosTmp[nombre!].split(',')
               .map(str => str.trim())
               .filter(str => str !== camposCsv)
               .join(',')
         }
         break
      case 'Add-All':
         dispatch({ type: 'saveCamposSeleccionadosTmp', payload: convertJSON(camposCsv!, 'parse') })
         return
      }

      dispatch({ type: 'saveCamposSeleccionadosTmp', payload: camposSeleccionadosNew })
   }, [state.camposSeleccionadosTmp])

   return (
      <ExtraccionDatosContext.Provider
         value={{
            ...state,
            handleSaveBaseDatosTmp,
            handleSaveModuloTmp,
            handleSaveTablaTmp,
            handleUpdateCamposSeleccionadosTmp
         }}
      >
         { children }
      </ExtraccionDatosContext.Provider>
   )
}
