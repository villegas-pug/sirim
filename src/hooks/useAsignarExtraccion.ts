import { useMemo } from 'react'
import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useAsignarExtraccion = () => {
   /* ► STATE - HOOK'S ... */
   const {
      extraccion: {
         loading: loadingExtraccion,
         totalRegistros: totalRegistrosTablaDinamica = 0
      },
      tablaDinamica: {
         loading: loadingTablaDinamicaDb,
         data: tablasDinamicasDb,
         error: errorTablaDinamicaDb
      }
   } = useAppSelector(state => ({ ...state.extraccion, ...state.asignarExtraccion }))

   const { userCredentials: { idUsuario: idCurrentUsr } } = useAppSelector(state => state.usuario)

   const {
      findAllTablaDinamica,
      countTablaDinamicaByNombre,
      assignedToGrupoAnalisis,
      deleteAssignedToGrupoAById,
      reasignToGrupoAnalisis
   } = useAppActions()

   /* ► EFFECT'S  */

   /* ► DEP'S  */
   const tdDbFromCurrentUsr = useMemo(() => {
      return tablasDinamicasDb.filter(({ usrCreador: { idUsuario } }) => idCurrentUsr === idUsuario) || []
   }, [tablasDinamicasDb])

   return {
      tablasDinamicasDb,
      loadingTablaDinamicaDb,
      errorTablaDinamicaDb,
      tdDbFromCurrentUsr,
      loadingExtraccion,
      totalRegistrosTablaDinamica,

      findAllTablaDinamica,
      countTablaDinamicaByNombre,
      assignedToGrupoAnalisis,
      reasignToGrupoAnalisis,
      deleteAssignedToGrupoAById
   }
}
