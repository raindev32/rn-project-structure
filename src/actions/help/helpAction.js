import Alert from 'utils/alert'
import {
  apiGetHelp,
  apiGetHelpById
} from 'services/help/helpService'
import {
  FETCH_HELP,
  RECEIVE_HELP,
  FAILED_HELP,

  FETCH_HELP_DETAIL,
  RECEIVE_HELP_DETAIL,
  FAILED_HELP_DETAIL
} from '../types'

const fetch = () => {
  return {
    type: FETCH_HELP
  }
}

const fetchDetail = () => {
  return {
    type: FETCH_HELP_DETAIL
  }
}

const receiveItem = (helpItem) => {
  return {
    type: RECEIVE_HELP,
    payload: {
      helpItem
    }
  }
}

const receiveItemDetail = (helpDetailList) => {
  return {
    type: RECEIVE_HELP_DETAIL,
    payload: {
      helpDetailList
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_HELP,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const failedDetail = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_HELP_DETAIL,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getHelp = () => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetHelp()
    if (response && response.success) {
      dispatch(receiveItem(response.data))
      return response.data
    }
    dispatch(failed(response))
  } catch (error) {
    return dispatch(failed(error))
  }
}

const getHelpById = (id) => async (dispatch) => {
  try {
    dispatch(fetchDetail())
    const response = await apiGetHelpById(id)
    if (response && response.success) {
      dispatch(receiveItemDetail(response.data))
      return response.data
    }
    dispatch(failedDetail(response))
  } catch (error) {
    return dispatch(failedDetail(error))
  }
}

export {
  getHelp,
  getHelpById
}
