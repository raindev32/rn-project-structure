import {
  FETCH_AUTH,
  RECEIVE_AUTH,
  SUCCESS_AUTH,
  FAILED_AUTH
} from '../actions/types'

const initialState = {
  loading: false,
  currentItem: {},
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_AUTH:
      return { ...state, loading: true }
    case RECEIVE_AUTH:
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem
      }
    case SUCCESS_AUTH:
      return { ...state, loading: false }
    case FAILED_AUTH:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
