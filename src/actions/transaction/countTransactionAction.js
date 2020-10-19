import Alert from 'utils/alert'
import {
  apiCountTransaction
} from 'services/transaction/transactionService'
import {
  FETCH_COUNT_TRANSACTION,
  RECEIVE_COUNT_TRANSACTION,
  RESET_COUNT_TRANSACTION,
  FAILED_COUNT_TRANSACTION
} from '../types'

const fetch = () => {
  return {
    type: FETCH_COUNT_TRANSACTION
  }
}

export const receive = (countTransactionList, meta = {}) => {
  return {
    type: RECEIVE_COUNT_TRANSACTION,
    payload: {
      countTransactionList,
      meta
    }
  }
}

export const reset = () => {
  return {
    type: RESET_COUNT_TRANSACTION
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_COUNT_TRANSACTION,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getCountTransaction = () => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiCountTransaction()
    if (response && response.data) {
      dispatch(receive(response.data))
      return response.data
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

export {
  getCountTransaction
}
