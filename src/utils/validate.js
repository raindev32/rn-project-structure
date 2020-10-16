import { getFileSize } from './file'

const validateFileSize = async ({ uri, limit }) => {
  let fileSize = await getFileSize(uri)
  return fileSize < limit
}

export {
  validateFileSize
}
