import { useEffect, useContext } from 'react'

import Fade from 'react-reveal/Fade'

import { BandejaAsignacionSFM, BandejaRecepcionSFM } from 'components/recepcionAsignacionSFM'
import { Body } from 'components/layout'

import { RecepcionAsignacionSFMContext, RecepcionAsignacionSFMContextProvider } from 'context/recepcionAsignacionSFM'

import { useFiscalizacionPosterior, usePais, useDistrito } from 'hooks'

const RecepcionAsignacionSFMSubmod = () => {
   /* » HOOK'S */
   const { bandeja } = useContext(RecepcionAsignacionSFMContext)

   /* » CUSTOM-HOOK'S  */
   const { findAllTipoTramite } = useFiscalizacionPosterior()
   const { findAllPais } = usePais()
   const { findAllDistrito } = useDistrito()

   /* » EFFECT'S  */
   useEffect(() => { findAllPais() }, [])
   useEffect(() => { findAllDistrito() }, [])
   useEffect(() => { findAllTipoTramite() }, [])

   return (
      <Fade zoom duration={3000}>
         <Body>
            <>
               { bandeja === 'BANDEJA_ENTRADA' && <BandejaRecepcionSFM /> }
               { bandeja === 'BANDEJA_ASIGNACION' && <BandejaAsignacionSFM /> }
            </>
         </Body>
      </Fade>
   )
}

export default function Default () {
   return (
      <RecepcionAsignacionSFMContextProvider>
         <RecepcionAsignacionSFMSubmod />
      </RecepcionAsignacionSFMContextProvider>
   )
}
