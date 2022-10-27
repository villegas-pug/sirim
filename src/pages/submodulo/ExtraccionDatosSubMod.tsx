import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react'

import {
   Box,
   Button,
   Checkbox,
   Divider,
   Grid,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemSecondaryAction,
   ListItemText,
   ListSubheader,
   Paper,
   Stack,
   TextField,
   Typography
} from '@mui/material'
import {
   BusinessRounded,
   DeleteForeverOutlined,
   Download,
   EditRounded,
   ManageSearchOutlined,
   SaveAsRounded,
   SaveRounded,
   SearchOutlined,
   StorageRounded,
   TableViewRounded,
   WorkspacesRounded
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'
import { motion } from 'framer-motion'

import { Scrollbar } from 'components/layout'
import { ModalLoader } from 'components/styled'
import { ExportMultipleExcelFiles } from 'components/data-export'
import { ConfirmDialogModal, ConfirmDialogRefProps, SimpleModal, SimpleModalRefProps } from 'components/modal'
import { SpeedDialActionProps, SpeedDialBackdrop } from 'components/speedDial'
import { MySelectItem, MyAutocomplete, MySelect, MyTextField } from 'components/formik'

import { ExtraccionDatosContext, ExtraccionDatosProvider } from 'context/extraccionDatos'

import { useExtraccion, usePais } from 'hooks'

import { Pais, QueryString, WhereClauseControlMigraMod } from 'interfaces'
import { convertJSON, noty, validateSqlSchemaName } from 'helpers'

const MyPaper = styled(Paper)({
   height: '100%'
})

const delayFadeTop: number = 270
const durationFadeTop: number = 500

const ExtraccionDatosSubMod: FC = () => {
   /* ► CONTEXT  */
   const { moduloTmp, camposSeleccionadosTmp } = useContext(ExtraccionDatosContext)

   /* ► HOOK'S  */
   const modalCrearMod = useRef({} as SimpleModalRefProps)
   const modalExtraerDatos = useRef({} as SimpleModalRefProps)

   /* ► CUSTOM - HOOK'S  */
   const {
      loadingBasesDatosDb,
      findAllBasesDatos,
      saveQueryString,
      removeAllExtraccion
   } = useExtraccion()

   /* ► EFFECT'S  */
   useEffect(() => { findAllBasesDatos() }, [])

   /* ► DEP'S  */
   const hasSelectedFieldsTmp = Boolean(Object.values(camposSeleccionadosTmp).filter(v => v !== '').length)

   const speedDialOpt: SpeedDialActionProps[] = [
      {
         name: 'Crear_Modelo',
         icon: <WorkspacesRounded />,
         handleClick: () => {
            if (!hasSelectedFieldsTmp) { noty('error', '¡No hay campos seleccionados!'); return }
            modalCrearMod.current.setOpen(true)
         }
      }, {
         name: 'Extraer_Datos',
         icon: <ManageSearchOutlined />,
         handleClick: () => {
            if (!hasSelectedFieldsTmp) { noty('error', '¡Seleccione los campos a extraer!'); return }
            modalExtraerDatos.current.setOpen(true)
            removeAllExtraccion()
         }
      }
   ]

   return (
      <>
         <Fade>
            <Paper variant='outlined'>
               <Grid container p={0.5} sx={{ height: 'calc(100vh - 115px)' }} flexWrap='nowrap' gap={ 0.5 }>

                  <Grid item xs={ 3 }>
                     <MyPaper>
                        <Scrollbar>
                           <ListaBasesDatos />
                        </Scrollbar>
                     </MyPaper>
                  </Grid>

                  <Grid item xs={ 3 } container gap={ 0.5 }>

                     <Grid item xs={ 12 }>
                        <MyPaper>
                           <Scrollbar>
                              <ListaModulos />
                           </Scrollbar>
                        </MyPaper>
                     </Grid>

                     <Grid item xs={ 12 }>
                        <MyPaper>
                           <Scrollbar>
                              <ListaModelosDetos />
                           </Scrollbar>
                        </MyPaper>
                     </Grid>

                  </Grid>

                  <Grid item xs={ 3 }>
                     <MyPaper>
                        <Scrollbar>
                           <ListaTablas />
                        </Scrollbar>
                     </MyPaper>
                  </Grid>

                  <Grid item xs={ 3 }>
                     <MyPaper>
                        <Scrollbar>
                           <ListaCampos />
                        </Scrollbar>
                     </MyPaper>
                  </Grid>

               </Grid>
            </Paper>
         </Fade>
         {/* ► MODAL: Crear módulo ... */}
         <SimpleModal ref={ modalCrearMod }>
            <Formik
               initialValues={{
                  nombre: ''
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!').min(10, '¡El campo debe contener 10 caracteres como mínimo!')
               })}
               onSubmit={async ({ nombre }: Partial<QueryString>, meta): Promise<void> => {
                  await saveQueryString({
                     idMod: moduloTmp.idMod,
                     queryString: { nombre, queryString: convertJSON(camposSeleccionadosTmp, 'stringify') }
                  })
                  meta.resetForm()
               } }
            >
               {() => (
                  <Form>
                     <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Ingrese nombre de modelo' width={ 25 } focused />
                        <Button type='submit' variant='outlined'>
                           <SaveAsRounded />
                        </Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>

         {/* ► MODAL: Extraer datos ...  */}
         <SimpleModal ref={ modalExtraerDatos }>
            <FrmExtraerDatos />
         </SimpleModal>

         {/* ► SPEED-DIAL ...  */}
         <SpeedDialBackdrop actions={ speedDialOpt } />

         {/* ► MODAL_ Loading ...  */}
         { loadingBasesDatosDb && <ModalLoader /> }
      </>
   )
}

const ListaBasesDatos: FC = () => {
   /* ► CONTEXT'S  */
   const { handleSaveBaseDatosTmp } = useContext(ExtraccionDatosContext)
   /* ► HOOK'S  */
   const [selected, setSelected] = useState(-1)

   /* ► CUSTOM - HOOK'S  */
   const { basesDatosDb } = useExtraccion()

   return (
      <List subheader={ <ListSubheader sx={{ fontWeight: '1000' }}>Bases de Datos</ListSubheader> }>
         {
            basesDatosDb.map((bd, i) => (
               <Fade key={ bd.nombre } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>
                  <ListItem>
                     <ListItemButton
                        selected={ selected === i }
                        onClick={ () => {
                           setSelected(i)
                           handleSaveBaseDatosTmp(bd)
                        } }
                     >
                        <ListItemIcon><StorageRounded fontSize='small' /></ListItemIcon>
                        <ListItemText primary={ <Typography variant='h6'>{ bd.nombre }</Typography> } />
                     </ListItemButton>
                  </ListItem>
               </Fade>
            ))
         }
      </List>
   )
}

const ListaModulos: FC = () => {
   /* ► CONTEXT'S  */
   const { baseDatosTmp, handleSaveModuloTmp } = useContext(ExtraccionDatosContext)
   /* ► HOOK'S  */
   const [selected, setSelected] = useState(-1)

   /* ► CUSTOM - HOOK'S  */

   return (
      <List subheader={ <ListSubheader sx={{ fontWeight: '1000' }}>Módulos</ListSubheader> }>
         {
            baseDatosTmp.modulos?.map((mod, i) => (
               <Fade key={ mod.nombre } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>
                  <ListItem>
                     <ListItemButton
                        selected={ selected === i }
                        onClick={ () => {
                           setSelected(i)
                           handleSaveModuloTmp(mod)
                        } }
                     >
                        <ListItemIcon><WorkspacesRounded fontSize='small' /></ListItemIcon>
                        <ListItemText primary={ <Typography variant='h6'>{ mod.nombre }</Typography> } />
                     </ListItemButton>
                  </ListItem>
               </Fade>
            ))
         }
      </List>

   )
}

const ListaModelosDetos: FC = () => {
   /* ► CONTEXT'S  */
   const { moduloTmp, handleUpdateCamposSeleccionadosTmp } = useContext(ExtraccionDatosContext)

   /* ► HOOK'S  */
   const confirmDeleteDataModel = useRef({} as ConfirmDialogRefProps)
   const modalUpdateQueryString = useRef({} as SimpleModalRefProps)
   const tmpQueryString = useRef({} as QueryString)
   const [acceptDeleteDataModel, setAcceptDeleteDataModel] = useState(false)
   const [selected, setSelected] = useState(-1)

   /* ► CUSTOM - HOOK'S  */
   const { deleteQueryStringById, updateQueryString } = useExtraccion()

   /* ► EFFECT'S  */
   useEffect(() => { /* ► Elimina Modelo de datos ... */
      if (!acceptDeleteDataModel) return
      deleteQueryStringById(tmpQueryString.current.idQStr)
      tmpQueryString.current = {} as QueryString
      setAcceptDeleteDataModel(false)/* ► Cleanup ...  */
   }, [acceptDeleteDataModel])

   useEffect(() => { setSelected(-1) }, [moduloTmp])

   return (
      <>
         <List subheader={ <ListSubheader sx={{ fontWeight: '1000' }}>Modelos de Datos</ListSubheader> }>
            {
               moduloTmp.queryStrings?.map((model, i) => (
                  <Fade key={ model.nombre } top duration={ durationFadeTop } delay={ delayFadeTop * (i + 1) }>
                     <ListItem>
                        <ListItemButton
                           selected={ selected === i }
                           onClick={ () => {
                              setSelected(i)
                              handleUpdateCamposSeleccionadosTmp({ camposCsv: model.queryString }, 'Add-All')
                           } }
                        >
                           <ListItemIcon><BusinessRounded fontSize='small' /></ListItemIcon>
                           <ListItemText primary={ <Typography variant='h6'>{ model.nombre }</Typography> } />
                           <ListItemSecondaryAction>

                              <IconButton
                                 size='small'
                                 onClick={ () => {
                                    tmpQueryString.current = model
                                    modalUpdateQueryString.current.setOpen(true)
                                 }}
                              >
                                 <EditRounded fontSize='small' />
                              </IconButton>

                              <IconButton
                                 size='small'
                                 onClick={ () => {
                                    tmpQueryString.current = model
                                    confirmDeleteDataModel.current.setIsOpen(true)
                                 }}
                              >
                                 <DeleteForeverOutlined fontSize='small' />
                              </IconButton>

                           </ListItemSecondaryAction>
                        </ListItemButton>
                     </ListItem>
                  </Fade>
               ))
            }
         </List>

         {/* ► CONFIRM: Delete Data Model ... */}
         <ConfirmDialogModal
            ref={ confirmDeleteDataModel }
            title={'¿Seguro de continuar?'}
            setIsAccept={ setAcceptDeleteDataModel }
         />

         {/* ► MODAL: Update Data Model ...  */}
         <SimpleModal ref={ modalUpdateQueryString }>
            <Formik
               initialValues={{
                  nombre: tmpQueryString.current.nombre
               }}
               validationSchema={Yup.object({
                  nombre: Yup.string().required('¡Campo requerido!')
               })}
               onSubmit={ async ({ nombre }: Partial<QueryString>, meta): Promise<void> => {
                  updateQueryString({ ...tmpQueryString.current, nombre })
               }}
            >
               {() => (
                  <Form>
                     <Box height={ 45 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                        <MyTextField type='text' name='nombre' label='Nombre Modelo' width={ 20 } focused />
                        <Button type='submit' variant='outlined'><SaveAsRounded /></Button>
                     </Box>
                  </Form>
               )}
            </Formik>
         </SimpleModal>
      </>
   )
}

const ListaTablas: FC = () => {
   /* ► CONTEXT'S  */
   const { moduloTmp, handleSaveTablaTmp } = useContext(ExtraccionDatosContext)
   /* ► HOOK'S  */
   const [selected, setSelected] = useState(-1)

   /* ► EFFECT'S  */
   useEffect(() => { setSelected(-1) }, [moduloTmp])

   /* ► CUSTOM - HOOK'S  */

   return (
      <List subheader={ <ListSubheader sx={{ fontWeight: '1000' }}>Tablas</ListSubheader> }>
         {
            moduloTmp.tablas?.map((tabla, i) => (
               <Fade key={ tabla.idTabla } top duration={ 200 } delay={ 100 * (i + 1) }>
                  <ListItem>
                     <ListItemButton
                        selected={ selected === i }
                        onClick={ () => {
                           setSelected(i)
                           handleSaveTablaTmp(tabla)
                        } }
                     >
                        <ListItemIcon><TableViewRounded fontSize='small' /></ListItemIcon>
                        <ListItemText primary={ <Typography variant='h6'>{ tabla.nombre }</Typography> } />
                     </ListItemButton>
                  </ListItem>
               </Fade>
            ))
         }
      </List>
   )
}

const ListaCampos: FC = () => {
   /* ► CONTEXT'S  */
   const {
      tablaTmp,
      camposTmp,
      camposSeleccionadosTmp,
      handleUpdateCamposSeleccionadosTmp
   } = useContext(ExtraccionDatosContext)

   /* ► HOOK'S  */
   const [selected, setSelected] = useState(-1)

   /* ► CUSTOM - HOOK'S  */

   /* ► EFFECT'S  */
   useEffect(() => { setSelected(-1) }, [tablaTmp])/* » Cleanup ... */

   /* ► HANDLER'S  */
   const handleClickItem = (campo: string) => {
      if (!isSelected(campo)) {
         handleUpdateCamposSeleccionadosTmp({ nombre: tablaTmp.nombre, camposCsv: campo! }, 'Add')
      } else {
         handleUpdateCamposSeleccionadosTmp({ nombre: tablaTmp.nombre, camposCsv: campo! }, 'Delete')
      }
   }

   /* » DEP'S  */
   const isSelected = (campo: string): boolean => {
      if (Object.entries(camposSeleccionadosTmp).length === 0) return false
      if (!camposSeleccionadosTmp[tablaTmp.nombre]) return false
      return camposSeleccionadosTmp[tablaTmp.nombre].includes(campo)
   }

   return (
      <List subheader={ <ListSubheader sx={{ fontWeight: '1000' }}>Campos</ListSubheader> }>
         {
            camposTmp.map((campo, i) => (
               <Fade key={ campo } top duration={ 200 } delay={ 100 * (i + 1) }>
                  <ListItem>
                     <ListItemButton
                        selected={ selected === i }
                        onClick={ () => {
                           setSelected(i)
                           handleClickItem(campo)
                        } }
                     >
                        <ListItemIcon>
                           <Checkbox
                              size='small'
                              checked={ isSelected(campo) }
                           />
                        </ListItemIcon>
                        <ListItemText primary={ <Typography variant='h5'>{ campo }</Typography> } />
                     </ListItemButton>
                  </ListItem>
               </Fade>
            ))
         }
      </List>
   )
}

const optTipoControl: MySelectItem[] = [
   { value: '%', label: '-Todos-' },
   { value: 'E', label: 'Entrada' },
   { value: 'S', label: 'Salida' }
]

const FrmExtraerDatos: FC = () => {
   /* ► CONTEXT ...  */
   const { moduloTmp, camposSeleccionadosTmp } = useContext(ExtraccionDatosContext)

   /* ► HOOK'S  */
   const modalDownloadChunks = useRef({} as SimpleModalRefProps)
   const input = useRef(0)
   const [downloadChunks, setDownloadChunks] = useState(0)

   /* ► CUSTOM-HOOK'S  */
   const { paisDb, findAllPais } = usePais()
   const {
      loadingExtraccion,
      extraccion,
      dynamicJoinStatement,
      convertObjectToFieldsSqlClause
   } = useExtraccion()

   /* ► EFFECT'S ... */
   useEffect(() => { findAllPais() }, [])

   useEffect(() => { /* ► Si hay registros, renderiza modal de descargas ...  */
      if (extraccion.length === 0) return
      modalDownloadChunks.current.setOpen(true)
   }, [extraccion])

   /* ► HANDLER'S  */
   const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => { input.current = parseInt(value) }
   const handleDownload = () => {
      if (input.current <= 0) {
         noty('error', '¡Ingresa un número valido!')
         return
      }
      setDownloadChunks(input.current)
      modalDownloadChunks.current.setOpen(false)/* ► Close modal ... */
   }

   /* ► DEP'S ... */
   const hasExtraccion = Boolean(extraccion.length)

   return (
      <>
         <Formik
            initialValues={{
               fechaFin: '',
               fechaIni: '',
               tipo: '',
               paisNac: {} as Pais,
               nombreTabla: ''
            }}
            validationSchema={Yup.object({
               fechaIni: Yup.date().required('¡Campo requerido!')
                  .max(Yup.ref('fechaFin'), '¡Fecha debe ser anterior a la Fecha Final!'),
               fechaFin: Yup.date().required('¡Campo requerido!')
                  .min(Yup.ref('fechaIni'), '¡Fecha debe ser posterior a la Fecha Inicial!'),
               tipo: Yup.string().required('¡Campo requerido!'),
               paisNac: Yup.object().nullable().required('¡Campo requerido!'),
               nombreTabla: hasExtraccion ? Yup.string().required('¡Nombre de base a extraer requerida!') : Yup.string()
            })}
            onSubmit={ async (values: WhereClauseControlMigraMod, meta): Promise<void> => {
               setDownloadChunks(0)/* ► Cleanup ... */

               const { fechaIni, fechaFin, tipo, paisNac, nombreTabla } = values
               await dynamicJoinStatement({
                  mod: moduloTmp.nombre,
                  fields: convertObjectToFieldsSqlClause(camposSeleccionadosTmp),
                  where: `AND SimMovMigra.dFechaControl BETWEEN '${fechaIni} 00:00:00.000' 
                           AND '${fechaFin} 23:59:59.999' 
                           AND SimMovMigra.sTipo LIKE '${tipo}' 
                           AND SimMovMigra.sIdPaisNacionalidad LIKE '${paisNac?.idPais ?? '%'.replaceAll("'", '')}'`,
                  nameTable: nombreTabla && validateSqlSchemaName(nombreTabla)
               })
            } }
         >
            {(props) => (
               <Form>
                  <Box height={ 50 } display='inline-flex' alignItems='flex-start' gap={ 1 }>
                     <MyTextField type='date' name='fechaIni' label='Fecha Inicio' width={ 14 } focused />
                     <MyTextField type='date' name='fechaFin' label='Fecha Final' width={ 14 } />
                     <MySelect name='tipo' label='Tipo Control' width={ 7 } opt={ optTipoControl } />
                     <MyAutocomplete name='paisNac' label='Nacionalidad' width={ 20 } opt={ paisDb } { ...props } />
                     <Button
                        type='submit'
                        variant='outlined'
                        disabled={ loadingExtraccion }
                     >
                        <SearchOutlined />
                     </Button>
                  </Box>

                  {/* ►  */}
                  {
                     hasExtraccion &&
                     (
                        <>
                           <Divider sx={{ my: 2 }} />
                           <Stack
                              direction='row'
                              divider={ <Divider orientation='vertical' flexItem /> }
                              spacing={ 1 }
                              alignItems='flex-start'
                           >
                              <MyTextField type='text' name='nombreTabla' label='Nombre de base a extraer' width={ 30 } focused />
                              <Button
                                 type='submit'
                                 variant='outlined'
                                 disabled={ loadingExtraccion }
                              >
                                 <SaveRounded />
                              </Button>
                           </Stack>
                        </>
                     )
                  }
               </Form>
            )}
         </Formik>

         {/* ► MODAL: Download file chunk's  */}
         <SimpleModal ref={ modalDownloadChunks }>
            <>
               <Stack
                  width={ 450 }
                  direction='row'
                  divider={ <Divider orientation='vertical' flexItem /> }
                  justifyContent='space-between'
               >
                  <Stack direction='row' spacing={ 2 } alignItems='center'>
                     <Typography variant='h5'>Registros encontrados:</Typography>
                     <Typography variant='h4'>
                        { new Intl.NumberFormat().format(extraccion.length) }
                     </Typography>
                  </Stack>
                  <Stack direction='row' spacing={ 3 }>
                     <TextField
                        type='number'
                        label='Particiones'
                        variant='standard'
                        focused
                        sx={{ width: 100 }}
                        onChange={ handleInputChange }
                     />
                     <Button
                        variant='outlined'
                        onClick={ handleDownload }
                     >
                        <Download />
                     </Button>
                  </Stack>
               </Stack>
            </>
         </SimpleModal>

         {/* ► COMPONENT: Download file chunk's  */}
         { downloadChunks > 0 && (
            <motion.div
               style={{ marginTop: 15, display: 'flex', flexWrap: 'wrap', gap: 10 }}
               initial='hidden'
               animate='visible'
               variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                     opacity: 1,
                     scale: 1,
                     transition: {
                        delayChildren: 0.3,
                        staggerChildren: 0.2
                     }
                  }
               }}
            >
               <ExportMultipleExcelFiles data={ extraccion } numberPartitions={ downloadChunks } />
            </motion.div>
         )}

         {/* ► MODAL: Loading ...  */}
         { loadingExtraccion && <ModalLoader /> }

      </>
   )
}

export default function Default () {
   return (
      <ExtraccionDatosProvider>
         <ExtraccionDatosSubMod />
      </ExtraccionDatosProvider>
   )
}
