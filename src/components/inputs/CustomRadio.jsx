import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

function CustomRadio(props) {
  return (
    <>
      <h4>{props.title}</h4>
      <div className='flex'>
        <RadioGroup
          aria-label={props.name}
          name={props.name}
          value={props.int === 1 ? parseInt(props.value) : props.value}
          onChange={props.onChange}
        >
          {props.items.map((d, i) => (
            <div key={i}>
              <FormControlLabel
                value={props.int === 1 ? parseInt(d.id) : d.id}
                control={<Radio />}
                label={d.description}
              />
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  )
}

export default CustomRadio
