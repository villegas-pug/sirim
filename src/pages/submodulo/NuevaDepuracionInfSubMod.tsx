import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react'

import {
   Box,
   Divider,
   Grid,
   IconButton,
   Paper,
   Typography,
   List,
   ListItem,
   ListItemButton,
   ListSubheader,
   ListItemText,
   ListItemSecondaryAction,
   Tooltip,
   Button,
   CircularProgress
} from '@mui/material'
import {
   AddCircleRounded,
   EditRounded,
   ViewWeekRounded,
   GroupWorkRounded,
   RemoveCircleOutlineRounded,
   SaveRounded,
   SaveAsOutlined,
   RemoveCircleOutlined,
   UploadOutlined,
   SaveOutlined,
   EditOutlined,
   AddCircleOutlined,
   HistoryOutlined,
   DownloadRounded
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import { ItemType, MySelect, MyTextField } from 'components/formik'
import { CampoType, GrupoCamposAnalisis, MetaCampoTablaDinamica, TablaDinamica, TablaDinamicaDto } from 'interfaces'
import { ConfirmDialogModal, ConfirmDialogRefType, SimpleModal, SimpleModalRefProps } from 'components/modal'
import { ModalLoader } from 'components/styled'
import { Scrollbar as MyScrollbars } from 'components/layout'

import { useExtraccion } from 'hooks'
import { NuevaDepuracionInfContext, NuevaDepuracionInfProvider } from 'context/nuevaDepuracionInf'
import { SpeedDialActionProps, SpeedDialBackdrop } from 'components/speedDial'
import { ExportToExcel, ExportToExcelRefProps } from 'components'
import { convertMetaTypeToSqlType } from 'helpers'

const MyItemPaper = styled(Paper)({
   height: '100%',
   padding: '.3rem'
})

const NuevaDepuracionInfSubMod: FC = () => {
   /* » HOOK'S  */
   const addTablaRef = useRef({} as HTMLInputElement)

   /* » CUSTOM - HOOK'S  */
   const {
      loadingExtraccionDb,
      loadingcamposTablaDinamicaDb,
      loadingTablaDinamica,
      findAllExtraccion,
      createTablaExtraccion
   } = useExtraccion()

   /* » EFFECT'S  */
   useEffect(() => { findAllExtraccion() }, [])

   /* » HANDLER'S  */
   const handleAddTabla = () => { addTablaRef.current?.click() }

   /* » DEP'S ... */
   const speedDialActions: SpeedDialActionProps[] = [
      {
         name: 'Refrescar',
         icon: <HistoryOutlined />,
         handleClick: () => { findAllExtraccion() }
      }
   ]

   return (
      <>
         <Fade duration={ 2000 } big>
            <Paper sx={{ padding: 0.5 }}>
               <Grid container height='calc(100vh - 7.5rem)' spacing={0.5}>

                  <Grid item xs={5}>
                     <MyItemPaper>
                        <Typography variant='h5' >NUEVA TABLA</Typography>
                        <Divider />

                        <Box p={1} display='flex' flexDirection='column' alignItems='center'>

                           {/* » HEADER'S ...  */}
                           <IconButton
                              onClick={handleAddTabla}
                           >
                              <AddCircleRounded fontSize='large' color='primary' />
                           </IconButton>

                           <Formik
                              initialValues={{ nombre: '' }}
                              validationSchema={Yup.object({
                                 nombre: Yup.string().required('¡Campo requerido!')
                              })}
                              onSubmit={ async (values: Partial<TablaDinamicaDto>, meta): Promise<any> => {
                                 await createTablaExtraccion(values)
                                 meta.resetForm()
                              } }>
                              {
                                 () => (
                                    <Form>
                                       <MyTextField
                                          type='text'
                                          name='nombre'
                                          label='Nombre tabla'
                                          width={20}
                                          focused
                                       />
                                       <input type='submit' ref={ addTablaRef } hidden />
                                    </Form>
                                 )
                              }
                           </Formik>

                           {/* » BODY: Tablas para extracción  */}
                           <ListaTablasExtraccion />

                        </Box>

                     </MyItemPaper>
                  </Grid>

                  <Grid item xs={3}>
                     <MyItemPaper>
                        <Typography variant='h5' >CAMPOS DE EXTRACCIÓN</Typography>
                        <Divider />
                        <ListaCamposExtraccion />
                     </MyItemPaper>
                  </Grid>

                  <Grid item xs={ 4 } container spacing={ 0.5 }>

                     <Grid item xs={ 12 }>
                        <MyItemPaper>
                           <Typography variant='h5' >GRUPOS DE ANALISIS</Typography>
                           <Divider />
                           <ListaGrupoAnalisis />
                        </MyItemPaper>
                     </Grid>

                     <Grid item xs={ 12 }>
                        <MyItemPaper>
                           <Typography variant='h5' >CAMPOS DE ANALISIS</Typography>
                           <Divider />
                           <ListaCamposAnalisis />
                        </MyItemPaper>
                     </Grid>

                  </Grid>

               </Grid>

            </Paper>
         </Fade>
         {/* » Speed-Dial  */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* » MODAL: Loading ...  */}
         { loadingExtraccionDb && <ModalLoader /> }
         { loadingcamposTablaDinamicaDb && <ModalLoader /> }
         { loadingTablaDinamica && <ModalLoader /> }

      </>
   )
}

const optFieldType: Array<ItemType> = [
   { value: 'int', label: 'Numérico' },
   { value: 'VARCHAR(MAX)', label: 'Texto' }
]

const delayFadeTop: number = 270
const durationFadeTop: number = 500

const ListaTablasExtraccion: FC = () => {
   /* » HOOK'S  */
   const {
      tablaDinamicaDto,
      handleSaveTablaDinamicaDto,
      handleSavegruposAnalisisDto
   } = useContext(NuevaDepuracionInfContext)

   const modalEditNombreTabla = useRef({} as SimpleModalRefProps)
   const modalAddFieldExtraccion = useRef({} as SimpleModalRefProps)
   const modalAddGrupoAnalisis = useRef({} as SimpleModalRefProps)
   const confirmEliminarTabla = useRef({} as ConfirmDialogRefType)
   const downloadDepuracion = useRef({} as ExportToExcelRefProps)
   const inputFile = useRef({} as HTMLInputElement)

   const [isAcceptEliminarTabla, setIsAcceptEliminarTabla] = useState(false)
   const [selectedItem, setSelectedItem] = useState(-1)
   const [fileExtraccion, setFileExtraccion] = useState<{ fileName?: string, file?: File } | null>(null)

   /* ► CUSTOM - HOOK'S  */
   const {
      extraccionDb,
      depuracion,
      loadingExtraccionDb,
      handleAlterFieldOfTablaDinamica,
      updateNameTablaDinamica,
      deleteTablaExtraccion,
      findMetaTablaDinamica,
      uploadExtraccion,
      saveGrupoCamposAnalisis,
      findTablaDinamicaBySuffixOfField,
      removeAllDepuracion
   } = useExtraccion()

   /* ► EFFECT'S ...  */
   useEffect(() => { /* ► Remove: Tabla extracción ... */
      if (!isAcceptEliminarTabla) return
      deleteTablaExtraccion(tablaDinamicaDto)
      /* » Clean-up `tablaDinamicaDto` ... */
      handleSaveTablaDinamicaDto({} as TablaDinamica)
      setIsAcceptEliminarTabla(false)
   }, [isAcceptEliminarTabla])

   useEffect(() => { /* ► Upload: Datos de extracción ... */
      if (fileExtraccion?.fileName && fileExtraccion?.file) {
         uploadExtraccion(fileExtraccion.fileName, fileExtraccion.file)
         setFileExtraccion(null)
         inputFile.current.value = ''
      }
   }, [fileExtraccion])

   useEffect(() => { /* ► Download: Datos de depuración ... */
      if (depuracion.length === 0) return
      downloadDepuracion.current.handleExportToExcel()
      removeAllDepuracion() /* ► Clean-up ... */
   }, [depuracion])

   /* ► HANDLER'S... */
   const handleChangeInputFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      setFileExtraccion(prev => ({ ...prev, file: files![0] }))
   }

   return (
      <>
         <MyScrollbars height={ 55 }>
            <List
               subheader={
                  <ListSubheader component='div'>Tabla de extracción</ListSubheader>
               }
            >
               {
                  extraccionDb?.map((tablaDinamica, i) => (
                     <Fade key={ tablaDinamica.idTabla } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>
                        <ListItem>
                           <ListItemButton selected={ selectedItem === i }>
                              <ListItemText
                                 primary={
                                    <Box display='flex' gap={ 1 }>
                                       <Typography variant='h4'>{ `${i + 1}►` }</Typography>
                                       <Typography variant='h5'>{ tablaDinamica.nombre }</Typography>
                                    </Box>
                                 }
                                 onClick={ () => {
                                    findMetaTablaDinamica(tablaDinamica)/* ► request ... */
                                    handleSaveTablaDinamicaDto(tablaDinamica)
                                    handleSavegruposAnalisisDto(tablaDinamica.idTabla)
                                    setSelectedItem(i)
                                 }
                                 }
                              />

                              {/* ► Action's ... */}
                              <ListItemSecondaryAction>
                                 <Tooltip title='Modificar nombre' placement='top' arrow>
                                    <IconButton onClick={() => {
                                       handleSaveTablaDinamicaDto(tablaDinamica)
                                       modalEditNombreTabla.current.setOpen(true)
                                    }}>
                                       <EditRounded fontSize='small' />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title='Eliminar tabla' placement='top' arrow>
                                    <IconButton onClick={() => {
                                       handleSaveTablaDinamicaDto(tablaDinamica)
                                       confirmEliminarTabla.current.setIsOpen(true)
                                    }}>
                                       <RemoveCircleOutlineRounded fontSize='small' />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title='Crear campo extracción' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          handleSaveTablaDinamicaDto(tablaDinamica)
                                          modalAddFieldExtraccion.current.setOpen(true)
                                       }}
                                    >
                                       <ViewWeekRounded fontSize='small' />
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title='Cargar datos de extracción' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          setFileExtraccion({ fileName: tablaDinamica.nombre })
                                          inputFile.current.click()
                                       }}
                                    >
                                       <UploadOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip >
                                 <Tooltip title='Descargar datos de extracción' placement='top' arrow>
                                    <IconButton
                                       onClick={() => { findTablaDinamicaBySuffixOfField(tablaDinamica.nombre, '_e') }}
                                    >
                                       <DownloadRounded fontSize='small' />
                                    </IconButton>
                                 </Tooltip >
                                 <Tooltip title='Crear grupo de analisis' placement='top' arrow>
                                    <IconButton
                                       onClick={ () => {
                                          handleSaveTablaDinamicaDto(tablaDinamica)
                                          modalAddGrupoAnalisis.current.setOpen(true)
                                       } }
                                    >
                                       <GroupWorkRounded fontSize='small' />
                                    </IconButton>
                                 </Tooltip>
                              </ListItemSecondaryAction>
                           </ListItemButton>
                        </ListItem>
                     </Fade>
                  ))
               }
            </List>
         </MyScrollbars>

         {/* » MODAL: Editar nombre tabla extracción ...  */}
         <SimpleModal ref={ modalEditNombreTabla }>
            <Formik
               initialValues={{
                  nombre: tablaDinamicaDto.nombre
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: Partial<TablaDinamica>, meta: FormikHelpers<Partial<TablaDinamica>>): Promise<any> => {
                  tablaDinamicaDto.nombre = values.nombre ?? ''
                  await updateNameTablaDinamica(tablaDinamicaDto)
                  meta.resetForm()
                  modalEditNombreTabla.current.setOpen(false)
               }}>
               {() => (
                  <Form>
                     <Box width={390} display='flex' justifyContent='space-between' alignItems='flex-start' >
                        <MyTextField type='text' name='nombre' label='Nombre tabla' width={20} focused />
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           disabled={loadingExtraccionDb}
                        >
                           { loadingExtraccionDb ? <CircularProgress size={22} color='inherit' /> : <SaveRounded /> }
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » CONFIRM: Eliminar tabla ... */ }
         <ConfirmDialogModal
            ref={ confirmEliminarTabla }
            title='¿Seguro de continuar, se perderan los datos asociados a la tabla?'
            setIsAccept={ setIsAcceptEliminarTabla }
         />

         {/* » MODAL: Agregar campo de extracción ...  */}
         <SimpleModal ref={ modalAddFieldExtraccion }>
            <Formik
               initialValues={{
                  nombre: '',
                  tipo: ''
               }}
               validationSchema={ Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!'),
                  tipo: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: any, meta): Promise<void> => {
                  await handleAlterFieldOfTablaDinamica(tablaDinamicaDto, values, 'ADD_COLUMN_E')
                  meta.resetForm()
               }}
            >
               {() => (
                  <Form>
                     <Box
                        height={ 50 }
                        display='inline-flex'
                        alignItems='flex-start'
                        gap={1}
                     >
                        <MyTextField name='nombre' label='Nombre de campo' width={25} focused />
                        <MySelect name='tipo' label='Tipo de campo' width={ 8 } opt={ optFieldType } />
                        <Button type='submit' variant='contained'><SaveAsOutlined /></Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » MODAL: Agregar grupo analisis ...  */}
         <SimpleModal ref={ modalAddGrupoAnalisis }>
            <Formik
               initialValues={{
                  nombre: ''
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (grupoCamposAnalisis: Partial<GrupoCamposAnalisis>, meta): Promise<void> => {
                  await saveGrupoCamposAnalisis({ idTabla: tablaDinamicaDto.idTabla, grupoCamposAnalisis: grupoCamposAnalisis })
                  meta.resetForm()
               }}
            >
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nuevo grupo' width={ 25 } focused />
                        <Button
                           type='submit'
                           variant='contained'
                        >
                           <SaveOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* ► DOWNLOAD: Depuración ...  */}
         <ExportToExcel ref={ downloadDepuracion } data={ depuracion } />

         {/* » INPUT<fIle> ... */}
         <input type='file' ref={ inputFile } accept='.xlsx' hidden onChange={ handleChangeInputFile } />
      </>
   )
}

