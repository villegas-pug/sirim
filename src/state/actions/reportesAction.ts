import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { RptAñosControlMigratorioDto, RptDependenciaControlMigratorioDto, RptEdadesControlMigratorioDto, RptNacionalidadControlMigratorioDto, RptPasaportesIndicadoresDto, RptPasaportesPor12UltimosMesesDto, RptPasaportesPor31UltimosDiasDto, RptPasaportesPorAñosDto, RptProduccionDiariaDto } from 'interfaces'

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

interface GetRptPasaportesIndicadoresLoading {
   type: '[Reportes] getRptPasaportesIndicadores loading'
}

interface GetRptPasaportesIndicadoresSuccess {
   type: '[Reportes] getRptPasaportesIndicadores success'
   payload: RptPasaportesIndicadoresDto
}

interface GetRptPasaportesIndicadoresError {
   type: '[Reportes] getRptPasaportesIndicadores error'
   payload: string | null
}

interface GetRptPasaportesEntregadosPorAñosLoading {
   type: '[Reportes] getRptPasaportesEntregadosPorAños loading'
}

interface GetRptPasaportesEntregadosPorAñosSuccess {
   type: '[Reportes] getRptPasaportesEntregadosPorAños success'
   payload: Array<RptPasaportesPorAñosDto>
}

interface GetRptPasaportesEntregadosPorAñosError {
   type: '[Reportes] getRptPasaportesEntregadosPorAños error'
   payload: string | null
}

interface GetRptPasaportesEntregadosPor12UltimosMesesLoading {
   type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses loading'
}

interface GetRptPasaportesEntregadosPor12UltimosMesesSuccess {
   type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses success'
   payload: Array<RptPasaportesPor12UltimosMesesDto>
}

interface GetRptPasaportesEntregadosPor12UltimosMesesError {
   type: '[Reportes] getRptPasaportesEntregadosPor12UltimosMeses error'
   payload: string | null
}

interface GetRptPasaportesEntregadosPor31UltimosDiasLoading {
   type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias loading'
}

interface GetRptPasaportesEntregadosPor31UltimosDiasSuccess {
   type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias success'
   payload: Array<RptPasaportesPor31UltimosDiasDto>
}

interface GetRptPasaportesEntregadosPor31UltimosDiasError {
   type: '[Reportes] getRptPasaportesEntregadosPor31UltimosDias error'
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
   | GetRptPasaportesIndicadoresLoading
   | GetRptPasaportesIndicadoresSuccess
   | GetRptPasaportesIndicadoresError
   | GetRptPasaportesEntregadosPorAñosLoading
   | GetRptPasaportesEntregadosPorAñosSuccess
   | GetRptPasaportesEntregadosPorAñosError
   | GetRptPasaportesEntregadosPor12UltimosMesesLoading
   | GetRptPasaportesEntregadosPor12UltimosMesesSuccess
   | GetRptPasaportesEntregadosPor12UltimosMesesError
   | GetRptPasaportesEntregadosPor31UltimosDiasLoading
   | GetRptPasaportesEntregadosPor31UltimosDiasSuccess
   | GetRptPasaportesEntregadosPor31UltimosDiasError
