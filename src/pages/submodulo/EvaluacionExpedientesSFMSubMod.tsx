import { ChangeEvent, FC, useContext, useEffect, useMemo, useRef, useState } from 'react'

import {
   Box,
   IconButton,
   Tooltip,
   TextField,
   Paper,
   Button,
   Grid,
   Typography,
   CircularProgress,
   Autocomplete,
   Divider
} from '@mui/material'
import {
   AccountTreeOutlined,
   AddCircleOutlined,
   AddOutlined,
   AttachEmailOutlined,
   DeleteForeverOutlined,
   DirectionsOutlined,
   DoneOutlineOutlined,
   DownloadOutlined,
   MarkEmailReadOutlined,
   MarkEmailUnreadOutlined,
   MessageOutlined,
   RefreshOutlined,
   RemoveCircleOutlined,
   RemoveDoneOutlined,
   RemoveRedEyeOutlined,
   SaveAsOutlined,
   SaveOutlined,
   VisibilityOffOutlined
} from '@mui/icons-material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import { Body } from 'components/layout'
import { SimpleDataGrid } from 'components/table'
import { SpeedDialBackdrop, SpeedDialActionProps } from 'components/speedDial'
import { MyAutocomplete, ItemType, MySelect, MyTextField, SimpleAutocomplete } from 'components/formik'

import { DiligenciaSFM, Etapa, EvaluarSolicitudSFM, SolicitudSFM } from 'interfaces'

import { useEtapa, useFiscalizacionPosterior } from 'hooks'
import { ConfirmDialogModal, ConfirmDialogRefType, SimpleModal, SimpleModalRefProps } from 'components/modal'

import { Form, Formik, FormikConfig } from 'formik'
import { EvaluacionExpedientesSFMContext, EvaluacionExpedientesSFMContextProvider } from 'context/evaluacionExpedientesSFM'

import { organigrama, tipoDocumento } from 'db'
import { ModalLoader } from 'components/styled'

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const commonGridColDefAction: Partial<GridColDef> = {
   ...commonGridColDef,
   filterable: false,
   hideable: false,
   width: 50
}

