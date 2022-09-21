import {
   Paper,
   Typography,
   Box,
   Grid,
   Button,
   InputAdornment,
   CircularProgress
} from '@mui/material'
import {
   LockOpen,
   AccountCircle,
   VisibilityOff,
   Build,
   NewReleases,
   VisibilityRounded
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import styled from 'styled-components'

import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { MyTextField } from 'components/formik'

import { useAuth } from 'hooks'
import { FC, useState } from 'react'

const useStyle = makeStyles({
   portal: {
      width: 300
   },
   paper: {
      padding: 15
   },
   divider: {
      marginBottom: 20
   },
   textField: {
      letterSpacing: 1
   }
})

const Body = styled.div`
   height: 100vh;
   display: flex;
   background-color: #00A1C7;
`

const LeftSection = styled.section`
   flex-grow: 1;
   padding: 2.5rem;
   clip-path: polygon(0 0, 99.5% 0, 96% 100%, 0 100%);
   outline: 1px solid red;
   background-color: #013269;
   display: flex;
   flex-direction: column;
   justify-content: end;
   /* padding-right: 8rem; */
`

const RigthSection = styled.section`
   width: 25rem;
   display: flex;
   justify-content: center;
   align-items: center;
   outline: 1px solid red;
   clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
   background-color: #fff;
`

const Portal: FC = () => {
   // » HOOK'S ...
   const classes = useStyle()
   const [showPwd, setShowPwd] = useState(false)

   // ► CUSTOM - HOOK'S ...
   const { authLoading, login } = useAuth()

   // » DEP'S ...
   const optForm = {
      initialValues: {
         login: '',
         password: ''
      },
      validationSchema: Yup.object({
         login: Yup.string().required('¡Ingrese un usuario!'),
         password: Yup.string().required('¡Ingrese una contraseña!')
      }),
      onSubmit: (cred: any) => {
         login(cred)
      }
   }

   // ► HANDLER'S ...
   const handleShowPwd = () => { setShowPwd(prev => !prev) }

   return (
      <Fade delay={500} duration={2000}>
         <Zoom bottom delay={500} duration={1500}>
            <Body>
               <LeftSection>
                  <Typography
                     variant='h1'
                     sx={{
                        color: '#fff',
                        fontSize: 40,
                        fontFamily: 'Courgette'
                     }}
                  >
                  Sistema Integral<br/>
                  Registro de Información Migratoria
                  </Typography>

               </LeftSection>

               <RigthSection>

                  <Formik {...optForm} >
                     {() => (
                        <Form>
                           <Paper elevation={0} className={classes.paper}>
                              <Grid container spacing={2} className={classes.portal}>
                                 <Grid item xs={12}>
                                    <Box height={70}>
                                       <MyTextField
                                          name='login'
                                          label='usuario'
                                          width={20}
                                          focused
                                          muiProps={{
                                             type: 'text',
                                             InputProps: {
                                                endAdornment: (
                                                   <InputAdornment position='end'>
                                                      <AccountCircle color='action' />
                                                   </InputAdornment>
                                                )
                                             },
                                             fullWidth: true,
                                             className: classes.textField
                                          }}
                                       />
                                    </Box>
                                    <Box height={70}>
                                       <MyTextField
                                          type={ showPwd ? 'text' : 'password' }
                                          name='password'
                                          label='contraseña'
                                          width={20}
                                          muiProps={{
                                             InputProps: {
                                                endAdornment: (
                                                   <InputAdornment
                                                      position='end'
                                                      sx={{ cursor: 'pointer' }}
                                                      onClick={ handleShowPwd }
                                                   >
                                                      { showPwd
                                                         ? <VisibilityRounded color='action' />
                                                         : <VisibilityOff color='action' />
                                                      }
                                                   </InputAdornment>
                                                )
                                             },
                                             fullWidth: true,
                                             className: classes.textField
                                          }}
                                       />
                                    </Box>
                                    <Button
                                       fullWidth
                                       disabled={authLoading}
                                       type='submit'
                                       variant='contained'
                                       startIcon={
                                          authLoading
                                             ? <CircularProgress size={20} color='inherit' />
                                             : <LockOpen fontSize='large' />
                                       }
                                    >
                                       <Typography
                                          variant='h4'
                                          sx={{ color: '#fff' }}
                                       >
                                       INGRESAR
                                       </Typography>
                                    </Button>
                                    <Box display='flex' justifyContent='space-between' mt={1}>
                                       <Button
                                          variant='text'
                                          startIcon={<Build color='action' fontSize='small'/>}
                                       >
                                          <Typography variant='h6' color='textSecondary'>Requisitos del sistema</Typography>
                                       </Button>
                                       <Button
                                          variant='text'
                                          startIcon={<NewReleases color='action' fontSize='small'/>}
                                       >
                                          <Typography variant='h6' color='textSecondary'>Manual de usuario</Typography>
                                       </Button>
                                    </Box>
                                 </Grid>
                              </Grid>
                           </Paper>
                        </Form>
                     )}
                  </Formik>

               </RigthSection>
            </Body>
         </Zoom>
      </Fade>
   )
}

export default Portal
