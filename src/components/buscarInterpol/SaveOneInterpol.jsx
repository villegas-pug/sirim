import React, { useEffect, useMemo, useRef, useState } from 'react'
import { 
   Paper,
   Divider, 
   Typography,
   Button,
   Box,
   TextField,
   CircularProgress
} from '@material-ui/core'
import { Save, DeleteForever } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Fade } from 'react-reveal'
import { Formik, Form } from 'formik'
import { useDropzone } from 'react-dropzone'
import * as Yup from 'yup'

import MyTextField from 'components/Formik/MyTextField'
import useInterpol from 'hooks/useInterpol'

const useStyle = makeStyles({
   paper: {
      width: 550,
      padding: 15
   },
   inputDragDrop: {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
   }
})

export default function SaveOneInterpol() {
   
   /*» HOOK'S  */  
   const classes = useStyle()
   const refForm = useRef(null)
   const [screenshot, setScreenshot] = useState([])
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'image/jpeg, image/png' })

   /*» CUSTOM HOOK'S  */
   const { interpolLoadingDb, handleSaveOneInterpol } = useInterpol()

   /*»  EFFECT'S */
   useEffect(() => { setScreenshot(acceptedFiles) }, [acceptedFiles])

   /*» HANDLER'S  */
   const handleReset = () => { refForm.current.reset(); setScreenshot([])}

   /*» DEPENDENCY'S  */
   const optFrm = useMemo(() => ({
      initialValues:{
         nombres: '',
         apellidos: '',
         sexo: '',
         nacionalidad: '',
         cedula: '',
         sede: '',
         fechaEmision: '',
      },
      validationSchema: Yup.object({
         nombres: Yup.string().required('¡Requerido!'),
         apellidos: Yup.string().required('¡Requerido!'),
         sexo: Yup.string().required('¡Requerido!'),
         nacionalidad: Yup.string().required('¡Requerido!'),
         sede: Yup.string().required('¡Requerido!'),
         fechaEmision: Yup.date().required('¡Requerido!'),
      }),
      onSubmit: (values) => { 
         if (screenshot.length > 0) {
            handleSaveOneInterpol(values, screenshot)
            handleReset()
         }
      }
   }), [screenshot])

   return (
      <Fade>
         <Paper elevation={1} className={classes.paper}>
            <Formik {...optFrm}>
               { 
                  () => (
                     <Form ref={refForm}>
                        <Typography gutterBottom variant='h4' color='primary'>NUEVO INTERPOL</Typography>
                        <Divider />
                        <Box display='flex' height={350} pt={1} pb={1} flexWrap='wrap' justifyContent='space-between'>
                           <MyTextField name='nombres' label='Nombres' size={16} focused />
                           <MyTextField name='apellidos' label='Apellidos' size={16} />
                           <MyTextField name='sexo' label='Sexo' size={10} />
                           <MyTextField name='nacionalidad' label='Nacionalidad' size={10} />
                           <MyTextField name='cedula' label='Nro.Cédula' size={10} />
                           <MyTextField name='sede' label='Sede' size={15} />
                           <MyTextField type='date' name='fechaEmision' label='Fecha Emisión' size={15} />
                           <div {...getRootProps({ className: classes.inputDragDrop })}>
                              <input {...getInputProps()} />
                              <TextField 
                                 variant='outlined'
                                 size='small'
                                 value={screenshot.length > 0 ? screenshot[0].name : 'Arrastrar y soltar aquí...'}
                                 helperText={ screenshot.length === 0 && '¡Imagen requerida!' }
                                 error={screenshot.length === 0}
                                 fullWidth
                                 disabled
                              />
                           </div>
                        </Box>
                        <Button 
                           type='submit'
                           variant='contained'
                           startIcon={interpolLoadingDb ? <CircularProgress color='inherit' size={20} /> : <Save fontSize='small' />}
                           disabled={ interpolLoadingDb }
                        >
                           <Typography variant='h4' color='initial'>GUARDAR</Typography>
                        </Button>
                        <Button 
                           variant='contained'
                           color='secondary'
                           startIcon={<DeleteForever fontSize='small' />}
                           style={{ marginLeft: 5 }}
                           onClick={handleReset}
                        >
                           <Typography variant='h4' color='initial'>LIMPIAR</Typography>
                        </Button>
                     </Form>  
                  )
               }
            </Formik>
         </Paper>
      </Fade>
   )
}