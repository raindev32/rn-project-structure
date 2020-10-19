import pagination from 'utils/pagination'
import Alert from 'utils/alert'
import {
  apiGetProductCategory
} from 'services/product/categoryService'
import {
  FETCH_PRODUCT_CATEGORY,
  RECEIVE_PRODUCT_CATEGORY,
  RECEIVE_CURRENT_PRODUCT_CATEGORY,
  RESET_LIST_PRODUCT_CATEGORY,
  UPDATE_STATE_PRODUCT_CATEGORY,
  FAILED_PRODUCT_CATEGORY
} from '../types'

const fetch = () => {
  return {
    type: FETCH_PRODUCT_CATEGORY
  }
}

const receive = (list, meta = {}) => {
  return {
    type: RECEIVE_PRODUCT_CATEGORY,
    payload: {
      list,
      meta
    }
  }
}

const receiveItem = (currentItem) => {
  return {
    type: RECEIVE_CURRENT_PRODUCT_CATEGORY,
    payload: {
      currentItem
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_PRODUCT_CATEGORY,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const updateState = (payload) => {
  return {
    type: UPDATE_STATE_PRODUCT_CATEGORY,
    payload
  }
}

const clearList = () => {
  return {
    type: RESET_LIST_PRODUCT_CATEGORY
  }
}

const getProductCategory = () => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetProductCategory()
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
  const { filter } = getState().productCategoryStore
  const { ...other } = params
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
    api: pageOffset => apiGetProductCategory({
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
  const { filter } = getState().productCategoryStore
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
  getProductCategory,
  get,
  resetList,
  changeFilter
}
