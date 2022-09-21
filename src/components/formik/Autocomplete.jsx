import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextField, Autocomplete } from '@mui/material'
import { Field } from 'formik'

export const MyAutocomplete = ({ name, label, width, opt, handleChangeUncontrolled = '', ...rest }) => {
   /* » PROP'S  */
   const { setFieldValue, errors, values, isValidating } = rest

   /* » HOOK'S  */
   const [touched, setTouched] = useState(false)
   const [msjError, setMsjError] = useState('')
   const [inputValue, setInputValue] = useState('')

   /* » EFFECT'S  */
   useEffect(() => { !values[name] && setInputValue('') }, [values[name]])
   useEffect(() => { values[name] && setInputValue(Object.values(values[name])[1]) }, [])

   useEffect(() => {
      errors[name] && touched ? setMsjError(errors[name]) : setMsjError('')
   }, [touched])

   useEffect(() => {
      if (isValidating) errors[name] ? setMsjError(errors[name]) : setMsjError('')
   }, [isValidating])

   /* » HANDLER  */
   const handleOnChange = (e, obj) => {
      setFieldValue(name, obj)
      handleChangeUncontrolled && handleChangeUncontrolled({ [name]: obj })
   }
   const handleOnInputChange = (e, value) => { setInputValue(value) }
   const handleOnInputBlur = () => { setTouched(true) }

   return (/* -> Al realizar el binding con `inputValue` bloquea el input... */
      <Autocomplete
         inputValue={ inputValue }
         noOptionsText='¡No hay registros!'
         loadingText='Cargando...'
         options={ opt }
         getOptionLabel={(obj) => Object.values(obj)[1]}/* » Drop down list label...  */
         style={{ width: `${width}rem` }}
         onInputChange={handleOnInputChange}
         onChange={handleOnChange}
         onBlur={handleOnInputBlur}
         renderInput={(params) => (
            <Field
               {...params}
               error={Boolean(msjError)}
               label={ label }
               as={TextField}
               variant='outlined'
               size='small'
               helperText={msjError}
            />
         )}
      />
   )
}

MyAutocomplete.propTypes = {
   name: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   width: PropTypes.string.isRequired,
   opt: PropTypes.object.isRequired,
   handleChangeUncontrolled: PropTypes.func.isRequired
}
