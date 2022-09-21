import { useAppActions, useAppSelector } from 'hooks'
import { AsigGrupoCamposAnalisisDto } from 'interfaces'
import { useMemo } from 'react'

export const useAnalizarExtraccion = () => {
   /* ► HOOK'S REDUX ... */
   const {
      asignacion: {
         loading: loadingAsigGrupoCamposAnalisisDb,
         data: asigGrupoCamposAnalisisDb,
         tabla: tablaAsignadaDb
      }
   } = useAppSelector(state => state.analizarExtraccion)

   const {
      findAsigAnalisisByUsr,
      findTablaDinamicaByRangoFromIds,
      saveRecordAssigned,
      downloadAnalisadosByDates,
      downloadReporteMensualProduccionByParams
   } = useAppActions()

   /* ► DEP'S ... */
   const asigSummaryDb = useMemo<Pick<AsigGrupoCamposAnalisisDto, 'totalAnalizados' | 'totalAsignados' | 'totalPendientes'>>(() => (
      asigGrupoCamposAnalisisDb.reduce((summary, next) => {
         summary.totalAsignados += next.totalAsignados
         summary.totalAnalizados += next.totalAnalizados
         summary.totalPendientes += next.totalPendientes
         return summary
      }, { totalAsignados: 0, totalAnalizados: 0, totalPendientes: 0 } as Pick<AsigGrupoCamposAnalisisDto, 'totalAnalizados' | 'totalAsignados' | 'totalPendientes'>)
   ), [asigGrupoCamposAnalisisDb])

   return {
      loadingAsigGrupoCamposAnalisisDb,
      asigGrupoCamposAnalisisDb,
      tablaAsignadaDb,
      asigSummaryDb,

      findAsigAnalisisByUsr,
      findTablaDinamicaByRangoFromIds,
      saveRecordAssigned,
      downloadAnalisadosByDates,
      downloadReporteMensualProduccionByParams
   }
}
