import { useAppActions, useAppSelector } from 'hooks'

export const useReportes = () => {
   // ► Store hook's ...
   const {
      loading: loadingReportesDb,
      rptAñosControlMigratorio: rptAñosControlMigratorioDb,
      rptDependenciaControlMigratorio: rptDependenciaControlMigratorioDb,
      rptEdadesControlMigratorioDto: rptEdadesControlMigratorioDb,
      rptNacionalidadControlMigratorioDto: rptNacionalidadControlMigratorioDb
   } = useAppSelector(store => store.reportes)

   const {
      getRptControlMigratorio,
      getRptAñosControlMigratorio,
      getRptDependenciaControlMigratorio,
      getRptEdadesControlMigratorio,
      getRptNacionalidadControlMigratorio
   } = useAppActions()

   return {

      loadingReportesDb,
      rptAñosControlMigratorioDb,
      rptDependenciaControlMigratorioDb,
      rptEdadesControlMigratorioDb,
      rptNacionalidadControlMigratorioDb,

      getRptControlMigratorio,
      getRptAñosControlMigratorio,
      getRptDependenciaControlMigratorio,
      getRptEdadesControlMigratorio,
      getRptNacionalidadControlMigratorio
   }
}
