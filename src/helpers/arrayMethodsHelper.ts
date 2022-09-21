
export const partitionArray = <O>(arr: Array<O>, numberChunks: number): Array<O[]> => {
   const partitions = []

   const chunkSize = Math.ceil(arr.length / numberChunks)

   for (let i = 0; i < arr.length; i += chunkSize) {
      partitions.push(arr.slice(i, i + chunkSize))
   }

   return partitions
}

export const convertArrObjectsToArrOfKeys = <O>(arr: Array<O>): String[] => {
   const obj = arr.find((_, i) => i === 0) || {}
   return Object.entries(obj).map(([key]) => key.toString())
}

export const generateArrNumbers = (size: number): Array<number> => {
   return [...Array(size)].map((_, i) => i + 1)
}

export const generateArrNumbersFromRange = (rIni: number, rFin: number): Array<number> => {
   return [...Array((rFin - rIni) + 1)].map((_, i) => i + rIni)
}
