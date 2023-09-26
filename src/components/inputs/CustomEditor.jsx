import React, { useState, useRef } from 'react'
import JoditEditor from 'jodit-react'

const Editor = (props) => {
  const editor = useRef(null)
  const formik = props.formik
  const data = props.data

  return (
    <>
      <JoditEditor
        ref={editor}
        height='400'
        value={formik.values[data.name] || ''}
        onBlur={(newContent) => formik.setFieldValue(data.name, newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => formik.setFieldValue(data.name, editor.getData())}
      />
    </>
  )
}

export default Editor
