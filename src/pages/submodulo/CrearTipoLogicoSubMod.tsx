import { FC, useRef, useEffect, useMemo, useState } from 'react'

import {
   Box,
   Button,
   Divider,
   Grid,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemSecondaryAction,
   ListItemText,
   ListSubheader,
   Paper,
   Stack,
   Typography
} from '@mui/material'
import {
   AbcRounded,
   AddCircleRounded,
   DeleteForeverRounded,
   ModeEditRounded,
   SaveAsRounded
} from '@mui/icons-material'
import { styled } from '@mui/styles'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Fade from 'react-reveal/Fade'

import { Body, ListItemFade, ModalLoader, MyTextField, SimpleModal, SimpleModalRefProps } from 'components'

import { CrearTipoLogicoProvider, useCrearTipoLogicoContext } from 'context'
import { messages, regex } from 'constants/'
import { useTipoLogico } from 'hooks/useTipoLogico'

const CrearTipoLogicoSubMod: FC = () => {
   // ► CUSTOM - HOOK'S ...
   const { loadingTipoLogicoDb, findAllTipoLogico, handleSaveTipoLogico } = useTipoLogico()

   // ► EFFECT'S ...
   useEffect(() => { findAllTipoLogico() }, [])

   return (
      <>
         <Fade>
            <Body>
               <Grid container>
                  {/* ► HEADER: Nuevo tipo lógico ...  */}
                  <Grid item container xl={ 12 } justifyContent='center' alignItems='flex-start'>
                     <Fade top>
                        <FrmSaveTipoLogico handleSubmit={async (valor: string): Promise<void> => {
                           await handleSaveTipoLogico({ nombre: valor })
                        } } />
                     </Fade>
                  </Grid>

                  {/* ► BODY: ...  */}
                  <Grid item container xl={ 12 } justifyContent='center'>
                     <Box display='flex' gap={ 1 }>
                        <ListTipoLogicos />
                        <ListValoresTipoLogico />
                     </Box>
                  </Grid>
               </Grid>

            </Body>
         </Fade>

         {/* ► MODAL: Loader ...  */}
         { loadingTipoLogicoDb && <ModalLoader /> }
      </>
   )
}

const ListTipoLogicoPaper = styled(Paper)({
   marginTop: '1rem',
   height: '65vh',
   overflowY: 'auto'
})

const ListTipoLogicos: FC = () => {
   // ► CONTEXT ...
   const { tipoLogicoTmp, handleActionTipoLogicoTmp } = useCrearTipoLogicoContext()

   // ► CUSTOM - HOOK'S ...
   const modalAddSubTipoLogico = useRef({} as SimpleModalRefProps)
   const modalUpdateTipoLogico = useRef({} as SimpleModalRefProps)
   const [selected, setSelected] = useState(-1)
   const refNombreTipoLogico = useRef<string>('')

   // ► CUSTOM - HOOK'S ...
   const {
      tipoLogicoDbCurrentGrupoAuth,
      handleSaveTipoLogico,
      appendValoresLsv,
      deleteTipoLogicoById
   } = useTipoLogico()

   return (
      <>
         {/* ► ...  */}
         <ListTipoLogicoPaper variant='outlined' sx={{ width: 400 }}>
            <List
               subheader={ <ListSubheader>Tipos Lógicos</ListSubheader> }
            >
               {
                  tipoLogicoDbCurrentGrupoAuth.map((tipoLogico, i) => (
                     <ListItemFade key={ tipoLogico.idTipo } i={ i } direction={ 'top' }>
                        <ListItemButton
                           key={ tipoLogico.idTipo }
                           selected={ selected === i }
                        >
                           <ListItemIcon><AbcRounded /></ListItemIcon>
                           <ListItemText
                              primary={ <Typography variant='h5'>{ tipoLogico.nombre }</Typography> }
                              onClick={ () => {
                                 setSelected(i)
                                 handleActionTipoLogicoTmp('SAVE', tipoLogico)
                              } }
                           />

                           {/* ► Actions ...  */}
                           <ListItemSecondaryAction>
                              {/* ► Add valor lógico ... */}
                              <IconButton
                                 onClick={ () => {
                                    setSelected(i)
                                    handleActionTipoLogicoTmp('SAVE', tipoLogico)
                                    modalAddSubTipoLogico.current.setOpen(true)
                                 } }
                              >
                                 <AddCircleRounded />
                              </IconButton>

                              {/* ► Update nombre tipo lógico ... */}
                              <IconButton
                                 onClick={ () => {
                                    refNombreTipoLogico.current = tipoLogico.nombre
                                    setSelected(i)
                                    handleActionTipoLogicoTmp('SAVE', tipoLogico)
                                    modalUpdateTipoLogico.current.setOpen(true)
                                 } }
                              >
                                 <ModeEditRounded />
                              </IconButton>

                              {/* ► Delete tipo lógico ... */}
                              <IconButton
                                 onClick={ () => {
                                    setSelected(i)
                                    deleteTipoLogicoById(tipoLogico.idTipo)
                                 } }
                              >
                                 <DeleteForeverRounded />
                              </IconButton>
                           </ListItemSecondaryAction>

                        </ListItemButton>
                     </ListItemFade>
                  ))
               }
            </List>

         </ListTipoLogicoPaper>

         {/* ► MODAL: Crear valor lógico ...  */}
         <SimpleModal ref={ modalAddSubTipoLogico }>
            <FrmSaveTipoLogico handleSubmit={ async (valor: string): Promise<void> => {
               await handleSaveTipoLogico({
                  ...tipoLogicoTmp,
                  valoresCsv: appendValoresLsv(tipoLogicoTmp.valoresCsv, valor)
               })
            }}
            />
         </SimpleModal>

         {/* ► MODAL: Actualizar nombre tipo lógico ...  */}
         <SimpleModal ref={ modalUpdateTipoLogico }>
            <FrmSaveTipoLogico
               valor={ refNombreTipoLogico.current }
               handleSubmit={ async (valor: string): Promise<void> => {
                  await handleSaveTipoLogico({
                     ...tipoLogicoTmp,
                     nombre: valor
                  })
               }}
            />
         </SimpleModal>
      </>
   )
}

