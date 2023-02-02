import { useMemo } from 'react'

import { useAppSelector, useAppActions } from 'hooks'
import { AttachmentType } from 'interfaces'

export const useFormatoPermisos = () => {
   // » Store hook's ...
   const {
      data: formatoPermisosDb,
      loading: loadingFormatoPermisosDb,
      totalRecordsCtrlAsistenciaDb,
      controlPermisosDb,
      error: errorFormatoPermisosDb
   } = useAppSelector(store => store.formatoPermisos)

   const {
      saveFormatoPermisos,
      findAllFormatoPermisos,
      findFormatoPermisosByUsrCreador,
      downloadFormatoLicenciaById,
      deleteFormatoPermisosById,
      validateFormatoPermisos,
      uploadControlAsistencia,
      deleteAllControlAsistencia,
      countControlAsistencias,
      findControlPermisosByServidor,
      uploadAttachment,
      downlodAttachment,
      saveObservacionesFormatoPermisos
   } = useAppActions()

   // » Dep's ...
   const totalFormatoPermisosDb = useMemo(() => formatoPermisosDb.length, [formatoPermisosDb])

   const totalNotAttendedFormatoPermisosDb = useMemo(() => {
      return formatoPermisosDb.filter(({ atendido }) => !atendido).length
   }, [formatoPermisosDb])

   const totalAttendedFormatoPermisosDb = useMemo(() => {
      return formatoPermisosDb.filter(({ atendido }) => atendido).length
   }, [formatoPermisosDb])

   // » Handler's ...
   const handleUploadControlCalidad = (file: FileList) => {
      const frmData = new FormData()
      frmData.append('file', file[0])
      uploadControlAsistencia(frmData)
   }

   const handleUploadAttachment = (file: FileList, type: AttachmentType, idFormato: number) => {
      const frmData = new FormData()
      frmData.append('file', file[0])
      uploadAttachment(frmData, type, idFormato)
   }

   return {
      formatoPermisosDb,
      loadingFormatoPermisosDb,
      totalFormatoPermisosDb,
      totalNotAttendedFormatoPermisosDb,
      totalAttendedFormatoPermisosDb,
      totalRecordsCtrlAsistenciaDb,
      controlPermisosDb,

      errorFormatoPermisosDb,

      saveFormatoPermisos,
      findAllFormatoPermisos,
      findFormatoPermisosByUsrCreador,
      downloadFormatoLicenciaById,
      deleteFormatoPermisosById,
      validateFormatoPermisos,
      handleUploadControlCalidad,
      deleteAllControlAsistencia,
      countControlAsistencias,
      findControlPermisosByServidor,
      handleUploadAttachment,
      downlodAttachment,
      saveObservacionesFormatoPermisos
   }
}
