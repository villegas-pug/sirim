import { ResponseHttpStatusType } from 'state/actions'
import { Convenio } from 'interfaces'

interface SaveConvenioLoading {
   type: '[Lineamiento] saveConvenio loading'
}

interface SaveConvenioSuccess {
   type: '[Lineamiento] saveConvenio success'
}

interface SaveConvenioError {
   type: '[Lineamiento] saveConvenio error'
   payload: string | null
}

interface FindAllConvenioLoading {
   type: '[Lineamiento] findAllConvenio loading'
}

interface FindAllConvenioSuccess {
   type: '[Lineamiento] findAllConvenio success'
   payload: Array<Convenio>
}

interface FindAllConvenioError {
   type: '[Lineamiento] findAllConvenio error'
   payload: string | null
}

interface DeleteConvenioByIdLoading {
   type: '[Lineamiento] deleteConvenioById loading'
}

interface DeleteConvenioByIdSuccess {
   type: '[Lineamiento] deleteConvenioById success'
}

interface DeleteConvenioByIdError {
   type: '[Lineamiento] deleteConvenioById error'
   payload: string | null
}

interface SaveDetConvenioLoading {
   type: '[Lineamiento] saveDetConvenio loading'
}

interface SaveDetConvenioSuccess {
   type: '[Lineamiento] saveDetConvenio success'
}

interface SaveDetConvenioError {
   type: '[Lineamiento] saveDetConvenio error'
   payload: string | null
}

interface SaveDetConvenioAnexoLoading {
   type: '[Lineamiento] saveDetConvenioAnexo loading'
}

interface SaveDetConvenioAnexoSuccess {
   type: '[Lineamiento] saveDetConvenioAnexo success'
}

interface SaveDetConvenioAnexoError {
   type: '[Lineamiento] saveDetConvenioAnexo error'
   payload: string | null
}

interface DownloadDetConvenioAnexoLoading {
   type: '[Lineamiento] downloadDetConvenioAnexo loading'
}

interface DownloadDetConvenioAnexoSuccess {
   type: '[Lineamiento] downloadDetConvenioAnexo success'
}

interface DownloadDetConvenioAnexoError {
   type: '[Lineamiento] downloadDetConvenioAnexo error'
   payload: string | null
}

interface DeleteDetConvenioLoading {
   type: '[Lineamiento] deleteDetConvenio loading'
}

interface DeleteDetConvenioSuccess {
   type: '[Lineamiento] deleteDetConvenio success'
}
interface DeleteDetConvenioError {
   type: '[Lineamiento] deleteDetConvenio error'
   payload: string | null
}

export type LineamientoAction =
   | ResponseHttpStatusType
   | SaveConvenioLoading
   | SaveConvenioSuccess
   | SaveConvenioError
   | FindAllConvenioLoading
   | FindAllConvenioSuccess
   | FindAllConvenioError
   | DeleteConvenioByIdLoading
   | DeleteConvenioByIdSuccess
   | DeleteConvenioByIdError
   | SaveDetConvenioLoading
   | SaveDetConvenioSuccess
   | SaveDetConvenioError
   | SaveDetConvenioAnexoLoading
   | SaveDetConvenioAnexoSuccess
   | SaveDetConvenioAnexoError
   | DownloadDetConvenioAnexoLoading
   | DownloadDetConvenioAnexoSuccess
   | DownloadDetConvenioAnexoError
   | DeleteDetConvenioLoading
   | DeleteDetConvenioSuccess
   | DeleteDetConvenioError
