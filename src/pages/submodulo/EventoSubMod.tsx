import { FC } from 'react'

import Zoom from 'react-reveal/Zoom'

import { ModalLoader, SimpleScheduler } from 'components'
import { useEvento } from 'hooks'

const EventoSubMod: FC = () => {
   // ► Custom - Hook's ...
   const { loadingEventosDb } = useEvento()

   return (
      <>
         <Zoom>
            <SimpleScheduler />
         </Zoom>

         {/* ► Modal: Loading ...  */}
         { loadingEventosDb && <ModalLoader /> }
      </>

   )
}

export default EventoSubMod
