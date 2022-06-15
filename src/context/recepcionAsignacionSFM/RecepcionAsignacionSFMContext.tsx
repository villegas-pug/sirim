import { createContext, FC, ReactElement, useState } from 'react'

type Bandeja = 'BANDEJA_ENTRADA' | 'BANDEJA_ASIGNACION'

type RecepcionAsignacionSFMContextType = {
   bandeja: Bandeja
   handleChangeBandeja: (bandeja: Bandeja) => void
}

export const RecepcionAsignacionSFMContext = createContext({} as RecepcionAsignacionSFMContextType)
const { Provider } = RecepcionAsignacionSFMContext

type Props = {
   children: ReactElement | Array<ReactElement>
}

export const RecepcionAsignacionSFMContextProvider: FC<Props> = ({ children }) => {
   /* » HOOK'S */
   const [bandeja, setBandeja] = useState<Bandeja>('BANDEJA_ENTRADA')

   /* » HANDLERS ... */
   const handleChangeBandeja = (bandeja: Bandeja) => { setBandeja(bandeja) }

   return (
      <Provider value={{
         bandeja,
         handleChangeBandeja
      }}>
         { children }
      </Provider>
   )
}
