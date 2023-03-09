import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamicaDto } from 'interfaces'
import { createContext, useContext } from 'react'

import { Action } from 'types'
import { AnalizarExtraccionBandeja, AnalizarExtraccionState } from './AnalizarExtraccionProvider'

interface AnalizarExtraccionProps extends AnalizarExtraccionState {
   handleChangePage: (page: AnalizarExtraccionBandeja) => void
   /* handleUpdateTablaDinamicaTmp: (tablaDinamicaTmp: TablaDinamicaTmp[]) => void */
   handleSaveAsigGrupoCamposAnalisisTmp: (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto) => void
   handleActionRegistroDinamicoAsignadoTmp: (action: Action, registroDinamicoAsignadoTmp?: RegistroTablaDinamicaDto, filterId?: number) => void
}

export const AnalizarExtraccionContext = createContext({} as AnalizarExtraccionProps)

export const useAnalizarExtraccionContext = () => useContext(AnalizarExtraccionContext)