const EvaluacionExpedientesSFMSubMod: FC = () => {
   /* » HOOK-CONTEXT  */
   const { evaluarSolicitudSFMTmp, handleSaveEvaluarSolicitudSFMTmp } = useContext(EvaluacionExpedientesSFMContext)

   /* » HOOK'S  */
   const [isAcceptLeerSolicitud, setIsAcceptLeerSolicitud] = useState(false)
   const dialogLeerSolicitudRef = useRef({} as ConfirmDialogRefType)
   const modalDiligenciaRef = useRef({} as SimpleModalRefProps)
   const modalEtapaRef = useRef({} as SimpleModalRefProps)
   const modalOpinionRef = useRef({} as SimpleModalRefProps)

   /* » CUSTOM-HOOK'S  */
   const {
      bandejaEvaluacionUsrAuthDb,
      bandejaEvaluacionDbLoading,
      findAllBandejaEvaluacion,
      readAssignment
   } = useFiscalizacionPosterior()
   const { findAllEtapa } = useEtapa()

   /* » EFFECT'S  */
   useEffect(() => { findAllBandejaEvaluacion() }, [])
   useEffect(() => { findAllEtapa() }, [])

   useEffect(() => { /* » ... Si, la solicitud es aceptada ... */
      isAcceptLeerSolicitud && readAssignment(evaluarSolicitudSFMTmp)
      setIsAcceptLeerSolicitud(false)/* » Clean-up ... */
   }, [isAcceptLeerSolicitud])

   /* » DEP'S: Data-Grid ...  */
   const columns: GridColDef[] = [
      {
         field: '>',
         ...commonGridColDefAction,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return <Tooltip title='Leer asignación' placement='top' arrow>
               <IconButton
                  disabled= { row?.leido }
                  onClick={ () => {
                     handleSaveEvaluarSolicitudSFMTmp(row)
                     dialogLeerSolicitudRef.current.setIsOpen(true)
                  } }
               >
                  { !row?.leido ? <MarkEmailUnreadOutlined /> : <MarkEmailReadOutlined /> }
               </IconButton>
            </Tooltip>
         }
      }, {
         field: '>>',
         ...commonGridColDefAction,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return <Tooltip title='Nueva diligencia' placement='top' arrow>
               <IconButton
                  disabled={!row?.leido}
                  onClick={() => {
                     handleSaveEvaluarSolicitudSFMTmp(row)
                     modalDiligenciaRef.current.setOpen(true)
                  }}
               >
                  <AccountTreeOutlined />
               </IconButton>
            </Tooltip>
         }
      }, {
         field: '>>>',
         ...commonGridColDefAction,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return <Tooltip title='Actualizar etapa' placement='top' arrow>
               <IconButton
                  disabled={!row?.leido}
                  onClick={() => {
                     handleSaveEvaluarSolicitudSFMTmp(row)
                     modalEtapaRef.current.setOpen(true)
                  }}
               >
                  <DirectionsOutlined />
               </IconButton>
            </Tooltip>
         }
      }, {
         field: '>>>>',
         ...commonGridColDefAction,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return <Tooltip title='Registrar opinión' placement='top' arrow>
               <IconButton
                  disabled={!row?.leido}
                  onClick={() => {
                     handleSaveEvaluarSolicitudSFMTmp(row)
                     modalOpinionRef.current.setOpen(true)
                  }}
               >
                  <MessageOutlined />
               </IconButton>
            </Tooltip>
         }
      },
      { headerName: 'Fecha Derivación', field: 'fechaDerivacion', type: 'date', width: 120, ...commonGridColDef },
      {
         field: 'Número Documento',
         width: 120,
         ...commonGridColDef,
         align: 'left',
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => row?.bandejaDoc.numeroDocumento
      }, {
         field: 'Administrado',
         width: 250,
         ...commonGridColDef,
         align: 'left',
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => row?.bandejaDoc.administrado
      }, {
         field: 'Estado',
         width: 80,
         ...commonGridColDef,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => row?.bandejaDoc.estado
      }, {
         field: 'Etapa',
         width: 150,
         ...commonGridColDef,
         align: 'left',
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => row?.bandejaDoc.etapa.descripcion
      },
      { headerName: 'Fecha Termino', field: 'fechaTermino', type: 'date', width: 100, ...commonGridColDef },
      {
         field: 'Diligencias',
         width: 80,
         ...commonGridColDef,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return `${(row?.diligencia as DiligenciaSFM[]).length} / ${(row?.diligencia as DiligenciaSFM[]).filter(({ respuesta }) => respuesta).length}`
         }
      }, {
         field: '¿Leido?',
         width: 80,
         filterable: false,
         ...commonGridColDef,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return row?.leido ? <RemoveRedEyeOutlined color='success' /> : <VisibilityOffOutlined color='error' />
         }
      }, {
         field: '¿Completado?',
         width: 90,
         filterable: false,
         ...commonGridColDef,
         renderCell: ({ row }: GridRenderCellParams<EvaluarSolicitudSFM>) => {
            return row?.completado ? <DoneOutlineOutlined color='success' /> : <RemoveDoneOutlined color='error' />
         }
      }
   ]

   /* » DEP'S: SpeelDial  */
   const actions: Array<SpeedDialActionProps> = [
      {
         name: 'Refrescar',
         icon: <RefreshOutlined />,
         handleClick: () => { findAllBandejaEvaluacion() }
      }
   ]

   return (
      <>
         <Body>
            {/* » HEADER'S: CARD-INFO  */}

            {/* » BANDEJA: Evaluación  */}
            <SimpleDataGrid
               columns={ columns }
               rows={ bandejaEvaluacionUsrAuthDb }
               pageSize={ 4 }
               getRowId={ (row) => row.idVerifExp }
               loading={ bandejaEvaluacionDbLoading }
            />
         </Body>

         {/* » SPEEL-DIAL */}
         <SpeedDialBackdrop actions={ actions } />

         {/* » DIALOG: Leer asignación ...   */}
         <ConfirmDialogModal
            ref={ dialogLeerSolicitudRef }
            title='¿Desea recibir el expediente?'
            setIsAccept={setIsAcceptLeerSolicitud}
         />

         {/* » MODAL: Nueva diligencia ...  */}
         <SimpleModal ref={ modalDiligenciaRef }>
            <Diligencias />
         </SimpleModal>

         {/* » MODAL: Actualizar etapa ...  */}
         <SimpleModal ref={ modalEtapaRef }>
            <ActualizarEtapa />
         </SimpleModal>

         {/* » MODAL: Actualizar opinión ...  */}
         <SimpleModal ref={ modalOpinionRef }>
            <ActualizarOpinion />
         </SimpleModal>

      </>
   )
}

