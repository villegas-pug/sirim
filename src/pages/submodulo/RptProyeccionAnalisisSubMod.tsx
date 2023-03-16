import { FC, useEffect, useMemo, useRef } from 'react'

import {
   Button,
   Divider,
   Grid,
   Stack,
   Step,
   StepContent,
   StepLabel,
   Stepper,
   Typography
} from '@mui/material'
import { FilterAltRounded, QueryStatsRounded } from '@mui/icons-material'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Body, LinearWithValueLabel, ModalLoader, MySelect, MySelectItem, SimpleModal, SimpleModalRefProps, SpeedDialActionProps, SpeedDialBackdrop } from 'components'
import { useReportes } from 'hooks'
import { RptProyeccionAnalisis } from 'interfaces'
import { applyCommaThousands, getMonthName } from 'helpers'

const RptProyeccionAnalisisSubMod: FC = () => {
   // » Hook's ...
   const modalFiltrar = useRef({} as SimpleModalRefProps)

   // » Custom hook's ...
   const { rptProyeccionAnalisisDb, loadingReportesDb, getRptProyeccionAnalisis } = useReportes()

   // » Effect's ...
   useEffect(() => { getRptProyeccionAnalisis(new Date().getFullYear()) }, [])

   /* » Dep's ... */
   const speedDialActions: SpeedDialActionProps[] = [
      {
         name: 'Filtrar',
         icon: <FilterAltRounded />,
         handleClick: () => { modalFiltrar.current.setOpen(true) }
      }
   ]
   const rptProyeccionAnalisis = useMemo(() => rptProyeccionAnalisisDb.filter(({ grupo }) => grupo === 'ANALISIS'), [rptProyeccionAnalisisDb])
   const rptProyeccionDepuracion = useMemo(() => rptProyeccionAnalisisDb.filter(({ grupo }) => grupo === 'DEPURACION'), [rptProyeccionAnalisisDb])

   return (
      <>
         <Body>
            <Fade>

               <Grid container>

                  {/* » Análisis de Información de personas nacionales y extranjeras  */}
                  <ProyeccionAnalisis
                     title='ANÁLISIS DE PERSONAS NACIONALES Y EXTRANJERAS'
                     rptProyeccionAnalisis={ rptProyeccionAnalisis }
                  />

                  {/* » Depuración y consistencia de datos */}
                  <ProyeccionAnalisis
                     title='DEPURACIÓN Y CONSISTENCIA DE DATOS'
                     rptProyeccionAnalisis={ rptProyeccionDepuracion }
                  />

               </Grid>
            </Fade>
         </Body>

         {/* » Speed-Dial ... */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* » Modal: ...  */}
         <SimpleModal ref={ modalFiltrar }>
            <FrmFiltroProyeccionAnalisis />
         </SimpleModal>

         {/* » Modal: Loading ...  */}
         { loadingReportesDb && <ModalLoader /> }
      </>
   )
}

const ProyeccionAnalisis: FC<{ title: string, rptProyeccionAnalisis: RptProyeccionAnalisis[] }> = ({ title, rptProyeccionAnalisis }) => {
   // Custom hook's ...
   const { loadingReportesDb } = useReportes()

   return (

      <Grid item py={ 1 } px={ 4 } xs={ 6 } >

         <Typography color='GrayText' variant='h4' sx={{ mb: 1 }} >{ `░ ${title}` }</Typography>
         <Zoom when={ !loadingReportesDb } big>
            <Stepper orientation="vertical" sx={{ height: '71vh', overflow: 'auto' }}>
               {
                  rptProyeccionAnalisis.map(({ año, mes, analizados, proyeccion }) => (
                     <Step active key={ mes }>
                        <StepLabel>
                           <Typography color='lightskyblue' variant='h4'>{ `${getMonthName(mes)}-${año}` }</Typography>
                        </StepLabel>
                        <StepContent>
                           <Stack direction='row' spacing={ 2 } divider={ <Divider orientation='vertical' flexItem /> }>
                              <Typography variant='h5'>Analizados: { applyCommaThousands(analizados) }</Typography>
                              <Typography variant='h5'>Proyección: { applyCommaThousands(proyeccion) }</Typography>
                              <LinearWithValueLabel progress={ (analizados / proyeccion) * 100 } width={ 200 } />
                           </Stack>
                        </StepContent>
                     </Step>
                  ))
               }
            </Stepper>
         </Zoom>

      </Grid>

   )
}

const optSelectItemAño: MySelectItem[] = [
   { value: 2022, label: '2022' },
   { value: 2023, label: '2023' }
]

const FrmFiltroProyeccionAnalisis: FC = () => {
   // » Custom hook's ...
   const { loadingReportesDb, getRptProyeccionAnalisis } = useReportes()

   return (
      <Formik
         initialValues={{
            año: ''
         }}
         validationSchema={Yup.object({
            año: Yup.string().required('¡Año requerido!')
         })}
         onSubmit={ async (values: { año: string }, meta): Promise<void> => {
            await getRptProyeccionAnalisis(+values.año)
            meta.setValues({ año: '' })
         } }>
         {() => (
            <Form>
               <Stack
                  direction='row'
                  gap={ 2 }
                  alignItems='flex-start'
                  divider={ <Divider orientation='vertical' flexItem /> }
               >
                  <MySelect name={'año'} label={'Año'} width={ 8 } opt={ optSelectItemAño } muiProps={{ autoFocus: true }} />
                  <Button
                     type='submit'
                     variant='outlined'
                     color='primary'
                     size='medium'
                     disabled={ loadingReportesDb }
                  >
                     <QueryStatsRounded />
                  </Button>
               </Stack>
            </Form>
         )}
      </Formik>
   )
}

export default RptProyeccionAnalisisSubMod
