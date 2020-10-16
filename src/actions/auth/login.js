import Alert from 'utils/alert'
import {
  apiLogin
} from 'services/auth/loginService'
import { apiChangePassword } from 'services/auth/profileService'
import { getCountTransaction, reset as resetCountTransaction } from 'actions/transaction/countTransactionAction'

import { set, remove } from 'utils/storage'
import { Toast } from 'native-base'
import {
  FETCH_AUTH,
  SUCCESS_AUTH,
  FAILED_AUTH
} from '../types'
import {
  receive
} from './profile'

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
    const response = await apiLogin(data)

    if (response && response.success) {
      dispatch(receive(response.data))
      dispatch(success(response.meta))
      if (response && response.data) {
        await set('userToken', JSON.stringify(response.data.token))
        dispatch(getCountTransaction())
        navigation.navigate('App')
      }
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

const logout = (navigation) => async (dispatch) => {
  try {
    await remove('userToken')
    dispatch(receive({}))
    dispatch(resetCountTransaction())
    navigation.navigate('Auth')
    navigation.navigate('Login')
  } catch (error) {
    return dispatch(failed(error))
  }
}

const changePassword = (data, navigation) => async (dispatch) => {
  try {
    const response = await apiChangePassword(data)
    if (response.success) {
      success()
      dispatch(logout(navigation))
      Toast.show({
        text: `${response.meta.message.substring(0, 20)}...`,
        buttonText: 'Okay',
        type: 'success',
        position: 'top',
        duration: 2000
      })
    } else {
      failed(response)
    }
  } catch (error) {
    failed(error)
  }
}

export {
  submit,
  logout,
  changePassword
}
