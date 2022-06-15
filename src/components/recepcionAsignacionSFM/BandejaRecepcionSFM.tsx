import { FC, useContext, useMemo, useRef } from 'react'

import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { DeleteForever, NavigateNext, Save, Search } from '@mui/icons-material'
import { Form, Formik, FormikConfig } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import { RecepcionAsignacionSFMContext } from 'context/recepcionAsignacionSFM'

import { MyTextField, SimpleAutocomplete } from 'components/formik'
import { SpeedDialActionProps, SpeedDialBackdrop } from 'components/speedDial'
import { ModalLoader } from 'components/styled'

import { organigrama, tipoDocumento } from 'db'
import { SolicitudSFM } from 'interfaces'

import { useDistrito, useFiscalizacionPosterior, usePais } from 'hooks'

export const BandejaRecepcionSFM: FC = () => {
   /* » HOOK'S  */
   const { handleChangeBandeja } = useContext(RecepcionAsignacionSFMContext)
   const submitRef = useRef({} as HTMLInputElement)
   const resetRef = useRef({} as HTMLInputElement)

   /* » CUSTOM-HOOK'S  */
   const { nacionalidadDb } = usePais()
   const { simpleDistritoDb } = useDistrito()
   const {
      fiscalizacionPosteriorDbLoading,
      bandejaEntradaDbLoading,
      simpleTipoTramiteDb,
      solicitudValues,
      findByNumeroExpediente,
      saveSolicitud
   } = useFiscalizacionPosterior()

   /* » EFFECT'S  */

   /* » HANDLER'S  */
   const handleFindByNumeroExpediente = (numeroExpediente: string) => {
      if (numeroExpediente.trim() === '') return
      findByNumeroExpediente(numeroExpediente)
   }

   /* » DEP'S  */
   /* » ARGUMENT : `optSpeedDialAction`  */
   const speedDialActions: Array<SpeedDialActionProps> = [
      {
         name: 'Guardar',
         icon: <Save />,
         handleClick: () => { submitRef.current.click() }
      }, {
         name: 'Limpiar',
         icon: <DeleteForever />,
         handleClick: () => { resetRef.current.click() }
      }
   ]

   const formikConfig: FormikConfig<Partial<SolicitudSFM>> = useMemo(() => ({
      initialValues: {
         tipoDocumento: '',
         numeroDocumento: '',
         unidadSolicitante: '',
         numeroExpediente: '',
         fechaInicioTramite: '',
         fechaIngresoSFM: '',
         tipoDocumentoIdentidad: '',
         numeroDocIdentidad: '',
         administrado: '',
         nacionalidad: '',
         domicilio: '',
         distrito: '',
         procedimiento: '',
         subtipoProcedimiento: '',
         ...solicitudValues
      },
      validationSchema: Yup.object({
         tipoDocumento: Yup.string().required('¡Requerido!'),
         numeroDocumento: Yup.string().required('¡Requerido!'),
         unidadSolicitante: Yup.string().required('¡Requerido!'),
         numeroExpediente: Yup.string().required('¡Requerido!'),
         fechaInicioTramite: Yup.date().required('¡Requerido!'),
         fechaIngresoSFM: Yup.date().required('¡Requerido!'),
         tipoDocumentoIdentidad: Yup.string().required('¡Requerido!'),
         numeroDocIdentidad: Yup.string().required('¡Requerido!'),
         administrado: Yup.string().required('¡Requerido!'),
         nacionalidad: Yup.string().required('¡Requerido!'),
         domicilio: Yup.string().required('¡Requerido!'),
         distrito: Yup.string().required('¡Requerido!'),
         procedimiento: Yup.string().required('¡Requerido!'),
         subtipoProcedimiento: Yup.string().required('¡Requerido!')
      }),
      onSubmit: async (values, meta): Promise<void> => {
         await saveSolicitud(values)
         meta.resetForm()
      }
   }), [solicitudValues])

   /* » RENDERING-CONDITIONAL:  ... */
   if (fiscalizacionPosteriorDbLoading) return <ModalLoader />
   if (bandejaEntradaDbLoading) return <ModalLoader />

   return (
      <>
         <Fade zoom duration={1000}>
            <Box
               display='flex'
               flexDirection='column'
            >
               <Button
                  style={{ marginLeft: 'auto' }}
                  variant='contained'
                  endIcon={ <NavigateNext fontSize='large' /> }
                  onClick={ () => { handleChangeBandeja('BANDEJA_ASIGNACION') } }
               >
                  <Typography variant='h4'>Ir a Asignación</Typography>
               </Button>
               <Formik { ...formikConfig }>
                  {
                     ({ ...rest }) => (
                        <Form>
                           <Box
                              mt={1}
                              height={420}
                              display='flex'
                              flexWrap='wrap'
                              justifyContent='space-between'
                           >
                              <Box
                                 width={310}
                                 display='flex'
                                 justifyContent='space-between'
                                 alignItems='flex-start'
                              >
                                 <MyTextField name='numeroExpediente' label='Número Expediente' width={15} focused />
                                 <Button
                                    variant='contained'
                                    onClick={ () => handleFindByNumeroExpediente(rest.values?.numeroExpediente!) }
                                 >
                                    { fiscalizacionPosteriorDbLoading ? <CircularProgress size={24} color='inherit' /> : <Search fontSize='medium' /> }
                                 </Button>
                              </Box>

                              <SimpleAutocomplete name='tipoDocumento' label='Tipo Documento' width={20} opt={tipoDocumento} { ...rest } />
                              <MyTextField name='numeroDocumento' label='Número Documento' width={15} />
                              <SimpleAutocomplete name='unidadSolicitante' label='Unidad Solicitante' width={30} opt={organigrama} { ...rest } />
                              <MyTextField type='date' name='fechaInicioTramite' label='Fecha Inicio Tramite' width={15} />
                              <MyTextField type='date' name='fechaIngresoSFM' label='Fecha Ingreso SFM' width={15} />
                              <SimpleAutocomplete name='tipoDocumentoIdentidad' label='Tipo Documento Identidad' width={20} opt={tipoDocumento} { ...rest } />
                              <MyTextField name='numeroDocIdentidad' label='Número Doc. Identidad' width={15} />
                              <MyTextField name='administrado' label='Administrado' width={40} />
                              <SimpleAutocomplete name='nacionalidad' label='Nacionalidad' width={15} opt={nacionalidadDb} { ...rest } />
                              <MyTextField name='domicilio' label='Dirección Domiciliaria' width={35} />
                              <SimpleAutocomplete name='distrito' label='Distrito' width={20} opt={simpleDistritoDb} { ...rest } />
                              <SimpleAutocomplete name='procedimiento' label='Tipo Solicitud' width={30} opt={simpleTipoTramiteDb} { ...rest } />
                              <MyTextField name='subtipoProcedimiento' label='Subtipo Solicitud' width={20} />
                           </Box>
                           <input ref={ submitRef } type='submit' hidden />
                           <input ref={ resetRef } type='reset' hidden />
                        </Form>
                     )
                  }
               </Formik>

            </Box>
         </Fade>

         {/* » FLOAT-PANEL  */}
         <SpeedDialBackdrop actions={speedDialActions} />
      </>
   )
}
