import { useField, FieldHookConfig } from 'formik'

import { BaseTextFieldProps, TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'

type MyTextFieldType = {
   name: string
   label: string
   type?: BaseTextFieldProps['type']
   width?: number
   focused?: boolean
   muiProps?: TextFieldProps
} & FieldHookConfig<any>

export const MyTextField: FC<MyTextFieldType> = ({ type, label, width, ...rest }) => {
   const [fieldProps, meta] = useField(rest)
   const err = (meta.touched && meta.error) ? meta.error : ''

   return (
      <TextField
         { ...fieldProps }
         color='primary'
         type={ type }
         variant='outlined'
         size='small'
         autoFocus={ rest.focused }
         label={ label }
         error={ Boolean(err) }
         InputLabelProps={{
            shrink: type !== 'text' || Boolean(fieldProps.value)
         }}
         autoComplete='off'
         sx={{ width: `${width}rem` }}
         { ...rest.muiProps }
         helperText={ err || rest.muiProps?.helperText }
      />
   )
}
