import Alert from 'utils/alert'
import { apiGetProductCost } from 'services/utils/courierService'
import {
  FETCH_COURIER,
  RECEIVE_COURIER,
  FAILED_COURIER
} from '../types'

const fetch = () => {
  return {
    type: FETCH_COURIER
  }
}

const receive = (list) => {
  return {
    type: RECEIVE_COURIER,
    payload: {
      list
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_COURIER,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getCourierCost = (productId, storeId) => async (dispatch) => {
  try {
    dispatch(fetch())
    const params = {
      productId,
      storeId
    }
    const response = await apiGetProductCost(params)
    if (response && response.success) {
      dispatch(receive(response.data.data))
      return response.data.data
    }
    dispatch(failed(response))
  } catch (error) {
    dispatch(failed(error))
    return undefined
  }
}

export {
  getCourierCost
}
