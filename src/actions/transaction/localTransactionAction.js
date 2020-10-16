import {
  Image,
  Alert as NativeAlert,
  PermissionsAndroid
} from 'react-native'
import {
  set,
  get,
  remove
} from 'utils/storage'
import {
  change
} from 'redux-form'
import Alert from 'utils/alert'
import { Toast } from 'native-base'
import { RNPhotoEditor } from 'react-native-photo-editor'
import {
  getFileInfo,
  dupicateFile
} from 'utils/file'
import {
  changeFilter as changeFilterBundle,
  resetList as resetListBundle,
  getById as getBundleById
} from 'actions/product/bundleAction'
import {
  numberFormatter
} from 'utils/string'
import {
  RECEIVE_CART_DETAIL_LOCAL_TRANSACTION,
  RECEIVE_PHOTO_LIST,
  RECEIVE_PHOTO_DETAIL_LOCAL_TRANSACTION,
  RECEIVE_LOCAL_TRANSACTION,
  FAILED_LOCAL_TRANSACTION
} from '../types'

const receive = (currentItem) => {
  return {
    type: RECEIVE_LOCAL_TRANSACTION,
    payload: {
      currentItem
    }
  }
}

const receiveCartDetail = (cartDetail) => {
  return {
    type: RECEIVE_CART_DETAIL_LOCAL_TRANSACTION,
    payload: {
      cartDetail
    }
  }
}

const receivePhotoList = (photoList) => {
  return {
    type: RECEIVE_PHOTO_LIST,
    payload: {
      photoList
    }
  }
}

const receivePhotoDetail = (photoDetail) => {
  return {
    type: RECEIVE_PHOTO_DETAIL_LOCAL_TRANSACTION,
    payload: {
      photoDetail
    }
  }
}

