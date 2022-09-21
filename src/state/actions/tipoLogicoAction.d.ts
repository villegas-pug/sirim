import { TipoLogico } from 'interfaces/TipoLogico'
import { ResponseHttpStatusType } from 'state/actions/httpStatusAction.d'

interface FindAllTipoLogicoLoading {
   type: '[Tipo-Lógico] findAllTipoLogico loading'
}

interface FindAllTipoLogicoSuccess {
   type: '[Tipo-Lógico] findAllTipoLogico success'
   payload: TipoLogico[]
}

interface FindAllTipoLogicoError {
   type: '[Tipo-Lógico] findAllTipoLogico error'
   payload: string | null
}

interface SaveTipoLogicoLoading {
   type: '[Tipo-Lógico] saveTipoLogico loading'
}

interface SaveTipoLogicoSuccess {
   type: '[Tipo-Lógico] saveTipoLogico success'
   payload: TipoLogico[]
}

interface SaveTipoLogicoError {
   type: '[Tipo-Lógico] saveTipoLogico error'
   payload: string | null
}

interface DeleteTipoLogicoByIdLoading {
   type: '[Tipo-Lógico] DeleteTipoLogicoById loading'
}

interface DeleteTipoLogicoByIdSuccess {
   type: '[Tipo-Lógico] DeleteTipoLogicoById success'
   payload: TipoLogico[]
}

interface DeleteTipoLogicoByIdError {
   type: '[Tipo-Lógico] DeleteTipoLogicoById error'
   payload: string | null
}

export type TipoLogicoAction =
   | ResponseHttpStatusType
   | FindAllTipoLogicoLoading
   | FindAllTipoLogicoSuccess
   | FindAllTipoLogicoError
   | SaveTipoLogicoLoading
   | SaveTipoLogicoSuccess
   | SaveTipoLogicoError
   | DeleteTipoLogicoByIdLoading
   | DeleteTipoLogicoByIdSuccess
   | DeleteTipoLogicoByIdError
