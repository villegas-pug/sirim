
import { FC, useRef, useState, useMemo, useEffect } from 'react'

import { Box, Button, IconButton, Paper, Tooltip } from '@mui/material'
import { CancelRounded, CheckCircleRounded, DeleteForeverRounded, DeleteSweepRounded, DownloadRounded, EditRounded, MoreVertRounded, SaveRounded, SyncRounded } from '@mui/icons-material'
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
import { FormatoPermisos } from 'interfaces'
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
      handleClick: () => { findFormatoPermisosByUsrCreador() }
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
   const { loadingFormatoPermisosDb, saveFormatoPermisos, findFormatoPermisosByUsrCreador } = useFormatoPermisos()
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
         desde: Yup.string().required('¡Campo requerido!'),
         hasta: Yup.string().required('¡Campo requerido!'),
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
               <Paper elevation={ 1 } sx={ { my: 0.5, mx: 5, p: 1 } }>
                  <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='flex-start' gap={ 0.5 }>
                     <MySelect name='jornadaLaboral' label='Jornada laboral' width={ 12 } opt={ jornadaLaboral } muiProps={{ autoFocus: true, variant: 'standard' }} />
                     <MySelect name='regimenLaboral' label='Régimen laboral' width={ 10 } opt={ regimenLaboral } muiProps={{ variant: 'standard' }}/>
                     <SimpleAutocomplete name='nombres' label='Servidor' width={ 20 } opt={ simUsuarioNombreDb } muiProps={{ variant: 'standard' }} { ...props } />
                     <MyTextField type='text' name='gerencia' label='Gerencia' width={ 12 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='subgerencia' label='Subgerencia' width={ 12 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='unidad' label='Unidad' width={ 12 } muiProps={{ variant: 'standard' }} />
                     <MySelect name='tipoLicencia' label='Tipo de licencia/Permiso' width={ 36 } opt={ tipoLicencia } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='desde' label='Desde' width={ 17 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='hasta' label='Hasta' width={ 17 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='totalHoras' label='Total horas' width={ 17 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='date' name='fechaFormato' label='Fecha formato' width={ 10 } muiProps={{ variant: 'standard' }} />
                     <MyTextField type='text' name='justificacion' label='Justificación' width={ 55 } muiProps={{ variant: 'standard' }} />
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
      },
      { field: 'nombres', headerName: 'Servidor', width: 300, ...commonGridColDef },
      { field: 'tipoLicencia', headerName: 'Tipo Licencia/Permiso', flex: 1, ...commonGridColDef }
   ], [formatoPermisosDb])

   return (
      <>
         <Zoom>
            <Box mx={ 1 }>
               <SimpleDataGrid
                  columns={ dgColumns }
                  rows={ formatoPermisosDb }
                  pageSize={ currentScreen === 'desktopLarge'
                     ? 7
                     : currentScreen === 'desktopWide'
                        ? 9
                        : 2
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
      </>
   )
}

export default RegistrarFormatoAutorizacionSubMod