const ListaCamposExtraccion: FC = () => {
   /* » CONTEXT ...  */
   const { tablaDinamicaDto } = useContext(NuevaDepuracionInfContext)

   /* » HOOK'S  */
   const modalEliminarCampo = useRef({} as SimpleModalRefProps)
   const [prevMetaField, setPrevMetaField] = useState({} as MetaCampoTablaDinamica)

   /* » CUSTOM - HOOK'S  */
   const {
      camposExtraccionDb,
      loadingcamposTablaDinamicaDb,
      handleDropFieldOfTablaDinamica,
      handleAlterFieldOfTablaDinamica,
      undecorateNameField
   } = useExtraccion()

   return (
      <>
         <MyScrollbars height={ 75 }>
            <List>
               {
                  camposExtraccionDb.map((metaCampo, i) => (
                     <Fade key={ metaCampo.nombre } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>

                        <ListItem>
                           <ListItemButton>
                              <ListItemText primary={
                                 <Box display='flex' gap={ 1 }>
                                    <Typography variant='h4'>{ `${i + 1}►` }</Typography>
                                    <Typography variant='h5'>{ metaCampo.nombre }</Typography>
                                 </Box>
                              }
                              />

                              {/* ► Action's  */}
                              <ListItemSecondaryAction>
                                 <Tooltip title='Editar campo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          setPrevMetaField(convertMetaTypeToSqlType(metaCampo))
                                          modalEliminarCampo.current.setOpen(true)
                                       }}
                                    >
                                       <EditOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>

                                 <Tooltip title='Eliminar campo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => { handleDropFieldOfTablaDinamica(tablaDinamicaDto, metaCampo, 'DROP_COLUMN_E') }}
                                    >
                                       <RemoveCircleOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>
                              </ListItemSecondaryAction>

                           </ListItemButton>
                        </ListItem>

                     </Fade>
                  ))
               }
            </List>
         </MyScrollbars>

         {/* » MODAL: Editar campo ...  */}
         <SimpleModal ref={ modalEliminarCampo }>
            <Formik
               initialValues={{
                  nombre: undecorateNameField(prevMetaField.nombre),
                  tipo: prevMetaField.tipo
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!'),
                  tipo: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: MetaCampoTablaDinamica, meta): Promise<void> => {
                  const tdDto = { ...tablaDinamicaDto, camposCsv: `${prevMetaField.nombre} ${prevMetaField.tipo}` }
                  await handleAlterFieldOfTablaDinamica(tdDto, values, 'ALTER_COLUMN_E')
                  meta.setValues({ nombre: '', tipo: '' as CampoType })
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nuevo nombre' width={ 18 } focused />
                        <MySelect name='tipo' label='Tipo de campo' width={ 8 } opt={ optFieldType } />
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={ loadingcamposTablaDinamicaDb }
                        >
                           <SaveAsOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>
      </>
   )
}

