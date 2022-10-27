import { useEffect, useMemo } from 'react'

import { format } from 'date-fns'

import { useAppActions, useAppSelector } from 'hooks'

export const useRptProduccionDiario = () => {
   // ► Store - Hook's ...
   const {
      loading: loadingReporteDb,
      rptProduccionDiaria: rptProduccionDiariaDb
   } = useAppSelector(store => store.reportes)
   const { getRptProduccionDiaria } = useAppActions()

   // ► Effect's ...
   useEffect(() => {
      getRptProduccionDiaria(format(new Date(), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd'))
   }, [])

   // ► Dep's ...
   const produccionAnalisis = useMemo(() => rptProduccionDiariaDb.filter(({ grupo }) => grupo === 'ANALISIS'), [rptProduccionDiariaDb])
   const produccionDepuracion = useMemo(() => rptProduccionDiariaDb.filter(({ grupo }) => grupo === 'DEPURACION'), [rptProduccionDiariaDb])

   const totalProduccionAnalisis = useMemo(() => produccionAnalisis.reduce((acc, curr) => acc + curr.totalAnalizados, 0), [produccionAnalisis])
   const totalProduccionDepuracion = useMemo(() => produccionDepuracion.reduce((acc, curr) => acc + curr.totalAnalizados, 0), [produccionDepuracion])

   return {
      loadingReporteDb,
      rptProduccionDiariaDb,
      produccionAnalisis,
      produccionDepuracion,
      totalProduccionAnalisis,
      totalProduccionDepuracion,

      getRptProduccionDiaria

   }
}
