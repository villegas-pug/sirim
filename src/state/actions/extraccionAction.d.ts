import { BaseDatos, MetaCampoTablaDinamica, RptControlMigratorioDto, TablaDinamicaDto } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions'

interface CreateTablaExtracciónLoading {
   type: '[Extracción] Create new table loading'
}

interface CreateTablaExtracciónSuccess {
   type: '[Extracción] Create new table success'
   payload: TablaDinamicaDto[]
}

interface CreateTablaExtracciónError {
   type: '[Extracción] Create new table error'
   payload: string
}

interface FindAllTablaDinamicaLoading {
   type: '[Extracción] Find all tabla dinámica loading'
}

interface FindAllTablaDinamicaSuccess {
   type: '[Extracción] Find all tabla dinámica success',
   payload: TablaDinamicaDto[]
}

interface FindAllTablaDinamicaError {
   type: '[Extracción] Find all tabla dinamica error',
   payload: string | null
}

interface UpdateNameTablaExtracciónLoading {
   type: '[Extracción] Update name tabla loading'
}

interface UpdateNameTablaExtracciónSuccess {
   type: '[Extracción] Update name tabla success',
   payload: TablaDinamicaDto[]
}

interface UpdateNameTablaExtracciónError {
   type: '[Extracción] Update name tabla error',
   payload: string | null
}

interface DeleteTablaExtracciónLoading {
   type: '[Extracción] Delete tabla loading'
}

interface DeleteTablaExtracciónSuccess {
   type: '[Extracción] Delete tabla success',
   payload: TablaDinamicaDto[]
}

interface DeleteTablaExtracciónError {
   type: '[Extracción] Delete tabla error',
   payload: string | null
}

interface AlterTablaDinamicaLoading {
   type: '[Extracción] Alter tabla loading'
}

interface AlterTablaDinamicaSuccess {
   type: '[Extracción] Alter tabla success'
   payload: Array<MetaCampoTablaDinamica>
}

interface AlterTablaDinamicaError {
   type: '[Extracción] Alter tabla error'
   payload: string | null
}

interface FindMetaTablaDinamicaExtraccionLoading {
   type: '[Extracción] Find metadatos extracción loading'
}

interface FindMetaTablaDinamicaExtraccionSuccess {
   type: '[Extracción] Find metadatos extracción success'
   payload: Array<MetaCampoTablaDinamica>
}

interface FindMetaTablaDinamicaExtraccionError {
   type: '[Extracción] Find metadatos extracción error'
   payload: string | null
}

interface UploadExtraccionLoading {
   type: '[Extracción] Upload extracción loading'
}

interface UploadExtraccionSuccess {
   type: '[Extracción] Upload extracción success'
   payload: number
}

interface UploadExtraccionError {
   type: '[Extracción] Upload extracción error'
   payload: string | null
}

interface SaveGrupoCamposAnalisisLoading {
   type: '[Extracción] Save grupo analisis loading'
}

interface SaveGrupoCamposAnalisisSuccess {
   type: '[Extracción] Save grupo analisis success'
   payload: Array<TablaDinamicaDto>
}

interface SaveGrupoCamposAnalisisError {
   type: '[Extracción] Save grupo analisis error'
   payload: string | null
}

interface DeleteGrupoCamposAnalisisbyIdLoading {
   type: '[Extracción] Delete grupo analisis by id loading'
}

interface DeleteGrupoCamposAnalisisbyIdSuccess {
   type: '[Extracción] Delete grupo analisis by id success'
   payload: Array<TablaDinamicaDto>
}

interface DeleteGrupoCamposAnalisisbyIdError {
   type: '[Extracción] Delete grupo analisis by id error'
   payload: string | null
}

interface FindAllBaseDatosLoading {
   type: '[Extracción] Find all bases de datos Migraciones loading'
}

interface FindAllBaseDatosSuccess {
   type: '[Extracción] Find all bases de datos Migraciones success'
   payload: Array<BaseDatos>
}

interface FindAllBaseDatosError {
   type: '[Extracción] Find all bases de datos Migraciones error'
   payload: string | null
}

interface SaveQueryStringLoading {
   type: '[Extracción] Save queryString loading'
}

interface SaveQueryStringSuccess {
   type: '[Extracción] Save queryString success'
   payload: Array<BaseDatos>
}

interface SaveQueryStringError {
   type: '[Extracción] Save queryString error'
   payload: string | null
}

interface DynamicJoinStatementLoading {
   type: '[Extracción] Dynamic-Join-Statement loading'
}

interface DynamicJoinStatementSuccess {
   type: '[Extracción] Dynamic-Join-Statement success'
   payload: Array<Object>
}

interface DynamicJoinStatementError {
   type: '[Extracción] Dynamic-Join-Statement error'
   payload: string | null
}

interface RemoveAllExtraccionDownload {
   type: '[Extracción] Remove-All Extracción Download'
}

interface RemoveAllDepuracion { type: '[Extracción] Remove-All Depuración' }

