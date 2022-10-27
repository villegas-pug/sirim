import { AsigGrupoCamposAnalisisDto, RegistroTablaDinamicaDto } from 'interfaces'
import { createContext, useContext } from 'react'

import { AnalizarExtraccionBandeja, AnalizarExtraccionState } from './AnalizarExtraccionProvider'

interface AnalizarExtraccionProps extends AnalizarExtraccionState {
   handleChangePage: (page: AnalizarExtraccionBandeja) => void
   /* handleUpdateTablaDinamicaTmp: (tablaDinamicaTmp: TablaDinamicaTmp[]) => void */
   handleSaveAsigGrupoCamposAnalisisTmp: (asigGrupoCamposAnalisis: AsigGrupoCamposAnalisisDto) => void
   handleSaveRegistroDinamicoAsignadoTmp: (registroDinamicoAsignadoTmp: RegistroTablaDinamicaDto) => void
}

export const AnalizarExtraccionContext = createContext({} as AnalizarExtraccionProps)

export const useAnalizarExtraccionContext = () => useContext(AnalizarExtraccionContext)
