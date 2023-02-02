import { FC, useRef, useState, useMemo, useEffect, ChangeEvent } from 'react'

import {
   Box,
   Button,
   Divider,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   ListSubheader,
   Paper,
   Stack,
   Tooltip,
   Typography,
   Badge
} from '@mui/material'

import {
   AttachmentRounded,
   CancelRounded,
   CheckCircleRounded,
   DeleteForeverRounded,
   DeleteSweepRounded,
   DownloadRounded,
   EditRounded,
   FileDownloadRounded,
   MoreVertRounded,
   SaveRounded,
   SyncRounded,
   UploadRounded,
   Mail
} from '@mui/icons-material'
import { Form, Formik, FormikConfig } from 'formik'
import * as Yup from 'yup'
import { GridColDef } from '@mui/x-data-grid'
import Zoom from 'react-reveal/Zoom'

import {
   BandejaProcesos,
   ConfirmDialogModal,
   ConfirmDialogRefProps,
   ModalLoader,
   MySelect,
   MyTextField,
   SimpleAutocomplete,
   SimpleDataGrid,
   SimpleModal,
   SimpleModalRefProps,
   SpeedDialBackdrop,
   SpeedDialActionProps
} from 'components'

import { useBreakpoints, useFormatoPermisos, useSimUsuario } from 'hooks'
import { AttachmentType, FormatoPermisos } from 'interfaces'
import { jornadaLaboral, regimenLaboral, tipoLicencia } from 'db'
import { SimpleFieldDetail } from 'components/detail'
import { resetObjectProps } from 'helpers'

const RegistrarFormatoAutorizacionSubMod: FC = () => {
   // » Custom hook's ...
   const { loadingSimUsuarioDb, findAllSimUsuario } = useSimUsuario()
   const { loadingFormatoPermisosDb, findFormatoPermisosByUsrCreador } = useFormatoPermisos()

   // » Effect's ...
   useEffect(() => { findAllSimUsuario() }, [])

   // » Dep's ...
   const speedDialActions: SpeedDialActionProps[] = useMemo(() => ([{
      name: 'Refrescar_Bandeja',
      icon: <SyncRounded />,
      handleClick: async (): Promise<void> => {
         await findFormatoPermisosByUsrCreador()
         findAllSimUsuario()
      }
   }]), [])

   return (
      <>
         <BandejaProcesos>
            <Box display='flex' flexDirection='column' gap={ 0.5 }>
               <RegistrarFormatoAutorizacion />
               <RegistrarFormatoAutorizacionBandeja />
            </Box>
         </BandejaProcesos>

         {/* » Actions ...  */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* » Modal loading ... */}
         { loadingSimUsuarioDb && <ModalLoader /> }
         { loadingFormatoPermisosDb && <ModalLoader /> }
      </>
   )
}

const RegistrarFormatoAutorizacion: FC = () => {
   return (
      <FormatoAutorizacionFrm />
   )
}

