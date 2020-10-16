import pagination from 'utils/pagination'
import Alert from 'utils/alert'
import {
  apiGet,
  apiGetId,
  apiInsert,
  apiAccept
} from 'services/transaction/transactionService'
import {
  apiInsert as apiInsertPayment
} from 'services/transaction/paymentService'
import {
  getCurrentTransaction,
  deleteTransaction
} from 'actions/transaction/localTransactionAction'
import { getCountTransaction } from 'actions/transaction/countTransactionAction'
import { uploadImage } from 'actions/utils/imageAction'
import {
  ValidationError
} from 'utils/error'
import {
  FETCH_TRANSACTION,
  RECEIVE_ITEM_TRANSACTION,
  SUCCESS_TRANSACTION,
  FAILED_TRANSACTION,

  UPDATE_NUMBER_PHOTOS,
  UPDATE_PROGRESS_UPLOAD,

  RECEIVE_TRANSACTION,
  UPDATE_STATE_TRANSACTION,
  RESET_LIST_TRANSACTION
} from '../types'

const fetch = () => {
  return {
    type: FETCH_TRANSACTION
  }
}

const updateNumberOfPhotos = (countPhoto) => {
  return {
    type: UPDATE_NUMBER_PHOTOS,
    payload: {
      countPhoto
    }
  }
}

const updateProgressOfUpload = (progress) => {
  return {
    type: UPDATE_PROGRESS_UPLOAD,
    payload: {
      progress
    }
  }
}

const receive = (list, meta = {}) => {
  return {
    type: RECEIVE_TRANSACTION,
    payload: {
      list,
      meta
    }
  }
}

const updateState = (payload) => {
  return {
    type: UPDATE_STATE_TRANSACTION,
    payload
  }
}

const clearList = () => {
  return {
    type: RESET_LIST_TRANSACTION
  }
}

const receiveItem = (currentItem) => {
  return {
    type: RECEIVE_ITEM_TRANSACTION,
    payload: {
      currentItem
    }
  }
}

const success = (data) => {
  Alert.success(data)
  return {
    type: SUCCESS_TRANSACTION
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_TRANSACTION,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getById = (id) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiGetId(id, { relationship: 1 })
    if (response && response.success) {
      dispatch(receiveItem(response.data))
      return response.data
    }
    dispatch(failed(response))
  } catch (error) {
    return dispatch(failed(error))
  }
}

const get = (params) => async (dispatch, getState) => {
  const { filter } = getState().transactionStore
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

const changeFilter = (params) => async (dispatch, getState) => {
  const { filter } = getState().transactionStore
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

const resetList = () => async (dispatch) => {
  dispatch(clearList())
}

const uploadRetry = (photo, retryCount = 1) => async (dispatch) => {
  if (photo) {
    // eslint-disable-next-line no-await-in-loop
    const responseImage = await dispatch(uploadImage('transaction', photo, false))
    if (responseImage) {
      return responseImage
    }
    if (retryCount > 5) {
      throw new ValidationError('Max retry exceed')
    }
    return dispatch(uploadRetry(photo, retryCount + 1))
  }
}

const countPhotos = (list = []) => {
  return list.reduce((prev, next) => {
    if (next.photos) {
      return prev.concat(next.photos)
    }
    return prev
  }, [])
    .length
}

const checkExistsUploadedImage = (source, list = []) => {
  let existsList = list.filter(filtered => filtered.item === source)
  if (existsList && existsList.length > 0) {
    return existsList[0].image
  }
  return null
}

const uploadImageOfDetail = (item) => async (dispatch, getState) => {
  const detail = []
  let index
  for (index in item.detail) {
    const data = item.detail[index]
    let images = []
    let key
    for (key in data.photos) {
      const dataItem = data.photos[key]
      const exists = checkExistsUploadedImage(dataItem, images)
      let responseImage
      if (exists) {
        responseImage = exists
      } else {
        // eslint-disable-next-line no-await-in-loop
        responseImage = await dispatch(uploadRetry(dataItem))
      }
      if (responseImage) {
        images.push({
          item: dataItem, // Image Gallery Source
          image: responseImage // Image Url
        })
        const { progress } = getState().transactionStore
        dispatch(updateProgressOfUpload(progress + 1))
      } else {
        throw new ValidationError('Error on upload image, cannot find image location')
      }
    }

    detail.push({
      bundleId: data.bundleId,
      productId: data.productId,
      memo: data.memo,
      qty: data.qty,
      image: images.map((item) => item.image)
    })
  }
  return detail
}

const insert = (item, bank, courier, paymentType, navigation) => async (dispatch) => {
  try {
    let count = 0
    if (item && item.id) {
      count += countPhotos(item.detail)
    } else if (item && item.length > 0) {
      let key
      for (key in item) {
        count += countPhotos(item[key].detail)
      }
    }
    dispatch(updateNumberOfPhotos(count))
    dispatch(updateProgressOfUpload(0))
    dispatch(fetch(count))

    let bankObject
    if (bank && typeof bank === 'string') {
      bankObject = JSON.parse(bank)
    }

    let courierObject
    if (courier && typeof courier === 'string') {
      courierObject = JSON.parse(courier)
    }

    let detail = []
    const bundle = []
    if (!item) throw new ValidationError('Validation - missing item')
    if (item && item.id && item.detail.length > 0) {
      const result = await dispatch(uploadImageOfDetail(item))
      detail = detail.concat(result)
    } else if (item && item.length > 0) {
      let key
      for (key in item) {
        // eslint-disable-next-line no-await-in-loop
        const result = await dispatch(uploadImageOfDetail(item[key]))
        detail = detail.concat(result)
        bundle.push({
          bundleId: item[key].id
        })
      }
    }

    const header = {
      bankId: bankObject.id,
      bundleId: item && item.id ? item.id : undefined,
      paymentType
    }
    if (detail && detail.length === 0) throw new ValidationError('Validation - please choose another product')
    const params = {
      header,
      courier: courierObject,
      detail,
      bundle
    }
    const response = await apiInsert(params)
    if (response && response.success) {
      dispatch(success(response.meta))
      navigation.navigate('Cart')
      navigation.navigate('TransactionDetail', {
        id: response.data.id
      })

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // !!! Delete localstorage item !!!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (item && item.id && item.detail.length > 0) {
        dispatch(deleteTransaction(item.index, false))
      } else if (item && item.length > 0) {
        let key
        for (key in item) {
          // eslint-disable-next-line no-await-in-loop
          dispatch(deleteTransaction(item[key].index, false))
        }
      }
      dispatch(updateNumberOfPhotos(0))
      dispatch(updateProgressOfUpload(0))
      dispatch(getCountTransaction())
      dispatch(getCurrentTransaction())
    } else {
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error && error.message ? error.message : error))
  }
}

const uploadInvoice = (transId, image, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const responseImage = await dispatch(uploadImage('payment', image, false))
    if (responseImage) {
      const response = await apiInsertPayment(transId, {
        image: responseImage
      })
      if (response.success) {
        dispatch(getById(transId))
        dispatch(success(response.meta))
        navigation.navigate('TransactionDetail', {
          id: transId
        })
      } else {
        dispatch(failed(response))
      }
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

const acceptProduct = (id, navigation) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiAccept(id)
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

export {
  changeFilter,
  resetList,
  getById,
  insert,
  uploadInvoice,
  acceptProduct,
  failed
}
