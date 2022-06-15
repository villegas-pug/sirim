
import { FC, useId } from 'react'

import { FormControl, InputLabel, FormHelperText, Select, MenuItem, SelectProps } from '@mui/material'
import { useField, FieldInputProps } from 'formik'

export type ItemType = {
   value: number | string
   label: string
}

interface Props extends Partial<FieldInputProps<any>> {
   name: string
   label: string
   width: number
   opt: Array<ItemType>
   muiProps?: SelectProps
}

export const MySelect: FC<Props> = ({ label, width, opt, muiProps, ...rest }) => {
   /* » FORMIK - HOOK'S  */
   const [fieldProps, meta] = useField(rest)

   /* » HOOK'S  */
   const idSelect = useId()

   const err = (meta.error && meta.touched) ? meta.error : ''

   return (
      <FormControl error={Boolean(err)}>
         <InputLabel htmlFor={ idSelect }>{ label }</InputLabel>
         <Select
            labelId={ idSelect }
            { ...fieldProps }
            { ...muiProps }
            label={ label }
            size='small'
            sx={{ width: `${width}rem` }}
         >
            {
               opt.map(({ label, value }) => (
                  <MenuItem key={ label } value={ value }>{ label }</MenuItem>
               ))
            }

         </Select>
         <FormHelperText>{ err }</FormHelperText>
      </FormControl>
   )
}
