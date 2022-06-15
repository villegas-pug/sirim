import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText, Typography
} from '@material-ui/core'

export default function MySelect({ name, label, width, opt, handleChangeUncontrolled, ...rest }) {
   const { setFieldValue, errors, values, isValidating } = rest

   const [touched, setTouched] = useState(false)
   const [msjError, setMsjError] = useState('')

   /*» EFFECT'S  */
   useEffect(() => {
      errors[name] && touched ? setMsjError(errors[name]) : setMsjError('')
   }, [touched])

   useEffect(() => {
      if (isValidating) {
         errors[name] ? setMsjError(errors[name]) : setMsjError('')
      }
   }, [isValidating])

   const value = useMemo(() => (values[name] ?? ''), [values[name]])

   /*» HANDLER'S  */
   const handleOnChange = ({ target: { value, name } }) => {
      setFieldValue(name, value)
      handleChangeUncontrolled({ [name]: value })
   }
   const handleOnBlur = () => { setTouched(true) }

   return (
      <FormControl variant='outlined' size='small' error={Boolean(msjError)}>
         <InputLabel>{label}</InputLabel>
         <Select
            name={name}
            label={label}
            value={value}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            style={{ width: `${width}rem` }}
         >
            {
               opt.map((item, i) => (
                  <MenuItem key={i} value={Object.values(item)[0]}>
                     <Typography variant='h4' color='textSecondary'>
                        {Object.values(item)[1]}
                     </Typography>
                  </MenuItem>
               ))
            }
         </Select>
         <FormHelperText>{msjError}</FormHelperText>
      </FormControl>
   )
}

MySelect.propTypes = {
   name: PropTypes.string.isRequired, 
   label: PropTypes.string.isRequired, 
   width: PropTypes.number.isRequired, 
   opt: PropTypes.array.isRequired, 
   handleChangeUncontrolled: PropTypes.func.isRequired
}