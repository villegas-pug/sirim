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
   lineamientoReducer,
   simUsuarioReducer,
   formatoPermisosReducer
} from 'state/reducers'

export const rootReducer = combineReducers({
   analizarExtraccion: analizarExtraccionReducer,
   asignarExtraccion: asignarExtraccionReducer,
   controlCalidad: controlCalidadReducer,
   dependencia: dependenciaReducer,
   etapa: etapaReducer,
   evento: eventoReducer,
   extraccion: extraccionReducer,
   formatoPermisos: formatoPermisosReducer,
   httpStatus: httpStatusReducer,
   interpol: interpolReducer,
   lineamiento: lineamientoReducer,
   pais: paisReducer,
   produccionAnalisis: produccionAnalisisReducer,
   reportes: reportesReducer,
   simUsuario: simUsuarioReducer,
   tipoLogico: tipoLogicoReducer,
   usuario: authReducer
})
