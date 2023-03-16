
export const parseJsonDateToDate = (value: string): Date | string => {
   // ► Validación: ...
   if (!value) return '-'

   // ► Dep's: `2022-01-01` | `2022-01-01 00:00:00` ...
   const year = parseInt(value.split(/-/g)[0])
   const month = parseInt(value.split(/-/g)[1]) - 1

   const chunkDay = value.split(/-/g)[2]

   const day = chunkDay.trim().includes(' ')
      ? parseInt(chunkDay.split(/\s/g)[0])
      : parseInt(chunkDay)

   return new Date(year, month, day)
}

export const parseJsonTimestampToStrDate = (value: string): string => {
   // ► Validación: ...
   if (!value) return '-'

   // ► Dep's: `2022-01-01 00:00:00` ...
   const valueArr = value.split(/-/g)
   const year = valueArr[0]
   const month = valueArr[1]
   const day = valueArr[2].trim().split(/[\sT]/g)[0].trim()

   return `${year}-${month}-${day}`
}

export const parseJsonTimestampToDate = (value: string): Date => {
   // ► Validación: ...
   if (!value) return new Date()

   // ► Dep's: `2022-01-01 00:00:00` ...
   const valueArr = value.split(/-/g)
   const year = parseInt(valueArr[0])
   const month = parseInt(valueArr[1]) - 1
   const day = parseInt(valueArr[2].trim().split(/[\sT]/g)[0].trim())

   return new Date(year, month, day)
}

export const removeFlagTFromDateTimeStr = (dateTime: string): string => {
   return dateTime.replace(/T/g, ' ')
}

export const getMonthName = (month: number): string => {
   const date = new Date()
   date.setMonth(month - 1)

   return date.toLocaleString('es-PE', { month: 'long' })
}
