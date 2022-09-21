import { FC, ReactElement, useCallback, useEffect, useReducer } from 'react'

import { NuevaDepuracionInfContext, nuevaDepuracionInfReducer } from 'context/nuevaDepuracionInf'

import { MetaFieldSqlType, GrupoCamposAnalisis, MetaCampoTablaDinamica, TablaDinamica, TablaDinamicaDto } from 'interfaces'

import { useExtraccion } from 'hooks'
import { HandleType } from 'types'

export interface NuevaDepuracionInfState {
   tablaDinamicaDto: Partial<TablaDinamicaDto>
   metaFieldInfoTablaDinamicaTmp: { [key: string]: string }
   gruposAnalisisDto: Array<GrupoCamposAnalisis>
   grupoAnalisisTmp: GrupoCamposAnalisis
   camposAnalisisTmp: Array<MetaCampoTablaDinamica>
}

const INITIAL_STATE: NuevaDepuracionInfState = {
   tablaDinamicaDto: {} as TablaDinamicaDto,
   metaFieldInfoTablaDinamicaTmp: {},
   gruposAnalisisDto: [],
   camposAnalisisTmp: [],
   grupoAnalisisTmp: {} as GrupoCamposAnalisis
}

type ProviderProps = {
   children: ReactElement | ReactElement[]
}

export const NuevaDepuracionInfProvider: FC<ProviderProps> = ({ children }) => {
   /* » HOOK - STATE ... */
   const [state, dispatch] = useReducer(nuevaDepuracionInfReducer, INITIAL_STATE)

   /* » CUSTOM - HOOK'S ... */
   const { extraccionDb, removeCamposTablaDinamica } = useExtraccion()

   /* » EFFECT'S  */
   useEffect(() => {
      if (extraccionDb.length === 0) return
      dispatch({
         type: 'saveGruposAnalisisDto',
         payload: findGruposAnalisisByIdTabla(state.tablaDinamicaDto.idTabla!, extraccionDb)
      })
   }, [extraccionDb])

   useEffect(() => { /* ► Save: `saveCamposAnalisisTmp`, When:  `extraccionDb` ... */
      dispatch({
         type: 'saveCamposAnalisisTmp',
         payload: convertCsvToMetaCampoTablaDinamica(
            extraccionDb.find(({ idTabla: id }) => id === state.tablaDinamicaDto.idTabla)
               ?.lstGrupoCamposAnalisis.find(({ idGrupo: id }) => id === state.grupoAnalisisTmp.idGrupo) || {} as GrupoCamposAnalisis
         )
      })
   }, [extraccionDb])

   useEffect(() => { /* ► Update: `tablaDinamicaDto`, When: `extraccionDb` ... */
      if (extraccionDb.length === 0) return
      dispatch({
         type: 'saveTablaDinamicaDto',
         payload: extraccionDb.find(({ idTabla }) => idTabla === state.tablaDinamicaDto.idTabla) || {}
      })
   }, [extraccionDb])

   useEffect(() => { /* ► Update: `metaFieldInfoTablaDinamicaTmp`, When: `state.tablaDinamicaDto` ... */
      if (!state.tablaDinamicaDto) return
      dispatch({
         type: '[metaFieldInfoTablaDinamicaTmp] Save metaFieldInfoTablaDinamicaTmp',
         payload: state.tablaDinamicaDto.metaFieldsCsv?.split(',')
            .map(mf => mf.trim())
            .reduce((map, nextMf) => {
               if (nextMf.length === 0) return map
               const mfName = nextMf.split('|')[0].trim()
               const mfInfo = nextMf.split('|')[2].trim()
               map[mfName] = mfInfo
               return map
            }, {} as {[key: string]: string}) || {}
      })
   }, [state.tablaDinamicaDto])

   /* ► Clean-up: When mounted hook ... */
   useEffect(() => { removeCamposTablaDinamica() }, [])

   /* » HANDLER'S ...  */
   const handleSaveTablaDinamicaDto = useCallback((tablaDinamicaDto: Partial<TablaDinamicaDto>) => {
      dispatch({ type: 'saveTablaDinamicaDto', payload: tablaDinamicaDto })
   }, [])

   const handleSavegruposAnalisisDto = useCallback((idTabla: number) => {
      const grupoCamposAnalisis = findGruposAnalisisByIdTabla(idTabla, extraccionDb)
      dispatch({ type: 'saveGruposAnalisisDto', payload: grupoCamposAnalisis })
   }, [extraccionDb])

   const handleSaveGrupoAnalisisTmp = (grupo: GrupoCamposAnalisis): void => {
      dispatch({
         type: 'saveGrupoAnalisisTmp',
         payload: grupo
      })
   }

   const handleSaveCamposAnalisisTmp = (grupoAnalisis: GrupoCamposAnalisis, type: HandleType) => {
      /* ► Global - Dep's ...  */
      let metaFields: MetaCampoTablaDinamica[] = []

      switch (type) {
      case 'SAVE':
         metaFields = convertCsvToMetaCampoTablaDinamica(grupoAnalisis)
         break
      case 'RESET':
         metaFields = []
      }

      dispatch({
         type: 'saveCamposAnalisisTmp',
         payload: metaFields
      })
   }

   return (
      <NuevaDepuracionInfContext.Provider
         value={{
            ...state,
            handleSaveTablaDinamicaDto,
            handleSavegruposAnalisisDto,
            handleSaveCamposAnalisisTmp,
            handleSaveGrupoAnalisisTmp
         }}
      >
         { children }
      </NuevaDepuracionInfContext.Provider>
   )
}

/* ► Method's ...  */
const findGruposAnalisisByIdTabla = (idTabla: number, tablaDinamicaDb: Array<TablaDinamica>) => {
   return tablaDinamicaDb.find(({ idTabla: id }) => id === idTabla)?.lstGrupoCamposAnalisis || []
}

const convertCsvToMetaCampoTablaDinamica = (grupoAnalisis: GrupoCamposAnalisis): MetaCampoTablaDinamica[] => {
   if (grupoAnalisis.metaFieldsCsv?.trim().length === 0) return []
   return grupoAnalisis.metaFieldsCsv?.split(',')
      .map(mf => mf.trim())
      .map(mf => {
         const meta = mf.split('|')
         return { nombre: meta[0].trim(), tipo: meta[1].trim() as MetaFieldSqlType, info: meta[2].trim() }
      }) || []
}
