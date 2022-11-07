import { ChangeEvent, FC, useContext, useEffect, useId, useRef, useState } from 'react'

import {
   Box,
   Divider,
   Grid,
   IconButton,
   Paper,
   Typography,
   List,
   ListItemButton,
   ListSubheader,
   ListItemText,
   ListItemSecondaryAction,
   Tooltip,
   Button,
   CircularProgress,
   TextField
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

import {
   MySelect,
   MyTextField,
   ExportToExcel,
   ExportToExcelRefProps,
   ListItemFade,
   ConfirmDialogModal,
   ConfirmDialogRefProps,
   SimpleModal,
   SimpleModalRefProps,
   ModalLoader,
   SpeedDialActionProps,
   SpeedDialBackdrop,
   BandejaProcesos,
   MyCheckBox,
   ListPuffLoader
} from 'components'

import { NuevaDepuracionInfContext, NuevaDepuracionInfProvider, useDepurarExtraccionContext } from 'context'

import { useExtraccion, useTipoLogico } from 'hooks'
import { MetaFieldSqlType, GrupoCamposAnalisis, MetaCampoTablaDinamica, TablaDinamica, TablaDinamicaDto } from 'interfaces'
import { convertMetaTypeToSqlType, undecorateMetaFieldName } from 'helpers'
import { messages, regex } from 'constants/'

const MainPaper = styled(Paper)({
   height: '100%',
   padding: '3px 3px 0 3px'
})

const DepurarExtraccionSubMod: FC = () => {
   /* » HOOK'S  */
   const addTablaRef = useRef({} as HTMLInputElement)

   /* » CUSTOM - HOOK'S  */
   const {
      loadingExtraccionDb,
      loadingcamposTablaDinamicaDb,
      loadingTablaDinamica,
      loadingDepuracion,
      findTablaDinamicaByUsrCreador,
      createTablaExtraccion
   } = useExtraccion()

   const { findAllTipoLogico } = useTipoLogico()

   /* » EFFECT'S ... */
   useEffect(() => { findTablaDinamicaByUsrCreador() }, [])
   useEffect(() => { findAllTipoLogico() }, [])

   /* » HANDLER'S ... */
   const handleAddTabla = () => { addTablaRef.current?.click() }

   /* » DEP'S ... */
   const speedDialActions: SpeedDialActionProps[] = [
      {
         name: 'Refrescar',
         icon: <HistoryOutlined />,
         handleClick: () => { findTablaDinamicaByUsrCreador() }
      }
   ]

   return (
      <>
         <BandejaProcesos>
            {/* ► Bases de extracción ... */}
            <Grid item xs={ 5 }>
               <MainPaper>
                  <Typography variant='h5' >NUEVA TABLA</Typography>
                  <Divider />

                  <Box display='flex' flexDirection='column'>

                     {/* » HEADER'S ...  */}
                     <IconButton
                        sx={{ alignSelf: 'center', marginTop: 1 }}
                        onClick={ handleAddTabla}
                     >
                        <AddCircleRounded fontSize='large' color='primary' />
                     </IconButton>

                     <Formik
                        initialValues={{ nombre: '' }}
                        validationSchema={Yup.object({
                           nombre: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_TABLE_REGEX, messages.INPUT_TABLE_VALIDATION)
                        })}
                        onSubmit={ async (values: Partial<TablaDinamicaDto>, meta): Promise<any> => {
                           await createTablaExtraccion(values)
                           meta.resetForm()
                        } }>
                        {
                           () => (
                              <Form style={{ margin: 'auto' }}>
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

                     {/* ► ... */}
                     <Box height='57vh' overflow='auto'>
                        <ListaTablasExtraccion />
                     </Box>

                  </Box>

               </MainPaper>
            </Grid>

            {/* ► CAMPOS DE EXTRACCIÓN ...  */}
            <Grid item xs={ 3 }>
               <MainPaper>
                  <Typography variant='h5'>CAMPOS DE EXTRACCIÓN</Typography>
                  <Divider />
                  <Box height='75vh' overflow='auto'>
                     <ListaCamposExtraccion />
                  </Box>
               </MainPaper>
            </Grid>

            {/* ► Grupo de Analisis y Campos de Analisis ... */}
            <Grid item xs={ 4 } container spacing={ 0.5 }>

               <Grid item xs={ 12 }>
                  <MainPaper>
                     <Typography variant='h5' >GRUPOS DE ANALISIS</Typography>
                     <Divider />
                     <Box height='35vh' overflow='auto'>
                        <ListaGrupoAnalisis />
                     </Box>
                  </MainPaper>
               </Grid>

               <Grid item xs={ 12 }>
                  <MainPaper>
                     <Typography variant='h5' >CAMPOS DE ANALISIS</Typography>
                     <Divider />
                     <Box height='35vh' overflow='auto'>
                        <ListaCamposAnalisis />
                     </Box>
                  </MainPaper>
               </Grid>

            </Grid>
         </BandejaProcesos>

         {/* » Speed-Dial ... */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* » MODAL: Loading ...  */}
         { loadingExtraccionDb && <ModalLoader /> }
         { loadingcamposTablaDinamicaDb && <ModalLoader /> }
         { loadingTablaDinamica && <ModalLoader /> }
         { loadingDepuracion && <ModalLoader /> }

      </>
   )
}

const ListaTablasExtraccion: FC = () => {
   /* » HOOK'S  */
   const {
      tablaDinamicaDto,
      handleSaveTablaDinamicaDto,
      handleSavegruposAnalisisDto,
      handleSaveCamposAnalisisTmp
   } = useContext(NuevaDepuracionInfContext)

   const modalEditNombreTabla = useRef({} as SimpleModalRefProps)
   const modalAddFieldExtraccion = useRef({} as SimpleModalRefProps)
   const modalAddGrupoAnalisis = useRef({} as SimpleModalRefProps)
   const confirmEliminarTabla = useRef({} as ConfirmDialogRefProps)
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
      bancoCamposExtraccionDb,
      updateNameTablaDinamica,
      deleteTablaExtraccion,
      findMetaTablaDinamica,
      uploadExtraccion,
      saveGrupoCamposAnalisis,
      findTablaDinamicaBySuffixOfField,
      removeAllDepuracion
   } = useExtraccion()

   /* ► EFFECT'S ...  */
   useEffect(() => { // ► Remove: Tabla extracción ...
      if (!isAcceptEliminarTabla) return

      deleteTablaExtraccion({ idTabla: tablaDinamicaDto.idTabla, nombre: tablaDinamicaDto.nombre })

      // » Clean-up `tablaDinamicaDto` ...
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
         <List
            subheader={ <ListSubheader component='div'>Tabla de extracción</ListSubheader> }
         >
            {
               extraccionDb?.map((tablaDinamica, i) => (
                  <ListItemFade key={ tablaDinamica.idTabla } i={ i } direction='top' >
                     <ListItemButton selected={ selectedItem === i }>
                        <ListItemText
                           primary={
                              <Box display='flex' gap={ 1 }>
                                 <Typography variant='h4'>{ `${i + 1}►` }</Typography>
                                 <Typography variant='h5'>{ tablaDinamica.nombre }</Typography>
                              </Box>
                           }
                           onClick={ () => {
                              findMetaTablaDinamica({ nombre: tablaDinamica.nombre })/* ► request ... */
                              handleSaveTablaDinamicaDto(tablaDinamica)
                              handleSavegruposAnalisisDto(tablaDinamica.idTabla)
                              handleSaveCamposAnalisisTmp({} as GrupoCamposAnalisis, 'RESET')
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
                                 onClick={() => { findTablaDinamicaBySuffixOfField(tablaDinamica.nombre) }}
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
                  </ListItemFade>
               ))
            }
         </List>

         {/* » MODAL: Editar nombre tabla extracción ...  */}
         <SimpleModal ref={ modalEditNombreTabla }>
            <Formik
               initialValues={{
                  nombre: tablaDinamicaDto.nombre
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!').matches(/^[a-zA-Z_0-9]+$/gi, '¡Caracter no permitido!')
               })}
               onSubmit={ async (values: Partial<TablaDinamica>, meta: FormikHelpers<Partial<TablaDinamica>>): Promise<any> => {
                  await updateNameTablaDinamica({
                     idTabla: tablaDinamicaDto.idTabla,
                     nombre: values.nombre ?? ''
                  })
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
            {/* ► Header ...  */}
            <FrmCrearCampoExtraccion />

            {/* ► Body: Lista de campos existentes ... */}
            <PoolFrmCrearCampo metaCamposTablaDinamica={ bancoCamposExtraccionDb } type='_e' />

         </SimpleModal>

         {/* » MODAL: Agregar grupo analisis ...  */}
         <SimpleModal ref={ modalAddGrupoAnalisis }>
            <Formik
               initialValues={{
                  nombre: '',
                  obligatorio: false
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
                     .matches(regex.INPUT_GRUPO_ANALISIS_REGEX, messages.INPUT_GRUPO_ANALISIS_VALIDATION)
               })}
               onSubmit={ async (grupoCamposAnalisis: Pick<GrupoCamposAnalisis, 'nombre' | 'obligatorio'>, meta): Promise<void> => {
                  await saveGrupoCamposAnalisis({ idTabla: tablaDinamicaDto.idTabla, grupoCamposAnalisis })
                  meta.setValues({ nombre: '', obligatorio: false })
               }}
            >
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 5 }>
                        <MyTextField type='text' name='nombre' label='Nuevo grupo' width={ 25 } focused />
                        <MyCheckBox name='obligatorio' label='¿Campos son obligatorios?' width={ 12 } />
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

const PoolFrmCrearCampo: FC<{ metaCamposTablaDinamica: MetaCampoTablaDinamica[], type: '_a' | '_e' }> = ({ metaCamposTablaDinamica, type }) => {
   /* ► HOOK'S ... */
   const idFrmCrear = useId()
   // eslint-disable-next-line no-undef
   const debounceRef = useRef({} as NodeJS.Timeout)
   const [input, setInput] = useState('')
   const [filterMetaCamposTablaDinamica, setFilterMetaCamposTablaDinamica] = useState<MetaCampoTablaDinamica[]>([])

   /* ► EFFECT'S ...  */
   useEffect(() => {
      if (input.trim().length === 0) {
         setFilterMetaCamposTablaDinamica([])
         return
      }

      if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(() => {
         const filterMetaCampos = metaCamposTablaDinamica
            .filter(({ nombre }) => {
               return nombre.toLowerCase().includes(input.toLowerCase())
            })
            .sort((a, b) => a.nombre < b.nombre ? -1 : 1)
            .filter((_, i) => i <= 1) // ► Top 2 ...

         setFilterMetaCamposTablaDinamica(filterMetaCampos)
      }, 350)
   }, [input, metaCamposTablaDinamica])

   /* ► HANDLER'S ... */
   const handleChangeInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => { setInput(value) }

   /* ► CONDITIONAL - RENDERING ... */
   if (metaCamposTablaDinamica.length === 0) return <></>

   return (
      <>
         {/* ► Header: Buscar campos ... */}
         <Divider sx={{ mt: 2.5, mb: 1.5, mx: 3 }} />
         <TextField
            value={ input }
            label='Ingrese un nombre, para buscar campos existentes'
            size='small'
            sx={{ width: 350, mb: 2 }}
            onChange={ handleChangeInput }
         />

         {/* ► Body ... */}
         <Box
            maxHeight={ 300 }
            p={ 1 }
            display='flex'
            gap={ 3.5 }
            flexDirection='column'
            justifyContent='flex-start'
            sx={{ overflowY: 'scroll' }}
         >
            {
               filterMetaCamposTablaDinamica.map((metaCampo, i) => (
                  <Fade
                     key={ `${idFrmCrear}-${metaCampo.nombre}-${i}` }
                     delay={ i * 100 }
                  >
                     { type === '_e'
                        ? <FrmCrearCampoExtraccion metaCampo={ metaCampo } />
                        : <FrmCrearCampoAnalisis metaCampo={ metaCampo } />
                     }
                  </Fade>
               ))
            }
         </Box>
      </>
   )
}

const FrmCrearCampoExtraccion: FC<{ metaCampo?: MetaCampoTablaDinamica}> = ({ metaCampo }) => {
   /* ► CONTEXT ... */
   const { tablaDinamicaDto } = useDepurarExtraccionContext()

   /* ► CUSTOM - HOOK'S ...  */
   const { handleAlterFieldTablaDinamica, findTablaDinamicaByUsrCreador } = useExtraccion()

   return (
      <Formik
         initialValues={{
            nombre: metaCampo?.nombre || '',
            info: metaCampo?.info || ''
         }}
         validationSchema={ Yup.object({
            nombre: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_FIELD_REGEX, messages.INPUT_FIELD_VALIDATION),
            info: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_INFO_REGEX, messages.INPUT_INFO_VALIDATION)
         })}
         onSubmit={ async (values: Partial<MetaCampoTablaDinamica>, meta): Promise<void> => {
            await handleAlterFieldTablaDinamica(tablaDinamicaDto, values, 'ADD_COLUMN_E')
            await findTablaDinamicaByUsrCreador()
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
                  <MyTextField
                     type='text'
                     name='nombre'
                     label='Nombre de campo'
                     width={25}
                     focused={ !metaCampo }
                  />
                  <MyTextField
                     type='text'
                     name='info'
                     label='Nueva información de campo'
                     width={ 35 }
                  />
                  <Button type='submit' variant='outlined'><SaveAsOutlined /></Button>
               </Box>
            </Form>
         )}
      </Formik>
   )
}

const FrmCrearCampoAnalisis: FC<{ metaCampo?: MetaCampoTablaDinamica}> = ({ metaCampo }) => {
   /* ► CONTEXT ... */
   const { tablaDinamicaDto, grupoAnalisisTmp } = useDepurarExtraccionContext()

   /* ► CUSTOM - HOOK'S ...  */
   const { handleAlterFieldTablaDinamica, loadingExtraccionDb } = useExtraccion()
   const { optTiposCurrentGrupoAuth } = useTipoLogico()

   return (
      <Formik
         initialValues={{
            nombre: metaCampo?.nombre || '',
            tipo: (metaCampo?.tipo || '') as MetaFieldSqlType,
            info: metaCampo?.info || ''
         }}
         validationSchema={Yup.object({
            nombre: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_FIELD_REGEX, messages.INPUT_FIELD_VALIDATION),
            tipo: Yup.string().required('¡Campo requerido!'),
            info: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_INFO_REGEX, messages.INPUT_INFO_VALIDATION)
         })}
         onSubmit={ async (values: MetaCampoTablaDinamica, meta): Promise<void> => {
            const tdDto = { ...tablaDinamicaDto, grupoCamposAnalisis: { ...grupoAnalisisTmp } }
            await handleAlterFieldTablaDinamica(tdDto, values, 'ADD_COLUMN_A')
            meta.setValues({ nombre: '', tipo: '' as MetaFieldSqlType, info: '' })
         } }>
         {() => (
            <Form>
               <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                  <MyTextField type='text' name='nombre' label='Nombre de campo' width={ 18 } focused={ !metaCampo } />
                  <MySelect name='tipo' label='Tipo de campo' width={ 18 } opt={ optTiposCurrentGrupoAuth } />
                  <MyTextField type='text' name='info' label='Información de campo de analisis' width={ 35 } />
                  <Button
                     type='submit'
                     variant='outlined'
                     disabled={ loadingExtraccionDb }
                  >
                     <SaveAsOutlined />
                  </Button>
               </Box>
            </Form>
         )}
      </Formik>
   )
}

const ListaCamposExtraccion: FC = () => {
   /* » CONTEXT ...  */
   const { tablaDinamicaDto, metaFieldInfoTablaDinamicaTmp } = useContext(NuevaDepuracionInfContext)

   /* » HOOK'S  */
   const modalEditarCampo = useRef({} as SimpleModalRefProps)
   const [prevMetaField, setPrevMetaField] = useState({} as Partial<MetaCampoTablaDinamica>)

   /* » CUSTOM - HOOK'S  */
   const {
      camposExtraccionDb,
      loadingcamposTablaDinamicaDb,
      loadingExtraccionDb,
      findTablaDinamicaByUsrCreador,
      handleAlterFieldTablaDinamica
   } = useExtraccion()

   return (
      <>
         <ListPuffLoader
            loading={ loadingExtraccionDb || loadingcamposTablaDinamicaDb }
         >
            <List>
               {
                  camposExtraccionDb.map((metaCampo, i) => (
                     <ListItemButton key={ metaCampo.nombre }>
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
                                    modalEditarCampo.current.setOpen(true)
                                 }}
                              >
                                 <EditOutlined fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Eliminar campo' placement='top' arrow>
                              <IconButton
                                 onClick={() => { handleAlterFieldTablaDinamica(tablaDinamicaDto, metaCampo, 'DROP_COLUMN_E') }}
                              >
                                 <RemoveCircleOutlined fontSize='small' />
                              </IconButton>
                           </Tooltip>

                        </ListItemSecondaryAction>

                     </ListItemButton>
                  ))
               }
            </List>
         </ListPuffLoader>

         {/* » MODAL: Editar campo ...  */}
         <SimpleModal ref={ modalEditarCampo }>
            <Formik
               initialValues={{
                  nombre: undecorateMetaFieldName(prevMetaField.nombre || '', 'prefix | suffix'),
                  info: metaFieldInfoTablaDinamicaTmp[prevMetaField.nombre!]
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_FIELD_REGEX, messages.INPUT_FIELD_VALIDATION),
                  info: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: Partial<MetaCampoTablaDinamica>, meta): Promise<void> => {
                  const tdDto = { ...tablaDinamicaDto, camposCsv: `${prevMetaField.nombre} | ${prevMetaField.tipo} | ${metaFieldInfoTablaDinamicaTmp[prevMetaField.nombre!]}` }
                  await handleAlterFieldTablaDinamica(tdDto, values, 'ALTER_COLUMN_E')
                  await findTablaDinamicaByUsrCreador()
                  meta.setValues({ nombre: '', info: '' })
                  modalEditarCampo.current.setOpen(false)
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nuevo nombre' width={ 18 } focused />
                        <MyTextField type='text' name='info' label='Nueva información de campo' width={ 35 } multiple />
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
   const {
      tablaDinamicaDto,
      gruposAnalisisDto,
      grupoAnalisisTmp,
      handleSaveCamposAnalisisTmp,
      handleSaveGrupoAnalisisTmp
   } = useDepurarExtraccionContext()

   /* » HOOK'S ... */
   const modalEditarNombreGrupo = useRef({} as SimpleModalRefProps)
   const modalAgregarCampo = useRef({} as SimpleModalRefProps)
   const confirmEliminarGrupo = useRef({} as ConfirmDialogRefProps)
   const [selectedItem, setSelectedItem] = useState(-1)
   const [hasAcceptedEliminarGrupo, setHasAcceptedEliminarGrupo] = useState(false)

   /* » CUSTOM - HOOK'S ... */
   const {
      loadingExtraccionDb,
      bancoCamposAnalisisDb,
      saveGrupoCamposAnalisis,
      deleteGrupoCamposAnalisisbyId,
      findTablaDinamicaByUsrCreador
   } = useExtraccion()

   /* ► EFFEC'S ... */
   useEffect(() => { /* ► Si confirma eliminar el grupo ... */
      if (!hasAcceptedEliminarGrupo) return
      (async () => {
         await deleteGrupoCamposAnalisisbyId(grupoAnalisisTmp.idGrupo)
         await findTablaDinamicaByUsrCreador()
         setHasAcceptedEliminarGrupo(false)
      })()
   }, [hasAcceptedEliminarGrupo])

   return (
      <>
         <List>
            {
               gruposAnalisisDto.map((grupo, i) => (
                  <ListItemFade key={ grupo.idGrupo } i={ i } direction='top'>
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
                              handleSaveGrupoAnalisisTmp(grupo)
                              handleSaveCamposAnalisisTmp(grupo, 'SAVE')
                           } }
                        />

                        <ListItemSecondaryAction>

                           <Tooltip title='Editar Grupo' placement='top' arrow>
                              <IconButton
                                 onClick={() => {
                                    handleSaveGrupoAnalisisTmp(grupo)
                                    modalEditarNombreGrupo.current.setOpen(true)
                                 }}
                              >
                                 <EditOutlined fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Agregar campo' placement='top' arrow>
                              <IconButton
                                 onClick={() => {
                                    handleSaveGrupoAnalisisTmp(grupo)
                                    modalAgregarCampo.current.setOpen(true)
                                 }}
                              >
                                 <AddCircleOutlined fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Eliminar Grupo' placement='top' arrow>
                              <IconButton
                                 onClick={ () => {
                                    handleSaveGrupoAnalisisTmp(grupo)
                                    confirmEliminarGrupo.current.setIsOpen(true)
                                 } }
                              >
                                 <RemoveCircleOutlined fontSize='small' />
                              </IconButton>
                           </Tooltip>

                        </ListItemSecondaryAction>

                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>

         {/* » MODAL: Editar grupo ... */}
         <SimpleModal ref={ modalEditarNombreGrupo }>
            <Formik
               initialValues={{
                  nombre: grupoAnalisisTmp.nombre,
                  obligatorio: grupoAnalisisTmp.obligatorio
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
                     .matches(regex.INPUT_GRUPO_ANALISIS_REGEX, messages.INPUT_GRUPO_ANALISIS_VALIDATION)
               })}
               onSubmit={ async (values: Pick<GrupoCamposAnalisis, 'nombre' | 'obligatorio'>, meta): Promise<void> => {
                  const tdDto: Partial<TablaDinamicaDto> = { ...tablaDinamicaDto, grupoCamposAnalisis: { ...grupoAnalisisTmp, ...values } }
                  await saveGrupoCamposAnalisis(tdDto)
                  meta.setValues({ nombre: '', obligatorio: false })
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 5 }>
                        <MyTextField type='text' name='nombre' label='Nuevo nombre grupo' width={ 25 } focused />
                        <MyCheckBox name='obligatorio' label='¿Campos son obligatorios?' width={ 12 } />
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
            {/* ► Header ...  */}
            <FrmCrearCampoAnalisis />

            {/* ► Body: Lista de campos existentes ... */}
            <PoolFrmCrearCampo metaCamposTablaDinamica={ bancoCamposAnalisisDb } type='_a' />
         </SimpleModal>

         {/* ► MODAL: Confirmación eliminar grupo ...  */}
         <ConfirmDialogModal
            ref={ confirmEliminarGrupo }
            title={'¿Seguro de eliminar el grupo?'}
            setIsAccept={ setHasAcceptedEliminarGrupo }
         />

      </>
   )
}

const ListaCamposAnalisis: FC = () => {
   /* » CONTEXT ...  */
   const {
      tablaDinamicaDto,
      grupoAnalisisTmp,
      camposAnalisisTmp
   } = useDepurarExtraccionContext()

   /* » HOOK'S  */
   const modalEliminarCampo = useRef({} as SimpleModalRefProps)
   const confirmEliminarCampo = useRef({} as ConfirmDialogRefProps)
   const [prevMetaField, setPrevMetaField] = useState({} as MetaCampoTablaDinamica)
   const [hasAcceptedEliminarCampo, setHasAcceptedEliminarCampo] = useState(false)

   /* » CUSTOM - HOOK'S  */
   const {
      loadingcamposTablaDinamicaDb,
      loadingExtraccionDb,
      handleAlterFieldTablaDinamica
   } = useExtraccion()

   const { optTiposCurrentGrupoAuth } = useTipoLogico()

   /* ► EFFEC'S ... */
   useEffect(() => { /* ► Si confirma eliminar el grupo ... */
      if (!hasAcceptedEliminarCampo) return

      handleAlterFieldTablaDinamica({
         ...tablaDinamicaDto,
         grupoCamposAnalisis: grupoAnalisisTmp
      }, prevMetaField, 'DROP_COLUMN_A')

      // ► Cleanup ...
      setHasAcceptedEliminarCampo(false)
      setPrevMetaField({} as MetaCampoTablaDinamica)
   }, [hasAcceptedEliminarCampo])

   return (
      <>
         <ListPuffLoader
            loading={ loadingcamposTablaDinamicaDb || loadingExtraccionDb }
            size={ 40 }
         >
            <List>
               {
                  camposAnalisisTmp.map((metaCampo, i) => (

                     <ListItemButton key={ metaCampo.nombre }>
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
                                    setPrevMetaField(metaCampo)
                                    confirmEliminarCampo.current.setIsOpen(true)
                                 }}
                              >
                                 <RemoveCircleOutlined fontSize='small' />
                              </IconButton>
                           </Tooltip>
                        </ListItemSecondaryAction>

                     </ListItemButton>
                  ))
               }
            </List>
         </ListPuffLoader>

         {/* » MODAL: Editar campo ...  */}
         <SimpleModal ref={ modalEliminarCampo }>
            <Formik
               initialValues={{
                  nombre: undecorateMetaFieldName(prevMetaField.nombre, 'prefix | suffix'),
                  tipo: prevMetaField.tipo,
                  info: prevMetaField.info
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_FIELD_REGEX, messages.INPUT_FIELD_VALIDATION),
                  tipo: Yup.string().required('¡Campo requerido!'),
                  info: Yup.string().required('¡Campo requerido!').matches(regex.INPUT_INFO_REGEX, messages.INPUT_INFO_VALIDATION)
               })}
               onSubmit={ async (values: MetaCampoTablaDinamica, meta): Promise<void> => {
                  const tdDto: Partial<TablaDinamicaDto> = {
                     ...tablaDinamicaDto,
                     grupoCamposAnalisis: { ...grupoAnalisisTmp },
                     camposCsv: `${prevMetaField.nombre} | ${prevMetaField.tipo} | ${prevMetaField.info}`
                  }
                  await handleAlterFieldTablaDinamica(tdDto, values, 'ALTER_COLUMN_A')
                  meta.setValues({ nombre: '', tipo: '' as MetaFieldSqlType, info: '' })
               } }>
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nuevo nombre' width={ 18 } focused />
                        <MySelect name='tipo' label='Tipo de campo' width={ 18 } opt={ optTiposCurrentGrupoAuth } />
                        <MyTextField type='text' name='info' label='Nueva información de campo' width={ 35 } multiple />
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

         {/* ► MODAL: Confirmación eliminar campo ...  */}
         <ConfirmDialogModal
            ref={ confirmEliminarCampo }
            title={'¿Seguro de eliminar el campo de analisis?'}
            setIsAccept={ setHasAcceptedEliminarCampo }
         />
      </>
   )
}

export default function Default () {
   return (
      <NuevaDepuracionInfProvider>
         <DepurarExtraccionSubMod />
      </NuevaDepuracionInfProvider>
   )
}
