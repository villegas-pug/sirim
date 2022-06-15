import { useEffect, useMemo, useState } from 'react'

import { SolicitudSFM } from 'interfaces'
import { estadosSolicitud } from 'constants/'

import { useAppActions, useAppSelector, useAuth } from 'hooks'

const getBandejaEntradaNuevos = (bandeja: Array<SolicitudSFM>) => bandeja.filter(({ evaluarSolicitud }) => !evaluarSolicitud)
const getBandejaEntradaNoLeidos = (bandeja: Array<SolicitudSFM>) => bandeja.filter(({ evaluarSolicitud }) => evaluarSolicitud && !evaluarSolicitud?.leido)
const getBandejaEntradaPendientes = (bandeja: Array<SolicitudSFM>) => bandeja.filter(({ estado }) => estado === estadosSolicitud.PENDIENTE)
const getBandejaEntradaAtendidos = (bandeja: Array<SolicitudSFM>) => bandeja.filter(({ estado }) => estado === estadosSolicitud.ATENDIDO)

export const useFiscalizacionPosterior = () => {
   /* » CUSTOM - HOOK'S  */
   const {
      loading: fiscalizacionPosteriorDbLoading,
      metadataFilesSolicitud: metadataFilesSolicitudDb,
      tipoTramite: {
         data: tipoTramiteDb
      },
      solicitudValues,
      bandejaEntrada: {
         loading: bandejaEntradaDbLoading,
         data: bandejaEntradaDb
      },
      bandejaEvaluacion: {
         loading: bandejaEvaluacionDbLoading,
         data: bandejaEvaluacionDb,
         downloadProgress: {
            loading: downloadProgressLoading
         }
      }
   } = useAppSelector(state => state.fiscalizacionPosterior)
   const {
      findAllMetaOfExpediente,
      SaveAllSolicitudFile,
      findAllTipoTramite,
      findByNumeroExpediente,
      resetSolicitudValues,
      saveSolicitud,
      findAllSolicitud,
      assignEvaluador,
      deleteSolicitud,
      findAllBandejaEvaluacion,
      readAssignment,
      saveDiligencia,
      deleteDiligenciaById,
      saveArchivoDiligencia,
      downloadArchivoDiligencia,
      deleteArchivoDiligencia,
      updateEtapaSolicitud,
      updateOpinionSolicitud
   } = useAppActions()

   const { userCredentials: { idUsuario: idUsuarioAuth } } = useAuth()

   /* » HOOK'S  */
   const [bandejaEntradaDbFiltered, setBandejaEntradaDbFiltered] = useState<SolicitudSFM[]>([])

   /* » EFFECT'S  */
   useEffect(() => { /* » Actualiza ...  */
      bandejaEntradaDb.length > 0 && setBandejaEntradaDbFiltered(getBandejaEntradaPendientes(bandejaEntradaDb))
   }, [bandejaEntradaDb])

   /* » HANDLER'S  */
   const handleSaveAllSolicitudFile = (file: File) => {
      const frmData = new FormData()
      frmData.append('file', file)
      SaveAllSolicitudFile(frmData)
   }

   const handleFilterBandejaEntradaByNuevos = () => setBandejaEntradaDbFiltered(getBandejaEntradaNuevos(bandejaEntradaDb))
   const handleFilterBandejaEntradaByNoLeidos = () => setBandejaEntradaDbFiltered(getBandejaEntradaNoLeidos(bandejaEntradaDb))
   const handleFilterBandejaEntradaByPendientes = () => setBandejaEntradaDbFiltered(getBandejaEntradaPendientes(bandejaEntradaDb))
   const handleFilterBandejaEntradaByAtendidos = () => setBandejaEntradaDbFiltered(getBandejaEntradaAtendidos(bandejaEntradaDb))

   /* » DEP'S  */
   const simpleTipoTramiteDb = useMemo(() => tipoTramiteDb.map(({ descripcion }) => descripcion), [tipoTramiteDb])

   /* » DEP'S: Bandeja-Entrada ... */
   const bandejaEntradaNuevos = useMemo(() => getBandejaEntradaNuevos(bandejaEntradaDb).length, [bandejaEntradaDb])
   const bandejaEntradaNoLeidos = useMemo(() => getBandejaEntradaNoLeidos(bandejaEntradaDb).length, [bandejaEntradaDb])
   const bandejaEntradaPendientes = useMemo(() => getBandejaEntradaPendientes(bandejaEntradaDb).length, [bandejaEntradaDb])
   const bandejaEntradaAtendidos = useMemo(() => getBandejaEntradaAtendidos(bandejaEntradaDb).length, [bandejaEntradaDb])

   /* » DEP'S: Bandeja-Evaluación ...  */
   const bandejaEvaluacionUsrAuthDb = useMemo(() => bandejaEvaluacionDb.filter(({ operadorDesig: { idUsuario } }) => idUsuario === idUsuarioAuth), [bandejaEvaluacionDb])

   return {
      fiscalizacionPosteriorDbLoading,
      metadataFilesSolicitudDb,
      tipoTramiteDb,
      simpleTipoTramiteDb,
      solicitudValues,
      bandejaEntradaDbLoading,
      bandejaEntradaDb,
      bandejaEntradaDbFiltered,
      bandejaEvaluacionDbLoading,
      bandejaEvaluacionDb,
      bandejaEvaluacionUsrAuthDb,

      downloadProgressLoading,

      bandejaEntradaNuevos,
      bandejaEntradaNoLeidos,
      bandejaEntradaPendientes,
      bandejaEntradaAtendidos,
      handleFilterBandejaEntradaByNuevos,
      handleFilterBandejaEntradaByNoLeidos,
      handleFilterBandejaEntradaByPendientes,
      handleFilterBandejaEntradaByAtendidos,

      findAllMetaOfExpediente,
      handleSaveAllSolicitudFile,
      findAllTipoTramite,
      findByNumeroExpediente,
      resetSolicitudValues,
      saveSolicitud,
      findAllSolicitud,
      assignEvaluador,
      deleteSolicitud,
      findAllBandejaEvaluacion,
      readAssignment,
      saveDiligencia,
      deleteDiligenciaById,
      saveArchivoDiligencia,
      downloadArchivoDiligencia,
      deleteArchivoDiligencia,
      updateEtapaSolicitud,
      updateOpinionSolicitud
   }
}
