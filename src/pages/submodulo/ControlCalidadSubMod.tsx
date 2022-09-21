import { FC, useEffect, useState } from 'react'

import {
   Divider,
   Grid,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   ListSubheader,
   Paper,
   Typography,
   Stack,
   Button,
   Box,
   ListItemSecondaryAction,
   IconButton
} from '@mui/material'
import { DeleteForeverRounded, Forward10Rounded, HistoryToggleOffRounded, PersonOutlineRounded, PlaylistAddCheckCircleRounded, SearchRounded } from '@mui/icons-material'
import { styled } from '@mui/styles'
import { Form, Formik } from 'formik'
import { format, parseISO } from 'date-fns'

import { ControlCalidadProvider, useControlCalidadContext } from 'context'

import { BandejaProcesos, ListItemFade, ModalLoader, MySelect, MySelectItem, MyTextField, Scrollbar, StandarTooltip } from 'components'

import { useAuth, useControlCalidad } from 'hooks'
import { applyCommaThousands } from 'helpers'
import { AsigGrupoCamposAnalisis } from 'interfaces'

const MainPaper = styled(Paper)({
   height: '100%'
})

const ControlCalidadSubMod: FC = () => {
   /* ► CUSTOM-HOOK'S ... */
   const {
      findAllTablaDinamica,
      loadingTablaDinamicaDb,
      loadingControlCalidadDb
   } = useControlCalidad()
   const { findAllUser, authLoading } = useAuth()

   /* ► EFFECT'S ... */
   useEffect(() => { findAllTablaDinamica() }, [])
   useEffect(() => { findAllUser() }, [])

   return (
      <>
         <BandejaProcesos>

            {/* ► Lista: Tablas Dinámicas ... */}
            <Grid item xs={ 3 }>
               <MainPaper variant='outlined'>
                  <Scrollbar height={ 70 }>
                     <ListaUsuarios />
                  </Scrollbar>
               </MainPaper>
            </Grid>

            <Grid item xs={ 5 }>
               <MainPaper variant='outlined'>
                  <Scrollbar height={ 70 }>
                     <ListaAsignaciones />
                  </Scrollbar>
               </MainPaper>
            </Grid>

            <Grid item xs={ 4 }>
               <MainPaper variant='outlined'>
                  <Scrollbar height={ 80 }>
                     <ListaControlCalidad />
                  </Scrollbar>
               </MainPaper>
            </Grid>
         </BandejaProcesos>

         {/* » MODAL: Loading ...  */}
         { loadingControlCalidadDb && <ModalLoader /> }
         { loadingTablaDinamicaDb && <ModalLoader /> }
         { authLoading && <ModalLoader /> }
      </>
   )
}

const ListaUsuarios: FC = () => {
   /* ► CONTEXT-HOOK'S ... */
   const { handleActionAsigsGrupoCamposAnalisisTmp } = useControlCalidadContext()

   /* ► HOOK'S ... */
   const [selectedItem, setSelectedItem] = useState(-1)

   /* ► CUSTOM-HOOK'S ... */
   const { userscurrentGroupDb } = useAuth()

   /* ► EFFECT'S ... */

   return (
      <List
         subheader={ <ListSubheader>Servidores</ListSubheader> }
      >
         {
            userscurrentGroupDb.map((usrAnalista, i) => (
               <ListItemFade key={ usrAnalista.idUsuario } i={ i } direction='top'>
                  <ListItemButton
                     selected={ selectedItem === i }
                     onClick={ () => {
                        setSelectedItem(i)
                        handleActionAsigsGrupoCamposAnalisisTmp('SAVE', usrAnalista)
                     } }
                  >
                     <ListItemIcon><PersonOutlineRounded /></ListItemIcon>
                     <ListItemText primary={
                        <Typography variant='h5'>{ `${i + 1}► ${usrAnalista.nombres}` }</Typography>
                     } />
                  </ListItemButton>
               </ListItemFade>
            ))
         }
      </List>
   )
}

