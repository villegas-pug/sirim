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
   tipoLogicoReducer,
   reportesReducer,
   LineamientoReducer
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
   reportes: reportesReducer,
   tipoLogico: tipoLogicoReducer,
   usuario: authReducer,
   lineamiento: LineamientoReducer
})
