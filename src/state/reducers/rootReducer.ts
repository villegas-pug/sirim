import { combineReducers } from 'redux'

import {
   analizarExtraccionReducer,
   asignarExtraccionReducer,
   authReducer,
   controlCalidadReducer,
   dependenciaReducer,
   etapaReducer,
   eventoReducer,
   extraccionReducer,
   httpStatusReducer,
   interpolReducer,
   paisReducer,
   produccionAnalisisReducer,
   tipoLogicoReducer
} from 'state/reducers'

export const rootReducer = combineReducers({
   analizarExtraccion: analizarExtraccionReducer,
   asignarExtraccion: asignarExtraccionReducer,
   controlCalidad: controlCalidadReducer,
   dependencia: dependenciaReducer,
   etapa: etapaReducer,
   evento: eventoReducer,
   extraccion: extraccionReducer,
   httpStatus: httpStatusReducer,
   interpol: interpolReducer,
   pais: paisReducer,
   produccionAnalisis: produccionAnalisisReducer,
   tipoLogico: tipoLogicoReducer,
   usuario: authReducer
})
