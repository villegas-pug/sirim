import { useField, FieldHookConfig } from 'formik'

import {
   FormControlLabel,
   CheckboxProps,
   Checkbox
} from '@mui/material'
import { FC } from 'react'

type MyCkeckboxProps = {
   name: string
   label: string
   width: number
   focused?: boolean
   muiProps?: CheckboxProps
} & FieldHookConfig<any>

export const MyCheckBox: FC<MyCkeckboxProps> = ({ label, width, ...rest }) => {
   const [fieldProps] = useField(rest)

   return (
      <FormControlLabel
         label={ label }
         control={
            <Checkbox
               { ...fieldProps }
               { ...rest.muiProps }
               checked={ fieldProps.value }
               color='primary'
               size='small'
            />
         }
         sx={{ width: width ? `${width}rem` : '' }}
      />
   )
}
