import { useRef, useMemo, useState, FC } from 'react'
import {
   Paper,
   Box,
   Tooltip,
   IconButton,
   Typography,
   Button
} from '@mui/material'
import {
   DeleteSweepRounded,
   ReadMoreRounded, SearchRounded
} from '@mui/icons-material'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { Formik, Form, FormikConfig } from 'formik'
import * as Yup from 'yup'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import {
   FichaInterpolDetalle,
   ModalLoader,
   MyTextField,
   SimpleDataGrid,
   SimpleModal,
   SimpleModalRefProps
} from 'components'

import {
   useInterpol,
   useBreakpoints
} from 'hooks'
import { Interpol } from 'interfaces'

const commonGridColDef: Pick<GridColDef, 'headerAlign' | 'align'> = {
   headerAlign: 'center',
   align: 'center'
}

const BuscarInterpolSubMod: FC = () => {
   /* » HOOK'S... */
   const modalInterpolDetalle = useRef({} as SimpleModalRefProps)
   const [interpolDetalle, setInterpolDetalle] = useState({} as Interpol)

   /* » CUSTOM HOOK'S ... */
   const {
      loadingInterpolDb,
      interpolDb,
      findInterpolByApprox,
      findInterpolScreenshotById
   } = useInterpol()
   const { currentScreen } = useBreakpoints()

   /* » EFFECT'S ... */

   /* » HANDLER'S ... */

   /* » DEPENDENCY'S  */
   const columns = useMemo<GridColDef[]>(() => ([
      {
         ...commonGridColDef,
         field: '>',
         renderCell: ({ row }: GridRenderCellParams<Interpol>) => {
            return (
               <Tooltip title='Detalle' placement='left-start' arrow>
                  <IconButton
                     size='small'
                     onClick={ () => {
                        setInterpolDetalle(row)
                        modalInterpolDetalle.current.setOpen(true)
                     } }
                  >
                     <ReadMoreRounded fontSize='small' />
                  </IconButton>
               </Tooltip>
            )
         }
      }, {
         ...commonGridColDef,
         headerName: 'Pasaporte',
         field: 'pasaporte',
         width: 150,
         renderCell: ({ row }: GridRenderCellParams<Interpol>) => row.pasaporte?.trim() || '-'
      }, {
         ...commonGridColDef,
         headerName: 'Ciudadano',
         field: 'nombres',
         type: 'date',
         width: 450,
         renderCell: ({ row }: GridRenderCellParams<Interpol>) => `${row?.nombres}, ${row?.apellidos}`
      }, {
         ...commonGridColDef,
         headerName: 'Nacionalidad',
         field: 'nacionalidad',
         width: 150
      }, {
         ...commonGridColDef,
         headerName: 'Fecha Emisión',
         field: 'fechaEmision',
         type: 'date',
         width: 150
         /* render: ({ fechaEmision }) => new Intl.DateTimeFormat('es-PE', { dateStyle: 'short' }).format(Date.parse(fechaEmision)) */
      }, {
         field: '>>',
         ...commonGridColDef,
         renderCell: ({ row }: GridRenderCellParams<Interpol>) => {
            return (
               <Tooltip title='Detalle' placement='left-start' arrow>
                  <IconButton
                     size='small'
                     onClick={ () => {
                        findInterpolScreenshotById(row.idInterpol)
                     } }
                  >
                     <ReadMoreRounded fontSize='small' />
                  </IconButton>
               </Tooltip>
            )
         }

      }
   ]), [interpolDb])

   const optFormik: FormikConfig<Partial<Interpol>> = {
      initialValues: {
         nombres: '',
         apellidos: ''
      },
      validationSchema: Yup.object({
         nombres: Yup.string().required('¡Campo requerido!')
         /* apellidos: Yup.string().required('¡Campo requerido!'), */
      }),
      onSubmit: async (interpol): Promise<void> => {
         findInterpolByApprox(interpol)
      }
   }

   return (
      <>
         {/* HEADER... */}
         <Fade top delay={ 500 } duration={ 1500 }>
            <Formik {...optFormik} >
               {
                  (props) => (
                     <Form>
                        {/* <AppTitle name='» BUSCAR INTERPOL' align='left' size={1} color='#777' /> */}
                        <Paper elevation={ 5 }>
                           <Box p={ 2 } height={ 85 } display='flex' alignItems='flex-start' gap={ 2 } >
                              <MyTextField type='text' name='nombres' label='Nombres' width={ 20 } focused />
                              <MyTextField type='text' name='apellidos' label='Apellidos' width={ 20 } />
                              {/* <MyTextField type='text' name='cedula' label='N° Cédula' width={ 10 } /> */}
                              {/* <MyTextField type='text' name='pasaporte' label='N° Pasaporte' width={ 10 } /> */}
                              <Button type='submit' variant='contained'><SearchRounded /></Button>
                              <Button type='reset' variant='outlined'><DeleteSweepRounded /></Button>
                           </Box>
                        </Paper>
                     </Form>
                  )
               }
            </Formik>
         </Fade>

         {/* » BODY */}

         <Box mt={ 0.5 } overflow='hidden'>
            <Fade duration={ 2000 }>
               <Zoom bottom opposite duration={ 1000 } when={ interpolDb.length }>
                  <SimpleDataGrid
                     rows={ interpolDb }
                     columns={ columns }
                     getRowId={ row => row.idInterpol }
                     pageSize={ currentScreen === 'tabletLandscape'
                        ? 6
                        : currentScreen === 'desktopLarge'
                           ? 8
                           : currentScreen === 'desktopWide'
                              ? 11
                              : 6 }

                     localStoragePageKey='BUSCAR_INTERPOL_NRO_PAGINA'
                  />
               </Zoom>
            </Fade>
         </Box>

         {/* » MODAL  */}
         <SimpleModal ref={ modalInterpolDetalle }>
            <Typography variant='h4' gutterBottom>DATOS ADICIONALES</Typography>
            <FichaInterpolDetalle data={ interpolDetalle } />
         </SimpleModal>

         {/* MODAL: Loading ... */}
         { loadingInterpolDb && <ModalLoader /> }
      </>
   )
}

export default BuscarInterpolSubMod
