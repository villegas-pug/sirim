import { createContext } from 'react'

import { BaseDatos, Modulo, Tabla } from 'interfaces'

import { ExtraccionDatosProviderState } from 'context/extraccionDatos'

interface ExtraccionDatosContextProps extends ExtraccionDatosProviderState {
   handleSaveBaseDatosTmp: (baseDatos: BaseDatos) => void
   handleSaveModuloTmp: (modulo: Modulo) => void
   handleSaveTablaTmp: (tabla: Tabla) => void
   handleUpdateCamposSeleccionadosTmp: (table: Partial<Tabla>, tipo: 'Add' | 'Delete'| 'Add-All') => void
}

export const ExtraccionDatosContext = createContext({} as ExtraccionDatosContextProps)