const solicitudExternaOpts: Array<ItemType> = [
   { value: 1, label: 'Si' },
   { value: 0, label: 'No' }
]

const Diligencias: FC = () => {
   /* » HOOK'S:  */
   const { evaluarSolicitudSFMTmp: { idVerifExp, bandejaDoc } } = useContext(EvaluacionExpedientesSFMContext)

   /* » CUSTOM - HOOK'S */
   const { bandejaEvaluacionUsrAuthDb, bandejaEvaluacionDbLoading, saveDiligencia } = useFiscalizacionPosterior()

   const diligencias = useMemo(() => {
      return bandejaEvaluacionUsrAuthDb.find(({ idVerifExp: id }) => id === idVerifExp)?.diligencia as DiligenciaSFM[]
   }, [bandejaEvaluacionUsrAuthDb])

   return (
      <Box width={ 1320 } maxHeight={ 500 } overflow='auto'>
         {/* » Header: Info  */}
         <Fade delay={ 250 } duration={ 1000 }>
            <Paper variant='elevation' elevation={5}>
               {/* » Datos de solicitud ...  */}
               <Box
                  p={1}
                  mb={1}
                  display='flex'
                  justifyContent='space-around'
                  alignItems='center'
               >
                  <TextField
                     label='Número Expediente'
                     variant='standard'
                     value={ bandejaDoc?.numeroExpediente }
                     inputProps={{ style: { textAlign: 'center' } }}
                     sx={{ width: 200 }}
                     disabled
                  />
                  <TextField
                     label='Administrado'
                     variant='standard'
                     value={ bandejaDoc?.administrado }
                     sx={{ width: 500 }}
                     disabled
                  />
                  {/* » Acciones:  */}
                  {/* » Agregar diligencia ... */}
                  <Button
                     variant='contained'
                     size='small'
                     onClick={() => {
                        saveDiligencia({ idVerifExp, diligencia: {} as DiligenciaSFM })
                     }}
                  >
                     <AddOutlined />
                  </Button>
               </Box>
            </Paper>
         </Fade>

         {/* » Diligencias ...  */}
         <Box overflow='hidden'>
            {
               !bandejaEvaluacionDbLoading
                  ? (
                     diligencias?.map((diligencia) => (
                        <DiligenciaFrm key={ diligencia.idDiligencia } diligencia={diligencia} />
                     ))
                  )
                  : (<ModalLoader />)
            }
         </Box>
      </Box>
   )
}

type DiligenciaFrmProps = { diligencia: Partial<DiligenciaSFM> }

