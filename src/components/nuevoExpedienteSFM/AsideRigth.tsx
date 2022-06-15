import { useEffect } from 'react'

import {
   Box,
   IconButton
   /* Tooltip */
} from '@mui/material'
import {
   DeleteForever,
   Download
} from '@mui/icons-material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { useFiscalizacionPosterior } from 'hooks'
import { SimpleDataGrid } from 'components/table'

/* » HANDLER'S  */
const handleDownload = (params: GridRenderCellParams) => {
   console.log(params.row)
}

const handleDelete = (params: GridRenderCellParams) => {
   console.log(params.row)
}

const commonColDef: Partial<GridColDef> = {
   headerAlign: 'center',
   align: 'center',
   sortable: false
}

const commonColActionDef: Partial<GridColDef> = {
   ...commonColDef,
   width: 80,
   filterable: false,
   disableColumnMenu: true
}

export const AsideRigth = () => {
   /* » CUSTOM HOOK'S  */
   const {
      metadataFilesSolicitudDb,
      findAllMetaOfExpediente
   } = useFiscalizacionPosterior()

   /* » EFFECT'S  */
   useEffect(() => { findAllMetaOfExpediente() }, [])

   /* » DEPENDENCY'S  */
   const columns: Array<GridColDef> = [
      {
         field: 'Descargar',
         renderCell: (params) => <IconButton onClick={ () => { handleDownload(params) } }><Download /></IconButton>,
         ...commonColActionDef
      }, {
         field: 'Eliminar',
         renderCell: (params) => <IconButton onClick={ () => { handleDelete(params) } }><DeleteForever /></IconButton>,
         ...commonColActionDef
      },
      { headerName: 'Fecha Registro', field: 'fechaRegistro', type: 'date', width: 100, ...commonColDef },
      { headerName: 'Archivo', field: 'fileName', width: 350, ...commonColDef },
      { headerName: 'Total Expedientes', field: 'contar', type: 'number', width: 120, ...commonColDef }
   ]

   return (
      <Box
         height={170}
         mt={0}
      >
         <SimpleDataGrid
            rows={metadataFilesSolicitudDb}
            columns={columns}
            getRowId={((row) => row.contar)}
         />
      </Box>
   )
}
