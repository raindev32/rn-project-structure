import Alert from 'utils/alert'
import {
  apiGetId
} from 'services/product/productService'
import {
  FETCH_PRODUCT,
  RECEIVE_PRODUCT,
  FAILED_PRODUCT
} from '../types'

const fetch = () => {
  return {
    type: FETCH_PRODUCT
  }
}

const receive = (productItem) => {
  return {
    type: RECEIVE_PRODUCT,
    payload: {
      productItem
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_PRODUCT,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getById = (id) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetId(id)
    if (response && response.success) {
      dispatch(receive(response.data))
      return response.data
    }
    dispatch(failed(response))
  } catch (error) {
    return dispatch(failed(error))
  }
}

export {
  getById
}