const ListaAsignaciones: FC = () => {
   /* ► CONTEXT-HOOK'S ... */
   const {
      filteredAsigsGrupoCamposAnalisisTmp,
      handleActionAsigGrupoCamposAnalisisTmp,
      handleActionCtrlsCalCamposAnalisis
   } = useControlCalidadContext()

   /* ► HOOK'S ... */
   const [selectedItem, setSelectedItem] = useState(-1)

   /* ► CUSTOM-HOOK'S ... */
   const {
      saveCtrlCalCamposAnalisis,
      findAllTablaDinamica
   } = useControlCalidad()

   /* ► EFFECT'S ... */
   useEffect(() => { // ► Clean-up: When `filteredAsigsGrupoCamposAnalisisTmp` change, selectItem is updated ...
      if (filteredAsigsGrupoCamposAnalisisTmp.length === 0) setSelectedItem(-1)
   }, [filteredAsigsGrupoCamposAnalisisTmp])

   /* ► HANDLER'S ... */
   const handleGenerateRecordsToCtrlCal = async (idAsigGrupo: number): Promise<void> => {
      await saveCtrlCalCamposAnalisis(idAsigGrupo)
      findAllTablaDinamica()
   }

   return (
      <>
         { /* ► Aside - Filter ... */ }
         <FrmFilterListaAsignaciones />

         { /* ► ... */ }
         <List
            subheader={ <ListSubheader>Asignaciones para Control de Calidad</ListSubheader> }
         >
            {
               filteredAsigsGrupoCamposAnalisisTmp.map((asig, i) => (
                  <ListItemFade key={ asig.idAsigGrupo } i={ i } direction='top'>
                     <ListItemButton
                        selected={ selectedItem === i }
                        onClick={ () => {
                           setSelectedItem(i)
                           handleActionAsigGrupoCamposAnalisisTmp('SAVE', asig)
                           handleActionCtrlsCalCamposAnalisis('SAVE', asig.ctrlsCalCamposAnalisis)
                        } }
                     >
                        <ListItemText primary={
                           <Stack
                              direction='row'
                              gap={ 1 }
                              divider={ <Divider orientation='vertical' flexItem /> }
                           >
                              <Typography variant='h5'>
                                 { format(parseISO(asig.fechaAsignacion), 'dd-MM-yyyy') }
                              </Typography>
                              <Typography variant='h5'>
                                 { `${applyCommaThousands(asig.regAnalisisIni)} - ${applyCommaThousands(asig.regAnalisisFin)}` }
                              </Typography>
                              <Typography variant='h5'>
                                 { applyCommaThousands(asig.totalAsignados) }
                              </Typography>
                           </Stack>
                        } />

                        {/* ► Action's ...  */}
                        <ListItemSecondaryAction>
                           <StandarTooltip title='Generar registros, para Control Calidad'>
                              <IconButton
                                 size='small'
                                 onClick={ () => handleGenerateRecordsToCtrlCal(asig.idAsigGrupo) }
                              >
                                 <Forward10Rounded />
                              </IconButton>
                           </StandarTooltip>
                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>
      </>
   )
}

const optCtrlCal: MySelectItem[] = [
   { label: 'Conforme', value: 1 },
   { label: 'No nonforme', value: 0 }
]

const FrmFilterListaAsignaciones: FC = () => {
   /* ► CONTEXT ... */
   const {
      handleActionFilteredAsigsGrupoCamposAnalisisTmp,
      handleActionFilterListAsigsTmp
   } = useControlCalidadContext()

   return (
      <Formik
         initialValues={{
            fechaAsignacion: '',
            ctrlCalConforme: ''
         }}
         onSubmit={ (values: { fechaAsignacion: string, ctrlCalConforme: any }, meta): void => {
            handleActionFilterListAsigsTmp('SAVE', values as Pick<AsigGrupoCamposAnalisis, 'fechaAsignacion' | 'ctrlCalConforme'>)
            handleActionFilteredAsigsGrupoCamposAnalisisTmp('SAVE', values)
         } }
         onReset={() => {
            handleActionFilterListAsigsTmp('RESET')
         }}
      >
         {() => (
            <Form>
               <Stack
                  m={ 1.5 }
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  divider={ <Divider orientation='vertical' flexItem /> }
               >
                  <MyTextField type='date' name='fechaAsignacion' label='Fecha asignación' width={ 8 } focused />
                  <MySelect name='ctrlCalConforme' label='Estado' width={ 8 } opt={ optCtrlCal } />
                  <Box display='flex' flexDirection='column' gap={ 0.5 }>
                     <Button size='small' type='submit' variant='contained'>
                        <SearchRounded fontSize='small' />
                     </Button>
                     <Button size='small' type='reset' variant='outlined' color='warning'>
                        <DeleteForeverRounded fontSize='small' />
                     </Button>
                  </Box>
               </Stack>
            </Form>
         )}
      </Formik>
   )
}

const ListaControlCalidad: FC = () => {
   /* ► CONTEXT-HOOK'S ... */
   const { asigGrupoCamposAnalisisTmp } = useControlCalidadContext()

   /* ► HOOK'S ... */
   const [selectedItem, setSelectedItem] = useState(-1)

   /* ► CUSTOM-HOOK'S ... */
   /* ► EFFECT'S ... */
   /* ► HANDLER'S ... */

   return (
      <>
         { /* ► ... */ }
         <List
            subheader={ <ListSubheader>Asignaciones para Control de Calidad</ListSubheader> }
         >
            {
               asigGrupoCamposAnalisisTmp.ctrlsCalCamposAnalisis?.map((ctrlCal, i) => (
                  <ListItemFade key={ ctrlCal.idCtrlCal } i={ i } direction='top'>
                     <ListItemButton
                        selected={ selectedItem === i }
                        onClick={ () => { setSelectedItem(i) } }
                     >
                        <ListItemIcon>
                           { ctrlCal.completo ? <PlaylistAddCheckCircleRounded /> : <HistoryToggleOffRounded /> }
                        </ListItemIcon>
                        <ListItemText primary={
                           <Stack
                              direction='row'
                              gap={ 1 }
                              divider={ <Divider orientation='vertical' flexItem /> }
                           >
                              <Typography variant='h5'>
                                 { format(parseISO(ctrlCal.fechaRegistro), 'dd-MM-yyyy') }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Revisados: ${applyCommaThousands(ctrlCal.totalRevisados)}` }
                              </Typography>
                              <Typography variant='h5'>
                                 { `Registros: ${applyCommaThousands(ctrlCal.totalRegistros)}` }
                              </Typography>
                           </Stack>
                        } />

                        {/* ► Action's ...  */}
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                     </ListItemButton>
                  </ListItemFade>
               ))
            }
         </List>
      </>
   )
}

export default function Default () {
   return (
      <ControlCalidadProvider>
         <ControlCalidadSubMod />
      </ControlCalidadProvider>
   )
}
