import pagination from 'utils/pagination'
import cache from 'cache'
import Alert from 'utils/alert'
import {
  apiGetId,
  apiGet,
  apiInsert,
  apiUpdate
} from 'services/content/promoService'
import { uploadImage } from 'actions/utils/imageAction'
import { remove } from 'utils/storage'
import {
  FETCH_PROMO,
  RECEIVE_PROMO,
  RECEIVE_ITEM_PROMO,
  UPDATE_STATE_PROMO,
  RESET_LIST_PROMO,
  SUCCESS_PROMO,
  FAILED_PROMO,
  RECEIVE_PROMO_SLIDER
} from '../types'

const fetch = () => {
  return {
    type: FETCH_PROMO
  }
}

const receive = (list, meta = {}) => {
  return {
    type: RECEIVE_PROMO,
    payload: {
      list,
      meta
    }
  }
}

const receiveSlider = (listSlider, meta = {}) => {
  return {
    type: RECEIVE_PROMO_SLIDER,
    payload: {
      listSlider,
      meta
    }
  }
}

const receiveItem = (currentItem) => {
  return {
    type: RECEIVE_ITEM_PROMO,
    payload: {
      currentItem
    }
  }
}

// const success = () => {
//   return {
//     type: SUCCESS_PROMO
//   }
// }

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_PROMO,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const success = (data) => {
  Alert.success(data)
  return {
    type: SUCCESS_PROMO
  }
}

const updateState = (payload) => {
  return {
    type: UPDATE_STATE_PROMO,
    payload
  }
}

const clearList = () => {
  return {
    type: RESET_LIST_PROMO
  }
}

const getById = (id) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetId(id)
    if (response && response.success) {
      dispatch(receiveItem(response.data))
      return response.data
    }
    dispatch(failed(response))
  } catch (error) {
    return dispatch(failed(error))
  }
}

const get = () => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await cache({
      expired: 1 /* hour */,
      key: '@Promo',
      api: () => apiGet({ type: 'all', field: 'image,id,name,startDate,endDate,createdAt', order: '-id' }),
      type: 'data'
    })
    if (response) {
      dispatch(receiveSlider(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

const getList = (params) => async (dispatch, getState) => {
  const { filter } = getState().promoStore
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
    api: (pageOffset) => apiGet({
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
  const { filter } = getState().promoStore
  dispatch(updateState({
    filter: {
      ...filter,
      ...params
    }
  }))
  dispatch(getList({
    ...filter,
    ...params
  }))
}

const insert = (data, navigation) => async (dispatch) => {
  try {
    if (data && data.image) {
      data.image = await dispatch(uploadImage('slides', data.image))
    }
    const response = await apiInsert(data)
    if (response.success) {
      await remove('@Promo')
      dispatch(get())
      dispatch(success(response.meta))
      dispatch(changeFilter({
        page: 1,
        pageSize: 16,
        q: ''
      }))
      navigation.navigate('ListPromo')
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

const update = (id, data, navigation) => async (dispatch) => {
  try {
    if (data && data.image) {
      data.image = await dispatch(uploadImage('slides', data.image))
    }
    const response = await apiUpdate(id, data)
    if (response.success) {
      await remove('@Promo')
      dispatch(get())
      dispatch(success(response.meta))
      dispatch(changeFilter({
        page: 1,
        pageSize: 16,
        q: ''
      }))
      navigation.navigate('ListPromo')
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

export {
  getById,
  get,
  resetList,
  changeFilter,
  insert,
  update
}
