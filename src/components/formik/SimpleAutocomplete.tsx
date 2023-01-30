
import { FC } from 'react'

import { TextField, Autocomplete, TextFieldProps } from '@mui/material'
import { FormikProps } from 'formik'

type SimpleAutocompleteProps = {
   name: string
   label: string
   width: number
   opt: Array<any>
   muiProps?: TextFieldProps
} & FormikProps<any>

export const SimpleAutocomplete: FC<SimpleAutocompleteProps> = ({ label, width, opt, ...rest }) => {
   const { name, touched, errors, values, setValues, setTouched } = rest

   /* » HANDLERS ...  */
   const handleChange = (_: any, value: string) => { setValues({ ...values, [name]: value ?? '' }) }
   const handleBlur = () => { setTouched({ ...touched, [name]: true }) }

   /* » DEP'S  */
   const err = errors[name] && touched[name] ? errors[name] : ''

   return (
      <Autocomplete
         { ...rest }
         freeSolo
         options={ opt }
         noOptionsText='¡No hay registros!'
         loadingText='Cargando...'
         value={ values[name] }
         sx={{ width: `${width}rem` }}
         renderInput={(params: any) => (
            <TextField
               { ...params }
               label={ label }
               variant='outlined'
               error={Boolean(err)}
               size='small'
               helperText={ err }
               { ...rest.muiProps }
            />
         )}
         onChange={ handleChange }
         onInputChange={ handleChange }
         onBlur={ handleBlur }
      />
   )
}
