import { useMemo } from 'react'

import { useAppSelector, useAppActions } from 'hooks'

export const useFormatoPermisos = () => {
   // » Store hook's ...
   const {
      data: formatoPermisosDb,
      loading: loadingFormatoPermisosDb
   } = useAppSelector(store => store.formatoPermisos)

   const {
      saveFormatoPermisos,
      findAllFormatoPermisos,
      findFormatoPermisosByUsrCreador,
      downloadFormatoLicenciaById,
      deleteFormatoPermisosById,
      validateFormatoPermisos
   } = useAppActions()

   // » Dep's ...
   const totalFormatoPermisosDb = useMemo(() => formatoPermisosDb.length, [formatoPermisosDb])

   const totalNotAttendedFormatoPermisosDb = useMemo(() => {
      return formatoPermisosDb.filter(({ atendido }) => !atendido).length
   }, [formatoPermisosDb])

   const totalAttendedFormatoPermisosDb = useMemo(() => {
      return formatoPermisosDb.filter(({ atendido }) => atendido).length
   }, [formatoPermisosDb])

   return {
      formatoPermisosDb,
      loadingFormatoPermisosDb,
      totalFormatoPermisosDb,
      totalNotAttendedFormatoPermisosDb,
      totalAttendedFormatoPermisosDb,

      saveFormatoPermisos,
      findAllFormatoPermisos,
      findFormatoPermisosByUsrCreador,
      downloadFormatoLicenciaById,
      deleteFormatoPermisosById,
      validateFormatoPermisos
   }
}
