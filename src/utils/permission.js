import {
  Platform,
  PermissionsAndroid
} from 'react-native'

export const requestWriteStoragePermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Access',
        message: 'App need access to storage'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    return false
  } catch (err) {
    console.warn(err)
  }
}

export const requestReadStoragePermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Access',
        message: 'App need access to storage'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    return false
  } catch (err) {
    console.warn(err)
  }
}

export const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return true
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera access',
        message: 'App need access to camera'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    return false
  } catch (err) {
    console.warn(err)
  }
}