const DiligenciaFrm: FC<DiligenciaFrmProps> = ({ diligencia }) => {
   /* » HOOK'S ...  */
   const { evaluarSolicitudSFMTmp: { idVerifExp } } = useContext(EvaluacionExpedientesSFMContext)

   const [isAcceptEliminarDiligencia, setIsAcceptEliminarDiligencia] = useState(false)
   const dialogEliminarDiligenciaRef = useRef({} as ConfirmDialogRefType)
   const [file, setFile] = useState<File | null>()
   const inputFileRef = useRef({} as HTMLInputElement)

   /* » CUSTOM - HOOK'S ...  */
   const {
      downloadProgressLoading,
      saveDiligencia,
      deleteDiligenciaById,
      saveArchivoDiligencia,
      downloadArchivoDiligencia,
      deleteArchivoDiligencia
   } = useFiscalizacionPosterior()

   /* » EFFECT'S  */
   useEffect(() => { /* » Si, confirmación es verdadera elimina la diligencia ...  */
      if (isAcceptEliminarDiligencia) {
         deleteDiligenciaById(diligencia.idDiligencia!)
         setIsAcceptEliminarDiligencia(false)
      }
   }, [isAcceptEliminarDiligencia])

   useEffect(() => {
      if (!file) return
      saveArchivoDiligencia(diligencia.idDiligencia!, file)
      setFile(null)/* » Clean-Up ... */
   }, [file])

   /* » HANDLER'S  */
   const handleChangeInputFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => { setFile(files?.[0]) }

   /* » DEP'S  */
   const formikConfig: FormikConfig<Partial<DiligenciaSFM>> = useMemo(() => ({
      initialValues: {
         tipoDocumento: diligencia.tipoDocumento || '',
         numeroDocumento: diligencia.numeroDocumento || '',
         fechaDocumento: diligencia.fechaDocumento || '',
         solicitudExterna: Number(diligencia.solicitudExterna),
         fechaSolicitud: diligencia.fechaSolicitud || '',
         dependenciaDestino: diligencia.dependenciaDestino || '',
         fechaRespuesta: diligencia.fechaRespuesta || ''
      },
      validationSchema: Yup.object({
         tipoDocumento: Yup.string().required('¡Campo requerido!'),
         numeroDocumento: Yup.string().required('¡Campo requerido!'),
         fechaDocumento: Yup.string().required('¡Campo requerido!'),
         solicitudExterna: Yup.number().required('¡Campo requerido!')
      }),
      onSubmit: async (values, meta): Promise<void> => {
         await saveDiligencia({ idVerifExp, diligencia: { ...diligencia, ...values } })
         meta.resetForm()
      }
   }), [diligencia])

   return (
      <>
         <Fade delay={ 250 } duration={1000} top>
            <Formik { ...formikConfig }>
               {(rest) => (
                  <Form>
                     <Paper variant='outlined' sx={{ marginBottom: 0.5 }}>
                        <Grid container>
                           {/* » Input's ...  */}
                           <Grid item xs={ 12 }>
                              <Box
                                 maxHeight={130}
                                 p={1.5}
                                 display='flex'
                                 flexWrap='wrap'
                                 gap={1}
                              >
                                 <MyTextField type='text' name='numeroDocumento' label='Número Documento' width={10} focused />
                                 <SimpleAutocomplete name='tipoDocumento' label='Tipo Documento' width={15} opt={ tipoDocumento } { ...rest } />
                                 <MyTextField type='date' name='fechaDocumento' label='Fecha Documento' width={8} />
                                 <MySelect name='solicitudExterna' label='¿Externa?' width={ 100 } opt={ solicitudExternaOpts } />
                                 <MyTextField type='date' name='fechaSolicitud' label='Fecha Solicitud' width={8} />
                                 <SimpleAutocomplete name='dependenciaDestino' label='Dependencia Destino' width={20} opt={ organigrama } { ...rest } />
                                 <MyTextField type='date' name='fechaRespuesta' label='Fecha Respuesta' width={8} />
                              </Box>
                           </Grid>

                           {/* » Attachment - File ... */}
                           <Grid item xs={ 12 }>
                              {
                                 diligencia.archivos?.map(({ idArchivoDiligencia, nombre, fechaRegistro }) => (
                                    <Paper
                                       key={ idArchivoDiligencia }
                                       variant='outlined'
                                       sx={{ display: 'inline-block', marginLeft: 0.5, marginTop: 0.5 }}
                                    >
                                       <Box
                                          px={1}
                                          display='inline-flex'
                                          justifyContent='space-between'
                                          alignItems='center' gap={1}
                                       >
                                          <Typography variant='h6'>{ nombre }</Typography>
                                          <Typography variant='h6'>{ fechaRegistro }</Typography>
                                          <Button
                                             size='small'
                                             onClick={() => { downloadArchivoDiligencia(idArchivoDiligencia) }}
                                          >
                                             <DownloadOutlined fontSize='small' />
                                          </Button>
                                          <Button
                                             size='small'
                                             onClick={() => { deleteArchivoDiligencia(idArchivoDiligencia) }}
                                          >
                                             <DeleteForeverOutlined fontSize='small' />
                                          </Button>
                                       </Box>
                                    </Paper>
                                 ))
                              }
                           </Grid>

                           {/* » Action's ... */}
                           <Grid item container p={0.5} xs={ 12 } gap={1} justifyContent='flex-end'>
                              <Button
                                 size='small'
                                 type='submit'
                                 variant='outlined'
                              >
                                 <SaveAsOutlined fontSize='small' />
                              </Button>
                              <Button
                                 size='small'
                                 variant='outlined'
                                 onClick={ () => { inputFileRef.current.click() } }
                              >
                                 <AttachEmailOutlined fontSize='small' />
                              </Button>
                              <input type='file' ref={ inputFileRef } onChange={ handleChangeInputFile } hidden />
                              <Button
                                 size='small'
                                 variant='outlined'
                                 onClick={() => { dialogEliminarDiligenciaRef.current.setIsOpen(true) }}
                              >
                                 <RemoveCircleOutlined fontSize='small' />
                              </Button>
                           </Grid>
                        </Grid>
                     </Paper>
                  </Form>
               )}
            </Formik>
         </Fade>

         {/* » DIALOG: Eliminar diligencia ... */}
         <ConfirmDialogModal
            title={'¿Seguro de eliminar la diligencia?'}
            setIsAccept={setIsAcceptEliminarDiligencia}
            ref={ dialogEliminarDiligenciaRef }
         />

         {/* » MODAL: Loading ...  */}
         { downloadProgressLoading && <ModalLoader /> }
      </>
   )
}

