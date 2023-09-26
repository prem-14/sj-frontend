import './index.css'
import CustomInput from './CustomInput'
import { FormHelperText } from '@mui/material'
import CKEditor from 'ckeditor4-react'
import CustomRadio from './CustomRadio'

const helperText = (data, formik) => {
  if (data.touchedError === false) {
    // doesn't require to touch the input field to get the validation error message
    return data.filter ? formik?.errors?.filters?.[data.name] : formik?.errors?.[data.name]
  }
  return data.filter
    ? formik?.touched?.filters?.[data.name] && formik?.errors?.filters?.[data.name]
    : formik?.touched?.[data.name] && formik?.errors?.[data.name]
}

const errorCheck = (data, formik) => {
  return helperText(data, formik) ? true : false
}

function inputData(formik, formikArray) {
  let data = formikArray.map((data, index) => (
    <div key={index} className={data.class}>
      {['text', 'password', 'color', 'date', 'time', 'datetime', 'textarea'].includes(data.type) ? (
        <>
          <CustomInput
            id={data.id}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            autoFocus={data.autoFocus}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            disabled={data.disabled}
            // onBlur={formik.handleBlur}
            // onBlur={data.onBlurEvent ? formik.handleBlur : undefined}
            onBlurEvent={data.onBlurEvent}
            onChange={data.onChangeEvent === false ? undefined : data.onChange ? data.onChange : formik.handleChange}
            label={data.label}
            placeholder={data.placeholder}
            type={data.type}
            variant={data.variant}
            color={data.color}
            size={data.size}
            startAdornment={data.startAdornment}
            endAdornment={data.endAdornment}
            min={data.min}
            max={data.max}
            error={errorCheck(data, formik)}
            helperText={helperText(data, formik)}
            inputStyle={data.inputStyle}
            upperLabel={data.upperLabel}
            tooltiptitle={data.tooltiptitle}
            readonly={data.readonly}
            rows={data.rows}
            multiline={data.multiline}
            formik={formik}
          />
        </>
      ) : data.type === 'ckeditor' ? (
        <>
          {data.label && <div style={{ fontWeight: '500' }}>{data.label}</div>}
          <CKEditor
            config={{
              allowedContent: true,
            }}
            type='classic'
            initData={formik.values[data.name] || ''}
            onChange={({ editor }) => {
              formik.setFieldValue(data.name, editor.getData())
            }}
            disableEnforceFocus
            onInstanceReady={({ editor }) => {
              editor.setData(formik.values[data.name] || '')
            }}
          />
          <div>
            <FormHelperText error>
              {formik.errors[data.name] && formik.touched[data.name] && formik.errors[data.name]}
            </FormHelperText>
          </div>
        </>
      ) : data.type === 'radio' ? (
        <>
          <CustomRadio
            error={formik.touched[data.name] && formik.errors[data.name]}
            title={data.title}
            name={data.filter ? `filters.${data.name}.value` : data.name}
            items={data.item}
            value={data.filter ? formik.values.filters[data.name].value : formik.values[data.name]}
            onChange={data.onChange ? data.onChange : formik.handleChange}
            int={data.int}
          />
        </>
      ) : null}
    </div>
  ))

  return data
}

export default inputData
