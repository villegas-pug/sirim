import { FC, useContext, useState, useRef, useEffect } from 'react'

import {
   Box,
   Button,
   Typography,
   IconButton,
   Tooltip,
   CircularProgress,
   TextField,
   Stack,
   Divider
} from '@mui/material'
import {
   ArrowBackIos,
   AutorenewOutlined,
   CheckCircleOutlineOutlined,
   GroupAdd,
   HighlightOffOutlined,
   MarkEmailReadOutlined,
   MarkEmailUnreadOutlined,
   ModeEditOutlineOutlined,
   ReadMoreOutlined,
   RemoveCircleOutlined,
   SaveOutlined
} from '@mui/icons-material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import Fade from 'react-reveal/Fade'
import { Formik, Form, FormikConfig } from 'formik'
import * as Yup from 'yup'

import { RecepcionAsignacionSFMContext } from 'context/recepcionAsignacionSFM'

import { SimpleDataGrid } from 'components/table'
import { MyAutocomplete } from 'components/formik'
import { SpeedDialActionProps, SpeedDialBackdrop } from 'components/speedDial'
import { ConfirmDialogModal, ConfirmDialogRefProps, SimpleModal, SimpleModalRefProps } from 'components/modal'

import { EvaluarSolicitudSFM, SolicitudSFM, Usuario } from 'interfaces'

import { useAuth, useFiscalizacionPosterior } from 'hooks'
import { InfoCard } from 'components/card'

const commonColDefAction: Partial<GridColDef> = {
   width: 40,
   headerAlign: 'center',
   align: 'center',
   disableColumnMenu: true,
   filterable: false
}

const commonColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

