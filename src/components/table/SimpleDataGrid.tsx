import { FC } from 'react'

import {
   DataGrid,
   esES,
   DataGridProps,
   GridCallbackDetails
} from '@mui/x-data-grid'

import { useLocalStorage } from 'hooks'
import { LocalStorageKey } from 'types'

type SimpleDataGridProps = DataGridProps & {
   exportable?: boolean
   localStoragePageKey: LocalStorageKey
}

export const SimpleDataGrid: FC<SimpleDataGridProps> = ({ rows, columns, exportable, localStoragePageKey, ...rest }) => {
   // ► Custom hook's ...
   const [page, setPage] = useLocalStorage(localStoragePageKey, 0)

   // ► Handler's ...
   const handleOnPageChange = (page: number, details: GridCallbackDetails) => {
      setPage(page)
   }

   return (
      <DataGrid
         rows={ rows }
         columns={ columns }
         pageSize={ 7 }
         pagination
         autoHeight
         disableSelectionOnClick
         localeText={ esES.components.MuiDataGrid.defaultProps.localeText }
         page={ page }
         onPageChange={ handleOnPageChange }
         { ...rest }
      />
   )
}
