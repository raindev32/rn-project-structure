import {
  FETCH_PRODUCT,
  RECEIVE_PRODUCT,
  FAILED_PRODUCT
} from '../actions/types'

const initialState = {
  loading: false,
  productItem: [],
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return { ...state, loading: true }
    case RECEIVE_PRODUCT:
      return {
        ...state,
        loading: false,
        productItem: action.payload.productItem
      }
    case FAILED_PRODUCT:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
