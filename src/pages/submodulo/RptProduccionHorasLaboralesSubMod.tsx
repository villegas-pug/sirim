import { FC, useEffect, useMemo } from 'react'

import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import {
   Body,
   HorizontalChart,
   ListItemFade,
   ModalLoader,
   MySelect,
   MyTextField
} from 'components'

import { useProduccionAnalisis } from 'hooks'
import { ManageSearchRounded } from '@mui/icons-material'
import { grupo } from 'db'
import { format } from 'date-fns'
import Fade from 'react-reveal/Fade'

export const RptProduccionHorasLaboralesSubMod = () => {
   // ► CUSTOM - HOOK'S ...
   const {
      loadingRptProduccionHoraLaboralDb,
      getRptProduccionHorasLaboralesPorAnalista
   } = useProduccionAnalisis()

   useEffect(() => {
      getRptProduccionHorasLaboralesPorAnalista(format(new Date(), 'yyyy-MM-dd'), '%')
   }, [])

   return (

      <>
         <Body>
            <Fade top>
               <HeaderProduccionHorasLaborales />
            </Fade>

            <ChartsProduccionHorasLaborales />

         </Body>

         {/* ► Modal: Loader ...  */}
         { loadingRptProduccionHoraLaboralDb && <ModalLoader /> }
      </>
   )
}

const HeaderProduccionHorasLaborales: FC = () => {
   // ► CUSTOM - HOOK'S ...
   const { getRptProduccionHorasLaboralesPorAnalista } = useProduccionAnalisis()

   // ► Dep's ...
   const formikProps = useMemo(() => ({
      initialValues: {
         fechaAnalisis: format(new Date(), 'yyyy-MM-dd'),
         grupo: '%'
      },
      validationSchema: Yup.object({
         fechaAnalisis: Yup.string().required('¡Campo requerido!'),
         grupo: Yup.string().required('¡Campo requerido!')
      }),
      onSubmit: async (values: { fechaAnalisis: string, grupo: string }): Promise<void> => {
         getRptProduccionHorasLaboralesPorAnalista(values.fechaAnalisis, values.grupo)
      }
   }), [])

   return (
      <>
         <Typography variant='h4' color='GrayText' gutterBottom sx={{ mb: 2 }} >Opciones de busqueda</Typography>
         <Formik { ...formikProps }>
            {
               <Form>
                  <Stack
                     mb={ 1 }
                     direction='row'
                     gap={ 1 }
                     alignItems='flex-start'
                     divider={ <Divider orientation='vertical' flexItem /> }
                  >
                     <MyTextField type='date' name='fechaAnalisis' label='Fecha de analisis' width={ 15 } focused />
                     <MySelect name='grupo' label='Grupo' width={ 15 } opt={ grupo } />
                     <Button
                        type='submit'
                        variant='outlined'
                     >
                        <ManageSearchRounded />
                     </Button>
                  </Stack>
               </Form>
            }
         </Formik>
      </>
   )
}

const ChartsProduccionHorasLaborales: FC = () => {
   // ► CUSTOM - HOOK'S ...
   const {
      multiplesRptProduccionHoraLaboralDb
   } = useProduccionAnalisis()
   return (
      <Box
         display='flex'
         flexWrap='wrap'
         justifyContent='space-between'
      >
         {
            multiplesRptProduccionHoraLaboralDb.map((multiple, i) => (
               <ListItemFade key={ i } i={ i } direction={ 'bottom' }>
                  <HorizontalChart
                     key={ i }
                     w={ 500 }
                     h={ 300 }
                     data={ multiple }
                     colorBar={'#0CDEBB'}
                     xAxisDataKey='horaAnalisis'
                     barDataKey='totalAnalizados'
                     titleXAxis={ multiple[i]?.nombres }
                     showTooltip
                  />
               </ListItemFade>
            ))
         }

      </Box>
   )
}

export default RptProduccionHorasLaboralesSubMod
