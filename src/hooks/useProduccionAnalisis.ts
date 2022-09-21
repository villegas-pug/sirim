import { RptProduccionHoraLaboralDto } from 'interfaces'
import { useMemo } from 'react'
import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useProduccionAnalisis = () => {
   // ► STORE - HOOK'S ...
   const {
      rptTiempoPromedioAnalisis: {
         loading: loadingRptTiempoPromedioAnalisisDb,
         data: rptTiempoPromedioAnalisisDb
      },
      rptProduccionHoraLaboral: {
         loading: loadingRptProduccionHoraLaboralDb,
         data: rptProduccionHoraLaboralDb
      }
   } = useAppSelector(store => store.produccionAnalisis)

   const {
      getRptTiempoPromedioAnalisisByParms,
      getRptProduccionHorasLaboralesPorAnalista
   } = useAppActions()

   // ► Dep's ...
   const multiplesRptProduccionHoraLaboralDb = useMemo(() => {
      const multipleMap = rptProduccionHoraLaboralDb.reduce((map, currentProd) => {
         const key = currentProd.idUsuario
         map[key] ? map[key].push(currentProd) : map[key] = [currentProd]
         return map
      }, {} as { [k: string]: RptProduccionHoraLaboralDto[] })

      return Object.values(multipleMap)
   }, [rptProduccionHoraLaboralDb])

   return {
      loadingRptTiempoPromedioAnalisisDb,
      rptTiempoPromedioAnalisisDb,
      loadingRptProduccionHoraLaboralDb,
      rptProduccionHoraLaboralDb,
      multiplesRptProduccionHoraLaboralDb,

      getRptTiempoPromedioAnalisisByParms,
      getRptProduccionHorasLaboralesPorAnalista
   }
}