const FormatoAutorizacionFrm: FC<{ formatoPermisos?: FormatoPermisos }> = ({ formatoPermisos }) => {
   // » Custom hook's ...
   const {
      loadingFormatoPermisosDb,
      saveFormatoPermisos,
      findFormatoPermisosByUsrCreador
   } = useFormatoPermisos()

   const { simUsuarioNombreDb } = useSimUsuario()

   const formikProps: FormikConfig<Partial<FormatoPermisos>> = useMemo(() => ({
      initialValues: {
         jornadaLaboral: formatoPermisos?.jornadaLaboral || '',
         regimenLaboral: formatoPermisos?.regimenLaboral || '',
         nombres: formatoPermisos?.nombres || '',
         gerencia: formatoPermisos?.gerencia || '',
         subgerencia: formatoPermisos?.subgerencia || '',
         unidad: formatoPermisos?.unidad || '',
         tipoLicencia: formatoPermisos?.tipoLicencia || '',
         desde: formatoPermisos?.desde || '',
         hasta: formatoPermisos?.hasta || '',
         totalHoras: formatoPermisos?.totalHoras || '',
         justificacion: formatoPermisos?.justificacion || '',
         fechaFormato: formatoPermisos?.fechaFormato || ''
      },
      validationSchema: Yup.object({
         jornadaLaboral: Yup.string().required('¡Campo requerido!'),
         regimenLaboral: Yup.string().required('¡Campo requerido!'),
         nombres: Yup.string().required('¡Campo requerido!'),
         gerencia: Yup.string().required('¡Campo requerido!'),
         subgerencia: Yup.string().required('¡Campo requerido!'),
         tipoLicencia: Yup.string().required('¡Campo requerido!'),
         desde: Yup.date().required('¡Campo requerido!').max(Yup.ref('hasta'), '¡Debe ser inferior a la fecha y hora máxima!'),
         hasta: Yup.date().required('¡Campo requerido!').min(Yup.ref('desde'), '¡Debe ser superior a la fecha y hora mínima!'),
         justificacion: Yup.string().required('¡Campo requerido!'),
         fechaFormato: Yup.date().required('¡Campo requerido!')
      }),
      onSubmit: async (values, meta): Promise<void> => {
         if (formatoPermisos) values.idFormato = formatoPermisos.idFormato
         await saveFormatoPermisos(values)
         await findFormatoPermisosByUsrCreador()
         meta.resetForm()
         meta.setValues(resetObjectProps(formatoPermisos!))
      }
   }), [formatoPermisos])

   return (
      <Formik { ...formikProps }>
         { (props) => (
            <Form>
               <Paper elevation={ 1 } sx={ { my: 0.5, mx: 1, p: 1 } }>
                  <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='flex-start' gap={ 0.5 }>
                     <MySelect name='jornadaLaboral' label='Jornada laboral' width={ 12 } opt={ jornadaLaboral } muiProps={{ autoFocus: true, variant: 'standard' }} />
                     <MySelect name='regimenLaboral' label='Régimen laboral' width={ 10 } opt={ regimenLaboral } muiProps={{ variant: 'standard' }}/>
                     <SimpleAutocomplete name='nombres' label='Servidor' width={ 20 } opt={ simUsuarioNombreDb } muiProps={{ variant: 'standard' }} { ...props } />
                     <MyTextField type='text' name='gerencia' label='Gerencia' width={ 11 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='subgerencia' label='Subgerencia' width={ 11 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='unidad' label='Unidad' width={ 11 } muiProps={{ variant: 'standard' }} />
                     <MySelect name='tipoLicencia' label='Tipo de licencia/Permiso' width={ 34 } opt={ tipoLicencia } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='datetime-local' name='desde' label='Desde' width={ 8 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='datetime-local' name='hasta' label='Hasta' width={ 8 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='totalHoras' label='Total horas' width={ 8 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='date' name='fechaFormato' label='Fecha formato' width={ 7 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='justificacion' label='Justificación' width={ 48 } muiProps={{ variant: 'standard' }} />
                     <Button
                        type='submit'
                        variant='outlined'
                        color='primary'
                        disabled={ loadingFormatoPermisosDb }
                     >
                        <SaveRounded />
                     </Button>
                     <Button
                        type='reset'
                        variant='outlined'
                        color='error'
                     >
                        <DeleteSweepRounded />
                     </Button>
                  </Box>
               </Paper>
            </Form>
         ) }
      </Formik>
   )
}

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const RegistrarFormatoAutorizacionBandeja: FC = () => {
   // » Hook's ...
   const modalEditarFormato = useRef({} as SimpleModalRefProps)
   const modalAttachments = useRef({} as SimpleModalRefProps)
   const modalObservaciones = useRef({} as SimpleModalRefProps)
   const confirmEliminarFormato = useRef({} as ConfirmDialogRefProps)
   const modalVerDetalle = useRef({} as SimpleModalRefProps)
   const [formatoPermisosTmp, setFormatoPermisosTmp] = useState({} as FormatoPermisos)
   const [isEliminarFormato, setIsEliminarFormato] = useState(false)

   // » Custom hook's ...
   const {
      formatoPermisosDb,
      findFormatoPermisosByUsrCreador,
      downloadFormatoLicenciaById,
      deleteFormatoPermisosById
   } = useFormatoPermisos()

   const { currentScreen } = useBreakpoints()

   // » Effect's ...
   useEffect(() => { findFormatoPermisosByUsrCreador() }, [])

   useEffect(() => {
      if (!isEliminarFormato) return
      (async () => {
         await deleteFormatoPermisosById(formatoPermisosTmp.idFormato)
         findFormatoPermisosByUsrCreador()
         setIsEliminarFormato(false)
      })()
   }, [isEliminarFormato])

   // » Dep's ...
   const dgColumns = useMemo<GridColDef<FormatoPermisos>[]>(() => [
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Descargar formato' placement='top-start' arrow>
            <IconButton onClick={() => { downloadFormatoLicenciaById(row.idFormato) }} >
               <DownloadRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Editar formato' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalEditarFormato.current.setOpen(true)
               } }
            >
               <EditRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Eliminar formato' placement='top-start' arrow>
            <IconButton onClick={ () => {
               setFormatoPermisosTmp(row)
               confirmEliminarFormato.current.setIsOpen(true)
            } }>
               <DeleteForeverRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Adjuntar documentación' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalAttachments.current.setOpen(true)
               } }
            >
               <AttachmentRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Ver detalle' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalVerDetalle.current.setOpen(true)
               } }
            >
               <MoreVertRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => {
            if (!row.observaciones) return
            return (
               <Tooltip title='Ver observaciones' placement='top-start' arrow>
                  <IconButton
                     onClick={() => {
                        setFormatoPermisosTmp(row)
                        modalObservaciones.current.setOpen(true)
                     }}
                  >
                     <Badge badgeContent={ 1 } color='error'>
                        <Mail color='action' />
                     </Badge>
                  </IconButton>
               </Tooltip>
            )
         }
      },
      { field: 'idFormato', headerName: 'Id', width: 100, ...commonGridColDef },
      { field: 'fechaCreacion', headerName: 'Fecha Registro', type: 'date', width: 150, ...commonGridColDef },
      {
         field: 'recibido',
         headerName: '¿Recibido?',
         type: 'boolean',
         width: 120,
         renderCell: ({ row }) => row.recibido
            ? <CheckCircleRounded fontSize='small' color='success' />
            : <CancelRounded fontSize='small' color='error' />,
         ...commonGridColDef
      }, {
         field: 'atendido',
         headerName: '¿Atendido?',
         type: 'boolean',
         width: 120,
         renderCell: ({ row }) => row.atendido
            ? <CheckCircleRounded fontSize='small' color='success' />
            : <CancelRounded fontSize='small' color='error' />,
         ...commonGridColDef
      },
      { field: 'nombres', headerName: 'Servidor', width: 300, ...commonGridColDef },
      { field: 'tipoLicencia', headerName: 'Tipo Licencia/Permiso', minWidth: 500, flex: 1, ...commonGridColDef }
   ], [formatoPermisosDb])

   return (
      <>
         <Zoom>
            <Box mx={ 1 }>
               <SimpleDataGrid
                  columns={ dgColumns }
                  rows={ formatoPermisosDb }
                  pageSize={ currentScreen === 'desktopLarge'
                     ? 6
                     : currentScreen === 'desktopWide'
                        ? 8
                        : 3
                  }
                  getRowId={ row => row.idFormato }
                  localStoragePageKey='REGISTRAR_FORMATO_AUTORIZACION_BANDEJA_NROPAG'
               />
            </Box>
         </Zoom>

         {/* » Modal: Editar ...  */}
         <SimpleModal ref={ modalEditarFormato } style={{ width: '83rem' }}>
            <FormatoAutorizacionFrm formatoPermisos={ formatoPermisosTmp } />
         </SimpleModal>

         {/* » Confirm: Eliminar ...  */}
         <ConfirmDialogModal ref={ confirmEliminarFormato } title='¿Seguro de continuar?' setIsAccept={ setIsEliminarFormato } />

         {/* » Modal: Editar ...  */}
         <SimpleModal ref={ modalVerDetalle } style={{ width: '83rem' }}>
            <Box p={ 2 } display='flex' flexWrap='wrap' justifyContent='space-between' gap={ 3 }>
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Fecha Registro' prop='fechaCreacion' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Servidor' prop='nombres' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Tipo Licencia' prop='tipoLicencia' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Jornada Laboral' prop='jornadaLaboral' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Régimen Laboral' prop='regimenLaboral' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Gerencia' prop='gerencia' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Subgerencia' prop='subgerencia' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Unidad' prop='unidad' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Desde' prop='desde' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Hasta' prop='hasta' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Total horas' prop='totalHoras' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Justificación' prop='justificacion' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Fecha Formato' prop='fechaFormato' />
            </Box>
         </SimpleModal>

         {/* » Modal: Attachment's ...  */}
         <SimpleModal ref={ modalAttachments }>
            <Attachments permiso={ formatoPermisosTmp } />
         </SimpleModal>

         {/* » Modal: Observaciones ...  */}
         <SimpleModal ref={ modalObservaciones }>
            <Box width={ 500 } px={ 1 } display='flex' flexDirection='column' gap={ 1 }>
               <Typography variant='h2'>Observaciones:</Typography>
               <Typography variant='h4'>{ formatoPermisosTmp.observaciones }</Typography>
            </Box>
         </SimpleModal>
      </>
   )
}

