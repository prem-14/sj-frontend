import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'

const CustomCheckBox = (props) => {
  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name={props.name}
              checked={props.checked}
              value={props.value}
              onChange={props.onChange ? (e) => props.onChange(e) : null}
            />
          }
          label={props.label}
        />
      </FormGroup>
      <FormHelperText>{props.error}</FormHelperText>
    </>
  )
}

export default CustomCheckBox
