import Alert from 'utils/alert'
import { getMyData } from 'services/auth/loginService'
import { apiEditProfile } from 'services/auth/profileService'
import { uploadImage } from 'actions/utils/imageAction'
import {
  FETCH_AUTH,
  RECEIVE_AUTH,
  FAILED_AUTH,
  SUCCESS_AUTH
} from '../types'

const fetch = () => {
  return {
    type: FETCH_AUTH
  }
}

const receive = (currentItem) => {
  return {
    type: RECEIVE_AUTH,
    payload: {
      currentItem
    }
  }
}

const success = (success) => {
  Alert.success(success)
  return {
    type: SUCCESS_AUTH
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_AUTH,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const userData = () => async (dispatch, getState) => {
  const { currentItem } = getState().authStore
  try {
    dispatch(fetch())
    const response = await getMyData()
    if (response && response.success) {
      dispatch(receive(response.data))
      return response.data
    }
    if (currentItem.id) {
      dispatch(failed(response))
      return {}
    }
    dispatch(receive({}))
    return {}
  } catch (error) {
    dispatch(failed(error))
    return {}
  }
}

const updateProfile = (data, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    if (data && data.image) {
      data.image = await dispatch(uploadImage('user', data.image))
    }
    const response = await apiEditProfile(data)
    if (response.success) {
      dispatch(success(response.meta))
      dispatch(userData())
      navigation.navigate('Profile')
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

export {
  userData,
  updateProfile,
  receive
}
