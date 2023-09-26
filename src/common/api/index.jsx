const generateConfig = (headerType) => {
  let type = 'application/json'
  if (headerType && headerType === 'formdata') {
    type = 'multipart/form-data'
  }

  const config = {
    headers: {
      'content-type': type,
    },
  }

  return config
}

export { generateConfig }
