import pagination from 'utils/pagination'
import cache from 'cache'
import Alert from 'utils/alert'
import {
  apiGetId,
  apiGet,
  apiChooseStore
} from 'services/location/storeService'
import {
  getCourierCost
} from 'actions/utils/courierAction'
import { set } from 'utils/storage'
import {
  composeData
} from 'utils/string'
import {
  userData
} from '../auth/profile'
import {
  getCurrentTransaction
} from '../transaction/localTransactionAction'
import {
  FETCH_STORE,
  RECEIVE_STORE,
  FAILED_STORE,
  UPDATE_STATE_STORE,
  RECEIVE_ITEM_STORE,
  RESET_LIST_STORE,
  SUCCESS_STORE,
  RECEIVE_STORE_DROPDOWN
} from '../types'

const fetch = () => {
  return {
    type: FETCH_STORE
  }
}

const receive = (list, meta = {}) => {
  return {
    type: RECEIVE_STORE,
    payload: {
      list,
      meta
    }
  }
}

const receiveDropdown = (listDropdown, meta = {}) => {
  return {
    type: RECEIVE_STORE_DROPDOWN,
    payload: {
      listDropdown,
      meta
    }
  }
}

const success = (data) => {
  Alert.success(data)
  return {
    type: SUCCESS_STORE
  }
}

const receiveItem = (currentItem) => {
  return {
    type: RECEIVE_ITEM_STORE,
    payload: {
      currentItem
    }
  }
}

const updateState = (payload) => {
  return {
    type: UPDATE_STATE_STORE,
    payload
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_STORE,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const clearList = () => {
  return {
    type: RESET_LIST_STORE
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
      key: '@Store',
      api: () => apiGet({ type: 'all', field: 'id,name,address,subdistrictId,cityId,provinceId,postalCode,createdAt' }),
      type: 'data',
      id: 'id',
      name: 'name'
    })
    if (response) {
      const listStore = response.map((data) => composeData(data.id, `${data.name} (${data.address})`))
      dispatch(receiveDropdown(listStore))
      dispatch(receive(response))
    }
  } catch (error) {
    return dispatch(failed(error))
  }
}

const getList = (params) => async (dispatch, getState) => {
  const { filter } = getState().storeStore
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
  const { filter } = getState().storeStore
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

const storeState = (goTo, response, navigation) => async (dispatch, getState) => {
  if (response && response.data) {
    await set('userToken', JSON.stringify(response.data.token))
  }
  dispatch(getCurrentTransaction())
  dispatch(success(response.meta))
  await dispatch(userData())
  const { params } = navigation.state

  if (params && params.callback) {
    const { cartDetail } = getState().localTransactionStore
    const { currentItem } = getState().authStore
    let callbackData = []
    if (cartDetail && cartDetail.id) {
      callbackData = await dispatch(getCourierCost(cartDetail.id, currentItem.storeId))
    } else if (cartDetail && cartDetail.length > 0) {
      callbackData = await dispatch(getCourierCost(cartDetail.map(item => item.id), currentItem.storeId))
    }
    params.callback(callbackData)
  }
  navigation.navigate(goTo.goTo)
}

const chooseStore = (id, checkout, navigation) => async (dispatch) => {
  try {
    const response = await apiChooseStore({
      storeId: id
    })
    if (response.success) {
      if (checkout) {
        dispatch(storeState({ goTo: 'Checkout' }, response, navigation))
      } else {
        dispatch(storeState({ goTo: 'Home' }, response, navigation))
      }
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
  changeFilter,
  resetList,
  chooseStore
}
