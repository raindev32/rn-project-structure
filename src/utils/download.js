import RNFetchBlob from 'rn-fetch-blob'
import {
  Alert,
  Platform
} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

const makeid = (length) => {
  let lengthOfText = length
  if (lengthOfText) {
    lengthOfText = 5
  }
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

const getExtention = (filename) => {
  if (/[.]/.exec(filename)) {
    return /[^.]+$/.exec(filename)[0]
  }
  return 'jpg'
}

const Download = async (url) => {
  if (Platform.OS === 'android') {
    const { fs } = RNFetchBlob
    const { PictureDir } = fs.dirs
    console.log('PictureDir', PictureDir)
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${PictureDir}/Wiorganizer/${makeid(7)}.${getExtention(url)}`,
        description: Alert.alert('downloading file...')
      }
    }
    RNFetchBlob
      .config(options)
      .fetch('GET', url, {})
      .then(() => {
        return Alert.alert(`Download Success to ~/Pictures/Wiorganizer/${makeid(7)}.${getExtention(url)}`)
      })
  } else if (Platform.OS === 'ios') {
    const { fs } = RNFetchBlob
    let Picture = fs.dirs.DocumentDir
    let arr = url.split('/')

    try {
      const resp = await RNFetchBlob.config({
        fileCache: true,
        path: `${Picture}/${arr[arr.length - 1]}`
      })
        .fetch('GET', url)
      await CameraRoll.saveToCameraRoll(resp.data)
      return Alert.alert('Picture has been saved to Camera Directory')
    } catch (error) {
      console.log('Error when downloading image: ', error)
    }
  }
}

export default Download
