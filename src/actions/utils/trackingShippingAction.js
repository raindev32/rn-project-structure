import Alert from 'utils/alert'
import {
  apiGetWayBill
} from 'services/utils/courierService'
import {
  FETCH_TRACKING_SHIPPING,
  RECEIVE_TRACKING_SHIPPING,
  FAILED_TRACKING_SHIPPING
} from '../types'

const fetch = () => {
  return {
    type: FETCH_TRACKING_SHIPPING
  }
}

const receive = (trackingList) => {
  return {
    type: RECEIVE_TRACKING_SHIPPING,
    payload: {
      trackingList
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_TRACKING_SHIPPING,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getTrackingShipping = (data) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetWayBill(data)
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
  getTrackingShipping
}
