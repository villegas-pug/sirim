import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { RptAñosControlMigratorioDto, RptDependenciaControlMigratorioDto, RptEdadesControlMigratorioDto, RptNacionalidadControlMigratorioDto, RptProduccionDiariaDto } from 'interfaces'

interface GetRptAñosControlMigratorioLoading {
   type: '[Reportes] getRptAñosControlMigratorio loading'
}

interface GetRptAñosControlMigratorioSuccess {
   type: '[Reportes] getRptAñosControlMigratorio success'
   payload: Array<RptAñosControlMigratorioDto>
}

interface GetRptAñosControlMigratorioError {
   type: '[Reportes] getRptAñosControlMigratorio error'
   payload: string | null
}

interface GetRptDependenciaControlMigratorioLoading {
   type: '[Reportes] getRptDependenciaControlMigratorio loading'
}

interface GetRptDependenciaControlMigratorioSuccess {
   type: '[Reportes] getRptDependenciaControlMigratorio success'
   payload: Array<RptDependenciaControlMigratorioDto>
}

interface GetRptDependenciaControlMigratorioError {
   type: '[Reportes] getRptDependenciaControlMigratorio error'
   payload: string | null
}

interface GetRptEdadesControlMigratorioLoading {
   type: '[Reportes] getRptEdadesControlMigratorio loading'
}

interface GetRptEdadesControlMigratorioSuccess {
   type: '[Reportes] getRptEdadesControlMigratorio success'
   payload: Array<RptEdadesControlMigratorioDto>
}

interface GetRptEdadesControlMigratorioError {
   type: '[Reportes] getRptEdadesControlMigratorio error'
   payload: string | null
}

interface GetRptNacionalidadControlMigratorioLoading {
   type: '[Reportes] getRptNacionalidadControlMigratorio loading'
}

interface GetRptNacionalidadControlMigratorioSuccess {
   type: '[Reportes] getRptNacionalidadControlMigratorio success'
   payload: Array<RptNacionalidadControlMigratorioDto>
}

interface GetRptNacionalidadControlMigratorioError {
   type: '[Reportes] getRptNacionalidadControlMigratorio error'
   payload: string | null
}

interface GetRptProduccionDiariaLoading {
   type: '[Reportes] getRptProduccionDiaria loading'
}

interface GetRptProduccionDiariaSuccess {
   type: '[Reportes] getRptProduccionDiaria success'
   payload: Array<RptProduccionDiariaDto>
}

interface GetRptProduccionDiariaError {
   type: '[Reportes] getRptProduccionDiaria error'
   payload: string | null
}

export type ReportesAction =
   | ResponseHttpStatusType
   | GetRptAñosControlMigratorioLoading
   | GetRptAñosControlMigratorioSuccess
   | GetRptAñosControlMigratorioError
   | GetRptDependenciaControlMigratorioLoading
   | GetRptDependenciaControlMigratorioSuccess
   | GetRptDependenciaControlMigratorioError
   | GetRptEdadesControlMigratorioLoading
   | GetRptEdadesControlMigratorioSuccess
   | GetRptEdadesControlMigratorioError
   | GetRptNacionalidadControlMigratorioLoading
   | GetRptNacionalidadControlMigratorioSuccess
   | GetRptNacionalidadControlMigratorioError
   | GetRptProduccionDiariaLoading
   | GetRptProduccionDiariaSuccess
   | GetRptProduccionDiariaError
