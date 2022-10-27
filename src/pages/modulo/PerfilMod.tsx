import { ChangeEvent, FC, useRef } from 'react'

import { Box, Button, Paper, Typography } from '@mui/material'
import { AttachFileRounded, UpdateRounded } from '@mui/icons-material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import { Body, ModalLoader, MyTextField } from 'components'
import { getBase64 } from 'helpers'
import { useAuth } from 'hooks'

export default function PerfilMod () {
   // ► Custom hook's ...
   const { authLoading } = useAuth()

   return (
      <>
         <Body
            sx={{
               height: '100%',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'
            }}
         >
            <Fade duration={ 2000 }>
               <FichaDatosPersonales />
            </Fade>
         </Body>

         {/* ► Modal: Loading ... */}
         { authLoading && <ModalLoader /> }
      </>
   )
}

const FichaDatosPersonales: FC = () => {
   // ► Hook's ...
   const attachmentPhoto = useRef({} as HTMLInputElement)

   // ► Custom hook's ...
   const { userCredentials, updateAccount } = useAuth()

   // ► handler's ...
   const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
      const base64 = await getBase64(e.target.files?.[0]!)
      await updateAccount({ foto: base64 })
   }

   return (
      <>
         <Paper
            variant='outlined'
            sx={{
               p: 2,
               width: 500,
               height: 480,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: 1
            }}
         >

            {/* ► PHOTO ... */}
            <Box display='flex' alignItems='flex-end' gap={ 1 }>

               {/* ► IMG ... */}
               <Paper
                  square
                  elevation={ 2 }
                  sx={{
                     width: 165,
                     height: 200,
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: '85% 95%',
                     backgroundPosition: 'center',
                     backgroundImage: `url(${userCredentials.foto})`,
                     backgroundClip: 'content-box'
                  }}
               />

               {/* ► Action ...  */}
               <Button
                  variant='contained'
                  color='inherit'
                  size='small'
                  onClick={ () => { attachmentPhoto.current.click() } }
               >
                  <AttachFileRounded />
               </Button>
               <input ref={ attachmentPhoto } type='file' accept='.png, .jpg, .jpeg' hidden onChange={ handleChangePhoto } />

            </Box>

            {/* ► CREDENTIALS ... */}
            <FrmCredentials />

         </Paper>

      </>
   )
}

const FrmCredentials: FC = () => {
   // ► Custom hook's ...
   const { updateAccount } = useAuth()

   return (
      <>
         <Typography variant='h4' color='GrayText' sx={{ mt: 3, alignSelf: 'flex-start' }}>FICHA DE DATOS</Typography>
         <Formik
            initialValues={{
               password: '',
               repeatPassword: ''
            }}
            validationSchema={ Yup.object({
               password: Yup.string()
                  .required('¡Campo requerido!')
                  .min(4, '¡Ingrese 4 caracteres como mínimo!'),
               repeatPassword: Yup.string()
                  .required('¡Campo requerido!')
                  .min(4, '¡Ingrese 4 caracteres como mínimo!')
                  .oneOf([Yup.ref('password')], '¡Las contraseñas deben coincidir!')
            })}
            onSubmit={ async ({ password }: { password: string, repeatPassword: string }, meta): Promise<any> => {
               await updateAccount({ password })
               meta.resetForm()
            } }>
            <Form>
               <Box
                  display='flex'
                  flexDirection='column'
                  gap={ 1 }
               >
                  <MyTextField type='password' name='password' label='Contraseña' width={ 25 } focused muiProps={{ variant: 'filled' }} />
                  <MyTextField type='password' name='repeatPassword' label='Repetir contraseña' width={ 25 } muiProps={{ variant: 'filled' }} />
                  <Button
                     type='submit'
                     fullWidth
                     variant='contained'
                     startIcon={ <UpdateRounded /> }
                  >
                     <Typography variant='h4'>Actualizar</Typography>
                  </Button>
               </Box>
            </Form>
         </Formik>
      </>
   )
}
