import { useCallback, useMemo } from 'react'

import { AlterTableType, MetaCampoTablaDinamica, TablaDinamicaDto } from 'interfaces'

import { useAppActions, useAppSelector } from 'hooks'

const prefixNameFields = { 'VARCHAR(MAX)': 's', int: 'n' }

const decorateMetaFieldByAlterType = ({ nombre, tipo }: MetaCampoTablaDinamica, type: AlterTableType): string => {
   switch (type) {
   case 'ADD_COLUMN_E':
   case 'ALTER_COLUMN_E':
      return `${prefixNameFields[tipo]}${nombre}_e ${tipo}`
   case 'ADD_COLUMN_A':
   case 'ALTER_COLUMN_A':
      return `${prefixNameFields[tipo]}${nombre}_a ${tipo}`
   default:
      return ''
   }
}

const undecorateNameField = (nombre: MetaCampoTablaDinamica['nombre']): string => {
   return nombre?.slice(1).slice(0, -2) || ''
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

export const useExtraccion = () => {
   /* » CUSTOM - HOOK'S  */
   const {
      loading: loadingExtraccionDb, /* ► Reservado, estado raiz ... */
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
         loading: loadingDnvDb
      }
   } = useAppSelector(store => store.extraccion)
   const {
      createTablaExtraccion,
      findAllExtraccion,
      updateNameTablaDinamica,
      deleteTablaExtraccion,
      alterTablaDinamica,
      findAllBandejaEvaluacion,
      findMetaTablaDinamica,
      uploadExtraccion,
      saveGrupoCamposAnalisis,
      findAllBasesDatos,
      saveQueryString,
      dynamicJoinStatement,
      removeAllExtraccion,
      removeAllDepuracion,
      deleteQueryStringById,
      updateQueryString,
      findDnvByParams,
      findTablaDinamicaBySuffixOfField
   } = useAppActions()

   /* ► HANDLER'S:  */
   const handleAlterFieldOfTablaDinamica = useCallback((tablaDinamicaDto: Partial<TablaDinamicaDto>, metaCampo: MetaCampoTablaDinamica, type: AlterTableType) => {
      const metaFieldDecorated = decorateMetaFieldByAlterType(metaCampo, type)
      tablaDinamicaDto.alterTableType = type

      switch (type) {
      case 'ADD_COLUMN_E':
         tablaDinamicaDto.camposCsv = metaFieldDecorated
         alterTablaDinamica(tablaDinamicaDto)
         break
      case 'ADD_COLUMN_A':
         tablaDinamicaDto.camposCsv = metaFieldDecorated
         saveGrupoCamposAnalisis(tablaDinamicaDto)
         break
      case 'ALTER_COLUMN_E':
         tablaDinamicaDto.camposCsv = `${tablaDinamicaDto.camposCsv}, ${metaFieldDecorated}`
         alterTablaDinamica(tablaDinamicaDto)
         break
      case 'ALTER_COLUMN_A':
         tablaDinamicaDto.camposCsv = `${tablaDinamicaDto.camposCsv}, ${metaFieldDecorated}`
         saveGrupoCamposAnalisis(tablaDinamicaDto)
         break
      }
   }, [])

   const handleDropFieldOfTablaDinamica = useCallback((tablaDinamicaDto: Partial<TablaDinamicaDto>, metaCampo: MetaCampoTablaDinamica, type: AlterTableType) => {
      tablaDinamicaDto = { ...tablaDinamicaDto, camposCsv: `${metaCampo.nombre} ${metaCampo.tipo}`, alterTableType: type }
      alterTablaDinamica(tablaDinamicaDto)
   }, [])

   /* ► DEP'S  */
   const camposExtraccionDb = useMemo(() => camposTablaDinamicaDb.filter(({ nombre }) => nombre.endsWith('_e')), [camposTablaDinamicaDb])

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
      camposDnvDb,

      handleAlterFieldOfTablaDinamica,
      handleDropFieldOfTablaDinamica,

      findAllExtraccion,
      createTablaExtraccion,
      updateNameTablaDinamica,
      deleteTablaExtraccion,
      findAllBandejaEvaluacion,
      findMetaTablaDinamica,
      uploadExtraccion,
      saveGrupoCamposAnalisis,
      findAllBasesDatos,
      saveQueryString,
      dynamicJoinStatement,
      removeAllExtraccion,
      removeAllDepuracion,
      deleteQueryStringById,
      updateQueryString,
      findDnvByParams,
      findTablaDinamicaBySuffixOfField,

      /* » Off-Hook method's ... */
      decorateMetaFieldByAlterType,
      undecorateNameField,
      convertObjectToFieldsSqlClause
   }
}
