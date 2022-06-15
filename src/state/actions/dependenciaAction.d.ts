import { Dependencia } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

interface FindAllDependenciaLoading {
   type: '[Dependencia] Find all dependencia loading'
}

interface FindAllDependenciaSuccess {
   type: '[Dependencia] Find all dependencia success'
   payload: Array<Dependencia>
}

interface FindAllDependenciaError {
   type: '[Dependencia] Find all dependencia error'
   payload: string | null
}

export type DependenciaAction =
   | ResponseHttpStatusType
   | FindAllDependenciaLoading
   | FindAllDependenciaSuccess
   | FindAllDependenciaError