const ListaGrupoAnalisis:FC = () => {
   /* » CONTEXT ... */
   const { tablaDinamicaDto, gruposAnalisisDto, handleSaveCamposAnalisisTmp } = useContext(NuevaDepuracionInfContext)

   /* » CUSTOM - HOOK'S  */
   const { loadingExtraccionDb, saveGrupoCamposAnalisis, handleAlterFieldOfTablaDinamica } = useExtraccion()

   /* » HOOK'S  */
   const modalEditarNombreGrupo = useRef({} as SimpleModalRefProps)
   const modalAgregarCampo = useRef({} as SimpleModalRefProps)
   const [grupoAnalisis, setGrupoAnalisis] = useState({} as GrupoCamposAnalisis)
   const [selectedItem, setSelectedItem] = useState(-1)

   return (
      <>
         <MyScrollbars height={ 35 }>
            <List>
               {
                  gruposAnalisisDto.map((grupo, i) => (
                     <Fade key={ grupo.idGrupo } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>
                        <ListItem>

                           <ListItemButton
                              selected={ selectedItem === i }
                           >
                              <ListItemText
                                 primary={
                                    <Box display='flex' gap={ 1 }>
                                       <Typography variant='h4'>{ `${i + 1}►` }</Typography>
                                       <Typography variant='h5'>{ grupo.nombre }</Typography>
                                    </Box>
                                 }
                                 onClick={ () => {
                                    setSelectedItem(i)
                                    handleSaveCamposAnalisisTmp(grupo)
                                 } }
                              />

                              <ListItemSecondaryAction>

                                 <Tooltip title='Editar Grupo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          setGrupoAnalisis(grupo)
                                          modalEditarNombreGrupo.current.setOpen(true)
                                       }}
                                    >
                                       <EditOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>

                                 <Tooltip title='Agregar campo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          setGrupoAnalisis(grupo)
                                          modalAgregarCampo.current.setOpen(true)
                                       }}
                                    >
                                       <AddCircleOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>

                                 <Tooltip title='Eliminar Grupo' placement='top' arrow>
                                    <IconButton>
                                       <RemoveCircleOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>

                              </ListItemSecondaryAction>

                           </ListItemButton>

                        </ListItem>
                     </Fade>
                  ))
               }
            </List>
         </MyScrollbars>

         {/* » MODAL: Editar nombre grupo ...  */}
         <SimpleModal ref={ modalEditarNombreGrupo }>
            <Formik
               initialValues={{
                  nombre: grupoAnalisis.nombre
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async ({ nombre }: Partial<GrupoCamposAnalisis>, meta): Promise<void> => {
                  const tdDto = { ...tablaDinamicaDto, grupoCamposAnalisis: { ...grupoAnalisis, nombre } }
                  await saveGrupoCamposAnalisis(tdDto)
                  meta.setValues({ nombre: '' })
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nuevo nombre grupo' width={ 18 } focused />
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={ loadingExtraccionDb }
                        >
                           <SaveAsOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » MODAL: Agregar campo de analisis ...  */}
         <SimpleModal ref={ modalAgregarCampo }>
            <Formik
               initialValues={{
                  nombre: '',
                  tipo: '' as CampoType
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!'),
                  tipo: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: MetaCampoTablaDinamica, meta): Promise<void> => {
                  const tdDto = { ...tablaDinamicaDto, grupoCamposAnalisis: { ...grupoAnalisis } }
                  await handleAlterFieldOfTablaDinamica(tdDto, values, 'ADD_COLUMN_A')
                  meta.setValues({ nombre: '', tipo: '' as CampoType })
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nombre de campo' width={ 18 } focused />
                        <MySelect name='tipo' label='Tipo de campo' width={ 8 } opt={ optFieldType } />
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={ loadingExtraccionDb }
                        >
                           <SaveAsOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

      </>
   )
}

const ListaCamposAnalisis: FC = () => {
   /* » CONTEXT ...  */
   const {
      tablaDinamicaDto,
      grupoAnalisisTmp,
      camposAnalisisTmp
   } = useContext(NuevaDepuracionInfContext)

   /* » HOOK'S  */
   const modalEliminarCampo = useRef({} as SimpleModalRefProps)
   const [prevMetaField, setPrevMetaField] = useState({} as MetaCampoTablaDinamica)

   /* » CUSTOM - HOOK'S  */
   const {
      loadingcamposTablaDinamicaDb,
      handleAlterFieldOfTablaDinamica,
      undecorateNameField
   } = useExtraccion()

   return (
      <>
         <MyScrollbars height={ 35 }>
            <List>
               {
                  camposAnalisisTmp.map((metaCampo, i) => (
                     <Fade key={ metaCampo.nombre } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>

                        <ListItem>
                           <ListItemButton>
                              <ListItemText primary={
                                 <Box display='flex' gap={ 1 }>
                                    <Typography variant='h4'>{ `${i + 1}►` }</Typography>
                                    <Typography variant='h5'>{ metaCampo.nombre }</Typography>
                                 </Box>
                              }
                              />

                              <ListItemSecondaryAction>
                                 <Tooltip title='Editar campo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          setPrevMetaField(metaCampo)
                                          modalEliminarCampo.current.setOpen(true)
                                       }}
                                    >
                                       <EditOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>

                                 <Tooltip title='Eliminar campo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => {
                                          /* handleDropFieldOfTablaDinamica(tablaDinamicaDto, metaCampo, 'DROP_COLUMN_E')  */
                                       }}
                                    >
                                       <RemoveCircleOutlined fontSize='small' />
                                    </IconButton>
                                 </Tooltip>
                              </ListItemSecondaryAction>

                           </ListItemButton>
                        </ListItem>

                     </Fade>
                  ))
               }
            </List>
         </MyScrollbars>

         {/* » MODAL: Editar campo ...  */}
         <SimpleModal ref={ modalEliminarCampo }>
            <Formik
               initialValues={{
                  nombre: undecorateNameField(prevMetaField.nombre),
                  tipo: prevMetaField.tipo
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!'),
                  tipo: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: MetaCampoTablaDinamica, meta): Promise<void> => {
                  const tdDto: Partial<TablaDinamicaDto> = {
                     ...tablaDinamicaDto,
                     grupoCamposAnalisis: { ...grupoAnalisisTmp },
                     camposCsv: `${prevMetaField.nombre} ${prevMetaField.tipo}`
                  }
                  await handleAlterFieldOfTablaDinamica(tdDto, values, 'ALTER_COLUMN_A')
                  meta.setValues({ nombre: '', tipo: '' as CampoType })
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nuevo nombre' width={ 18 } focused />
                        <MySelect name='tipo' label='Tipo de campo' width={ 8 } opt={ optFieldType } />
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={ loadingcamposTablaDinamicaDb }
                        >
                           <SaveAsOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>
      </>
   )
}

export default function Default () {
   return (
      <NuevaDepuracionInfProvider>
         <NuevaDepuracionInfSubMod />
      </NuevaDepuracionInfProvider>
   )
}