export const BandejaAsignacionSFM: FC = () => {
   /* » HOOK'S  */
   const { handleChangeBandeja } = useContext(RecepcionAsignacionSFMContext)
   const [isAcceptEliminar, setIsAcceptEliminar] = useState(false)
   const [tmpSolicitudSFM, setTmpSolicitudSFM] = useState<SolicitudSFM>()
   const modalAsignarRef = useRef({} as SimpleModalRefProps)
   const modalDetalleRef = useRef({} as SimpleModalRefProps)
   const dialogEliminarRef = useRef({} as ConfirmDialogRefProps)

   /* » CUSTOM-HOOK'S  */
   const {
      bandejaEntradaDbLoading,
      bandejaEntradaDbFiltered,
      bandejaEntradaNuevos,
      bandejaEntradaNoLeidos,
      bandejaEntradaPendientes,
      bandejaEntradaAtendidos,
      findAllSolicitud,
      assignEvaluador,
      deleteSolicitud,
      handleFilterBandejaEntradaByNuevos,
      handleFilterBandejaEntradaByNoLeidos,
      handleFilterBandejaEntradaByPendientes,
      handleFilterBandejaEntradaByAtendidos
   } = useFiscalizacionPosterior()
   const { usersDb, findAllUser } = useAuth()

   /* » EFFECT'S  */
   useEffect(() => { findAllUser() }, [])
   useEffect(() => { /* » Escucha `COnfirm-Dialog`, para eliminar registro ...  */
      if (isAcceptEliminar) {
         deleteSolicitud(tmpSolicitudSFM!.idBandejaDoc)
         setIsAcceptEliminar(false)
      }
   }, [isAcceptEliminar])

   /* » DEP: SPEED-DIAL  */
   const speedDialActions: Array<SpeedDialActionProps> = [
      {
         name: 'Refrescar',
         icon: <AutorenewOutlined />,
         handleClick: () => { findAllSolicitud() }
      }
   ]

   /* » DEP: X-DATA-GRID  */
   const columns: Array<GridColDef> = [
      {
         field: '>',
         ...commonColDefAction,
         renderCell: (params: GridRenderCellParams<SolicitudSFM>) => (
            <Tooltip title='Asignar' placement='top' arrow>
               <IconButton onClick={() => {
                  setTmpSolicitudSFM(params.row)
                  modalAsignarRef.current.setOpen(true)
               }}>
                  <GroupAdd />
               </IconButton>
            </Tooltip>
         )
      }, {
         field: '>>',
         ...commonColDefAction,
         renderCell: (params) => {
            return (
               <Tooltip title='Editar' placement='top' arrow>
                  <IconButton onClick={() => { console.log('Descargando...', params) }}>
                     <ModeEditOutlineOutlined />
                  </IconButton>
               </Tooltip>)
         }
      }, {
         field: '>>>',
         ...commonColDefAction,
         renderCell: (params: GridRenderCellParams<SolicitudSFM>) => {
            return (
               <Tooltip title='Eliminar' placement='top' arrow>
                  <IconButton onClick={() => {
                     setTmpSolicitudSFM(params.row)
                     dialogEliminarRef.current.setIsOpen(true)
                  }}>
                     <RemoveCircleOutlined />
                  </IconButton>
               </Tooltip>)
         }
      }, {
         field: '>>>>',
         ...commonColDefAction,
         renderCell: (params: GridRenderCellParams<SolicitudSFM>) => {
            return (
               <Tooltip title='Leer más' placement='top' arrow>
                  <IconButton disabled={ !params.row.evaluarSolicitud } onClick={() => {
                     setTmpSolicitudSFM(params.row)
                     modalDetalleRef.current.setOpen(true)
                  }}>
                     <ReadMoreOutlined />
                  </IconButton>
               </Tooltip>
            )
         }
      },
      { headerName: 'Fec.Ingreso SFM', field: 'fechaIngresoSFM', type: 'date', width: 100, ...commonColDef },
      { headerName: 'Tipo.Doc.', field: 'tipoDocumento', width: 150, ...commonColDef, align: 'left' },
      { headerName: 'Num.Doc.', field: 'numeroDocumento', width: 100, ...commonColDef },
      { headerName: 'Expediente', field: 'numeroExpediente', width: 120, ...commonColDef },
      { headerName: 'Fec.Trámite', field: 'fechaInicioTramite', type: 'date', width: 95, ...commonColDef },
      { headerName: 'Administrado', field: 'administrado', width: 250, ...commonColDef, align: 'left' },
      { headerName: 'Estado', field: 'estado', width: 95, ...commonColDef },
      {
         field: '¿Asignado?',
         width: 75,
         filterable: false,
         ...commonColDef,
         renderCell: (params: GridRenderCellParams<SolicitudSFM>) => {
            const isAssign = Boolean(params.row.evaluarSolicitud)
            return isAssign ? <CheckCircleOutlineOutlined color='success' /> : <HighlightOffOutlined color='error' />
         }
      }, {
         field: '¿Leido?',
         width: 70,
         filterable: false,
         ...commonColDef,
         renderCell: (params: GridRenderCellParams<SolicitudSFM>) => {
            const isAssign = Boolean(params.row.evaluarSolicitud)
            const isRead = params.row?.evaluarSolicitud?.leido
            return (isAssign && isRead)
               ? <MarkEmailReadOutlined color='success' />
               : isAssign
                  ? <MarkEmailUnreadOutlined color='error' />
                  : ''
         }
      }
   ]

   /* » DEP-FORMIK: Asignar ... */
   const formikConfig: FormikConfig<Partial<EvaluarSolicitudSFM>> = {
      initialValues: {
         operadorDesig: {} as Usuario
      },
      validationSchema: Yup.object({
         operadorDesig: Yup.object().nullable().required('¡Usuario requerido!')
      }),
      onSubmit: async (values, meta): Promise<void> => {
         values.bandejaDoc = { idBandejaDoc: tmpSolicitudSFM!.idBandejaDoc } as SolicitudSFM
         await assignEvaluador(values)
         /* » Clean-up ...  */
         modalAsignarRef.current.setOpen(false)
      }
   }

   return (
      <>
         {/* » HEADER: INFO CARD'S  */}
         <Fade down>
            <Fade down when={!bandejaEntradaDbLoading}>
               <Stack direction='row' justifyContent='space-around' mb={1} divider={ <Divider orientation='vertical' flexItem /> }>
                  <InfoCard iconName='EmailOutlined' title='Nuevos' value={bandejaEntradaNuevos} handleShowDetail={handleFilterBandejaEntradaByNuevos} />
                  <InfoCard iconName='MarkEmailUnread' title='No leidos' value={bandejaEntradaNoLeidos} handleShowDetail={handleFilterBandejaEntradaByNoLeidos} />
                  <InfoCard iconName='PendingActionsOutlined' title='Pendientes' value={bandejaEntradaPendientes} handleShowDetail={handleFilterBandejaEntradaByPendientes} />
                  <InfoCard iconName='TaskOutlined' title='Atendidos' value={bandejaEntradaAtendidos} handleShowDetail={handleFilterBandejaEntradaByAtendidos} />
               </Stack>
            </Fade>
         </Fade>

         {/* » BANDEJA ...  */}
         <Fade zoom duration={2500}>
            <Box
               display='flex'
               flexDirection='column'
            >
               <Button
                  style={{ marginRight: 'auto' }}
                  variant='contained'
                  startIcon={ <ArrowBackIos fontSize='large' /> }
                  onClick={ () => { handleChangeBandeja('BANDEJA_ENTRADA') } }
               >
                  <Typography variant='h4'>Ir a Recepción</Typography>
               </Button>

               {/* » TABLE: BANDEJA... */}
               <Box
                  height={170}
                  mt={1}
               >
                  <SimpleDataGrid
                     columns={ columns }
                     rows={ bandejaEntradaDbFiltered }
                     pageSize={4}
                     getRowId={(row => row.idBandejaDoc)}
                     loading={ bandejaEntradaDbLoading }
                  />
               </Box>
            </Box>
         </Fade>

         {/* » SPEEL-DIAL ...  */}
         <SpeedDialBackdrop actions={speedDialActions} />

         {/* » MODAL: Asignar ...  */}
         <SimpleModal ref={modalAsignarRef}>
            <Formik { ...formikConfig }>
               {({ ...rest }) => (
                  <Form>
                     <Box
                        height={55}
                        width={480}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='flex-start'
                     >
                        <MyAutocomplete
                           name='operadorDesig'
                           label='Evaluador'
                           width={25}
                           opt={usersDb}
                           { ...rest }
                        />
                        <Button type='submit' variant='outlined' color='primary'>
                           { bandejaEntradaDbLoading ? <CircularProgress size={24} /> : <SaveOutlined /> }
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » DIALOG: Eliminar ...  */}
         <ConfirmDialogModal title='¿Seguro de continuar, se perderán los datos?' setIsAccept={setIsAcceptEliminar} ref={dialogEliminarRef} />

         {/* » MODAL: Detalle ...  */}
         <SimpleModal ref={modalDetalleRef}>
            <Box
               width={1000}
               height={250}
               display='flex'
               flexWrap='wrap'
               gap={5}
               alignItems='center'
            >
               <TextField variant='standard' sx={{ width: 400 }} label='Evaluador Designado' value={ tmpSolicitudSFM?.evaluarSolicitud?.operadorDesig.nombres } disabled />
               <TextField variant='standard' sx={{ width: 50 }} label='¿Leido?' value={ tmpSolicitudSFM?.evaluarSolicitud?.leido ? 'SI' : 'No' } disabled />
               <TextField variant='standard' sx={{ width: 100 }} label='Estado Actual' value={ tmpSolicitudSFM?.estado } disabled />
               <TextField variant='standard' sx={{ width: 120 }} label='Etapa' value={ tmpSolicitudSFM?.etapa?.descripcion } disabled />
               <TextField type='date' variant='standard' sx={{ width: 120 }} label='Fecha Asignación' value={ tmpSolicitudSFM?.evaluarSolicitud?.fechaDerivacion } disabled />
               <TextField type='date' variant='standard' sx={{ width: 120 }} InputLabelProps={{ shrink: true }} label='Fecha Termino' value={ tmpSolicitudSFM?.evaluarSolicitud?.fechaTermino } disabled />
               <TextField variant='standard' sx={{ width: 70 }} label='¿Completado?' value={ tmpSolicitudSFM?.evaluarSolicitud?.completado ? 'SI' : 'No' } disabled />
               <TextField variant='standard' sx={{ width: 500 }} label='Hallazgo' value={ tmpSolicitudSFM?.evaluarSolicitud?.hallazgo } disabled />
               <TextField variant='standard' sx={{ width: 500 }} label='Recomendación' value={ tmpSolicitudSFM?.evaluarSolicitud?.recomendacion } disabled />
            </Box>
         </SimpleModal>
      </>
   )
}