interface DeleteQueryStringByIdLoading {
   type: '[Extracción] Delete queryString loading'
}

interface DeleteQueryStringByIdSuccess {
   type: '[Extracción] Delete queryString success'
   payload: Array<BaseDatos>
}

interface DeleteQueryStringByIdError {
   type: '[Extracción] Delete queryString error'
   payload: string | null
}

interface UpdateQueryStringLoading {
   type: '[Extracción] Update queryString loading'
}

interface UpdateQueryStringSuccess {
   type: '[Extracción] Update queryString success'
   payload: Array<BaseDatos>
}

interface UpdateQueryStringError {
   type: '[Extracción] Update queryString error'
   payload: string | null
}

interface FindDnvParamsLoading {
   type: '[Extracción] Find all dnv by params loading'
}

interface FindDnvParamsSuccess {
   type: '[Extracción] Find all dnv by params success'
   payload: Array<any>
}

interface FindDnvParamsError {
   type: '[Extracción] Find all dnv by params error'
   payload: string | null
}

interface FindTablaDinamicaBySuffixOfFieldLoading {
   type: '[Extracción] Find tabla dinámica by suffix loading'
}

interface FindTablaDinamicaBySuffixOfFieldSuccess {
   type: '[Extracción] Find tabla dinámica by suffix success'
   payload: Array<Object>
}

interface FindTablaDinamicaBySuffixOfFieldError {
   type: '[Extracción] Find tabla dinámica by suffix error'
   payload: string | null
}

interface CountTablaByNombreLoading {
   type: '[Extracción] Count tabla by nombre loading'
}

interface CountTablaByNombreSuccess {
   type: '[Extracción] Count tabla by nombre success'
   payload: number
}

interface CountTablaByNombreError {
   type: '[Extracción] Count tabla by nombre error'
   payload: string | null
}

interface RemoveCamposTablaDinamica {
   type: '[Extracción] Remove campos tabla dinámica'
   payload: []
}

interface GetRptControlMigratorioLoading {
   type: '[Extracción] getRptControlMigratorio loading'
}

interface GetRptControlMigratorioSuccess {
   type: '[Extracción] getRptControlMigratorio success'
   payload: Array<RptControlMigratorioDto>
}

interface GetRptControlMigratorioError {
   type: '[Extracción] getRptControlMigratorio error'
   payload: string | null
}

export type ExtraccionAction =
   | ResponseHttpStatusType
   | CreateTablaExtracciónLoading
   | CreateTablaExtracciónSuccess
   | CreateTablaExtracciónError
   | FindAllTablaDinamicaLoading
   | FindAllTablaDinamicaSuccess
   | FindAllTablaDinamicaError
   | UpdateNameTablaExtracciónLoading
   | UpdateNameTablaExtracciónSuccess
   | UpdateNameTablaExtracciónError
   | DeleteTablaExtracciónLoading
   | DeleteTablaExtracciónSuccess
   | DeleteTablaExtracciónError
   | AlterTablaDinamicaLoading
   | AlterTablaDinamicaSuccess
   | AlterTablaDinamicaError
   | FindMetaTablaDinamicaExtraccionLoading
   | FindMetaTablaDinamicaExtraccionSuccess
   | FindMetaTablaDinamicaExtraccionError
   | UploadExtraccionLoading
   | UploadExtraccionSuccess
   | UploadExtraccionError
   | SaveGrupoCamposAnalisisLoading
   | SaveGrupoCamposAnalisisSuccess
   | SaveGrupoCamposAnalisisError
   | FindAllBaseDatosLoading
   | FindAllBaseDatosSuccess
   | FindAllBaseDatosError
   | SaveQueryStringLoading
   | SaveQueryStringSuccess
   | SaveQueryStringError
   | DynamicJoinStatementLoading
   | DynamicJoinStatementSuccess
   | DynamicJoinStatementError
   | RemoveAllExtraccionDownload
   | RemoveAllDepuracion
   | DeleteQueryStringByIdLoading
   | DeleteQueryStringByIdSuccess
   | DeleteQueryStringByIdError
   | UpdateQueryStringLoading
   | UpdateQueryStringSuccess
   | UpdateQueryStringError
   | FindDnvParamsLoading
   | FindDnvParamsSuccess
   | FindDnvParamsError
   | FindTablaDinamicaBySuffixOfFieldLoading
   | FindTablaDinamicaBySuffixOfFieldSuccess
   | FindTablaDinamicaBySuffixOfFieldError
   | CountTablaByNombreLoading
   | CountTablaByNombreSuccess
   | CountTablaByNombreError
   | RemoveCamposTablaDinamica
   | DeleteGrupoCamposAnalisisbyIdLoading
   | DeleteGrupoCamposAnalisisbyIdSuccess
   | DeleteGrupoCamposAnalisisbyIdError
   | GetRptControlMigratorioLoading
   | GetRptControlMigratorioSuccess
   | GetRptControlMigratorioError
