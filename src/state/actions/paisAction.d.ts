import { Pais } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions'

interface FindAllPaisLoading {
   type: '[Pais] Find all pais loading'
}

interface FindAllPaisSuccess {
   type: '[Pais] Find all pais success'
   payload: Array<Pais>
}

interface FindAllPaisError {
   type: '[Pais] Find all pais error'
   payload: string | null
}

export type PaisAction =
   | ResponseHttpStatusType
   | FindAllPaisLoading
   | FindAllPaisSuccess
   | FindAllPaisError
