import { ResponseHttpStatusType } from 'state/actions/httpStatusAction'

import { TablaDinamicaDto } from 'interfaces'

interface AssignedToGrupoAnalisisLoading {
   type: '[Asignar-Extracción] Asignar usuario a grupo de analisis loading'
}

interface AssignedToGrupoAnalisisSuccess {
   type: '[Asignar-Extracción] Asignar usuario a grupo de analisis success'
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
}

interface DeleteAssignedToGrupoAByIdError {
   type: '[Asignar-Extracción] Eliminar asignación de grupo analisis error'
   payload: string | null
}

interface FindTablaDinamicaByUsrCreadorAELoading {
   type: '[Asignar-Extracción] findTablaDinamicaByUsrCreador loading'
}

interface FindTablaDinamicaByUsrCreadorAESuccess {
   type: '[Asignar-Extracción] findTablaDinamicaByUsrCreador success'
   payload: TablaDinamicaDto[]
}

interface FindTablaDinamicaByUsrCreadorAEError {
   type: '[Asignar-Extracción] findTablaDinamicaByUsrCreador error'
   payload: string | null
}

interface ReasignToGrupoAnalisisLoading {
   type: '[Asignar-Extracción] Reasign to grupo analisis loading'
}

interface ReasignToGrupoAnalisisSuccess {
   type: '[Asignar-Extracción] Reasign to grupo analisis success'
}

interface ReasignToGrupoAnalisisError {
   type: '[Asignar-Extracción] Reasign to grupo analisis error'
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
   | FindTablaDinamicaByUsrCreadorAELoading
   | FindTablaDinamicaByUsrCreadorAESuccess
   | FindTablaDinamicaByUsrCreadorAEError
   | ReasignToGrupoAnalisisLoading
   | ReasignToGrupoAnalisisSuccess
   | ReasignToGrupoAnalisisError
