import { useCallback, useState } from 'react'

import { LocalStorageKey } from 'types'

export const useLocalStorage = <T extends unknown>(key: LocalStorageKey, initialValue?: T) => {
   // ► Hook's ...
   const [value, setValue] = useState(() => {
      try {
         return localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key)!)
            : initialValue
      } catch (err) {
         return initialValue
      }
   })

   // ► Handler's ...
   const handleSetValue = useCallback(<T>(value: T) => {
      try {
         localStorage.setItem(key, JSON.stringify(value))
      } finally {
         setValue(value)
      }
   }, [key])

   return [
      value,
      handleSetValue
   ]
}
