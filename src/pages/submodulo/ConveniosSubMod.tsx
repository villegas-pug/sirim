import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import {
   Box,
   Button,
   CircularProgress,
   Divider,
   Grid,
   IconButton,
   List,
   ListItemButton,
   ListItemSecondaryAction,
   ListItemText,
   ListSubheader,
   Paper,
   Tooltip,
   Typography,
   ListItemIcon,
   Stack,
   TextField
} from '@mui/material'
import {
   AddCircleRounded,
   AttachmentRounded,
   BrowseGalleryRounded,
   DownloadDoneRounded,
   EditRounded,
   FileCopyRounded,
   FileDownloadRounded,
   RadioButtonCheckedRounded,
   RadioButtonUncheckedRounded,
   RemoveCircleOutlineRounded,
   SaveOutlined,
   SaveRounded,
   SearchRounded,
   ViewWeekRounded
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { ConvenioProvider, useConvenioContext } from 'context'

import { BandejaProcesos, ConfirmDialogModal, ConfirmDialogRefProps, ListItemFade, ModalLoader, MyTextField, SimpleModal, SimpleModalRefProps } from 'components'
import { Convenio, DetConvenio } from 'interfaces'

import { useConvenio } from 'hooks'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useDebounce } from 'use-debounce'

const MainPaper = styled(Paper)({
   height: '100%',
   padding: '3px 3px 0 3px'
})

const ConveniosSubMod: FC = () => {
   // » HOOK'S ...

   // » CUSTOM - HOOK'S ...
   const { loadingLinemientoDb, findAllConvenio } = useConvenio()

   // » EFFECT'S ...
   useEffect(() => { findAllConvenio() }, [])

   // » HANDLER'S ...
   // » DEP'S ...

   return (
      <>
         <BandejaProcesos>
            {/* ► Bases de extracción ... */}
            <Grid item xs={ 4 }>
               <MainPaper>
                  <Convenios />
               </MainPaper>
            </Grid>

            {/* ► CAMPOS DE EXTRACCIÓN ...  */}
            <Grid item xs={ 8 }>
               <MainPaper>
                  <Typography variant='h5'>Detalle convenio</Typography>
                  <Divider />
                  <Box height='75vh' overflow='auto'>
                     <DetConvenios />
                  </Box>
               </MainPaper>
            </Grid>

         </BandejaProcesos>

         {/* » MODAL: Loading ...  */}
         { loadingLinemientoDb && <ModalLoader /> }

      </>
   )
}

const Convenios: FC = () => {
   // » HOOK'S ...
   const addConvenioRef = useRef({} as HTMLInputElement)

   // ► Custom hook's ...
   const { saveConvenio, findAllConvenio } = useConvenio()

   return (
      <>
         <Typography variant='h5'>Convenios</Typography>
         <Divider />

         <Box display='flex' flexDirection='column'>

            {/* » HEADER'S ...  */}
            <IconButton
               sx={{ alignSelf: 'center', marginTop: 1 }}
               onClick={ () => { addConvenioRef.current.click() } }
            >
               <AddCircleRounded fontSize='large' color='primary' />
            </IconButton>

            <Formik
               initialValues={{ nombre: '' }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Nombre convenio requerido!')
               })}
               onSubmit={ async (values: Partial<Convenio>, meta): Promise<any> => {
                  await saveConvenio(values)
                  await findAllConvenio()
                  meta.resetForm()
               } }>
               {
                  () => (
                     <Form style={{ margin: 'auto' }}>
                        <MyTextField
                           type='text'
                           name='nombre'
                           label='Nuevo convenio'
                           width={ 22 }
                           focused
                        />
                        <input type='submit' ref={ addConvenioRef } hidden />
                     </Form>
                  )
               }
            </Formik>

            {/* ► ... */}
            <Box height='57vh' overflow='auto'>
               <ListaConvenios />
            </Box>

         </Box>
      </>
   )
}

