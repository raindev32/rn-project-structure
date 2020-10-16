import {
  FETCH_PRODUCT_CATEGORY,
  RECEIVE_PRODUCT_CATEGORY,
  RECEIVE_CURRENT_PRODUCT_CATEGORY,
  RESET_LIST_PRODUCT_CATEGORY,
  UPDATE_STATE_PRODUCT_CATEGORY,
  FAILED_PRODUCT_CATEGORY
} from 'actions/types'

const initialState = {
  loading: false,
  filter: {
    page: 1,
    pageSize: 16
  },
  list: [],
  currentItem: [],
  meta: {},
  dataSet: [],
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORY:
      return { ...state, loading: true }
    case RECEIVE_PRODUCT_CATEGORY:
      return {
        ...state,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case RECEIVE_CURRENT_PRODUCT_CATEGORY:
      return {
        ...state,
        currentItem: action.payload.currentItem
      }
    case RESET_LIST_PRODUCT_CATEGORY:
      return {
        ...state,
        list: [],
        meta: {},
        dataSet: []
      }
    case UPDATE_STATE_PRODUCT_CATEGORY:
      return { ...state, ...action.payload }
    case FAILED_PRODUCT_CATEGORY:
      return {
        ...state,
        errorMessage: action.payload.error,
        loading: false
      }
    default:
      return state
  }
}
