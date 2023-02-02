import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import {
   Box,
   Button,
   ButtonGroup,
   IconButton,
   Paper,
   Tooltip,
   Typography,
   Stack,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Divider,
   ListSubheader
} from '@mui/material'
import {
   CancelRounded,
   CheckCircleRounded,
   CleaningServicesRounded,
   FileDownloadRounded,
   MoreVertRounded,
   PlagiarismRounded,
   RuleRounded,
   SendAndArchiveRounded,
   StorageRounded,
   SyncRounded,
   SaveRounded,
   CommentRounded
} from '@mui/icons-material'
import { GridColDef } from '@mui/x-data-grid'
import Zoom from 'react-reveal/Zoom'
import { Formik, Form, FormikConfig } from 'formik'
import * as Yup from 'yup'

import {
   SimpleFieldDetail,
   BandejaProcesos,
   ExportToExcel,
   ExportToExcelRefProps,
   InfoCard,
   ModalLoader,
   SimpleDataGrid,
   SimpleModal,
   SimpleModalRefProps,
   SpeedDialActionProps,
   SpeedDialBackdrop,
   WrapperInfoCard,
   MyTextField
} from 'components'

import { AttachmentType, FormatoPermisos } from 'interfaces'
import { useBreakpoints, useFormatoPermisos } from 'hooks'
import { resetObjectProps } from 'helpers'

export const ValidarFormatoAutorizacionSubMod = () => {
   // » Custom hook's ...
   const { loadingFormatoPermisosDb, findAllFormatoPermisos, countControlAsistencias } = useFormatoPermisos()

   // » Effect's ...
   useEffect(() => { findAllFormatoPermisos() }, [])
   useEffect(() => { countControlAsistencias() }, [])

   // » Dep's ...
   const speedDialActions: SpeedDialActionProps[] = useMemo(() => ([{
      name: 'Refrescar_Bandeja',
      icon: <SyncRounded />,
      handleClick: () => {
         findAllFormatoPermisos()
         countControlAsistencias()
      }
   }]), [])

   return (
      <>
         <BandejaProcesos>
            <Box width='100%' display='flex' flexDirection='column' gap={ 0.5 }>
               <ValidarFormatoAutorizacionInfoCards />
               <ValidarFormatoAutorizacionActions />
               <ValidarFormatoAutorizacionBandeja />
            </Box>
         </BandejaProcesos>

         {/* » Actions ...  */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* » Modal loading ... */}
         { loadingFormatoPermisosDb && <ModalLoader /> }
      </>
   )
}

const ValidarFormatoAutorizacionInfoCards: FC = () => {
   // » Custom hook's ...
   const {
      totalFormatoPermisosDb,
      totalAttendedFormatoPermisosDb,
      totalNotAttendedFormatoPermisosDb,
      loadingFormatoPermisosDb,
      totalRecordsCtrlAsistenciaDb
   } = useFormatoPermisos()

   return (
      <WrapperInfoCard loading={ loadingFormatoPermisosDb }>
         <InfoCard iconName='Records' title='Base Marcación' value={ totalRecordsCtrlAsistenciaDb } />
         <InfoCard iconName='Assignment' title='Total Permisos' value={ totalFormatoPermisosDb } />
         <InfoCard iconName='AssignmentComplete' title='Permisos Atendidos' value={ totalAttendedFormatoPermisosDb } />
         <InfoCard iconName='AssignmentPendent' title='Permisos Pendientes' value={ totalNotAttendedFormatoPermisosDb } />
      </WrapperInfoCard>
   )
}

