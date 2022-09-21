import { useCallback, useMemo } from 'react'

import { MySelectItem } from 'components'

import { useAppActions, useAppSelector, useAuth } from 'hooks'
import { Action } from 'types'
import { TipoLogico } from 'interfaces'

import { tipoLogicoDb as tipoLogicoDbHardCode } from 'db'

export const useTipoLogico = () => {
   // ► STORE - HOOK'S ...
   const {
      loading: loadingTipoLogicoDb,
      data: tipoLogicoDb
   } = useAppSelector(store => store.tipoLogico)

   const { userCredentials } = useAuth()

   const {
      findAllTipoLogico,
      saveTipoLogico,
      deleteTipoLogicoById
   } = useAppActions()

   // ► EFFECT'S ...

   // ► HANDLER'S ...
   const handleSaveTipoLogico = useCallback(async (tipoLogico: Partial<TipoLogico>) => {
      tipoLogico.grupo = userCredentials.grupo
      saveTipoLogico(tipoLogico)
   }, [])

   // ► DEP'S ...
   const tipoLogicoDbCurrentGrupoAuth = useMemo(() => tipoLogicoDb.filter(({ grupo }) => grupo === userCredentials.grupo), [tipoLogicoDb])

   const optTiposCurrentGrupoAuth = useMemo<MySelectItem[]>(() => ([
      ...optTipoPrimitivo,
      ...tipoLogicoDbCurrentGrupoAuth.map(({ longitud, nombre }) => ({ value: `VARCHAR(${longitud})`, label: nombre } as MySelectItem))
   ]), [tipoLogicoDbCurrentGrupoAuth])

   const optValoresTiposCurrentGrupoAuth = useMemo(() => {
      let optValoresTipos: {[key: string]: MySelectItem[]} = {}
      optValoresTipos = tipoLogicoDbCurrentGrupoAuth.reduce((map, { longitud, valoresCsv }) => {
         const key = `VARCHAR(${longitud})`
         map[key] = parseValoresLsvToArr(valoresCsv).map(v => ({ value: v, label: v }))
         return map
      }, {} as {[key: string]: MySelectItem[]})

      optValoresTipos['VARCHAR(55)'] = tipoLogicoDbHardCode

      return optValoresTipos
   }, [tipoLogicoDbCurrentGrupoAuth])

   return {
      loadingTipoLogicoDb,
      tipoLogicoDb,
      tipoLogicoDbCurrentGrupoAuth,
      optTiposCurrentGrupoAuth,
      optValoresTiposCurrentGrupoAuth,

      findAllTipoLogico,
      handleSaveTipoLogico,
      deleteTipoLogicoById,

      // ► Custom - Method's ...
      appendValoresLsv,
      parseValoresLsvToArr,
      spliceValoresLsvArr
   }
}

const optTipoPrimitivo: Array<MySelectItem> = [
   { value: 'int', label: 'Numérico' },
   { value: 'VARCHAR(MAX)', label: 'Texto' },
   { value: 'VARCHAR(55)', label: 'Lógico' },
   { value: 'date', label: 'Fecha' }
]

const appendValoresLsv = (valoresLsv: string, valor: string): string => {
   if (!valoresLsv) return valor

   return valoresLsv
      .split('|')
      .concat(valor)
      .map(v => v.trim())
      .join('|')
}

const parseValoresLsvToArr = (valoresLsv: string): string[] => {
   if (!valoresLsv) return []
   return valoresLsv.split('|').map(v => v.trim())
}

const spliceValoresLsvArr = (action: Extract<Action, 'REMOVE' | 'UPDATE'>, valoresLsvArr: string[], oldTarget: string, newTarget?: string): string => {
   if (!valoresLsvArr || valoresLsvArr.length === 0) return ''

   const iTarget = valoresLsvArr.indexOf(oldTarget)

   switch (action) {
   case 'REMOVE':
      valoresLsvArr.splice(iTarget, 1)
      return valoresLsvArr.join('|')
   case 'UPDATE':
      valoresLsvArr.splice(iTarget, 1, newTarget!)
      return valoresLsvArr.join('|')
   }
}
