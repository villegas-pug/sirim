import { SimUsuario } from 'interfaces'
import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

interface FindAllSimUsuarioLoading {
   type: '[simUsuario] findAllSimUsuario loading'
}

interface FindAllSimUsuarioSuccess {
   type: '[simUsuario] findAllSimUsuario success'
   payload: Array<SimUsuario>
}

interface FindAllSimUsuarioError {
   type: '[simUsuario] findAllSimUsuario error'
   payload: string | null
}

export type SimUsuarioAction =
   | ResponseHttpStatusType
   | FindAllSimUsuarioLoading
   | FindAllSimUsuarioSuccess
   | FindAllSimUsuarioError
