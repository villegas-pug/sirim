import { Distrito } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions'

interface FindAllDistritoLoading {
   type: '[Distrito] Find all distrito loading'
}

interface FindAllDistritoSuccess {
   type: '[Distrito] Find all distrito success'
   payload: Array<Distrito>
}

interface FindAllDistritoError {
   type: '[Distrito] Find all distrito error'
   payload: string | null
}

export type DistritoAction =
   | ResponseHttpStatusType
   | FindAllDistritoLoading
   | FindAllDistritoSuccess
   | FindAllDistritoError
