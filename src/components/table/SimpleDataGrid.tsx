import { FC } from 'react'

import {
   DataGrid,
   esES,
   DataGridProps
} from '@mui/x-data-grid'

type SimpleDataGridProps = DataGridProps & {
   exportable?: boolean
}

export const SimpleDataGrid: FC<SimpleDataGridProps> = ({ rows, columns, exportable, ...rest }) => {
   return (
      <DataGrid
         rows={ rows }
         columns={ columns }
         pageSize={ 7 }
         pagination
         autoHeight
         disableSelectionOnClick
         localeText={ esES.components.MuiDataGrid.defaultProps.localeText }
         { ...rest }
      />
   )
}
