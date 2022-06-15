import { createContext } from 'react'

import { GrupoCamposAnalisis, TablaDinamicaDto } from 'interfaces'

import { NuevaDepuracionInfState } from 'context/nuevaDepuracionInf'

interface NuevaDepuracionInfContextProps extends NuevaDepuracionInfState {
   handleSaveTablaDinamicaDto: (tablaDinamicaDto: Partial<TablaDinamicaDto>) => void
   handleSavegruposAnalisisDto: (idTabla: number) => void
   handleSaveCamposAnalisisTmp: (grupoAnalisis: GrupoCamposAnalisis) => void
}

export const NuevaDepuracionInfContext = createContext({} as NuevaDepuracionInfContextProps)
