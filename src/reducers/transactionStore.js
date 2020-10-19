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
} from '../actions/types'

const initialState = {
  loading: false,
  filter: {
    order: '-tbl_transaction.id',
    relationship: 1,
    page: 1,
    pageSize: 16
  },
  countPhoto: 0,
  progress: 0,
  list: [],
  meta: {},
  dataSet: [],
  errorMessage: null,

  currentItem: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return { ...state, loading: true }
    case SUCCESS_TRANSACTION:
      return { ...state, loading: false }
    case RECEIVE_ITEM_TRANSACTION: {
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem
      }
    }
    case FAILED_TRANSACTION:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    case UPDATE_NUMBER_PHOTOS:
      return {
        ...state,
        countPhoto: action.payload.countPhoto
      }
    case UPDATE_PROGRESS_UPLOAD:
      return {
        ...state,
        progress: action.payload.progress
      }
    case RECEIVE_TRANSACTION:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case RESET_LIST_TRANSACTION:
      return {
        ...state,
        list: [],
        meta: {},
        dataSet: []
      }
    case UPDATE_STATE_TRANSACTION:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
