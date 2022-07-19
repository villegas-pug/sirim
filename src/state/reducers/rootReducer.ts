import { combineReducers } from 'redux'

import {
   authReducer,
   httpStatusReducer,
   extraccionReducer,
   fiscalizacionPosteriorReducer,
   distritoReducer,
   paisReducer,
   etapaReducer,
   dependenciaReducer,
   asignarExtraccionReducer,
   interpolReducer
} from 'state/reducers'

export const rootReducer = combineReducers({
   usuario: authReducer,
   httpStatus: httpStatusReducer,
   extraccion: extraccionReducer,
   fiscalizacionPosterior: fiscalizacionPosteriorReducer,
   distrito: distritoReducer,
   pais: paisReducer,
   etapa: etapaReducer,
   dependencia: dependenciaReducer,
   asignarExtraccion: asignarExtraccionReducer,
   interpol: interpolReducer
})
