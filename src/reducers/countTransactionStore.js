import {
  FETCH_COUNT_TRANSACTION,
  RECEIVE_COUNT_TRANSACTION,
  RESET_COUNT_TRANSACTION,
  FAILED_COUNT_TRANSACTION
} from '../actions/types'

const initialState = {
  loading: false,
  countTransactionList: {},
  meta: {},
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COUNT_TRANSACTION:
      return { ...state, loading: true }
    case RECEIVE_COUNT_TRANSACTION:
      return {
        ...state,
        loading: false,
        countTransactionList: action.payload.countTransactionList,
        meta: action.payload.meta
      }
    case RESET_COUNT_TRANSACTION:
      return {
        ...state,
        loading: false,
        countTransactionList: {},
        meta: {}
      }
    case FAILED_COUNT_TRANSACTION:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
