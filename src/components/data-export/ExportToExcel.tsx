import { useImperativeHandle, forwardRef, useRef, useMemo } from 'react'

import ExportExcel from 'react-export-excel'

import { convertArrObjectsToArrOfKeys } from 'helpers'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

export type ExportToExcelRefProps = {
   handleExportToExcel: () => void
}

type Props = {
   data: Array<any>
   fields?: Array<any>
}

export const ExportToExcel = forwardRef<ExportToExcelRefProps, Props>(({ data, fields = [] }, ref) => {
   /* ► HOOK'S  */
   const exportToExcel = useRef({} as HTMLButtonElement)

   /* ► EFFECT'S  */
   useImperativeHandle(ref, () => ({
      handleExportToExcel: () => { exportToExcel.current.click() }
   }), [])

   /* ► DEP'S  */
   const fileName: string = `${data.length} registros`
   const customFields = useMemo(() => fields.length > 0
      ? fields
      : convertArrObjectsToArrOfKeys(data)
   , [data])

   return (
      <ExcelFile
         filename={ fileName }
         element={<button ref={ exportToExcel } hidden>Descargar</button>}
      >
         <ExcelSheet data={ data } name={ fileName }>
            {
               customFields.map(field => (
                  <ExcelColumn key={ field } label={ field } value={ field } />
               ))
            }
         </ExcelSheet>
      </ExcelFile>
   )
})
