import { FC, ReactElement, useEffect, useReducer } from 'react'

import { TipoLogico } from 'interfaces/TipoLogico'
import { Action } from 'types'

import { CrearTipoLogicoContext } from './CrearTipoLogicoContext'
import { crearTipoLogicoReducer } from './crearTipoLogicoReducer'
import { useTipoLogico } from 'hooks/useTipoLogico'

export interface CrearTipoLogicoState {
   tipoLogicoTmp: TipoLogico
}

const INITIAL_STATE: CrearTipoLogicoState = {
   tipoLogicoTmp: {} as TipoLogico
}

export const CrearTipoLogicoProvider: FC<{ children: ReactElement }> = ({ children }) => {
   // ► HOOK'S ...
   const [state, dispatch] = useReducer(crearTipoLogicoReducer, INITIAL_STATE)

   // ► CUSTOM - HOOK'S ...
   const { tipoLogicoDbCurrentGrupoAuth } = useTipoLogico()

   // ► EFFECT'S ...
   useEffect(() => { // ► Update `tipoLogicoTmp`: When `tipoLogicoDbCurrentGrupoAuth` change.
      if (Object.entries(state.tipoLogicoTmp).length === 0 || tipoLogicoDbCurrentGrupoAuth.length === 0) return
      dispatch({
         type: '[tipoLogicoTmp] Save',
         payload: tipoLogicoDbCurrentGrupoAuth.find(({ idTipo }) => idTipo === state.tipoLogicoTmp.idTipo) || {} as TipoLogico
      })
   }, [tipoLogicoDbCurrentGrupoAuth])

   // ► HANDLER'S ...
   const handleActionTipoLogicoTmp = (action: Action, tipoLogico?: TipoLogico) => {
      switch (action) {
      case 'SAVE':
         dispatch({ type: '[tipoLogicoTmp] Save', payload: tipoLogico! })
         break
      }
   }

   return (
      <CrearTipoLogicoContext.Provider
         value={{
            ...state,
            handleActionTipoLogicoTmp
         }}>
         { children }
      </CrearTipoLogicoContext.Provider>
   )
}
