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

   const {
      findTablaDinamicaByUsrCreador,
      countTablaDinamicaByNombre,
      assignedToGrupoAnalisis,
      deleteAssignedToGrupoAById,
      reasignToGrupoAnalisis
   } = useAppActions()

   // ► EFFECT'S ...
   // ► DEP'S ...

   return {
      tablasDinamicasDb,
      loadingTablaDinamicaDb,
      errorTablaDinamicaDb,
      loadingExtraccion,
      totalRegistrosTablaDinamica,

      findTablaDinamicaByUsrCreador,
      countTablaDinamicaByNombre,
      assignedToGrupoAnalisis,
      reasignToGrupoAnalisis,
      deleteAssignedToGrupoAById
   }
}
