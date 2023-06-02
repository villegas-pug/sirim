import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number = 500) => {
   // Hook's ...
   const [valueDebounce, setValueDebounce] = useState<T>(value)

   // Effect's ...
   useEffect(() => {
      const timeout = setTimeout(() => {
         setValueDebounce(value)
      }, delay)

      return function cleanup () { clearTimeout(timeout) }
   }, [value, delay])

   return valueDebounce
}
