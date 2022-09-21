import { MetaCampoTablaDinamica } from 'interfaces'

export const validateSqlSchemaName = (invalidName: string): string => {
   return invalidName
      .trim()
      .replaceAll(/[^a-zA-Z0-9_]/g, '')
}

type CaseType = 'prefix | underscore | suffix' | 'prefix | suffix'

export const undecorateMetaFieldName = (nombre: MetaCampoTablaDinamica['nombre'], caseType: CaseType): string => {
   /* ► Validación: Si el argumento es `null`, `undefined` o '' ...
      ► Validación: Si no cumple con el formato de `Decorado` ... */
   if (!nombre) return ''
   if (!/^[snbd][ñ\w]+(_a$|_e$)/igu.test(nombre)) return nombre

   /* ► Si tiene el formato de meta-data ... */
   switch (caseType) {
   case 'prefix | underscore | suffix':
      return nombre.replaceAll(/^[snbd]|_a$|_e$|[._]/ig, ' ').trim()
   case 'prefix | suffix':
      return nombre.replaceAll(/^[snbd]|_a$|_e$/ig, '').trim()
   default:
      return nombre
   }
}
