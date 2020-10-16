import Alert from 'utils/alert'
import {
  apiComplain,
  apiComplainHistory
} from 'services/transaction/transactionService'
import {
  FETCH_COMPLAIN,
  SUCCESS_COMPLAIN,
  FAILED_COMPLAIN,

  FETCH_COMPLAIN_HISTORY,
  RECEIVE_COMPLAIN_HISTORY,
  FAILED_COMPLAIN_HISTORY
} from '../types'

const fetch = () => {
  return {
    type: FETCH_COMPLAIN
  }
}

const fetchComplainHistory = () => {
  return {
    type: FETCH_COMPLAIN_HISTORY
  }
}

const success = (data) => {
  Alert.success(data)
  return {
    type: SUCCESS_COMPLAIN
  }
}

const receiveComplainHistory = (listComplainHistory, meta = {}) => {
  return {
    type: RECEIVE_COMPLAIN_HISTORY,
    payload: {
      listComplainHistory,
      meta
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_COMPLAIN,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const failedComplainHistory = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_COMPLAIN_HISTORY,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const complainProduct = (id, data, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiComplain(id, data)
    if (response.success) {
      dispatch(success(response.meta))
      navigation.navigate('Profile')
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

const complainHistoryProduct = (id) => async (dispatch) => {
  try {
    dispatch(fetchComplainHistory())
    const response = await apiComplainHistory(id, { order: '-id' })
    if (response && response.success) {
      dispatch(receiveComplainHistory(response.data))
      return response.data
    }
    dispatch(failedComplainHistory(response))
  } catch (error) {
    dispatch(failedComplainHistory(error))
  }
}

export {
  complainProduct,
  complainHistoryProduct
}
