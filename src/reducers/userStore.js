import {
  FETCH_USER,
  RECEIVE_USER,
  RECEIVE_ITEM_USER,
  SUCCESS_USER,
  FAILED_USER,
  UPDATE_STATE_USER,
  RESET_LIST_USER
} from 'actions/types'

const initialState = {
  loading: false,
  filter: {
    order: '-id',
    page: 1,
    pageSize: 16
  },
  list: [],
  meta: {},
  dataSet: [],
  errorMessage: null,

  currentItem: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, loading: true }
    case RECEIVE_USER:
      return {
        ...state,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case RECEIVE_ITEM_USER:
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem
      }
    case SUCCESS_USER:
      return { ...state, loading: false }
    case FAILED_USER:
      return {
        ...state,
        errorMessage: action.payload.error,
        loading: false
      }
    case RESET_LIST_USER:
      return {
        ...state,
        list: [],
        meta: {},
        dataSet: []
      }
    case UPDATE_STATE_USER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
