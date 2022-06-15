import { FC, ReactElement, useCallback, useEffect, useReducer } from 'react'

import { NuevaDepuracionInfContext, nuevaDepuracionInfReducer } from 'context/nuevaDepuracionInf'

import { CampoType, GrupoCamposAnalisis, MetaCampoTablaDinamica, TablaDinamica, TablaDinamicaDto } from 'interfaces'

import { useExtraccion } from 'hooks'

export interface NuevaDepuracionInfState {
   tablaDinamicaDto: Partial<TablaDinamicaDto>
   gruposAnalisisDto: Array<GrupoCamposAnalisis>
   grupoAnalisisTmp: GrupoCamposAnalisis
   camposAnalisisTmp: Array<MetaCampoTablaDinamica>
}

const INITIAL_STATE: NuevaDepuracionInfState = {
   tablaDinamicaDto: {} as TablaDinamicaDto,
   gruposAnalisisDto: [],
   camposAnalisisTmp: [],
   grupoAnalisisTmp: {} as GrupoCamposAnalisis
}

type ProviderProps = {
   children: ReactElement | ReactElement[]
}

const findGruposAnalisisByIdTabla = (idTabla: number, tablaDinamicaDb: Array<TablaDinamica>) => {
   return tablaDinamicaDb.find(({ idTabla: id }) => id === idTabla)?.lstGrupoCamposAnalisis || []
}

const convertCsvToMetaCampoTablaDinamica = (grupoAnalisis: GrupoCamposAnalisis): MetaCampoTablaDinamica[] => {
   return grupoAnalisis.metaFieldsCsv?.split(',')
      .map(mf => mf.trim())
      .map(mf => {
         const meta = mf.split(' ')
         return { nombre: meta[0], tipo: meta[1] as CampoType }
      }) || []
}

export const NuevaDepuracionInfProvider: FC<ProviderProps> = ({ children }) => {
   /* » HOOK - STATE ... */
   const [state, dispatch] = useReducer(nuevaDepuracionInfReducer, INITIAL_STATE)

   /* » CUSTOM - HOOK'S ... */
   const { extraccionDb } = useExtraccion()

   /* » EFFECT'S  */
   useEffect(() => {
      if (extraccionDb.length === 0) return
      dispatch({
         type: 'saveGruposAnalisisDto',
         payload: findGruposAnalisisByIdTabla(state.tablaDinamicaDto.idTabla!, extraccionDb)
      })
   }, [extraccionDb])

   useEffect(() => {
      dispatch({
         type: 'saveCamposAnalisisTmp',
         payload: convertCsvToMetaCampoTablaDinamica(
            extraccionDb.find(({ idTabla: id }) => id === state.tablaDinamicaDto.idTabla)
               ?.lstGrupoCamposAnalisis.find(({ idGrupo: id }) => id === state.grupoAnalisisTmp.idGrupo) || {} as GrupoCamposAnalisis
         )
      })
   }, [extraccionDb])

   useEffect(() => {
      dispatch({ type: 'saveCamposAnalisisTmp', payload: [] })
   }, [state.tablaDinamicaDto])

   /* » HANDLER'S ...  */
   const handleSaveTablaDinamicaDto = useCallback((tablaDinamicaDto: Partial<TablaDinamicaDto>) => {
      dispatch({ type: 'saveTablaDinamicaDto', payload: tablaDinamicaDto })
   }, [])

   const handleSavegruposAnalisisDto = useCallback((idTabla: number) => {
      const grupoCamposAnalisis = findGruposAnalisisByIdTabla(idTabla, extraccionDb)
      dispatch({ type: 'saveGruposAnalisisDto', payload: grupoCamposAnalisis })
   }, [extraccionDb])

   const handleSaveCamposAnalisisTmp = (grupoAnalisis: GrupoCamposAnalisis) => {
      const metaFields = convertCsvToMetaCampoTablaDinamica(grupoAnalisis)

      dispatch({
         type: 'saveCamposAnalisisTmp',
         payload: metaFields
      })

      dispatch({ type: 'saveGrupoAnalisisTmp', payload: grupoAnalisis })
   }

   return (
      <NuevaDepuracionInfContext.Provider
         value={{
            ...state,
            handleSaveTablaDinamicaDto,
            handleSavegruposAnalisisDto,
            handleSaveCamposAnalisisTmp
         }}
      >
         { children }
      </NuevaDepuracionInfContext.Provider>
   )
}
