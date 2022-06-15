import {
   Box,
   Paper,
   Grid
} from '@mui/material'
import { styled } from '@mui/styles'
import Fade from 'react-reveal/Fade'

import { ModalLoader } from 'components/styled'
import { AsideLeft, AsideRigth } from 'components/nuevoExpedienteSFM'

import { useFiscalizacionPosterior } from 'hooks'

const CustomPaper = styled(Paper)({
   height: '100%',
   padding: 30
})

export default function NuevoExpedienteSFMSubMod () {
   /* » CUSTOM-HOOK'S  */
   const {
      fiscalizacionPosteriorDbLoading
   } = useFiscalizacionPosterior()

   return (
      <>
         <Box
            m={0}
            height='82vh'
            overflow='hidden'
         >
            <CustomPaper variant='outlined'>
               <Grid container>
                  <Grid item xs={3}>
                     <Fade left when={!fiscalizacionPosteriorDbLoading}>
                        <AsideLeft />
                     </Fade>
                  </Grid>
                  <Grid item xs={9}>
                     <Fade big duration={3000} when={!fiscalizacionPosteriorDbLoading}>
                        <AsideRigth />
                     </Fade>
                  </Grid>
               </Grid>
            </CustomPaper>
         </Box>

         {/* » MODAL-LOADING ...  */}
         { fiscalizacionPosteriorDbLoading && <ModalLoader /> }
      </>
   )
}
