import { AuthActionType } from '../actions'

import { Usuario } from '../../interfaces'
import { localStorage } from '../../constants'

const { AUTHORIZATION, USER_AUTH } = localStorage

type StateType = {
   loading: boolean
   userAuth: string | null
   token: string | null
   userCredentials: Usuario
   error: string | null
   users: {
      loading: boolean
      data: Usuario[]
      error: string | null
   }
}

const initialState: StateType = {
   loading: false,
   userAuth: window.localStorage.getItem(USER_AUTH),
   token: window.localStorage.getItem(AUTHORIZATION),
   userCredentials: {} as Usuario,
   error: null,
   users: {
      loading: false,
      data: [],
      error: null
   }
}

export const authReducer = (state: StateType = initialState, action: AuthActionType): StateType => {
   switch (action.type) {
   case '[usuario] Find user by login loading':
      return { ...state, loading: true, userCredentials: {} as Usuario, error: null }
   case '[usuario] Find user by login success':
      return { ...state, loading: false, userCredentials: action.payload, error: null }
   case '[usuario] Find user by login error':
      return { ...state, loading: false, userCredentials: {} as Usuario, error: action.payload }
   case '[usuario] Login loading':
      return { ...state, loading: true, error: null }
   case '[usuario] Login success':
      return {
         ...state,
         token: window.localStorage.getItem(AUTHORIZATION),
         userAuth: window.localStorage.getItem(USER_AUTH),
         loading: false,
         error: null
      }
   case '[usuario] Login error':
      return { ...state, loading: false, error: action.payload }
   case '[usuario] Update password by login loading':
      return { ...state, loading: true, error: null }
   case '[usuario] Update password by login success':
      return { ...state, loading: false, error: null }
   case '[usuario] Update password by login error':
      return { ...state, loading: false, error: action.payload }
   case '[usuario] Logout success':
      return { ...state, token: '', userAuth: '', userCredentials: {} as Usuario }
   case '[usuario] Find all user loading':
      return { ...state, users: { loading: true, data: [], error: null } }
   case '[usuario] Find all user success':
      return { ...state, users: { loading: false, data: action.payload, error: null } }
   case '[usuario] Find all user error':
      return { ...state, users: { loading: false, data: [], error: action.payload } }
   default:
      return state
   }
}
