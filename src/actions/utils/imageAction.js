import { Platform } from 'react-native'
import Alert from 'utils/alert'
import { apiUpload } from 'services/utils/imageService'
import { getFileInfo } from 'utils/file'
import { getFileExtensionByUri } from 'utils'
import {
  FETCH_IMAGE,
  FAILED_IMAGE,
  SUCCESS_IMAGE
} from '../types'

const fetch = () => {
  return {
    type: FETCH_IMAGE
  }
}

const success = (data, alert = true) => {
  if (alert) {
    Alert.success(data)
  }
  return {
    type: SUCCESS_IMAGE
  }
}

const failed = (error, alert = true) => {
  if (alert) {
    Alert.warning(error)
  }
  return {
    type: FAILED_IMAGE,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

/**
 *
 * @param {String} type
 * @param {String} image
 */
const uploadImage = (type = 'products', image, alert = true) => async (dispatch) => {
  try {
    dispatch(fetch())
    if (!type) {
      return dispatch(failed('Type is Required', alert))
    }
    if (!image) {
      return dispatch(failed('Image is Required', alert))
    }

    const formData = new FormData()
    const realFile = await getFileInfo(image)
    const fileType = Platform.OS === 'ios' ? 'jpeg' : await getFileExtensionByUri(realFile.path)
    formData.append('file', {
      uri: image,
      name: `file.${(fileType || '').toLowerCase()}`,
      type: `image/${(fileType || '').toLowerCase()}`
    })
    const response = await apiUpload(type, formData)
    if (response.success) {
      dispatch(success('Upload success', alert))
      return response.data.filename
    }
    dispatch(failed(response, alert))
    return undefined
  } catch (error) {
    dispatch(failed(error, alert))
    return undefined
  }
}

export {
  uploadImage
}
