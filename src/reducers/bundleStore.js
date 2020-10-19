import {
  FETCH_BUNDLE,
  RECEIVE_ALL_BUNDLE,
  RECEIVE_BUNDLE,
  RECEIVE_ITEM_BUNDLE,
  UPDATE_STATE_BUNDLE,
  RESET_LIST_BUNDLE,
  FAILED_BUNDLE
} from '../actions/types'

const initialState = {
  loading: false,
  filter: {
    page: 1,
    pageSize: 10,
    relationship: 0
  },
  list: [],
  meta: {},
  dataSet: [],
  errorMessage: null,

  bundleList: [],
  currentItem: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_BUNDLE:
      return { ...state, loading: true }
    case RECEIVE_ALL_BUNDLE:
      return {
        ...state,
        loading: false,
        bundleList: action.payload.bundleList
      }
    case RECEIVE_BUNDLE:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case RECEIVE_ITEM_BUNDLE:
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem
      }
    case FAILED_BUNDLE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    case RESET_LIST_BUNDLE:
      return {
        ...state,
        list: [],
        meta: {},
        dataSet: []
      }
    case UPDATE_STATE_BUNDLE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
