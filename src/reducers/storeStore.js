import {
  FETCH_STORE,
  RECEIVE_STORE,
  FAILED_STORE,
  UPDATE_STATE_STORE,
  RECEIVE_ITEM_STORE,
  RESET_LIST_STORE,
  SUCCESS_STORE,
  RECEIVE_STORE_DROPDOWN
} from '../actions/types'

const initialState = {
  loading: false,
  filter: {
    field: 'id,name,address,city,province,postalCode,createdAt',
    order: '-id',
    page: 1,
    pageSize: 16
  },
  list: [],
  listDropdown: [],
  meta: {},
  dataSet: [],
  errorMessage: null,

  currentItem: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_STORE:
      return { ...state, loading: true }
    case RECEIVE_STORE:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case RECEIVE_STORE_DROPDOWN:
      return {
        ...state,
        loading: false,
        listDropdown: action.payload.listDropdown,
        meta: action.payload.meta
      }
    case RECEIVE_ITEM_STORE:
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem
      }
    case SUCCESS_STORE:
      return { ...state, loading: false }
    case FAILED_STORE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    case RESET_LIST_STORE:
      return {
        ...state,
        list: [],
        meta: {},
        dataSet: []
      }
    case UPDATE_STATE_STORE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
