import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import { Box, Button, ButtonGroup, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { CancelRounded, CheckCircleRounded, CleaningServicesRounded, FileDownloadRounded, MoreVertRounded, RuleRounded, StorageRounded, SyncRounded } from '@mui/icons-material'
import { GridColDef } from '@mui/x-data-grid'
import Zoom from 'react-reveal/Zoom'

import { BandejaProcesos, InfoCard, ModalLoader, SimpleDataGrid, SimpleModal, SimpleModalRefProps, SpeedDialActionProps, SpeedDialBackdrop, WrapperInfoCard } from 'components'

import { useBreakpoints, useFormatoPermisos } from 'hooks'
import { SimpleFieldDetail } from 'components/detail'
import { FormatoPermisos } from 'interfaces'

export const ValidarFormatoAutorizacionSubMod = () => {
   // » Custom hook's ...
   const { loadingFormatoPermisosDb, findAllFormatoPermisos } = useFormatoPermisos()

   // » Effect's ...

   // » Dep's ...
   const speedDialActions: SpeedDialActionProps[] = useMemo(() => ([{
      name: 'Refrescar_Bandeja',
      icon: <SyncRounded />,
      handleClick: () => { findAllFormatoPermisos() }
   }]), [])

   return (
      <>
         <BandejaProcesos>
            <Box width='100%' display='flex' flexDirection='column' gap={ 0.5 }>
               <ValidarFormatoAutorizacionInfoCards />
               <ValidarFormatoAutorizacionActions />
               <ValidarFormatoAutorizacionBandeja />
            </Box>
         </BandejaProcesos>

         {/* » Actions ...  */}
         <SpeedDialBackdrop actions={ speedDialActions } />

         {/* » Modal loading ... */}
         { loadingFormatoPermisosDb && <ModalLoader /> }
      </>
   )
}

const ValidarFormatoAutorizacionInfoCards: FC = () => {
   // » Custom hook's ...
   const {
      totalFormatoPermisosDb,
      totalAttendedFormatoPermisosDb,
      totalNotAttendedFormatoPermisosDb,
      loadingFormatoPermisosDb
   } = useFormatoPermisos()

   return (
      <WrapperInfoCard loading={ loadingFormatoPermisosDb }>
         <InfoCard iconName='Assignment' title='Total Permisos' value={ totalFormatoPermisosDb } />
         <InfoCard iconName='AssignmentComplete' title='Permisos Atendidos' value={ totalAttendedFormatoPermisosDb } />
         <InfoCard iconName='AssignmentPendent' title='Permisos Pendientes' value={ totalNotAttendedFormatoPermisosDb } />
      </WrapperInfoCard>
   )
}

const ValidarFormatoAutorizacionActions: FC = () => {
   // » Hook's ...
   const inputFile = useRef({} as HTMLInputElement)
   const [file, setFile] = useState({} as File)

   // » Effect's ...
   useEffect(() => { console.log({ file }) }, [file])

   // » Handler's ...
   const handleClickFile = () => { inputFile.current.click() }

   const handleChangeFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      setFile(files![0])
   }

   return (
      <>
         <Paper elevation={ 1 } sx={{ m: 1, p: 1 }}>
            <ButtonGroup variant='contained'>

               <Button
                  onClick={ handleClickFile }
                  startIcon={ <StorageRounded fontSize='medium' /> }
               >
                  <Typography variant='h5'>Subir asistencias</Typography>
               </Button>

               <Button
                  startIcon={ <CleaningServicesRounded fontSize='medium' /> }
               >
                  <Typography variant='h5'>Eliminar asistencias</Typography>
               </Button>

               <Button
                  startIcon={ <FileDownloadRounded fontSize='medium' /> }
               >
                  <Typography variant='h5'>Descargar asistencias</Typography>
               </Button>

            </ButtonGroup>
         </Paper>

         <input
            type='file'
            accept='.xlsx'
            hidden
            ref={ inputFile }
            onChange={ handleChangeFile }
         />
      </>
   )
}

const commonGridColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center'
}

