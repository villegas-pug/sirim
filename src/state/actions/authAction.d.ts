import { Usuario } from '../../interfaces'
import { ResponseHttpStatusType } from './httpStatusAction'

interface FindUserByLoginLoading { type: '[usuario] Find user by login loading' }

interface FindUserByLoginSuccess {
   type: '[usuario] Find user by login success'
   payload: Usuario
}

interface FindUserByLoginError {
   type: '[usuario] Find user by login error'
   payload: string
}

interface LoginLoading { type: '[usuario] Login loading' }
interface LoginSuccess { type: '[usuario] Login success' }
interface LoginError { type: '[usuario] Login error', payload: string }

interface UpdateUsuarioLoading { type: '[usuario] updateAccount loading' }
interface UpdateUsuarioSuccess { type: '[usuario] updateAccount success', payload: Usuario }
interface UpdateUsuarioError { type: '[usuario] updateAccount error', payload: string }

interface FindAllUserLoading { type: '[usuario] Find all user loading' }
interface FindAllUserSuccess { type: '[usuario] Find all user success', payload: Usuario[] }
interface FindAllUserError { type: '[usuario] Find all user error', payload: string }

interface LogoutSuccess { type: '[usuario] Logout success' }

export type AuthActionType =
   | ResponseHttpStatusType
   | FindUserByLoginLoading
   | FindUserByLoginSuccess
   | FindUserByLoginError
   | LoginLoading
   | LoginSuccess
   | LoginError
   | UpdateUsuarioLoading
   | UpdateUsuarioSuccess
   | UpdateUsuarioError
   | FindAllUserLoading
   | FindAllUserSuccess
   | FindAllUserError
   | LogoutSuccess
