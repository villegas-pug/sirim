/* import { lazy, LazyExoticComponent, FC, ReactElement } from 'react' */
import { lazy, ReactElement } from 'react'

import { Modulo, Submodulo } from 'types'

type ModuloType = { name: Modulo, component: ReactElement }
type SubModuloType = { name: Submodulo, component: ReactElement }

/* » MOD'S  */
const HomeMod = lazy(() => import('pages/modulo/HomeMod'))
const ProcesosMod = lazy(() => import('pages/modulo/ProcesosMod'))
const UtilidadesMod = lazy(() => import('pages/modulo/UtilidadesMod'))
const PerfilMod = lazy(() => import('pages/modulo/PerfilMod'))
const GestionTramitesMod = lazy(() => import('pages/modulo/GestionTramitesMod'))

/* » SUBMOD'S  */
const NuevoExpedienteSFMSubMod = lazy(() => import('pages/submodulo/NuevoExpedienteSFMSubMod'))
const RecepcionAsignacionSFMSubMod = lazy(() => import('pages/submodulo/RecepcionAsignacionSFMSubMod'))
const EvaluacionExpedientesSFMSubMod = lazy(() => import('pages/submodulo/EvaluacionExpedientesSFMSubMod'))
const ExtraccionDatosSubMod = lazy(() => import('pages/submodulo/ExtraccionDatosSubMod'))
const NuevaDepuracionInfSubMod = lazy(() => import('pages/submodulo/NuevaDepuracionInfSubMod'))
const AsignarExtraccionSubMod = lazy(() => import('pages/submodulo/AsignarExtraccionSubMod'))
const BuscarDnvSubMod = lazy(() => import('pages/submodulo/BuscarDnvSubMod'))

/* » ITEM'S */
const modulo: Array<ModuloType> = [
   {
      name: 'HOME',
      component: <HomeMod />
   }, {
      name: 'PERFIL',
      component: <PerfilMod />
   }, {
      name: 'PROCESOS',
      component: <ProcesosMod />
   }, {
      name: 'GESTIÓN TRÁMITES',
      component: <GestionTramitesMod />
   }, {
      name: 'UTILIDADES',
      component: <UtilidadesMod />
   }
]

const subModulo: Array<SubModuloType> = [
   {
      name: 'DEPURACIÓN DE DATOS',
      component: <NuevaDepuracionInfSubMod />
   }, {
      name: 'ASIGNAR EXTRACCIÓN',
      component: <AsignarExtraccionSubMod />
   }, {
      name: 'NUEVO EXPEDIENTE SFM',
      component: <NuevoExpedienteSFMSubMod />
   }, {
      name: 'RECEPCIÓN Y ASIGNACIÓN SFM',
      component: <RecepcionAsignacionSFMSubMod />
   }, {
      name: 'EVALUACIÓN DE EXPEDIENTES SFM',
      component: <EvaluacionExpedientesSFMSubMod />
   }, {
      name: 'EXTRACCIÓN DE DATOS',
      component: <ExtraccionDatosSubMod />
   }, {
      name: 'BUSCAR DNV',
      component: <BuscarDnvSubMod />
   }
]

export const components = [...modulo, ...subModulo].reduce((map: any, { name, component }) => (map[name] = component, map), {})