const ValidarFormatoAutorizacionBandeja: FC = () => {
   // » Hook's ...
   const modalVerDetalle = useRef({} as SimpleModalRefProps)
   const [formatoPermisosTmp, setFormatoPermisosTmp] = useState({} as FormatoPermisos)

   // » Custom hook's ...
   const {
      formatoPermisosDb,
      findAllFormatoPermisos,
      validateFormatoPermisos
   } = useFormatoPermisos()

   const { currentScreen } = useBreakpoints()

   // » Effect's ...
   useEffect(() => { findAllFormatoPermisos() }, [])

   // » Dep's ...
   const dgColumns = useMemo<GridColDef<FormatoPermisos>[]>(() => [
      {
         field: '>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Ver detalle' placement='top-start' arrow>
            <IconButton
               onClick={ () => {
                  setFormatoPermisosTmp(row)
                  modalVerDetalle.current.setOpen(true)
               } }
            >
               <MoreVertRounded />
            </IconButton>
         </Tooltip>
      }, {
         field: '>>',
         width: 50,
         ...commonGridColDef,
         renderCell: ({ row }) => <Tooltip title='Atender formato' placement='top-start' arrow>
            <IconButton
               onClick={ async (): Promise<void> => {
                  await validateFormatoPermisos(row.idFormato)
                  findAllFormatoPermisos()
               } }
            >
               <RuleRounded />
            </IconButton>
         </Tooltip>
      },
      { field: 'idFormato', headerName: 'Id', width: 100, ...commonGridColDef },
      { field: 'fechaCreacion', headerName: 'Fecha Registro', type: 'date', width: 150, ...commonGridColDef },
      {
         field: 'atendido',
         headerName: '¿Atendido?',
         type: 'boolean',
         width: 120,
         renderCell: ({ row }) => row.atendido
            ? <CheckCircleRounded fontSize='small' color='success' />
            : <CancelRounded fontSize='small' color='error' />,
         ...commonGridColDef
      },
      { field: 'nombres', headerName: 'Servidor', width: 280, ...commonGridColDef },
      { field: 'gerencia', headerName: 'Gerencia', minWidth: 200, flex: 1, ...commonGridColDef },
      { field: 'subgerencia', headerName: 'Subgerencia', minWidth: 200, flex: 1, ...commonGridColDef },
      { field: 'tipoLicencia', headerName: 'Tipo Licencia/Permiso', minWidth: 400, flex: 1, ...commonGridColDef }
   ], [formatoPermisosDb])

   return (
      <>
         <Zoom>
            <Box mx={ 1 }>
               <SimpleDataGrid
                  columns={ dgColumns }
                  rows={ formatoPermisosDb }
                  pageSize={ currentScreen === 'desktopLarge'
                     ? 7
                     : currentScreen === 'desktopWide'
                        ? 9
                        : 2
                  }
                  getRowId={ row => row.idFormato }
                  localStoragePageKey='VALIDAR_FORMATO_AUTORIZACION_BANDEJA_NROPAG'
               />
            </Box>
         </Zoom>

         {/* » Modal: Más inmformación ...  */}
         <SimpleModal ref={ modalVerDetalle } style={{ width: '83rem' }}>
            <Box p={ 2 } display='flex' flexWrap='wrap' justifyContent='space-between' gap={ 3 }>
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Fecha Registro' prop='fechaCreacion' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Servidor' prop='nombres' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Tipo Licencia' prop='tipoLicencia' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Jornada Laboral' prop='jornadaLaboral' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Régimen Laboral' prop='regimenLaboral' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Gerencia' prop='gerencia' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Subgerencia' prop='subgerencia' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Unidad' prop='unidad' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Desde' prop='desde' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Hasta' prop='hasta' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Total horas' prop='totalHoras' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Justificación' prop='justificacion' />
               <SimpleFieldDetail record={ formatoPermisosTmp } title='Fecha Formato' prop='fechaFormato' />
            </Box>
         </SimpleModal>
      </>
   )
}

export default ValidarFormatoAutorizacionSubMod
