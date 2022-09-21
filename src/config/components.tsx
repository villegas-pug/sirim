/* import { lazy, LazyExoticComponent, FC, ReactElement } from 'react' */
import { lazy, ReactElement } from 'react'

import { Modulo, Submodulo } from 'types'

type ModuloType = { name: Modulo, component: ReactElement }
type SubModuloType = { name: Submodulo, component: ReactElement }

/* » MOD'S ...  */
const HomeMod = lazy(() => import('pages/modulo/HomeMod'))
const ProcesosMod = lazy(() => import('pages/modulo/ProcesosMod'))
const UtilidadesMod = lazy(() => import('pages/modulo/UtilidadesMod'))
const PerfilMod = lazy(() => import('pages/modulo/PerfilMod'))
const GestionTramitesMod = lazy(() => import('pages/modulo/GestionTramitesMod'))
const ReportesMod = lazy(() => import('pages/modulo/ReportesMod'))
const MantenimientoMod = lazy(() => import('pages/modulo/MantenimientoMod'))

/* » SUBMOD'S ... */
const ExtraccionDatosSubMod = lazy(() => import('pages/submodulo/ExtraccionDatosSubMod'))
const DepurarExtraccionSubMod = lazy(() => import('pages/submodulo/DepurarExtraccionSubMod'))
const AsignarExtraccionSubMod = lazy(() => import('pages/submodulo/AsignarExtraccionSubMod'))
const BuscarDnvSubMod = lazy(() => import('pages/submodulo/BuscarDnvSubMod'))
const BuscarInterpolSubMod = lazy(() => import('pages/submodulo/BuscarInterpolSubMod'))
const AnalizarExtraccionSubMod = lazy(() => import('pages/submodulo/AnalizarExtraccionSubMod'))
const ControlCalidadSubMod = lazy(() => import('pages/submodulo/ControlCalidadSubMod'))
const RptProduccionDiarioSubMod = lazy(() => import('pages/submodulo/RptProduccionDiarioSubMod'))
const CrearTipoLogicoSubMod = lazy(() => import('pages/submodulo/CrearTipoLogicoSubMod'))
const EventoSubMod = lazy(() => import('pages/submodulo/EventoSubMod'))
const RptProduccionHorasLaboralesSubMod = lazy(() => import('pages/submodulo/RptProduccionHorasLaboralesSubMod'))

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
   }, {
      name: 'REPORTES',
      component: <ReportesMod />
   }, {
      name: 'MANTENIMIENTO',
      component: <MantenimientoMod />
   }
]

const subModulo: Array<SubModuloType> = [
   {
      name: 'DEPURAR EXTRACCIÓN',
      component: <DepurarExtraccionSubMod />
   }, {
      name: 'ASIGNAR EXTRACCIÓN',
      component: <AsignarExtraccionSubMod />
   }, {
      name: 'EXTRACCIÓN DE DATOS',
      component: <ExtraccionDatosSubMod />
   }, {
      name: 'BUSCAR DNV',
      component: <BuscarDnvSubMod />
   }, {
      name: 'BUSCAR INTERPOL',
      component: <BuscarInterpolSubMod />
   }, {
      name: 'ANALIZAR EXTRACCIÓN',
      component: <AnalizarExtraccionSubMod />
   }, {
      name: 'CONTROL DE CALIDAD',
      component: <ControlCalidadSubMod />
   }, {
      name: 'REPORTE DIARIO DE PRODUCCIÓN',
      component: <RptProduccionDiarioSubMod />
   }, {
      name: 'CREAR TIPO LÓGICO',
      component: <CrearTipoLogicoSubMod />
   }, {
      name: 'EVENTO',
      component: <EventoSubMod />
   }, {
      name: 'REPORTE DE HORAS TRABAJADAS',
      component: <RptProduccionHorasLaboralesSubMod />
   }
]

export const components = [...modulo, ...subModulo].reduce((map: any, { name, component }) => (map[name] = component, map), {})