const ActualizarEtapa: FC = () => {
   /* » HOOK'S  */
   const { evaluarSolicitudSFMTmp: { idVerifExp } } = useContext(EvaluacionExpedientesSFMContext)

   /* » CUSTOM - HOOK'S  */
   const { bandejaEvaluacionDbLoading, updateEtapaSolicitud } = useFiscalizacionPosterior()
   const { etapaDb } = useEtapa()

   return (
      <Formik
         initialValues={{
            etapa: {} as Etapa
         }}
         validationSchema={ Yup.object({
            etapa: Yup.object().nullable().required('¡Campo requerido!')
         })}
         onSubmit={ async ({ etapa }: Partial<SolicitudSFM>, meta): Promise<void> => {
            await updateEtapaSolicitud(idVerifExp!, etapa!)
         }}>
         {({ ...rest }) => (
            <Form>
               <Box
                  display='flex'
                  gap={1}
                  justifyContent='space-between'
                  alignItems='flex-start'
               >
                  <MyAutocomplete name='etapa' label='Etapa' width={24} opt={ etapaDb } { ...rest } />
                  <Button
                     type='submit'
                     variant='outlined'
                     size='medium'
                     disabled={bandejaEvaluacionDbLoading}
                  >
                     { bandejaEvaluacionDbLoading ? <CircularProgress size={22} /> : <SaveOutlined /> }
                  </Button>
               </Box>
            </Form>
         )}
      </Formik>
   )
}

