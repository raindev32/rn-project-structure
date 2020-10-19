import {
  RECEIVE_CART_DETAIL_LOCAL_TRANSACTION,
  RECEIVE_PHOTO_LIST,
  RECEIVE_PHOTO_DETAIL_LOCAL_TRANSACTION,
  RECEIVE_LOCAL_TRANSACTION,
  FAILED_LOCAL_TRANSACTION
} from '../actions/types'

const initialState = {
  loading: false,
  currentItem: {
    header: {},
    detail: []
  },
  cartDetail: {},
  photoList: {},
  photoDetail: null,
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RECEIVE_CART_DETAIL_LOCAL_TRANSACTION:
      return {
        ...state,
        loading: false,
        cartDetail: action.payload.cartDetail
      }
    case RECEIVE_PHOTO_LIST:
      return {
        ...state,
        loading: false,
        photoList: action.payload.photoList
      }
    case RECEIVE_PHOTO_DETAIL_LOCAL_TRANSACTION:
      return {
        ...state,
        loading: false,
        photoDetail: action.payload.photoDetail
      }
    case RECEIVE_LOCAL_TRANSACTION:
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem,
        categoryName: action.payload.categoryName
      }
    case FAILED_LOCAL_TRANSACTION:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
