import React, { useRef, useMemo, useState, useEffect } from 'react'
import {
   Paper,
   Box,
   Tooltip,
   IconButton,
   Typography
} from '@mui/material'
import {
   Search,
   FindInPage,
   GetApp
} from '@mui/icons-material'
import Fade from 'react-reveal/Fade'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import {
   MyTextField,
   SpeedDialBackdrop,
   SimpleDataGrid as Table,
   SimpleModal
} from 'components'

import FichaInterpolDetalle from 'components/Interpol/FichaInterpolDetalle'

import useInterpol from 'hooks/useInterpol'

import useBreakpoints from 'hooks/useBreakpoints'

const Content = styled.div`
   margin: .5rem;
`
export const BuscarInterpolSubMod = () => {
   /* » HOOK'S... */
   const rSubmit = useRef()
   const rReset = useRef()
   const [openModal, setOpenModal] = useState(false)
   const [detInterpolRecord, setDetInterpolRecord] = useState({})

   /* » CUSTOM HOOK'S ... */
   const { interpolLoadingDb, interpolDb, handleFindByApprox, handleDownloadScreenshot } = useInterpol()
   const { currentScreen, screens, unsuscribeScreenResizeListener } = useBreakpoints()

   /* » EFFECT'S ... */
   useEffect(() => () => { unsuscribeScreenResizeListener() }, [])

   /* » HANDLER'S ...  */
   const handleActionDetalle = (rowData) => { setDetInterpolRecord(rowData); setOpenModal(true) }

   /* » DEPENDENCY'S  */
   /* » ARGUMENT ◄► `configTable`  */
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Detalle' }, { icon: 'Correo' }],
      components: ({ action: { icon }, data: record }) => {
         if (icon === 'Detalle') {
            return (
               <Tooltip
                  title={<Typography variant='h6' color='initial'>Ver detalle</Typography>}
                  placement='right-start'
                  arrow
               >
                  <IconButton
                     onClick={() => { handleActionDetalle(record) }}
                  >
                     <FindInPage />
                  </IconButton>
               </Tooltip>
            )
         } else if (icon === 'Correo') {
            if (!record.isScreenshot) return <></>
            return (
               <Tooltip
                  title='Captura de correo'
                  arrow
               >
                  <IconButton
                     onClick={() => handleDownloadScreenshot(record.idInterpol) }
                  >
                     <GetApp />
                  </IconButton>
               </Tooltip>
            )
         }
      }
   }), [interpolDb])

   /* » ARGUMENT ◄► `dataTable`  */
   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Pasaporte', field: 'pasaporte', width: 10, render: ({ pasaporte }) => pasaporte?.trim() || '-' },
         {
            title: 'Ciudadano',
            field: 'nombres',
            type: 'date',
            width: 70,
            render: ({ nombres, apellidos }) => `${nombres}, ${apellidos}`
         },
         { title: 'Nacionalidad', field: 'nacionalidad', width: 20 },
         {
            title: 'Fecha Emisión', field: 'fechaEmision', type: 'date', width: 15
            /* render: ({ fechaEmision }) => new Intl.DateTimeFormat('es-PE', { dateStyle: 'short' }).format(Date.parse(fechaEmision)) */
         }
      ],
      data: interpolDb
   }), [interpolDb])

   /* » ARGUMENT : `optSpeedDialAction`  */
   const optSpeedDialAction = [
      {
         icon: <Search />,
         tooltip: 'Buscar',
         handleOnClick: () => { rSubmit.current.click() }
      }
   ]

   const optFormik = {
      initialValues: {
         nombres: '',
         apellidos: '',
         cedula: '',
         pasaporte: ''
      },
      validationSchema: Yup.object({
         nombres: Yup.string().required('¡Campo requerido!')
         /* apellidos: Yup.string().required('¡Campo requerido!'), */
      }),
      onSubmit: (values) => { handleFindByApprox(values) }
   }

   return (
      <>
         <Content>
            {/* HEADER... */}
            <Fade clear>
               <Formik {...optFormik} >
                  {
                     ({ values: { nombres, apellidos, cedula, pasaporte } }) => (
                        <Form>
                           {/* <AppTitle name='» BUSCAR INTERPOL' align='left' size={1} color='#777' /> */}
                           <Paper elevation={10}>
                              <Box display='flex' justifyContent='space-between' p={2} height={85} >
                                 <MyTextField name='nombres' value={nombres} label='Nombres' size={20} focused />
                                 <MyTextField name='apellidos' value={apellidos} label='Apellidos' size={20} />
                                 <MyTextField name='cedula' value={cedula} label='N° Cédula' size={10} />
                                 <MyTextField name='pasaporte' value={pasaporte} label='N° Pasaporte' size={10} />
                              </Box>
                           </Paper>
                           <input type='submit' ref={rSubmit} hidden />
                           <input type='reset' ref={rReset} hidden />
                        </Form>
                     )
                  }
               </Formik>

               {/* » BODY */}
               <Box mt={0.5}>
                  <Table
                     isLoading={interpolLoadingDb}
                     dataTable={dataTable}
                     configTable={configTable}
                     pageSize={
                        currentScreen === screens.desktopWide ? 12 : 6
                     }
                  />
               </Box>
            </Fade>
         </Content>

         {/* » FLOAT  */}
         <SpeedDial
            position='absolute'
            direction='right'
            opt={{ bottom: 2 }}
            optSpeedDialAction={optSpeedDialAction}
         />

         {/* » MODAL  */}
         <SimpleModal open={openModal} setOpen={setOpenModal} >
            <AppTitle name='DATOS ADICIONALES' align='left' color='#777' size={1} />
            <FichaInterpolDetalle data={detInterpolRecord} {...props} />
         </SimpleModal>
      </>
   )
}

export default BuscarInterpolSubMod