const ActualizarOpinion: FC = () => {
   /* » HOOK'S  */
   const hallazgo = useRef<string>('')
   const recomendacion = useRef<string>('')
   const {
      evaluarSolicitudSFMTmp: { idVerifExp },
      opinionSolicitudTmp,
      handleAddToOpinionSolicitudTmp,
      handleRemoveInOpinionSolicitudTmp
   } = useContext(EvaluacionExpedientesSFMContext)

   /* » CUSTOM - HOOK  */
   const { updateOpinionSolicitud } = useFiscalizacionPosterior()

   /* » HANDLER'S */
   const handleChangeHallazgo = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => hallazgo.current = value
   const handleChangeRecomendacion = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => recomendacion.current = value

   return (
      <Grid container width={1200}>
         {/* » Header: Hallazgos ... */}
         <Grid item container xs={ 12 } display='flex' alignItems='center' gap={1}>
            <Autocomplete
               id='free-solo-demo'
               freeSolo
               options={[]}
               renderInput={(params => (
                  <TextField
                     { ...params }
                     autoFocus
                     variant='outlined'
                     size='small'
                     label='Agregar hallazgo ...'
                     sx={{ width: 800 }}
                     onChange={ handleChangeHallazgo }
                  />
               ))}
            />
            <Button
               variant='contained'
               size='small'
               onClick={ () => { handleAddToOpinionSolicitudTmp(hallazgo.current, 'H') } }
            >
               <AddCircleOutlined fontSize='small' />
            </Button>
         </Grid>

         {/* » Body: Hallazgos ... */}
         <Grid mt={1} item container xs={ 12 } justifyContent='space-between' gap={1}>
            {
               opinionSolicitudTmp.hallazgo?.map((h, i) => (
                  <Paper key={ i } variant='outlined'>
                     <Box m={1} width={570} display='flex' gap={ 1 }>
                        <TextField variant='standard' size='small' value={ h } fullWidth disabled />
                        <Button
                           variant='outlined'
                           size='small'
                           onClick={ () => { handleRemoveInOpinionSolicitudTmp(h, 'H') } }
                        >
                           <DeleteForeverOutlined fontSize='small' />
                        </Button>
                     </Box>
                  </Paper>
               ))
            }
         </Grid>

         <Grid item xs={ 12 }>
            <Divider sx={{ my: 2, bgcolor: '#004795' }} />
         </Grid>

         {/* » Header: Recomendación: */}
         <Grid item container xs={ 12 } alignItems='center' gap={1}>
            <Autocomplete
               id='free-solo-demo'
               freeSolo
               options={[]}
               renderInput={(params => (
                  <TextField
                     { ...params }
                     variant='outlined'
                     size='small'
                     label='Agregar recomendación ...'
                     sx={{ width: 800 }}
                     onChange={ handleChangeRecomendacion }
                  />
               ))}
            />
            <Button
               variant='contained'
               size='small'
               onClick={ () => { handleAddToOpinionSolicitudTmp(recomendacion.current, 'R') } }
            >
               <AddCircleOutlined fontSize='small' />
            </Button>
         </Grid>

         {/* » Body: Recomendación: */}
         <Grid mt={1} item container xs={ 12 } gap={3}>
            {
               opinionSolicitudTmp.recomendacion?.map((r, i) => (
                  <Paper key={ i } variant='outlined'>
                     <Box m={1} width={570} display='flex' gap={ 1 }>
                        <TextField variant='standard' size='small' value={ r } fullWidth disabled />
                        <Button
                           variant='outlined'
                           size='small'
                           onClick={ () => { handleRemoveInOpinionSolicitudTmp(r, 'R') } }
                        >
                           <DeleteForeverOutlined fontSize='small' />
                        </Button>
                     </Box>
                  </Paper>
               ))
            }
         </Grid>

         <Grid item xs={ 12 }>
            <Divider sx={{ my: 2, bgcolor: '#004795' }} />
         </Grid>

         <Grid item container justifyContent='flex-end'>
            <Button
               variant='contained'
               size='small'
               onClick={ () => {
                  updateOpinionSolicitud({
                     idVerifExp,
                     hallazgo: opinionSolicitudTmp.hallazgo?.join(','),
                     recomendacion: opinionSolicitudTmp.recomendacion?.join(',')
                  })
               } }
            >
               <SaveAsOutlined />
            </Button>
         </Grid>

      </Grid>
   )
}

export default function Default () {
   return <EvaluacionExpedientesSFMContextProvider>
      <EvaluacionExpedientesSFMSubMod />
   </EvaluacionExpedientesSFMContextProvider>
}
