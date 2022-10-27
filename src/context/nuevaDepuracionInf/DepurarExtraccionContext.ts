import { createContext, useContext } from 'react'

import { GrupoCamposAnalisis, TablaDinamicaDto } from 'interfaces'

import { NuevaDepuracionInfState } from 'context/nuevaDepuracionInf'
import { HandleType } from 'types'

interface NuevaDepuracionInfContextProps extends NuevaDepuracionInfState {
   handleSaveTablaDinamicaDto: (tablaDinamicaDto: Partial<TablaDinamicaDto>) => void
   handleSavegruposAnalisisDto: (idTabla: number) => void
   handleSaveCamposAnalisisTmp: (grupoAnalisis: GrupoCamposAnalisis, type: HandleType) => void
   handleSaveGrupoAnalisisTmp: (grupo: GrupoCamposAnalisis) => void
}

export const NuevaDepuracionInfContext = createContext({} as NuevaDepuracionInfContextProps)

export const useDepurarExtraccionContext = () => useContext(NuevaDepuracionInfContext)
