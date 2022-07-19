import { createContext } from 'react'

import { Actions, AsignarExtraccionState } from './AsignarExtraccionProvider'
import { AsigGrupoCamposAnalisis, GrupoCamposAnalisis, TablaDinamica } from 'interfaces'

interface AsignarExtraccionContextProps extends AsignarExtraccionState {
   handleAddTablaDinamicaTmp: (tablaDinamica: TablaDinamica) => void
   handleAddGruposCamposAnalisisTmp: (gruposCamposAnalisisTmp: GrupoCamposAnalisis[]) => void
   handleAddGrupoCamposAnalisisTmp: (grupoCamposAnalisisTmp: GrupoCamposAnalisis) => void
   handleAddAsigsGrupoCamposAnalisisTmp: (asigsGrupoCamposAnalisisTmp: AsigGrupoCamposAnalisis[]) => void
   handleTotalUsrsToAsigMasivaTmp: (action: Actions, totalUsrsToAsigMasiva?: number) => void
   handleRangosToAsigMasivaTmp: (action: Actions, rangos?: Pick<AsigGrupoCamposAnalisis, 'regAnalisisIni' | 'regAnalisisFin'>[]) => void
}

export const AsignarExtraccionContext = createContext({} as AsignarExtraccionContextProps)
