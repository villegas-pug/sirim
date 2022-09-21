import { FC, useMemo } from 'react'

import { Download } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import ExportExcel from 'react-export-excel'
import { motion } from 'framer-motion'

import { convertArrObjectsToArrOfKeys, partitionArray } from 'helpers'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

type Props = {
   data: Array<Object>
   numberPartitions: number
}

export const ExportMultipleExcelFiles: FC<Props> = ({ data, numberPartitions }) => {
   /* » DEP'S  */
   const partitions = useMemo(() => partitionArray(data, numberPartitions) || [], [data])
   const properties = useMemo(() => convertArrObjectsToArrOfKeys(data), [data])

   return (
      <>
         {
            partitions.map((partition, i) => (
               <motion.div
                  key={ i }
                  variants={{
                     hidden: { y: -10, opacity: 0 },
                     visible: { y: 0, opacity: 1 }
                  }}
               >
                  <ExcelFile
                     filename={ `P-${(i + 1).toString().padStart(3, '0')}` }
                     element={
                        <Button
                           size='small'
                           variant='text'
                           startIcon={ <Download fontSize='small' /> }
                        >
                           <Typography variant='h6'>
                              { `${(i + 1).toString().padStart(3, '0')}` }
                           </Typography>
                        </Button>
                     }
                  >
                     <ExcelSheet data={ partition } name={ `P-${(i + 1).toString().padStart(3, '0')}` }>
                        {
                           properties.map((prop, c) => (
                              <ExcelColumn key={ c } label={ prop } value={ prop } />
                           ))
                        }
                     </ExcelSheet>
                  </ExcelFile>
               </motion.div>
            ))
         }
      </>
   )
}
