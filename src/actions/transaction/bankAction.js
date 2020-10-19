import Alert from 'utils/alert'
import {
  apiGet
} from 'services/transaction/bankService'
import { TRANSFER, VIRTUAL_ACCOUNT } from 'utils/variable'
import {
  FETCH_BANK,
  FAILED_BANK,
  RECEIVE_BANK_DROPDOWN
} from '../types'

const fetch = () => {
  return {
    type: FETCH_BANK
  }
}

export const receiveDropdown = (listDropdown, meta = {}) => {
  return {
    type: RECEIVE_BANK_DROPDOWN,
    payload: {
      listDropdown,
      meta
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_BANK,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const get = (paymentType) => async (dispatch) => {
  try {
    const params = {
      type: 'all'
    }
    if (Number(paymentType) === TRANSFER) {
      params.transfer = 1
    }
    if (Number(paymentType) === VIRTUAL_ACCOUNT) {
      params.virtualAccount = 1
    }
    dispatch(fetch())
    const response = await apiGet(params)

    if (response && response.success && response.data) {
      const listDropdown = response.data
      dispatch(receiveDropdown(listDropdown))
      return listDropdown
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

export {
  get
}
