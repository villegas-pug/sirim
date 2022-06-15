import { ChangeEvent, FC, useRef, useState } from 'react'

import {
   Box,
   Typography,
   Avatar,
   Button
} from '@mui/material'
import {
   Storage,
   FileUpload,
   AttachFile
} from '@mui/icons-material'
import { styled } from '@mui/styles'

import { useFiscalizacionPosterior } from 'hooks'

const CustomAvatar = styled(Avatar)({
   height: 70,
   width: 70
})

export const AsideLeft: FC = () => {
   /* » HOOK'S  */
   const fileRef = useRef({} as HTMLInputElement)
   const [file, setFile] = useState<File | null>(null)

   /* » CUSTOM HOOK'S  */
   const { handleSaveAllSolicitudFile } = useFiscalizacionPosterior()

   /* » EFFECT'S  */

   /* » HANDLER'S  */
   const handleAttachment = () => { fileRef.current.click() }
   const handleChangeInputFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      setFile(files![0])
   }
   const handleAceptar = () => {
      handleSaveAllSolicitudFile(file!)
      setFile(null)
   }

   return (
      <Box
         height={170}
         mt={10}
         display='flex'
         justifyContent='space-around'
         alignItems='center'
         flexDirection='column'
      >
         <CustomAvatar>
            <Storage fontSize='large' />
         </CustomAvatar>

         <Box
            width={200}
            display='flex'
            justifyContent='space-around'
         >
            <Button
               variant={ file ? 'contained' : 'outlined' }
               onClick={ handleAttachment }
            >
               <AttachFile fontSize='medium' />
            </Button>
            <input ref={fileRef} type='file' accept='.xlsx' hidden onChange={ handleChangeInputFile } />
            <Button
               variant='contained'
               startIcon={ <FileUpload fontSize='large' /> }
               onClick={ handleAceptar }
               disabled={ !file }
            >
               <Typography variant='h4'>Aceptar</Typography>
            </Button>
         </Box>
      </Box>
   )
}
