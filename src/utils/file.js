import {
  Platform
} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

const getFileSize = async (fileUri) => {
  // fileUri = fileUri.replace('ph://', 'assets-library://')
  if (Platform.OS === 'ios') {
    const ext = 'jpg' // or heic or png etc
    const uri = fileUri.replace('ph://', '')
    const localIdentifier = uri.split('/')[0] // leaves 9F983DBA-EC35-42B8-8773-B597CF782EDD
    fileUri = `assets-library://asset/asset.${ext}?id=${localIdentifier}&ext=${ext}` // this you can pass into rn-fetch-blob stuff
  }

  try {
    const fileInfo = await RNFetchBlob.fs.stat(fileUri)
    return fileInfo.size / 1000000 // Convert to MB
  } catch (error) {
    console.log('error', error)
  }
}
const getFileInfo = (fileUri) => {
  if (Platform.OS === 'ios') {
    const ext = 'jpg' // or heic or png etc
    const uri = fileUri.replace('ph://', '')
    const localIdentifier = uri.split('/')[0] // leaves 9F983DBA-EC35-42B8-8773-B597CF782EDD
    fileUri = `assets-library://asset/asset.${ext}?id=${localIdentifier}&ext=${ext}` // this you can pass into rn-fetch-blob stuff
  }
  return RNFetchBlob.fs.stat(fileUri)
}

const getFileExtension = (fileName) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1)
}

const getFileLocation = (fileName) => {
  return fileName.substr(0, fileName.lastIndexOf('.'))
}

const dupicateFile = async (realPath) => {
  const newPathExt = await getFileExtension(realPath)
  let newPath = await getFileLocation(realPath)
  let exists
  if (newPath.indexOf(' copy') === -1) {
    exists = true
  }

  if (newPath) {
    newPath = newPath.replace(' copy', '')
  }
  const newFullPath = `${newPath} copy.${newPathExt}`

  if (exists) {
    await RNFetchBlob.fs.cp(realPath, newFullPath)
  }

  return newFullPath
}

const getFileUri = async (filePath) => {
  if (Platform.OS === 'ios') {
    return filePath
  }
  const realFilePath = await getFileInfo(filePath)
  return `file://${realFilePath.path}`
}

export {
  getFileSize,
  getFileInfo,
  getFileUri,
  getFileExtension,
  getFileLocation,
  dupicateFile
}
