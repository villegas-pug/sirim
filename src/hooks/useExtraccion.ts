import { useCallback, useMemo } from 'react'

import { AlterTableType, MetaCampoTablaDinamica, MetaFieldSqlType, PrefixMetaFieldSqlType, TablaDinamicaDto } from 'interfaces'

import { useAppActions, useAppSelector } from 'hooks'
import { undecorateMetaFieldName } from 'helpers'

export const useExtraccion = () => {
   // » CUSTOM - HOOK'S ...
   const {
      loading: loadingExtraccionDb,
      data: extraccionDb,
      camposTablaDinamica: {
         loading: loadingcamposTablaDinamicaDb,
         data: camposTablaDinamicaDb
      },
      tablaDinamica: {
         loading: loadingTablaDinamica
      },
      basesDatos: {
         loading: loadingBasesDatosDb,
         data: basesDatosDb
      },
      extraccion: {
         loading: loadingExtraccion,
         data: extraccion
      },
      depuracion: {
         loading: loadingDepuracion,
         data: depuracion
      },
      dnv: {
         data: dnvDb,
         loading: loadingDnvDb,
         rptControlMigratorio: rptControlMigratorioDb
      }
   } = useAppSelector(store => store.extraccion)

   const {
      findAllTablaDinamica,
      findTablaDinamicaByUsrCreador,
      createTablaExtraccion,
      updateNameTablaDinamica,
      deleteTablaExtraccion,
      alterTablaDinamica,
      findMetaTablaDinamica,
      uploadExtraccion,
      saveGrupoCamposAnalisis,
      deleteGrupoCamposAnalisisbyId,
      findAllBasesDatos,
      saveQueryString,
      dynamicJoinStatement,
      removeAllExtraccion,
      removeAllDepuracion,
      deleteQueryStringById,
      updateQueryString,
      findDnvByParams,
      findTablaDinamicaBySuffixOfField,
      removeCamposTablaDinamica,
      getRptControlMigratorio
   } = useAppActions()

   /* const { userCredentials: { idUsuario: idCurrentUsr } } = useAuth() */

   /* ► HANDLER'S:  */
   const handleAlterFieldTablaDinamica = useCallback(async ({ lstGrupoCamposAnalisis, ...tablaDinamicaDtoRest }: Partial<TablaDinamicaDto>, metaCampo: Partial<MetaCampoTablaDinamica>, type: AlterTableType) => {
      /* ► Global - Dep's ... */
      const metaFieldDecorated = decorateMetaFieldByAlterType(metaCampo, type)
      tablaDinamicaDtoRest.alterTableType = type

      switch (type) {
      case 'ADD_COLUMN_E':
         await alterTablaDinamica({
            ...tablaDinamicaDtoRest,
            camposCsv: metaFieldDecorated,
            grupoCamposAnalisis: { idGrupo: tablaDinamicaDtoRest.grupoCamposAnalisis?.idGrupo }
         })
         break
      case 'ADD_COLUMN_A':
         tablaDinamicaDtoRest.camposCsv = metaFieldDecorated
         await saveGrupoCamposAnalisis({
            ...tablaDinamicaDtoRest,
            grupoCamposAnalisis: {
               idGrupo: tablaDinamicaDtoRest.grupoCamposAnalisis?.idGrupo,
               nombre: tablaDinamicaDtoRest.grupoCamposAnalisis?.nombre
            }
         })
         break
      case 'ALTER_COLUMN_E': /* ► `${prev-metafield}, ${next-metafield}` ... */
         tablaDinamicaDtoRest.camposCsv = `${tablaDinamicaDtoRest.camposCsv}, ${metaFieldDecorated}`
         await alterTablaDinamica(tablaDinamicaDtoRest)
         break
      case 'ALTER_COLUMN_A': /* ► `${prev-metafield}, ${next-metafield}` ... */
         tablaDinamicaDtoRest.camposCsv = `${tablaDinamicaDtoRest.camposCsv}, ${metaFieldDecorated}`
         await saveGrupoCamposAnalisis(tablaDinamicaDtoRest)
         break
      case 'DROP_COLUMN_A':
      case 'DROP_COLUMN_E':
         tablaDinamicaDtoRest = {
            ...tablaDinamicaDtoRest,
            camposCsv: `${metaCampo.nombre} ${metaCampo.tipo}`,
            grupoCamposAnalisis: { idGrupo: tablaDinamicaDtoRest.grupoCamposAnalisis?.idGrupo }
         }
         await alterTablaDinamica(tablaDinamicaDtoRest)
         findTablaDinamicaByUsrCreador()
         break
      }
   }, [])

   /* ► DEP'S  */
   // Eliminar ...
   /* const extraccionDbFromCurrentUsr = useMemo(() => {
      return extraccionDb.filter(({ usrCreador: { idUsuario } }) => idCurrentUsr === idUsuario) || []
   }, [extraccionDb]) */

   const camposExtraccionDb = useMemo(() => camposTablaDinamicaDb.filter(({ nombre }) => nombre.endsWith('_e')), [camposTablaDinamicaDb])

   const bancoCamposExtraccionDb = useMemo<Array<MetaCampoTablaDinamica>>(() => {
      return extraccionDb
         .map(({ metaFieldsCsv }) => convertMetaFieldCsvToMetaCampoTablaDinamica(metaFieldsCsv))
         .flat()
   }, [extraccionDb])

   const bancoCamposAnalisisDb = useMemo<Array<MetaCampoTablaDinamica>>(() => {
      return extraccionDb
         .map(({ lstGrupoCamposAnalisis }) => {
            return lstGrupoCamposAnalisis?.map(({ metaFieldsCsv }) => convertMetaFieldCsvToMetaCampoTablaDinamica(metaFieldsCsv!))
         })
         .flat(2)
   }, [extraccionDb])

   const camposDnvDb = useMemo(() => {
      if (dnvDb.length === 0) return []
      return Object.keys(dnvDb.find((_, i) => i === 0))
   }, [dnvDb])

   return {
      loadingExtraccionDb,
      extraccionDb,
      loadingcamposTablaDinamicaDb,
      camposTablaDinamicaDb,
      camposExtraccionDb,
      loadingTablaDinamica,
      loadingBasesDatosDb,
      basesDatosDb,
      loadingExtraccion,
      extraccion,
      loadingDepuracion,
      depuracion,
      dnvDb,
      loadingDnvDb,
      rptControlMigratorioDb,
      camposDnvDb,
      bancoCamposExtraccionDb,
      bancoCamposAnalisisDb,

      handleAlterFieldTablaDinamica,
      findAllTablaDinamica,
      findTablaDinamicaByUsrCreador,
      createTablaExtraccion,
      updateNameTablaDinamica,
      deleteTablaExtraccion,
      findMetaTablaDinamica,
      uploadExtraccion,
      saveGrupoCamposAnalisis,
      deleteGrupoCamposAnalisisbyId,
      findAllBasesDatos,
      saveQueryString,
      dynamicJoinStatement,
      removeAllExtraccion,
      removeAllDepuracion,
      deleteQueryStringById,
      updateQueryString,
      findDnvByParams,
      findTablaDinamicaBySuffixOfField,
      removeCamposTablaDinamica,
      getRptControlMigratorio,

      /* » Off-Hook method's ... */
      convertObjectToFieldsSqlClause
   }
}