const ValidarFormatoAutorizacionActions: FC = () => {
   // » Hook's ...
   const inputFile = useRef({} as HTMLInputElement)

   // » Custom hook's ...
   const { handleUploadControlCalidad, deleteAllControlAsistencia } = useFormatoPermisos()

   // » Effect's ...

   // » Handler's ...
   const handleClickFile = () => { inputFile.current.click() }

   const handleChangeFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      handleUploadControlCalidad(files!)
      inputFile.current.value = ''
   }

   return (
      <>
         <Paper elevation={ 1 } sx={{ m: 1, p: 1 }}>
            <ButtonGroup variant='contained'>

               <Button
                  startIcon={ <StorageRounded fontSize='medium' /> }
                  onClick={ handleClickFile }
               >
                  <Typography variant='h5'>Subir asistencias</Typography>
               </Button>

               <Button
                  startIcon={ <CleaningServicesRounded fontSize='medium' /> }
                  onClick={ () => deleteAllControlAsistencia() }
               >
                  <Typography variant='h5'>Eliminar asistencias</Typography>
               </Button>

            </ButtonGroup>
         </Paper>

         <input
            type='file'
            accept='.xlsx'
            hidden
            ref={ inputFile }
            onChange={ handleChangeFile }
         />
      </>
   )
}

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const ValidarFormatoAutorizacionBandeja: FC = () => {
   // » Hook's ...
   const isMounted = useRef(false)
   const modalVerDetalle = useRef({} as SimpleModalRefProps)
   const modalAttachments = useRef({} as SimpleModalRefProps)
   const modalObservaciones = useRef({} as SimpleModalRefProps)
   const modalValidaciones = useRef({} as SimpleModalRefProps)
   const controlAsistenciasRpt = useRef({} as ExportToExcelRefProps)
   const [formatoPermisosTmp, setFormatoPermisosTmp] = useState({} as FormatoPermisos)

   // » Custom hook's ...
   const {
      formatoPermisosDb,
      controlPermisosDb,
      findControlPermisosByServidor
   } = useFormatoPermisos()

   const { currentScreen } = useBreakpoints()

   // » Effect's ...
   useEffect(() => {
      if (controlPermisosDb.length === 0) return
      if (!isMounted.current) return
      controlAsistenciasRpt.current.handleExportToExcel()
   }, [controlPermisosDb])

   useEffect(() => { isMounted.current = true }, [])

   // » Dep's ...
   const dgColumns = useMemo<GridColDef<FormatoPermisos>[]>(() => [
      {
         field: '>',
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
         field: '>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Validar formato' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalValidaciones.current.setOpen(true)
               } }
            >
               <RuleRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Descargar vinculaciones' placement='top-start' arrow>
            <IconButton
               onClick={ () => { findControlPermisosByServidor(row.nombres) } }
            >
               <SendAndArchiveRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Ver documentación adjunta' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalAttachments.current.setOpen(true)
               } }
            >
               <PlagiarismRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>>>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Registrar observaciones' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalObservaciones.current.setOpen(true)
               } }
            >
               <CommentRounded />
            </IconButton>
         </Tooltip>
      },
      { field: 'idFormato', headerName: 'Id', width: 100, ...commonGridColDef },
      { field: 'fechaCreacion', headerName: 'Fecha Registro', type: 'date', width: 150, ...commonGridColDef },
      {
         field: 'atendido',
         headerName: '¿Atendido?',
         type: 'boolean',
         width: 120,
         renderCell: ({ row }) => row.atendido
            ? <CheckCircleRounded fontSize='small' color='success' />
            : <CancelRounded fontSize='small' color='error' />,
         ...commonGridColDef
      }, {
         field: 'recibido',
         headerName: '¿Validado?',
         type: 'boolean',
         width: 120,
         renderCell: ({ row }) => row.recibido
            ? <CheckCircleRounded fontSize='small' color='success' />
            : <CancelRounded fontSize='small' color='error' />,
         ...commonGridColDef
      },
      { field: 'nombres', headerName: 'Servidor', width: 280, ...commonGridColDef },
      { field: 'gerencia', headerName: 'Gerencia', minWidth: 200, flex: 1, ...commonGridColDef },
      { field: 'subgerencia', headerName: 'Subgerencia', minWidth: 200, flex: 1, ...commonGridColDef },
      { field: 'tipoLicencia', headerName: 'Tipo Licencia/Permiso', minWidth: 400, flex: 1, ...commonGridColDef }
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
                        : 4
                  }
                  getRowId={ row => row.idFormato }
                  localStoragePageKey='VALIDAR_FORMATO_AUTORIZACION_BANDEJA_NROPAG'
               />
            </Box>
         </Zoom>

         {/* » Modal: Más inmformación ...  */}
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
            <ObservacionesFrm formatoPermisos={ formatoPermisosTmp } />
         </SimpleModal>

         {/* » Modal: Validaciones ...  */}
         <SimpleModal ref={ modalValidaciones }>
            <ValidacionesActions formatoPermiso={ formatoPermisosTmp } />
         </SimpleModal>

         {/* » Modal: `Rpt` ... */}
         <ExportToExcel ref={ controlAsistenciasRpt } data={ controlPermisosDb } />
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

