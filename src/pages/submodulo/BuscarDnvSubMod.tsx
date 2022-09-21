import { FC, useEffect, useMemo, useRef } from 'react'

import { Paper, Box, Button } from '@mui/material'
import {
   DeleteSweepRounded,
   DownloadRounded,
   SearchRounded
} from '@mui/icons-material'
import { Form, Formik, FormikConfig } from 'formik'
import * as Yup from 'yup'
import { GridColDef } from '@mui/x-data-grid'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'

import { MyAutocomplete, MySelect, MyTextField, MySelectItem } from 'components/formik'

import { usePais, useDependencia, useExtraccion, useBreakpoints } from 'hooks'

import {
   ExportToExcel,
   ExportToExcelRefProps,
   SpeedDialActionProps,
   SpeedDialBackdrop,
   SimpleDataGrid,
   ModalLoader
} from 'components'

import { Dependencia, Pais, RequestParamsDnv } from 'interfaces'

import { noty } from 'helpers'

const tipoMov: Array<MySelectItem> = [
   { label: '-Todos-', value: '%' },
   { label: 'Entrada', value: 'E' },
   { label: 'Salida', value: 'S' }
]

const BuscarDnvSubMod: FC = () => {
   /* ► HOOK'S  */
   const exportToExcel = useRef({} as ExportToExcelRefProps)

   /* ► CUSTOM-HOOK'S ... */
   const { paisDb, findAllPais } = usePais()
   const { dependenciaDb, findAllDependencia } = useDependencia()
   const { dnvDb, camposDnvDb, loadingDnvDb, findDnvByParams } = useExtraccion()
   const { currentScreen } = useBreakpoints()

   /* ► EFFECT'S ... */
   useEffect(() => { findAllDependencia() }, [])
   useEffect(() => { findAllPais() }, [])

   /* ► DEP'S ... */
   const formikConfig: FormikConfig<RequestParamsDnv> = {
      initialValues: {
         pais: {} as Pais,
         dependencia: {} as Dependencia,
         tipoMov: '',
         fecIni: '',
         fecFin: ''
      },
      validationSchema: Yup.object({
         pais: Yup.object().nullable().required('¡Requerido!'),
         dependencia: Yup.object().nullable().required('¡Requerido!'),
         tipoMov: Yup.string().required('¡Requerido!'),
         fecIni: Yup.date().required('¡Requerido!').max(Yup.ref('fecFin'), '¡Esta fecha debe ser menor a la final!'),
         fecFin: Yup.date().required('¡Requerido!').min(Yup.ref('fecIni'), '¡Esta fecha debe ser mayor a la inicial!')
      }),
      onSubmit: async (values: RequestParamsDnv, meta): Promise<void> => {
         await findDnvByParams(values)
      }
   }

   const dgColumns: GridColDef[] = useMemo(() =>
      camposDnvDb.map(f => ({ field: f, headerName: f, headerAlign: 'center', align: 'center', width: f.length * 15 }))
   , [dnvDb])

   const sdActions: SpeedDialActionProps[] = useMemo(() => ([
      {
         name: 'Exporta_a_excel',
         icon: <DownloadRounded />,
         handleClick: () => {
            if (dnvDb.length === 0) { noty('error', '¡No existen datos, para exportar!'); return }
            exportToExcel.current.handleExportToExcel()
         }
      }
   ]), [dnvDb])

   return (
      <>
         {/* ► HEADER: Pallet filter ...  */}
         <Fade top duration={ 1500 }>
            <Formik { ...formikConfig }>
               {(props) => (
                  <Form>
                     <Paper elevation={ 1 } sx={{ p: 1, mb: 0.5 }}>
                        <Box
                           minHeight={ 60 }
                           display='flex'
                           flexWrap='wrap'
                           gap={ 1 }
                           alignItems='flex-start'
                        >
                           <MyAutocomplete name='pais' label='Nacionalidad' width={ 22 } opt={ paisDb } { ...props } />
                           <MyAutocomplete name='dependencia' label='Dependencia' width={ currentScreen === 'desktopWide' ? 27 : 13 } opt={ dependenciaDb } { ...props } />
                           <MySelect name='tipoMov' label='Tipo Movimiento' width={ 10 } opt={ tipoMov } />
                           <MyTextField type='date' name='fecIni' label='Fecha Control Inicial' width={ 12 } />
                           <MyTextField type='date' name='fecFin' label='Fecha Control Final' width={ 12 } />
                           <Button
                              type='submit'
                              variant='contained'
                              color='primary'
                           >
                              <SearchRounded />
                           </Button>
                           <Button
                              type='reset'
                              variant='outlined'
                              color='info'
                           >
                              <DeleteSweepRounded />
                           </Button>
                        </Box>
                     </Paper>
                  </Form>
               )}
            </Formik>
         </Fade>

         {/* ► Grid-Body ... */}
         <Box overflow='hidden'>
            <Fade duration={ 2000 }>
               <Zoom bottom duration={ 1500 } when={ dnvDb.length }>
                  <SimpleDataGrid
                     columns={ dgColumns }
                     rows={ dnvDb }
                     getRowId={ record => record.Nro }
                     pageSize={ currentScreen === 'tabletLandscape'
                        ? 5
                        : currentScreen === 'desktopLarge'
                           ? 8
                           : currentScreen === 'desktopWide'
                              ? 11
                              : 5 }
                     localStoragePageKey='BUSCAR_DNV_NRO_PAGINA'
                  />
               </Zoom>
            </Fade>
         </Box>

         {/* ► SPEED-DIAL ... */}
         <SpeedDialBackdrop actions={ sdActions } />

         {/* ► EXCEL_TO_EXPORT  */}
         <ExportToExcel data={ dnvDb } fields={ camposDnvDb } ref={ exportToExcel } />

         {/* ► MODAL: Loading ...  */}
         { loadingDnvDb && <ModalLoader /> }
      </>
   )
}

export default BuscarDnvSubMod
