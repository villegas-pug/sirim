export const applyCommaThousands = (payload: number): string => {
   return Intl.NumberFormat('es-PE').format(payload)
}
