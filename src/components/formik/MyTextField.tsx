import { useField, FieldHookConfig } from 'formik'

import { BaseTextFieldProps, TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

type MyTextFieldType = {
   type?: BaseTextFieldProps['type']
   name: string
   label: string
   width: number
   focused?: boolean
   muiProps?: TextFieldProps
} & FieldHookConfig<any>

export const MyTextField: FC<MyTextFieldType> = ({ type, label, width, ...rest }) => {
   const [fieldProps, meta] = useField(rest)
   const err = (meta.touched && meta.error) ? meta.error : ''

   return (
      <TextField
         { ...fieldProps }
         { ...rest.muiProps }
         color='primary'
         type={ type }
         variant='outlined'
         size='small'
         autoFocus={ rest.focused }
         label={ label}
         error={ Boolean(err) }
         InputLabelProps={{
            shrink: type !== 'text' || Boolean(fieldProps.value)
         }}
         helperText={ err || rest.muiProps?.helperText }
         autoComplete='off'
         sx={{ width: `${width}rem` }}
      />
   )
}
