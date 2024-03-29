import { useAppActions, useAppSelector } from 'hooks'

export const useReportes = () => {
   // ► Store hook's ...
   const {
      loading: loadingReportesDb,
      rptAñosControlMigratorio: rptAñosControlMigratorioDb,
      rptDependenciaControlMigratorio: rptDependenciaControlMigratorioDb,
      rptEdadesControlMigratorioDto: rptEdadesControlMigratorioDb,
      rptNacionalidadControlMigratorioDto: rptNacionalidadControlMigratorioDb,
      rptPasaportesIndicadores: rptPasaportesIndicadoresDb,
      rptPasaportesEntregadosPorAños: rptPasaportesEntregadosPorAñosDb,
      rptPasaportesEntregadosPor12UltimosMeses: rptPasaportesEntregadosPor12UltimosMesesDb,
      rptPasaportesEntregadosPor31UltimosDias: rptPasaportesEntregadosPor31UltimosDiasDb,
      rptProyeccionAnalisis: rptProyeccionAnalisisDb
   } = useAppSelector(store => store.reportes)

   const {
      getRptControlMigratorio,
      getRptAñosControlMigratorio,
      getRptDependenciaControlMigratorio,
      getRptEdadesControlMigratorio,
      getRptNacionalidadControlMigratorio,
      getRptPasaportesIndicadores,
      getRptPasaportesEntregadosPorAños,
      getRptPasaportesEntregadosPor12UltimosMeses,
      getRptPasaportesEntregadosPor31UltimosDias,
      getRptProyeccionAnalisis
   } = useAppActions()

   return {

      loadingReportesDb,
      rptAñosControlMigratorioDb,
      rptDependenciaControlMigratorioDb,
      rptEdadesControlMigratorioDb,
      rptNacionalidadControlMigratorioDb,
      rptPasaportesIndicadoresDb,
      rptPasaportesEntregadosPorAñosDb,
      rptPasaportesEntregadosPor12UltimosMesesDb,
      rptPasaportesEntregadosPor31UltimosDiasDb,
      rptProyeccionAnalisisDb,

      getRptControlMigratorio,
      getRptAñosControlMigratorio,
      getRptDependenciaControlMigratorio,
      getRptEdadesControlMigratorio,
      getRptNacionalidadControlMigratorio,
      getRptPasaportesIndicadores,
      getRptPasaportesEntregadosPorAños,
      getRptPasaportesEntregadosPor12UltimosMeses,
      getRptPasaportesEntregadosPor31UltimosDias,
      getRptProyeccionAnalisis
   }
}
