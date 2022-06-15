import { Dispatch } from 'redux'

import { AuthActionType } from 'state/actions'

import { api } from 'config'
import { noty } from 'helpers'

import { httpStatus, levelLog, localStorage, messages } from 'constants/'

import { Response, Usuario } from 'interfaces'

const { SUCCESS, WARNING, ERROR } = levelLog
const { AUTHORIZATION, USER_AUTH } = localStorage

export const logout = () => async (dispatch: Dispatch<AuthActionType>) => {
   window.localStorage.clear()
   dispatch({ type: '[usuario] Logout success' })
}

export const findAllUser = () => async (dispatch: Dispatch<AuthActionType>, getState: () => any) => {
   try {
      const { usuario: { token } } = getState()
      dispatch({ type: '[usuario] Find all user loading' })
      const { data: { levelLog, data, message } } = await api.request<Response<Usuario[]>>({
         method: 'GET',
         url: '/microservicio-usuario/findAll',
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[usuario] Find all user success', payload: data })
         break
      case WARNING:
         dispatch({ type: '[usuario] Find all user error', payload: message })
         break
      case ERROR:
         dispatch({ type: '[usuario] Find all user error', payload: message })
         break
      }
   } catch (err) {
      dispatch({ type: '[http-status] Response status', payload: httpStatus.ERROR })
   }
}

export const findUserByLogin = () => async (dispatch: Dispatch<AuthActionType>, getState: () => any) => {
   try {
      dispatch({ type: '[usuario] Find user by login loading' })
      const { usuario: { userAuth, token } } = getState()
      const { data: { levelLog, data, message } } = await api.request<Response<Usuario>>({
         method: 'GET',
         url: `/microservicio-usuario/findByLogin/${userAuth}`,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[usuario] Find user by login success', payload: data })
         break
      case WARNING:
      case ERROR:
         dispatch({ type: '[usuario] Find user by login error', payload: message })
         noty('error', message)
         break
      }
   } catch (err) {
      dispatch({ type: '[usuario] Find user by login error', payload: messages.ERROR_INTERNAL_SERVER })
      dispatch({ type: '[http-status] Response status', payload: httpStatus.ERROR })
      /* noty('error', messages.ERROR_INTERNAL_SERVER) */
   }
}

export const login = (cred: any) => async (dispatch: Dispatch<AuthActionType>) => {
   try {
      dispatch({ type: '[usuario] Login loading' })
      const { status, headers } = await api({
         method: 'POST',
         url: '/microservicio-usuario/login',
         data: cred
      })

      const { token, userauth, usernameauth } = headers

      switch (status) {
      case 200:
         window.localStorage.setItem(AUTHORIZATION, `Bearer ${token}`)
         window.localStorage.setItem(USER_AUTH, userauth)
         noty('success', `¡Bienvenido ${usernameauth}!`)
         dispatch({ type: '[usuario] Login success' })
         break
      }
   } catch (err: any) {
      dispatch({ type: '[usuario] Login error', payload: err?.response?.status })
      noty('error', '¡Usuario o contraseña invalidos!')
   }
}

export const updatePasswordByLogin = (cred: any) => async (dispatch: Dispatch<AuthActionType>, getStore: () => any) => {
   try {
      dispatch({ type: '[usuario] Update password by login loading' })
      const { usuario: { token } } = getStore()
      const { data: { levelLog, message } } = await api.request<Response<Usuario>>({
         method: 'PUT',
         url: '/microservicio-usuario/updateAccount',
         data: cred,
         headers: {
            [AUTHORIZATION]: token
         }
      })

      switch (levelLog) {
      case SUCCESS:
         dispatch({ type: '[usuario] Update password by login success' })
         noty('success', message)
         break
      case WARNING:
         dispatch({ type: '[usuario] Update password by login error', payload: message })
         noty('error', message)
         break
      case ERROR:
         dispatch({ type: '[usuario] Update password by login error', payload: message })
         noty('error', message)
         break
      }
   } catch (err: any) {
      dispatch({ type: '[http-status] Response status', payload: err?.response?.status })
   }
}
