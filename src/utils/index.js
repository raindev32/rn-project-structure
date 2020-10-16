const getFileExtensionByUri = (uri = '') => {
  const imagePart = uri.split('.')
  return imagePart[imagePart.length - 1]
}

const trimString = (text = '') => {
  if (text) {
    return text.toString().trim()
  }
  return ''
}

export {
  getFileExtensionByUri,
  trimString
}