const ListValoresTipoLogico: FC = () => {
   // ► CONTEXT ...
   const { tipoLogicoTmp } = useCrearTipoLogicoContext()

   // ► HOOK'S ...
   const modalUpdateValorTipoLogico = useRef({} as SimpleModalRefProps)
   const refValuesLsv = useRef<string>('')
   const [oldValue, setOldValue] = useState<string>('')

   // ► CUSTOM - HOOK'S ...
   const {
      handleSaveTipoLogico,
      parseValoresLsvToArr,
      spliceValoresLsvArr
   } = useTipoLogico()

   // ► EFFECT'S ...

   // ► DEP'S ...
   const values = useMemo(() => parseValoresLsvToArr(tipoLogicoTmp.valoresCsv), [tipoLogicoTmp])

   return (
      <>
         {/* ► ...  */}
         <ListTipoLogicoPaper variant='outlined' sx={{ width: '52vw' }}>
            <List
               subheader={ <ListSubheader>Valores Lógicos</ListSubheader> }
            >
               {
                  values.map((value, i) => (
                     <ListItemFade key={ value } i={ i } direction={ 'top' }>
                        <ListItemButton key={ value }>
                           <ListItemText
                              primary={ <Typography variant='h5'>{ `${i + 1}► ${value}` }</Typography> }
                              onClick={ () => { } }
                           />

                           {/* ► Actions ...  */}
                           <ListItemSecondaryAction>

                              {/* ► Editar ... */}
                              <IconButton
                                 onClick={ () => {
                                    setOldValue(value)
                                    modalUpdateValorTipoLogico.current.setOpen(true)
                                 } }
                              >
                                 <ModeEditRounded />
                              </IconButton>

                              {/* ► Eliminar ... */}
                              <IconButton
                                 onClick={ () => {
                                    refValuesLsv.current = spliceValoresLsvArr('REMOVE', values, value)
                                    handleSaveTipoLogico({ ...tipoLogicoTmp, valoresCsv: refValuesLsv.current })
                                 } }
                              >
                                 <DeleteForeverRounded />
                              </IconButton>
                           </ListItemSecondaryAction>

                        </ListItemButton>
                     </ListItemFade>
                  ))
               }
            </List>

         </ListTipoLogicoPaper>

         {/* ► MODAL: Editar valores lógicos ... */}
         <SimpleModal ref={ modalUpdateValorTipoLogico }>
            <FrmSaveTipoLogico
               valor={ oldValue }
               handleSubmit={async (valor: string): Promise<void> => {
                  await handleSaveTipoLogico({
                     ...tipoLogicoTmp,
                     valoresCsv: spliceValoresLsvArr('UPDATE', values, oldValue, valor)
                  })
               }}
            />
         </SimpleModal>
      </>
   )
}

type FrmSaveValorTipoLogicoProps = {
   handleSubmit: (valor: string) => Promise<void>
   valor?: string
}

const FrmSaveTipoLogico: FC<FrmSaveValorTipoLogicoProps> = ({ handleSubmit, valor }) => {
   // ► CONTEXT ...
   // ► CUSTOM - HOOK'S ...

   return (
      <Formik
         initialValues={{
            valor: valor ?? ''
         }}
         validationSchema={ Yup.object({
            valor: Yup.string()
               .required('¡Valor de tipo requerido!')
               .matches(regex.INPUT_CREATE_VALOR_TIPO_LOGICO_REGEX, messages.INPUT_CREATE_VALOR_TIPO_LOGICO_VALIDATION)
         })}
         onSubmit={ async ({ valor }: { valor: string }, meta): Promise<void> => {
            await handleSubmit(valor)
            meta.setValues({ valor: '' })
         }}>
         {() => (
            <Form>
               <Stack
                  height={ 55 }
                  direction='row'
                  alignItems='flex-start'
                  spacing={ 1 }
                  divider={<Divider orientation='vertical' flexItem />}
               >
                  <MyTextField type='text' name='valor' label='Nuevo valor lógico' width={ 40 } focused />
                  <Button type='submit' variant='outlined'><SaveAsRounded /></Button>
               </Stack>
            </Form>
         )}
      </Formik>
   )
}

export default function Default () {
   return <CrearTipoLogicoProvider>
      <CrearTipoLogicoSubMod />
   </CrearTipoLogicoProvider>
}
