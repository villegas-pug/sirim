import { FC, useEffect, useMemo } from 'react'

import { Box, Button, DialogActions, Paper, Typography } from '@mui/material'
import { Scheduler } from '@aldabil/react-scheduler'
import { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/dist/types'
import { MyTextField } from 'components/formik'
import { Form, Formik, FormikConfig } from 'formik'
import * as Yup from 'yup'
import { es } from 'date-fns/locale'
import { format } from 'date-fns'

import { Event } from 'interfaces'
import { useEvento } from 'hooks'
import { removeFlagTFromDateTimeStr } from 'helpers'

export const SimpleScheduler = () => {
   // ► CUSTOM - HOOK'S ...
   const {
      processedEventsUserAuth,
      findEventoByUsuario,
      saveEvento,
      deleteEventoById,
      assignProcessEventToEvent
   } = useEvento()

   // ► EFFECT'S ...
   useEffect(() => { findEventoByUsuario() }, [])

   return (
      <Paper sx={{ height: '82vh', overflow: 'auto' }}>
         <Scheduler
            view='week'
            events={ processedEventsUserAuth }
            month={ null }
            day={ null }
            week={{
               weekStartOn: 1,
               weekDays: [0, 1, 2, 3, 4],
               startHour: 8,
               endHour: 17,
               step: 60
            }}
            selectedDate={new Date()}
            locale={ es }
            loading={ false }
            onDelete={ async (id: string) => {
               await deleteEventoById(parseInt(id))
               findEventoByUsuario()
            }}
            onEventDrop={async (droppedOn: Date, updatedEvent: ProcessedEvent, originalEvent: ProcessedEvent) => {
               await saveEvento(assignProcessEventToEvent(updatedEvent))
               findEventoByUsuario()
            }}
            customEditor={(scheduler: SchedulerHelpers) => <ModalSaveEvent scheduler={ scheduler } />}
         />
      </Paper>
   )
}

const ModalSaveEvent: FC<{ scheduler: SchedulerHelpers }> = ({ scheduler }) => {
   // ► CUSTOM - HOOK'S ...
   const { saveEvento, findEventoByUsuario } = useEvento()

   // ► Dep's ...
   const formikProps = useMemo<FormikConfig<Partial<Event>>>(() => ({
      initialValues: {
         title: scheduler.state.title.value || '',
         start: format(scheduler.state.start.value, 'yyyy-MM-dd HH:mm') || '',
         end: format(scheduler.state.end.value, 'yyyy-MM-dd HH:mm') || ''
      },
      validationSchema: Yup.object({
         title: Yup.string().required('¡Campo requerido!')
      }),
      onSubmit: async (values, meta): Promise<void> => {
         await saveEvento({
            ...values,
            start: removeFlagTFromDateTimeStr(values.start!),
            end: removeFlagTFromDateTimeStr(values.end!),
            event_id: scheduler.state.event_id.value || ''
         })
         findEventoByUsuario()
      }
   }), [scheduler])

   return (
      <>
         <Typography variant='h3' color='GrayText' gutterBottom sx={{ m: 2 }} >Registrar Evento</Typography>
         <Formik { ...formikProps }>
            {
               <Form>
                  <Box
                     p={ 2 }
                     display='flex'
                     flexDirection='column'
                     gap={ 2 }
                  >
                     <MyTextField type='text' name='title' label='Evento' width={ 40 } focused />
                     <Box
                        display='flex'
                        justifyContent='space-between'
                     >
                        <MyTextField type='datetime-local' name='start' label='Fecha y hora inicio' width={ 16 } />
                        <MyTextField type='datetime-local' name='end' label='Fecha y hora fin' width={ 16 } />
                     </Box>
                     <DialogActions>
                        <Button type='submit'>Confirmar</Button>
                        <Button
                           onClick={ scheduler.close }
                        >
                           Cerrar
                        </Button>
                     </DialogActions>
                  </Box>
               </Form>
            }
         </Formik>
      </>
   )
}
