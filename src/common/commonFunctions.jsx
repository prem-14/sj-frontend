export const fillFormikField = (formik, data, ignoreFields) => {
  console.log(Object.keys(formik.values))
  Object.keys(formik.values).forEach((key) => {
    if (!key.includes(ignoreFields)) {
      if (data.hasOwnProperty(key)) {
        console.log(key, data[key])
        formik.setFieldValue(key, data[key])
      }
    }
  })
}

export const nestedCategories = (categories, indentLevel = 0) => {
  let html = ''
  categories.forEach((category) => {
    html += `<MenuItem value="${category.id}">
                <div className='nested' style={{ marginLeft: '${indentLevel * 20}px' }}>
                  ${category.name}
                </div>
              </MenuItem>
    `

    if (category.subCate) {
      html += nestedCategories(category.subCate, indentLevel + 1)
    }
    // if (indentLevel == 0) {
    //   html += `<Divider />`
    // }
  })
  return html
}

export const validDateCheck = (date) => {
  date = typeof date === 'string' ? new Date(date) : date

  if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)) {
    // isNaN(Invalid Date) == true
    return true
  }
  return false
}

// https://devhints.io/wip/intl-datetime
export const localDateTime = (date) => {
  date = typeof date === 'string' ? (date = new Date(date)) : date

  if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)) {
    // isNaN(Invalid Date) == true
    const result = new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date)
    return result
  }

  return '-'
}

// datetime-local input value is always formatted YYYY-MM-DDThh:mm
export const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`
  return formattedDate
}
