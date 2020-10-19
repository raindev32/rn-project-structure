import Alert from 'utils/alert'
import {
  updateAdress
} from 'services/auth/addressService'
import { userData } from 'actions/auth/profile'
import {
  getCourierCost
} from 'actions/utils/courierAction'
import {
  FETCH_ADDRESS,
  SUCCESS_ADDRESS,
  FAILED_ADDRESS
} from '../types'

const fetch = () => {
  return {
    type: FETCH_ADDRESS
  }
}

const success = (data) => {
  Alert.success(data)
  return {
    type: SUCCESS_ADDRESS
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_ADDRESS,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const addressState = (goTo, response, navigation) => async (dispatch) => {
  dispatch(success(response ? response.meta : {}))
  dispatch(userData())
  if (goTo && goTo.goTo) {
    navigation.navigate(goTo.goTo)
  }
}

const updateAddress = (data, checkout, item, navigation) => async (dispatch, getState) => {
  try {
    dispatch(fetch())
    const response = await updateAdress(data)
    if (response.success) {
      if (checkout) {
        await dispatch(addressState({}, response, navigation))
        const { params } = navigation.state
        if (params && params.callback) {
          const { cartDetail } = getState().localTransactionStore
          const { currentItem } = getState().authStore
          let callbackData = []
          if (cartDetail && cartDetail.id) {
            callbackData = await dispatch(getCourierCost(cartDetail.id, currentItem.storeId))
          } else if (cartDetail && cartDetail.length > 0) {
            callbackData = await dispatch(getCourierCost(cartDetail.map(item => item.id), currentItem.storeId))
          }
          params.callback(callbackData)
        }
        navigation.navigate('Checkout', {
          item
        })
      } else {
        dispatch(addressState({ goTo: 'Address' }, response, navigation))
      }
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

export {
  updateAddress
}
