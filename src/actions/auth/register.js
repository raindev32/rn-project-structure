import Alert from 'utils/alert'
import {
  apiRegister,
  apiRequestVerification
} from 'services/auth/registerService'
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

const submit = (data, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiRegister(data)

    if (response && response.success) {
      dispatch(success(response.meta))
      navigation.navigate('Login')
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

const request = (data, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiRequestVerification(data.account, data.typeAccount)
    if (response && response.success) {
      dispatch(success(response.meta))
      navigation.navigate('VerificationPage', {
        data: response.data,
        account: data.account,
        typeCode: 1,
        typeAccount: data.typeAccount
      })
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

export {
  submit,
  request
}
