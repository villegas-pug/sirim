import { useAppActions, useAppSelector } from 'hooks'
import { AsigGrupoCamposAnalisisDto } from 'interfaces'
import { useMemo } from 'react'

export const useAnalizarExtraccion = () => {
   /* ► HOOK'S REDUX ... */
   const {
      loading: loadingAsigGrupoCamposAnalisisDb,
      asigs: asigsGrupoCamposAnalisisDb,
      asig: asigGrupoCamposAnalisisDb,
      tabla: tablaAsignadaDb
   } = useAppSelector(state => state.analizarExtraccion)

   const {
      findAsigAnalisisByUsr,
      findAsigById,
      findTablaDinamicaByRangoFromIds,
      saveRecordAssigned,
      downloadAnalisadosByDates,
      downloadReporteMensualProduccionByParams
   } = useAppActions()

   /* ► DEP'S ... */
   const asigSummaryDb = useMemo<Pick<AsigGrupoCamposAnalisisDto, 'totalAnalizados' | 'totalAsignados' | 'totalPendientes'>>(() => (
      asigsGrupoCamposAnalisisDb.reduce((summary, next) => {
         summary.totalAsignados += next.totalAsignados
         summary.totalAnalizados += next.totalAnalizados
         summary.totalPendientes += next.totalPendientes
         return summary
      }, { totalAsignados: 0, totalAnalizados: 0, totalPendientes: 0 } as Pick<AsigGrupoCamposAnalisisDto, 'totalAnalizados' | 'totalAsignados' | 'totalPendientes'>)
   ), [asigsGrupoCamposAnalisisDb])

   return {
      loadingAsigGrupoCamposAnalisisDb,
      asigsGrupoCamposAnalisisDb,
      asigGrupoCamposAnalisisDb,
      tablaAsignadaDb,
      asigSummaryDb,

      findAsigAnalisisByUsr,
      findAsigById,
      findTablaDinamicaByRangoFromIds,
      saveRecordAssigned,
      downloadAnalisadosByDates,
      downloadReporteMensualProduccionByParams
   }
}