const ListaConvenios: FC = () => {
   // » Hook's ...
   const modalEditNombreConvenio = useRef({} as SimpleModalRefProps)
   const confirmEliminarConvenio = useRef({} as ConfirmDialogRefProps)
   const confirmCompleteConvenio = useRef({} as ConfirmDialogRefProps)
   const modalAddDetConvenio = useRef({} as SimpleModalRefProps)
   const [isAcceptEliminarConvenio, setIsAcceptEliminarConvenio] = useState(false)
   const [isAcceptCompleteConvenio, setIsAcceptCompleteConvenio] = useState(false)
   const [selectedItem, setSelectedItem] = useState(-1)
   const [isConvenioCompleto, setIsConvenioCompleto] = useState(false)

   // ► CUSTOM - HOOK'S ...
   const {
      convenioTmp,
      handleActionConvenioTmp,
      handleActionDetsConvenioTmp
   } = useConvenioContext()

   const {
      conveniosDb,
      loadingLinemientoDb,
      saveConvenio,
      saveDetConvenio,
      findAllConvenio,
      deleteConvenioById
   } = useConvenio()

   // ► EFFECT'S ...
   useEffect(() => { // Modal confirm ...
      if (!isAcceptEliminarConvenio) return
      (async () => {
         await deleteConvenioById(convenioTmp.idConvenio)
         await findAllConvenio()
         confirmEliminarConvenio.current.setIsOpen(false)
         setIsAcceptEliminarConvenio(false)
      })()
   }, [isAcceptEliminarConvenio])

   // ► EFFECT'S ...
   useEffect(() => { // Modal confirm ...
      if (!isAcceptCompleteConvenio) return
      (async () => {
         await saveConvenio({ ...convenioTmp, completo: !convenioTmp.completo })
         await findAllConvenio()
         confirmCompleteConvenio.current.setIsOpen(false)
         setIsAcceptCompleteConvenio(false)
      })()
   }, [isAcceptCompleteConvenio])

   // ► Handler's ...
   const handleChangeSwitchFilter = (e: ChangeEvent<HTMLInputElement>) => {
      setIsConvenioCompleto(e.target.checked)
   }

   // ► Dep's ...
   const filterConveniosDb = useMemo(() => {
      return conveniosDb.filter(({ completo }) => completo === isConvenioCompleto)
   }, [conveniosDb, isConvenioCompleto])

   return (
      <>
         <List
            subheader={
               <Stack direction='row' spacing={ 2 } alignItems='center'>
                  <ListSubheader component='div'>Convenios</ListSubheader>
                  <FormControlLabel
                     control={ <Switch onChange={ handleChangeSwitchFilter } /> }
                     label={ <Typography variant='h5'>{ isConvenioCompleto ? 'Completos' : 'Pendientes' }</Typography> }
                  />
               </Stack>
            }
         >
            {
               filterConveniosDb?.map((convenio, i) => (
                  <ListItemFade key={ convenio.idConvenio } i={ i } direction='top' >
                     <ListItemButton
                        selected={ selectedItem === i }
                        sx={{ border: convenio.completo ? '2px solid #004795' : '' }}
                        onClick={ () => {
                           handleActionConvenioTmp('SAVE', convenio)
                           handleActionDetsConvenioTmp('SAVE', convenio.detConvenio)
                        } }
                     >
                        <ListItemIcon>
                           { convenio.completo
                              ? <DownloadDoneRounded sx={{ color: '#004795' }} />
                              : <BrowseGalleryRounded sx={{ color: 'red' }}/>}
                        </ListItemIcon>
                        <ListItemText
                           primary={ <Typography variant='h5'>{ convenio.nombre }</Typography> }
                           onClick={ () => {
                              setSelectedItem(i)
                           }}
                        />

                        {/* ► Action's ... */}
                        <ListItemSecondaryAction>

                           <Tooltip title='Modificar nombre' placement='top' arrow>
                              <IconButton onClick={() => {
                                 modalEditNombreConvenio.current.setOpen(true)
                              }}>
                                 <EditRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Eliminar convenio' placement='top' arrow>
                              <IconButton onClick={() => {
                                 confirmEliminarConvenio.current.setIsOpen(true)
                              }}>
                                 <RemoveCircleOutlineRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Nuevo documento' placement='top' arrow>
                              <IconButton
                                 onClick={ () => { modalAddDetConvenio.current.setOpen(true) } }
                              >
                                 <ViewWeekRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Finalizar convenio' placement='top' arrow>
                              <IconButton
                                 onClick={() => { confirmCompleteConvenio.current.setIsOpen(true) }}
                              >
                                 { convenio.completo ? <RadioButtonCheckedRounded fontSize='small' /> : <RadioButtonUncheckedRounded fontSize='small' />}
                              </IconButton>
                           </Tooltip >

                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>

         {/* » MODAL: Editar nombre convenio ...  */}
         <SimpleModal ref={ modalEditNombreConvenio }>
            <Formik
               initialValues={{
                  nombre: convenioTmp.nombre
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: Partial<Convenio>, meta): Promise<any> => {
                  await saveConvenio({ ...convenioTmp, ...values })
                  await findAllConvenio()
                  meta.setValues({ nombre: '' })
               }}>
               {() => (
                  <Form>
                     <Box display='flex' justifyContent='space-between' alignItems='flex-start' gap={ 1 } >
                        <MyTextField type='text' name='nombre' label='Nombre tabla' width={ 30 } focused />
                        <Button
                           type='submit'
                           variant='contained'
                           color='primary'
                           disabled={ loadingLinemientoDb }
                        >
                           { loadingLinemientoDb ? <CircularProgress size={22} color='inherit' /> : <SaveRounded /> }
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » CONFIRM: Eliminar convenio ... */ }
         <ConfirmDialogModal
            ref={ confirmEliminarConvenio }
            title='¿Seguro de continuar, se perderan los datos asociados al convenio?'
            setIsAccept={ setIsAcceptEliminarConvenio }
         />

         {/* » MODAL: Nuevo detalle convenio ... */ }
         <SimpleModal ref={ modalAddDetConvenio }>
            <Formik
               initialValues={{
                  descripcion: '',
                  fechaDocumento: ''
               }}
               validationSchema={Yup.object({
                  descripcion: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: Partial<DetConvenio>, meta): Promise<void> => {
                  await saveDetConvenio({
                     convenio: { idConvenio: convenioTmp.idConvenio },
                     ...values
                  })
                  await findAllConvenio()
                  meta.setValues({ descripcion: '', fechaDocumento: '' })
               }}
            >
               {() => (
                  <Form>
                     <Box height={ 80 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField
                           type='text'
                           name='descripcion'
                           label='Descripción'
                           width={ 40 }
                           muiProps={{
                              fullWidth: true,
                              multiline: true,
                              rows: 2
                           }}
                           focused
                        />
                        <MyTextField type='date' name='fechaDocumento' label='Fecha documento' width={ 12 } />
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={ loadingLinemientoDb }
                        >
                           <SaveOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » CONFIRM: Eliminar convenio ... */ }
         <ConfirmDialogModal
            ref={ confirmCompleteConvenio }
            title='¿Seguro de continuar?'
            setIsAccept={ setIsAcceptCompleteConvenio }
         />

      </>
   )
}

const DetConvenios: FC = () => {
   // ► Hook's ...
   const [descripcionFilter, setDescripcionFilter] = useState('')
   const [descripcionFilterDebounce] = useDebounce(descripcionFilter, 500)

   // ► Custom hook's ...
   const { detsConvenioTmp } = useConvenioContext()

   // ► Dep's ...
   const detsConvenioFilter = useMemo(() => {
      if (!descripcionFilterDebounce) return detsConvenioTmp
      if (descripcionFilterDebounce.trim().length === 0) return detsConvenioTmp

      return detsConvenioTmp.filter(({ descripcion }) =>
         descripcion.trim().toLowerCase().includes(descripcionFilterDebounce.trim().toLowerCase()))
   }, [detsConvenioTmp, descripcionFilterDebounce])

   // ► Handler's ...
   const handleChangeFilterDescripcion = (e: ChangeEvent<HTMLInputElement>) => {
      setDescripcionFilter(e.target.value)
   }

   return (
      <Box display='flex' flexDirection='column'>

         {/* » HEADER'S ... */}
         <Box m={ 1 } display='flex' justifyContent='flex-start' alignItems='center' gap={ 1 }>
            <TextField
               variant='filled'
               size='small'
               label='Ingresar una descripción del documento para filtrar'
               sx={{ width: 450 }}
               onChange={ handleChangeFilterDescripcion }
            />
            <IconButton
               sx={{ alignSelf: 'center', marginTop: 1 }}
               onClick={ () => { } }
            >
               <SearchRounded fontSize='large' color='primary' />
            </IconButton>

         </Box>

         {/* ► ... */}
         <Box height='57vh' overflow='auto'>
            <ListaDetConvenio detsConvenio={ detsConvenioFilter } />
         </Box>

      </Box>
   )
}

const ListaDetConvenio: FC<{ detsConvenio: DetConvenio[] }> = ({ detsConvenio }) => {
   // » Hook's ...
   const modalEditDetConvenio = useRef({} as SimpleModalRefProps)
   const confirmEliminarDetConvenio = useRef({} as ConfirmDialogRefProps)
   const inputFileRef = useRef({} as HTMLInputElement)
   const [isAcceptEliminarDetConvenio, setIsAcceptEliminarDetConvenio] = useState(false)

   // ► Custom hook's ...
   const {
      convenioTmp,
      detConvenioTmp,
      handleActionDetConvenioTmp
   } = useConvenioContext()

   const {
      loadingLinemientoDb,
      findAllConvenio,
      saveDetConvenio,
      saveDetConvenioAnexo,
      downloadDetConvenioAnexo,
      deleteDetConvenio
   } = useConvenio()

   // ► Effect's ...
   useEffect(() => { // Modal confirm ...
      if (!isAcceptEliminarDetConvenio) return
      (async () => {
         deleteDetConvenio({
            idDetConvenio: detConvenioTmp.idDetConvenio,
            convenio: { idConvenio: convenioTmp.idConvenio }
         })
         await findAllConvenio()
         confirmEliminarDetConvenio.current.setIsOpen(false)
         setIsAcceptEliminarDetConvenio(false)
      })()
   }, [isAcceptEliminarDetConvenio])

   // ► Handler's ...
   const handleChangeInputAnexo = async (input: ChangeEvent<HTMLInputElement>) => {
      const frmDataAnexo = new FormData()
      frmDataAnexo.append('anexo', input.target.files![0])
      await saveDetConvenioAnexo(convenioTmp.idConvenio, detConvenioTmp.idDetConvenio, frmDataAnexo)
      findAllConvenio()
   }

   return (
      <>
         <List>
            {
               detsConvenio?.map((detConvenio, i) => (
                  <ListItemFade key={ detConvenio.idDetConvenio } i={ i } direction='top' >
                     <ListItemButton
                        sx={{ borderBottom: '1px #D0D0D0 solid' }}
                        onClick={ () => { handleActionDetConvenioTmp('SAVE', detConvenio) } }
                     >
                        <ListItemIcon>
                           <FileCopyRounded />
                        </ListItemIcon>

                        <ListItemText
                           primary={
                              <Stack
                                 direction='row'
                                 spacing={ 2 }
                                 divider={ <Divider orientation='vertical' flexItem /> }
                              >
                                 <Typography variant='h5'>{ detConvenio.descripcion }</Typography>
                                 <Typography variant='h5'>{ detConvenio.fechaDocumento || '-' }</Typography>
                              </Stack>
                           }
                        />

                        {/* ► Action's ... */}
                        <ListItemSecondaryAction>

                           <Tooltip title='Modificar detalle convenio' placement='top' arrow>
                              <IconButton onClick={() => {
                                 modalEditDetConvenio.current.setOpen(true)
                              }}>
                                 <EditRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Eliminar detalle convenio' placement='top' arrow>
                              <IconButton onClick={() => { confirmEliminarDetConvenio.current.setIsOpen(true) }}>
                                 <RemoveCircleOutlineRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title='Subir anexo en formato: excel, pdf o word' placement='top' arrow>
                              <IconButton
                                 onClick={ () => { inputFileRef.current.click() } }
                              >
                                 <AttachmentRounded fontSize='small' />
                              </IconButton>
                           </Tooltip>

                           {
                              detConvenio.nombreAnexo && (
                                 <Tooltip title='Descargar anexo' placement='top' arrow>
                                    <IconButton
                                       onClick={() => { downloadDetConvenioAnexo(convenioTmp.idConvenio, detConvenio.idDetConvenio) }}
                                    >
                                       <FileDownloadRounded fontSize='small' />
                                    </IconButton>
                                 </Tooltip >
                              )
                           }

                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>

         {/* ► Aux input file ...  */}
         <input
            ref={ inputFileRef }
            type='file'
            accept='.doc,.docx,.xlsx,.pdf'
            hidden
            onChange={ handleChangeInputAnexo }
         />

         {/* » MODAL: Editar detalle convenio ...  */}
         <SimpleModal ref={ modalEditDetConvenio }>
            <Formik
               initialValues={{
                  descripcion: detConvenioTmp.descripcion,
                  fechaDocumento: detConvenioTmp.fechaDocumento
               }}
               validationSchema={Yup.object({
                  descripcion: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async (values: Partial<DetConvenio>, meta): Promise<any> => {
                  await saveDetConvenio({
                     convenio: { idConvenio: convenioTmp.idConvenio },
                     idDetConvenio: detConvenioTmp.idDetConvenio,
                     ...values
                  })
                  await findAllConvenio()
                  meta.setValues({ descripcion: '', fechaDocumento: '' })
               }}>
               {() => (
                  <Form>
                     <Box height={ 80 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField
                           type='text'
                           name='descripcion'
                           label='Descripción'
                           width={ 40 }
                           muiProps={{
                              fullWidth: true,
                              multiline: true,
                              rows: 2
                           }}
                           focused
                        />
                        <MyTextField type='date' name='fechaDocumento' label='Fecha documento' width={ 12 } />
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={ loadingLinemientoDb }
                        >
                           <SaveOutlined />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* » CONFIRM: Eliminar convenio ... */ }
         <ConfirmDialogModal
            ref={ confirmEliminarDetConvenio }
            title='¿Seguro de continuar?'
            setIsAccept={ setIsAcceptEliminarDetConvenio }
         />
      </>
   )
}

export default function Default () {
   return <ConvenioProvider>
      <ConveniosSubMod />
   </ConvenioProvider>
}
