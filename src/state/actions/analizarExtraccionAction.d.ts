import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { AsigGrupoCamposAnalisisDto } from 'interfaces'

interface FindAsigAnalisisByUsrLoading {
   type: '[Analizar-Extracción] Find asignaciones by usuario loading'
}

interface FindAsigAnalisisByUsrSuccess {
   type: '[Analizar-Extracción] Find asignaciones by usuario success'
   payload: Array<AsigGrupoCamposAnalisisDto>
}

interface FindAsigAnalisisByUsrError {
   type: '[Analizar-Extracción] Find asignaciones by usuario error'
   payload: string | null
}

interface FindTablaDinamicaByRangoFromIdsLoading {
   type: '[Analizar-Extracción] Find tabla dinamica by rango of ids loading'
}

interface FindTablaDinamicaByRangoFromIdsSuccess {
   type: '[Analizar-Extracción] Find tabla dinamica by rango of ids success'
   payload: Array<any>
}

interface FindTablaDinamicaByRangoFromIdsError {
   type: '[Analizar-Extracción] Find tabla dinamica by rango of ids error'
   payload: string | null
}

interface SaveRecordAssignedLoading {
   type: '[Analizar-Extracción] Save record assigned loading'
}

interface SaveRecordAssignedSuccess {
   type: '[Analizar-Extracción] Save record assigned success',
   payload: Array<any>
}

interface SaveRecordAssignedError {
   type: '[Analizar-Extracción] Save record assigned error',
   payload: string | null
}

interface DownloadAnalisadosByDatesLoading {
   type: '[Analizar-Extracción] Download analisados by dates loading'
}

interface DownloadAnalisadosByDatesSuccess {
   type: '[Analizar-Extracción] Download analisados by dates success'
}

interface DownloadAnalisadosByDatesError {
   type: '[Analizar-Extracción] Download analisados by dates error'
   payload: string | null
}

interface DownloadReporteMensualProduccionByParamsLoading {
   type: '[Analizar-Extracción] Download reporte mensual de producción loading'
}

interface DownloadReporteMensualProduccionByParamsSuccess {
   type: '[Analizar-Extracción] Download reporte mensual de producción success'
}

interface DownloadReporteMensualProduccionByParamsError {
   type: '[Analizar-Extracción] Download reporte mensual de producción error'
   payload: string | null
}

export type AnalizarExtraccionAction =
   | ResponseHttpStatusType
   | FindAsigAnalisisByUsrLoading
   | FindAsigAnalisisByUsrSuccess
   | FindAsigAnalisisByUsrError
   | FindTablaDinamicaByRangoFromIdsLoading
   | FindTablaDinamicaByRangoFromIdsSuccess
   | FindTablaDinamicaByRangoFromIdsError
   | SaveRecordAssignedLoading
   | SaveRecordAssignedSuccess
   | SaveRecordAssignedError
   | DownloadAnalisadosByDatesLoading
   | DownloadAnalisadosByDatesSuccess
   | DownloadAnalisadosByDatesError
   | DownloadReporteMensualProduccionByParamsLoading
   | DownloadReporteMensualProduccionByParamsSuccess
   | DownloadReporteMensualProduccionByParamsError