/* ► Method's ...  */
const prefixMetaFieldSqlType: PrefixMetaFieldSqlType = {
   'VARCHAR(MAX)': 's',
   int: 'n',
   'VARCHAR(55)': 'b',
   date: 'd',
   datetime: 'd',
   bit: 'b'
}

const decorateMetaFieldByAlterType = ({ nombre, tipo, info }: Partial<MetaCampoTablaDinamica>, type: AlterTableType): string => {
   switch (type) {
   case 'ADD_COLUMN_E':
   case 'ALTER_COLUMN_E':
      return `${prefixMetaFieldSqlType['VARCHAR(MAX)']}${nombre}_e | VARCHAR(MAX) | ${info}`
   case 'ADD_COLUMN_A':
   case 'ALTER_COLUMN_A':
      if (tipo! in prefixMetaFieldSqlType) {
         return `${prefixMetaFieldSqlType[tipo!]}${nombre}_a | ${tipo} | ${info}`
      } else {
         return `b${nombre}_a | ${tipo} | ${info}`
      }
   default:
      return ''
   }
}

const convertObjectToFieldsSqlClause = (fields: Object): string => {
   const fieldsClause = Object.entries(fields)
      .filter(([_, value]) => (<string> value).length > 0)
      .map(entry => {
         const [key, value] = entry
         return (<string> value).split(',').map(f => {
            const ff = `${key.trim()}.${f.trim()}`
            if (f.startsWith('d')) return `CAST(${ff} AS VARCHAR) [${ff}]`
            return `${ff} [${ff}]`
         })
      })
      .flat()
      .join(',')

   return fieldsClause
}

const convertMetaFieldCsvToMetaCampoTablaDinamica = (metaFieldCsv: string): MetaCampoTablaDinamica[] => {
   const metaCamposTablaDinamica: MetaCampoTablaDinamica[] = []

   /* ► Validación: Si el argumento es null, undefined o string vacio interrumpe la ejecución ... */
   if (!metaFieldCsv) return []

   metaFieldCsv.split(/[\\,]/g)
      .forEach(f => {
         const meta = f.split(/[\\|]/g).map(mf => mf.trim())
         metaCamposTablaDinamica.push({
            nombre: undecorateMetaFieldName(meta[0], 'prefix | suffix'),
            tipo: meta[1] as MetaFieldSqlType,
            info: meta[2]
         })
      })

   return metaCamposTablaDinamica
}
