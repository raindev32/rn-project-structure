import pagination from 'utils/pagination'
import Alert from 'utils/alert'
import {
  apiGetId,
  apiGet
} from 'services/product/bundleService'
import {
  FETCH_BUNDLE,
  RECEIVE_BUNDLE,
  RECEIVE_ALL_BUNDLE,
  RECEIVE_ITEM_BUNDLE,
  UPDATE_STATE_BUNDLE,
  RESET_LIST_BUNDLE,
  FAILED_BUNDLE
} from '../types'

const fetch = () => {
  return {
    type: FETCH_BUNDLE
  }
}

const receive = (list, meta = {}) => {
  return {
    type: RECEIVE_BUNDLE,
    payload: {
      list,
      meta
    }
  }
}

const receiveAllItem = (bundleList) => {
  return {
    type: RECEIVE_ALL_BUNDLE,
    payload: {
      bundleList
    }
  }
}

const receiveItem = (currentItem) => {
  return {
    type: RECEIVE_ITEM_BUNDLE,
    payload: {
      currentItem
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_BUNDLE,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const updateState = (payload) => {
  return {
    type: UPDATE_STATE_BUNDLE,
    payload
  }
}

const clearList = () => {
  return {
    type: RESET_LIST_BUNDLE
  }
}

const getAllBundle = (data) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGet(data)
    if (response && response.success) {
      dispatch(receiveAllItem(response.data))
      return response.data
    }
    dispatch(failed(response))
  } catch (error) {
    return dispatch(failed(error))
  }
}

const getById = (id, categoryId) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetId(id, { relationship: 1, categoryId })
    if (response && response.success) {
      dispatch(receiveItem(response.data))
      return response.data
    }
    dispatch(failed(response))
  } catch (error) {
    return dispatch(failed(error))
  }
}

const get = params => async (dispatch, getState) => {
  const { filter } = getState().bundleStore
  const { currentData, token, ...other } = params
  const dataset = await pagination({
    pageSize: filter.page,
    fetch: () => dispatch(updateState({
      loading: true
    })),
    receive: (data) => {
      dispatch(receive(data))
    },
    success: () => {
      dispatch(updateState({
        loading: false
      }))
    },
    failed: ({ message }) => dispatch(failed(message)),
    api: pageOffset => apiGet({
      ...filter,
      ...other,
      page: pageOffset + 1
    })
  })

  dataset.setReadOffset(0)

  dispatch(updateState({
    dataSet: dataset
  }))
}

const resetList = () => async (dispatch) => {
  dispatch(clearList())
}

const changeFilter = (params) => async (dispatch, getState) => {
  const { filter } = getState().bundleStore
  dispatch(updateState({
    filter: {
      ...filter,
      ...params
    }
  }))
  dispatch(get({
    ...filter,
    ...params
  }))
}

export {
  getAllBundle,
  getById,
  get,
  resetList,
  changeFilter
}
