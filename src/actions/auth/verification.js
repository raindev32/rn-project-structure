import Alert from 'utils/alert'
import {
  // apiVerification,
  apiVerificationForgot
} from 'services/auth/loginService'
import {
  FETCH_AUTH,
  SUCCESS_AUTH,
  FAILED_AUTH
} from '../types'

const fetch = () => {
  return {
    type: FETCH_AUTH
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

const submitForgotPassword = (data, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiVerificationForgot(data)
    if (response && response.success) {
      dispatch(success(response.meta))
      navigation.navigate('ResetPassword', { data })
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

const submitRegisterVerify = (data, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiVerificationForgot(data)
    if (response && response.success) {
      dispatch(success(response.meta))
      navigation.navigate('Home')
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

export {
  submitForgotPassword,
  submitRegisterVerify
}
