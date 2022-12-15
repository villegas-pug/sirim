import { useAppActions, useAppSelector } from 'hooks'

export const useConvenio = () => {
   // ► Store Hook's ...
   const {
      loading: loadingLinemientoDb,
      convenios: conveniosDb
   } = useAppSelector(store => store.lineamiento)

   const {
      saveConvenio,
      saveDetConvenio,
      saveDetConvenioAnexo,
      findAllConvenio,
      deleteConvenioById,
      deleteDetConvenio,
      downloadDetConvenioAnexo
   } = useAppActions()

   // ► Handler's ...

   return {
      loadingLinemientoDb,
      conveniosDb,

      saveConvenio,
      saveDetConvenio,
      saveDetConvenioAnexo,
      findAllConvenio,
      deleteConvenioById,
      deleteDetConvenio,
      downloadDetConvenioAnexo
   }
}
