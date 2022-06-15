/* import { lazy, LazyExoticComponent, FC, ReactElement } from 'react' */
import { lazy, ReactElement } from 'react'

import { moduloNames, subModuloNames } from '../constants'

interface Modulo { name: string, component: ReactElement }
interface SubModulo extends Modulo {}

/* » MOD'S  */
const HomeMod = lazy(() => import('pages/modulo/HomeMod'))
const ProcesosMod = lazy(() => import('pages/modulo/ProcesosMod'))
const UtilidadesMod = lazy(() => import('pages/modulo/UtilidadesMod'))
const PerfilMod = lazy(() => import('pages/modulo/PerfilMod'))
const GestionTramitesMod = lazy(() => import('pages/modulo/GestionTramitesMod'))

/* » SUBMOD'S  */
const NuevaDepuracionInfSubMod = lazy(() => import('pages/submodulo/NuevaDepuracionInfSubMod'))
const NuevoAnalisisInfSubMod = lazy(() => import('pages/submodulo/NuevoAnalisisInfSubMod'))
const AsignarExtraccionSubMod = lazy(() => import('pages/submodulo/AsignarExtraccionSubMod'))
const NuevoExpedienteSFMSubMod = lazy(() => import('pages/submodulo/NuevoExpedienteSFMSubMod'))
const RecepcionAsignacionSFMSubMod = lazy(() => import('pages/submodulo/RecepcionAsignacionSFMSubMod'))
const EvaluacionExpedientesSFMSubMod = lazy(() => import('pages/submodulo/EvaluacionExpedientesSFMSubMod'))
const ExtraccionDatosSubMod = lazy(() => import('pages/submodulo/ExtraccionDatosSubMod'))
const BuscarDnvSubMod = lazy(() => import('pages/submodulo/BuscarDnvSubMod'))

/* » ITEM'S */
const modulo: Array<Modulo> = [
   {
      name: moduloNames.HOME,
      component: <HomeMod />
   }, {
      name: moduloNames.PERFIL,
      component: <PerfilMod />
   }, {
      name: moduloNames.PROCESOS,
      component: <ProcesosMod />
   }, {
      name: moduloNames.GESTION_TRAMITES,
      component: <GestionTramitesMod />
   }, {
      name: moduloNames.UTILIDADES,
      component: <UtilidadesMod />
   }
]

const subModulo: Array<SubModulo> = [
   {
      name: subModuloNames.ANALISIS_INFORMACION,
      component: <NuevoAnalisisInfSubMod />
   }, {
      name: subModuloNames.DEPURACION_DATOS,
      component: <NuevaDepuracionInfSubMod />
   }, {
      name: subModuloNames.ASIGNAR_EXTRACCION,
      component: <AsignarExtraccionSubMod />
   }, {
      name: subModuloNames.NUEVO_EXPEDIENTE_SFM,
      component: <NuevoExpedienteSFMSubMod />
   }, {
      name: subModuloNames.RECEPCION_Y_ASIGNACION_SFM,
      component: <RecepcionAsignacionSFMSubMod />
   }, {
      name: subModuloNames.EVALUACION_EXPEDIENTES_SFM,
      component: <EvaluacionExpedientesSFMSubMod />
   }, {
      name: subModuloNames.EXTRACCION_DATOS,
      component: <ExtraccionDatosSubMod />
   }, {
      name: subModuloNames.BUSCAR_DNV,
      component: <BuscarDnvSubMod />
   }
]

export const components = [...modulo, ...subModulo].reduce((map: any, { name, component }) => (map[name] = component, map), {})