const failed = (error) => {
  Alert.warning(error)
  return {
    type: FAILED_LOCAL_TRANSACTION,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const getCurrentTransaction = () => async (dispatch) => {
  const booking = await get('@Transaction')
  if (booking) {
    dispatch(receive(JSON.parse(booking)))
  } else {
    dispatch(receive({
      header: {},
      detail: []
    }))
  }
}

const editTransaction = (detail) => async (dispatch, getState) => {
  let { currentItem } = getState().localTransactionStore
  const newObject = {
    ...currentItem
  }
  if (newObject && detail) {
    newObject.detail = newObject.detail.map((item) => {
      if (item.index === detail.index) {
        return detail
      }
      return item
    })
    await set('@Transaction', JSON.stringify(newObject))
    dispatch(receive(newObject))
    dispatch(getCurrentTransaction())
  }
}

const updateCurrentItemToServer = (item, navigation) => async (dispatch) => {
  try {
    const product = await dispatch(getBundleById(item.id))
    const { detail, name } = item
    if (product) {
      let newObject = {
        ...item,
        ...product,
        detail
      }

      dispatch(editTransaction(newObject))
      dispatch(receiveCartDetail(newObject))
      dispatch(getCurrentTransaction())

      // update bundle
      dispatch(resetListBundle())
      dispatch(changeFilterBundle({
        page: 1
      }))
      navigation.navigate('CartDetail', { name })
    }
  } catch (error) {
    dispatch(failed('Error on update data'))
  }
}

const existsItem = (itemList = [], id) => {
  let exists = false
  const itemValue = itemList ? itemList.filter((filtered) => filtered.id === id) : itemList
  if (itemValue && itemValue.length > 0) {
    exists = true
  }
  return exists
}

const addNewItem = (itemList = [], newItem = {}) => {
  if (itemList && itemList.length > 0) {
    newItem.index = itemList[itemList.length - 1].index + 1
  } else if (itemList && itemList.length === 0) {
    newItem.index = 1
  }
  itemList.push(newItem)
  return itemList
}

const addTransaction = (detail, navigation) => async (dispatch, getState) => {
  let { currentItem } = getState().localTransactionStore

  try {
    if (currentItem && detail) {
      // Check Exists
      if (existsItem(currentItem.detail || [], detail.id)) {
        dispatch(failed('Product Already Exists'))
        return
      }
      // Add Item
      currentItem.detail = addNewItem(currentItem.detail || [], detail)
    }

    if (currentItem) {
      // currentItem.header.payment_amount = getTotalDpp(currentItem.detail)
      dispatch(change('TransactionForm', 'payment_amount', currentItem.header.payment_amount))
      await set('@Transaction', JSON.stringify(currentItem))
      dispatch(receive(currentItem))
      dispatch(getCurrentTransaction())
      Toast.show({
        text: 'Success Add Product',
        buttonText: 'Okay',
        type: 'success',
        position: 'top',
        duration: 2000
      })
      if (navigation) {
        dispatch(updateCurrentItemToServer(detail, navigation))
        navigation.navigate('Cart')
        navigation.navigate('CartDetail', { name: detail.name })
      }
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

const setCurrentItem = (cartDetail, type) => async (dispatch, getState) => {
  let {
    currentItem
  } = getState().localTransactionStore
  // Prevent redux reactive you need to create new object, not change currentItem (immutable)
  let newObject = {
    ...currentItem
  }
  newObject.detail = currentItem.detail.map((item) => {
    if (item.id === cartDetail.id) return cartDetail
    return item
  })
  dispatch(receive(newObject))
  await set('@Transaction', JSON.stringify(newObject))

  Toast.show({
    text: `Success ${type === 'add' ? 'Add' : 'Edit'} Photo`,
    buttonText: 'Okay',
    type: 'success',
    position: 'top',
    duration: 2000
  })
}

const setCartDetail = (photoList, type = 'add') => async (dispatch, getState) => {
  let {
    cartDetail
  } = getState().localTransactionStore
  // Prevent redux reactive you need to create new object, not change cartDetail (immutable)
  let newObject = {
    ...cartDetail
  }
  newObject.detail = cartDetail.detail.map((item) => {
    if (item.id === photoList.id) return photoList
    return item
  })
  dispatch(setCurrentItem(newObject, type))
  return dispatch(receiveCartDetail(newObject))
}

const editPhoto = (uri, index) => async (dispatch, getState) => {
  let {
    photoList,
    photoDetail
  } = getState().localTransactionStore
  // Prevent redux reactive you need to create new object, not change photoList (immutable)
  let newObject = {
    ...photoList
  }
  Image.getSize(uri, (width, height) => {
    if (
      newObject
      && newObject.product
      && (width < newObject.product.width
        || height < newObject.product.height)
    ) {
      NativeAlert.alert(`Require ${numberFormatter(newObject.product.width)} px x ${numberFormatter(newObject.product.height)} px. Minimum size of the image is not enough!`)
    }
  })

  if (newObject && newObject.photos) {
    // Prevent redux reactive you need to create new object, cannot use .push function
    newObject.photos = newObject.photos.map((item, key) => {
      if (item === photoDetail && index === key) return uri
      return item
    })
    dispatch(setCartDetail(newObject, 'edit'))
    dispatch(receivePhotoDetail(uri))
    return dispatch(receivePhotoList(newObject))
  }
}

const addMemo = (memo) => async (dispatch, getState) => {
  let {
    photoList
  } = getState().localTransactionStore
  // Prevent redux reactive you need to create new object, not change photoList (immutable)
  let newObject = {
    ...photoList
  }
  if (newObject) {
    // Prevent redux reactive you need to create new object, cannot use .push function
    newObject.memo = memo
    dispatch(setCartDetail(newObject, 'edit'))
    return dispatch(receivePhotoList(newObject))
  }
}

// just can read image on internal storage for now.
const photoEditor = (uri, onCancel, index) => async (dispatch) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Cool Photo App Camera Permission',
      message:
        'Cool Photo App needs access to your camera '
        + 'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK'
    },
  )
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    const request = await getFileInfo(uri)
    const newFullPath = await dupicateFile(request.path)

    RNPhotoEditor.Edit({
      path: newFullPath,
      hiddenControls: [],
      onDone: (data) => {
        dispatch(editPhoto(data, index))
        onCancel()
      }
    })
  }
}

const addPhoto = (uri) => async (dispatch, getState) => {
  let {
    photoList
  } = getState().localTransactionStore
  // Prevent redux reactive you need to create new object, not change photoList (immutable)
  let newObject = {
    ...photoList
  }

  if (newObject && newObject.photos && newObject.photos.length === newObject.qty) {
    Toast.show({
      text: 'Validation: exceed max photos',
      buttonText: 'Okay',
      position: 'top',
      type: 'warning',
      duration: 2000
    })
    return
  }

  if (newObject && newObject.photos) {
    const newPhoto = [uri]
    // Prevent redux reactive you need to create new object, cannot use .push function
    newObject.photos = newObject.photos.concat(newPhoto)
  } else {
    newObject.photos = [uri]
  }

  Image.getSize(uri, (width, height) => {
    if (
      newObject
      && newObject.product
      && (width < newObject.product.width
        || height < newObject.product.height)
    ) {
      NativeAlert.alert(`Require ${numberFormatter(newObject.product.width)} px x ${numberFormatter(newObject.product.height)} px. Minimum size of the image is not enough!`)
    }
  })

  dispatch(setCartDetail(newObject))
  return dispatch(receivePhotoList(newObject))
}

const deletePhoto = (index) => async (dispatch, getState) => {
  let {
    photoList
  } = getState().localTransactionStore
  // Prevent redux reactive you need to create new object, not change photoList (immutable)
  let newObject = {
    ...photoList
  }

  if (newObject && newObject.photos) {
    const newPhoto = newObject.photos.filter((filtered, key) => {
      if (key === index) return false
      return true
    })
    // Prevent redux reactive you need to create new object, cannot use .push function
    newObject.photos = newPhoto
  }
  dispatch(setCartDetail(newObject, 'edit'))
  return dispatch(receivePhotoList(newObject))
}

const deleteTransaction = (index, alert = true) => async (dispatch, getState) => {
  let { currentItem } = getState().localTransactionStore
  if (currentItem && currentItem.detail) {
    currentItem.detail = currentItem.detail.filter((filtered) => filtered.index !== index)
    // currentItem.header.payment_amount = getTotalDpp(currentItem.detail)
    dispatch(change('TransactionForm', 'payment_amount', currentItem.header.payment_amount))
    await set('@Transaction', JSON.stringify(currentItem))
    dispatch(receive(currentItem))
    if (alert) {
      Toast.show({
        text: 'Success Delete Product',
        buttonText: 'Okay',
        position: 'top',
        type: 'success',
        duration: 2000
      })
    }
    dispatch(getCurrentTransaction())
  }
}

const resetTransaction = () => async (dispatch) => {
  await remove('@Transaction')
  dispatch(getCurrentTransaction())
}

export {
  receiveCartDetail,
  updateCurrentItemToServer,
  getCurrentTransaction,
  receivePhotoDetail,
  receivePhotoList,
  addTransaction,
  addPhoto,
  deletePhoto,
  addMemo,
  editPhoto,
  photoEditor,
  deleteTransaction,
  editTransaction,
  resetTransaction
}
