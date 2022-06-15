import { Etapa } from 'interfaces'
import { ResponseHttpStatusType } from './httpStatusAction'

interface FindAllEtapaLoading {
   type: '[Etapa] Find All loading'
}

interface FindAllEtapaSuccess {
   type: '[Etapa] Find All success',
   payload: Array<Etapa>
}

interface FindAllEtapaError {
   type: '[Etapa] Find All error',
   payload: string | null
}

export type EtapaAction =
   | ResponseHttpStatusType
   | FindAllEtapaLoading
   | FindAllEtapaSuccess
   | FindAllEtapaError
