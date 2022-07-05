export const validateSqlSchemaName = (invalidName: string): string => {
   return invalidName
      .trim()
      .replaceAll(/[^a-zA-Z0-9_]/g, '')
}
