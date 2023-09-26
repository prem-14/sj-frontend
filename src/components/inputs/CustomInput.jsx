import React from 'react'
import TextField from '@mui/material/TextField'
import './index.css'

function CustomInput(props) {
  const handleBlur = (e) => {
    if (props.onBlurEvent) {
      props.formik.setFieldValue(props.name, e.target.value)
    }
    props.formik.handleBlur(e)
  }
  return (
    <div>
      <TextField
        // value={props.value}
        rows={props.rows || 3}
        multiline={props.multiline}
        autoFocus={props.autoFocus}
        name={props.name}
        onChange={props.onChange}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: props.startAdornment,
          endAdornment: props.endAdornment,
          readOnly: props.readonly,
          inputProps: {
            min: props.min,
            max: props.max,
          },
        }}
        id={props.id}
        label={props.label}
        type={props.type === 'datetime' ? 'datetime-local' : props.type}
        size={props.size}
        disabled={props.disabled}
        variant={props.variant || 'outlined'}
        placeholder={props.placeholder}
        error={props.error ? true : false}
        helperText={props.helperText}
        color={props.color || 'primary'}
        {...(props.type === 'textarea' && { row: props.row || 3 })}
        {...(!props.onBlurEvent && { value: props.value ?? '' })}
        // {...(props.onBlurEvent && { onBlur: handleBlur })}
      />
    </div>
  )
}

export default CustomInput
