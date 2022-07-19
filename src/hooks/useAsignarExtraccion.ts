import { useMemo } from 'react'
import { useAppActions } from './useAppActions'
import { useAppSelector } from './useAppSelector'

export const useAsignarExtraccion = () => {
   /* ► STATE - HOOK'S ... */
   const {
      extraccion: {
         loading: loadingExtraccion,
         totalRegistros: totalRegistrosTablaDinamica = 0
      }
   } = useAppSelector(state => state.extraccion)

   const {
      tablaDinamica: {
         loading: loadingTablasDinamicasDb,
         data: tablasDinamicasDb,
         error: errorTDDb
      }
   } = useAppSelector(state => state.asignarExtraccion)

   const { userCredentials: { idUsuario: idCurrentUsr } } = useAppSelector(state => state.usuario)

   const {
      findAllTablaDinamica,
      countTablaDinamicaByNombre,
      assignedToGrupoAnalisis,
      deleteAssignedToGrupoAById
   } = useAppActions()

   /* ► EFFECT'S  */

   /* ► DEP'S  */
   const tdDbFromCurrentUsr = useMemo(() => {
      return tablasDinamicasDb.filter(({ usrCreador: { idUsuario } }) => idCurrentUsr === idUsuario) || []
   }, [tablasDinamicasDb])

   return {
      tablasDinamicasDb,
      loadingTablasDinamicasDb,
      errorTDDb,
      tdDbFromCurrentUsr,
      loadingExtraccion,
      totalRegistrosTablaDinamica,

      findAllTablaDinamica,
      countTablaDinamicaByNombre,
      assignedToGrupoAnalisis,
      deleteAssignedToGrupoAById
   }
}
