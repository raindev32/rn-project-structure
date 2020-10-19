import {
  FETCH_COURIER,
  RECEIVE_COURIER,
  FAILED_COURIER
} from '../actions/types'

const initialState = {
  loading: false,
  list: [],
  meta: {},
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_COURIER:
      return { ...state, loading: true }
    case RECEIVE_COURIER:
      return {
        ...state,
        loading: false,
        list: action.payload.list,
        meta: action.payload.meta
      }
    case FAILED_COURIER:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