const Attachments: FC<{permiso: FormatoPermisos}> = ({ permiso }) => {
   // » Hook's ...
   const inputFile = useRef({} as HTMLInputElement)
   const attachmentType = useRef<AttachmentType>()

   // » Custom hook's ...
   const { handleUploadAttachment, downlodAttachment } = useFormatoPermisos()

   // » Handler's ...
   const handleChangeInputFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      handleUploadAttachment(files!, attachmentType.current!, permiso.idFormato)
      inputFile.current.value = ''
   }

   return (
      <>
         <Stack direction='row' spacing={ 1 } divider={ <Divider orientation='vertical' flexItem /> }>

            <List
               subheader={ <ListSubheader><Typography variant='h3'>░ Formato</Typography></ListSubheader> }
            >

               <ListItemButton
                  onClick={ () => {
                     attachmentType.current = 'FORMATO'
                     inputFile.current.click()
                  } }
               >
                  <ListItemIcon><UploadRounded /></ListItemIcon>
                  <ListItemText primary={ <Typography variant='h5'>Subir formato</Typography> } />
               </ListItemButton>

               <ListItemButton
                  onClick={ () => {
                     attachmentType.current = 'FORMATO'
                     downlodAttachment('FORMATO', permiso.idFormato)
                  } }
               >
                  <ListItemIcon><FileDownloadRounded /></ListItemIcon>
                  <ListItemText primary={ <Typography variant='h5'>Descargar formato</Typography> } />
               </ListItemButton>
            </List>

            <List
               subheader={ <ListSubheader><Typography variant='h3'>░ Sustento</Typography></ListSubheader> }
            >

               <ListItemButton
                  onClick={ () => {
                     attachmentType.current = 'SUSTENTO'
                     inputFile.current.click()
                  } }
               >
                  <ListItemIcon><UploadRounded /></ListItemIcon>
                  <ListItemText primary={ <Typography variant='h5'>Subir sustento</Typography> } />
               </ListItemButton>

               <ListItemButton
                  onClick={ () => {
                     attachmentType.current = 'SUSTENTO'
                     downlodAttachment('SUSTENTO', permiso.idFormato)
                  } }
               >
                  <ListItemIcon><FileDownloadRounded /></ListItemIcon>
                  <ListItemText primary={ <Typography variant='h5'>Descargar sustento</Typography> } />
               </ListItemButton>
            </List>

         </Stack>

         {/* » Aux input file ...  */}
         <input
            ref={ inputFile }
            type='file'
            accept='.pdf'
            hidden
            onChange={ handleChangeInputFile }
         />
      </>
   )
}

export default RegistrarFormatoAutorizacionSubMod
