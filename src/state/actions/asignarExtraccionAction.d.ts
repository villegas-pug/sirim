import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { TablaDinamica } from 'interfaces'

interface AssignedToGrupoAnalisisLoading {
   type: '[Asignar-Extracción] Asignar usuario a grupo de analisis loading'
}

interface AssignedToGrupoAnalisisSuccess {
   type: '[Asignar-Extracción] Asignar usuario a grupo de analisis success'
   payload: Array<TablaDinamica>
}

interface AssignedToGrupoAnalisisError {
   type: '[Asignar-Extracción] Asignar usuario a grupo de analisis error'
   payload: string | null
}

interface DeleteAssignedToGrupoAByIdLoading {
   type: '[Asignar-Extracción] Eliminar asignación de grupo analisis loading'
}

interface DeleteAssignedToGrupoAByIdSuccess {
   type: '[Asignar-Extracción] Eliminar asignación de grupo analisis success'
   payload: Array<TablaDinamica>
}

interface DeleteAssignedToGrupoAByIdError {
   type: '[Asignar-Extracción] Eliminar asignación de grupo analisis error'
   payload: string | null
}

interface FindAllTablaDinamicaALoading {
   type: '[Asignar-Extracción] Find all tabla dinámica loading'
}

interface FindAllTablaDinamicaASuccess {
   type: '[Asignar-Extracción] Find all tabla dinámica success',
   payload: TablaDinamica[]
}

interface FindAllTablaDinamicaAError {
   type: '[Asignar-Extracción] Find all tabla dinamica error',
   payload: string | null
}

export type AsignarExtraccionAction =
   | ResponseHttpStatusType
   | AssignedToGrupoAnalisisLoading
   | AssignedToGrupoAnalisisSuccess
   | AssignedToGrupoAnalisisError
   | DeleteAssignedToGrupoAByIdLoading
   | DeleteAssignedToGrupoAByIdSuccess
   | DeleteAssignedToGrupoAByIdError
   | FindAllTablaDinamicaALoading
   | FindAllTablaDinamicaASuccess
   | FindAllTablaDinamicaAError
