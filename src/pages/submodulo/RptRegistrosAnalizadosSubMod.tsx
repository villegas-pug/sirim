import { FC, useEffect, useMemo } from 'react'

import { Box, Button, Divider, Paper, Stack } from '@mui/material'
import { DownloadRounded } from '@mui/icons-material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import { Body, ModalLoader, MyTextField, SimpleAutocomplete } from 'components'
import { useAnalizarExtraccion, useAuth, useExtraccion } from 'hooks'
import { RecordsBetweenDatesDto } from 'interfaces'

const RptRegistrosAnalizadosSubMod: FC = () => {
   // ► Custom hook's ...
   const { loadingExtraccionDb, findAllTablaDinamicaOnlyNombres } = useExtraccion()
   const { loadingAsigGrupoCamposAnalisisDb } = useAnalizarExtraccion()

   // ► Effect's ...
   useEffect(() => { findAllTablaDinamicaOnlyNombres() }, [])

   // ► Dep's ...

   return (
      <>
         <Fade top>
            <Body>
               <Box
                  height='100%'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  flexDirection='column'
               >
                  <FrmDownloadAnalizados />
               </Box>
            </Body>
         </Fade>

         {/* ► Modal: Loader ...  */}
         { loadingExtraccionDb && <ModalLoader /> }
         { loadingAsigGrupoCamposAnalisisDb && <ModalLoader /> }
      </>
   )
}

const FrmDownloadAnalizados: FC = () => {
   // ► Custom hook's ...
   const { extraccionDb } = useExtraccion()
   const { downloadAnalisadosByDates } = useAnalizarExtraccion()
   const { loadingAsigGrupoCamposAnalisisDb } = useAnalizarExtraccion()
   const { userCredentials: { grupo: currUsrAuthGrupo } } = useAuth()

   // ► Dep's ...
   const tablaDinamicaOnlyNombres = useMemo(() => {
      return extraccionDb
         .filter(({ usrCreador: { grupo } }) => grupo === currUsrAuthGrupo)
         .map(t => `${t.nombre} | ${t.fechaCreacion}`)
   }, [extraccionDb, currUsrAuthGrupo])

   return (
      <Formik
         initialValues={{
            fecIni: '',
            fecFin: '',
            nombreTabla: ''
         }}
         validationSchema={Yup.object({
            fecIni: Yup.date().required('¡Fecha requerida!').max(Yup.ref('fecFin'), '¡Fecha debe ser menor a la final!'),
            fecFin: Yup.date().required('¡Fecha requerida!').min(Yup.ref('fecIni'), '¡Fecha debe ser mayor a la inicial!'),
            nombreTabla: Yup.string().required('¡Campo requerido!')
         })}
         onSubmit={ async (values: Pick<RecordsBetweenDatesDto, 'fecIni' | 'fecFin' | 'nombreTabla'>, meta): Promise<void> => {
            downloadAnalisadosByDates({
               ...values,
               nombreTabla: values.nombreTabla.split('|')[0].trim()
            })
         } }
      >
         {(formikProps) => (
            <Form>
               <Paper elevation={ 5 } sx={{ p: 3 }}>
                  <Stack

                     direction='row'
                     justifyContent='space-between'
                     alignItems='flex-start'
                     gap={ 1 }
                     divider={ <Divider orientation='vertical' flexItem /> }
                  >
                     <MyTextField type='date' name='fecIni' label='Fecha Inicio Analisis' width={ 10 } focused />
                     <MyTextField type='date' name='fecFin' label='Fecha Fin Analisis' width={ 10 } />
                     <SimpleAutocomplete name='nombreTabla' label='Nombre de tabla' width={ 30 } opt={ tablaDinamicaOnlyNombres } { ...formikProps } />
                     <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        disabled={ loadingAsigGrupoCamposAnalisisDb }
                     >
                        <DownloadRounded />
                     </Button>
                  </Stack>
               </Paper>
            </Form>
         )}
      </Formik>
   )
}

export default RptRegistrosAnalizadosSubMod
