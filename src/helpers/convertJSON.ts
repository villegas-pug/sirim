
type convertJSONType = 'stringify' | 'parse'

export const convertJSON = (value: string | object, type: convertJSONType): any => {
   switch (type) {
   case 'stringify':
      return JSON.stringify(value)
   case 'parse':
      return JSON.parse(value as string)
   }
}