const ObservacionesFrm: FC<{ formatoPermisos: FormatoPermisos }> = ({ formatoPermisos }) => {
   // » Custom hook's ...
   const {
      loadingFormatoPermisosDb,
      saveObservacionesFormatoPermisos,
      findAllFormatoPermisos
   } = useFormatoPermisos()

   // » Dep's ...
   const formikProps: FormikConfig<Partial<FormatoPermisos>> = useMemo(() => ({
      initialValues: {
         observaciones: formatoPermisos?.observaciones || ''
      },
      validationSchema: Yup.object({
         observaciones: Yup.string().required('¡Campo requerido!')
      }),
      onSubmit: async (values, meta): Promise<void> => {
         await saveObservacionesFormatoPermisos(formatoPermisos?.idFormato!, values.observaciones || '')
         await findAllFormatoPermisos()
         meta.resetForm()
         meta.setValues(resetObjectProps(formatoPermisos!))
      }
   }), [formatoPermisos])

   return (
      <Formik { ...formikProps }>
         { (props) => (
            <Form>
               <Box display='flex' flexDirection='column' gap={ 1 }>
                  <MyTextField
                     type='text'
                     name='observaciones'
                     label='Observaciones'
                     width={ 40 }
                     muiProps={{ variant: 'standard', multiline: true, rows: 4, autoFocus: true }}
                  />
                  <Button
                     type='submit'
                     variant='outlined'
                     color='primary'
                     disabled={ loadingFormatoPermisosDb }
                     fullWidth
                  >
                     <SaveRounded />
                  </Button>
               </Box>
            </Form>
         ) }
      </Formik>
   )
}

const ValidacionesActions: FC<{ formatoPermiso: FormatoPermisos }> = ({ formatoPermiso }) => {
   // » Custom hook's ...
   const {
      formatoPermisosDb,
      validateFormatoPermisos,
      findAllFormatoPermisos
   } = useFormatoPermisos()

   const isAtendido = useMemo(() => {
      return formatoPermisosDb.find(({ idFormato }) => idFormato === formatoPermiso.idFormato)?.atendido
   }, [formatoPermisosDb])

   const isValidado = useMemo(() => {
      return formatoPermisosDb.find(({ idFormato }) => idFormato === formatoPermiso.idFormato)?.recibido
   }, [formatoPermisosDb])

   const renderIcon = (isTrue: boolean) => {
      return isTrue
         ? <CheckCircleRounded fontSize='small' color='success' />
         : <CancelRounded fontSize='small' color='error' />
   }

   return (
      <Box mx={ 1 }>
         <ButtonGroup variant='outlined'>

            <Button
               startIcon={ renderIcon(isAtendido!) }
               onClick={ async (): Promise<void> => {
                  await validateFormatoPermisos(formatoPermiso.idFormato, 'ATENDIDO')
                  findAllFormatoPermisos()
               } }
            >
               <Typography variant='h5'>{ isAtendido ? 'Denegar' : 'Atender' }</Typography>
            </Button>

            <Button
               endIcon={ renderIcon(isValidado!) }
               onClick={ async (): Promise<void> => {
                  await validateFormatoPermisos(formatoPermiso.idFormato, 'RECIBIDO')
                  findAllFormatoPermisos()
               } }
            >
               <Typography variant='h5'>{ isValidado ? 'Invalidar' : 'validar' }</Typography>
            </Button>

         </ButtonGroup>
      </Box>
   )
}

export default ValidarFormatoAutorizacionSubMod
