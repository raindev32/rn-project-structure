import {
  FETCH_TRACKING_SHIPPING,
  RECEIVE_TRACKING_SHIPPING,
  FAILED_TRACKING_SHIPPING
} from '../actions/types'

const initialState = {
  loading: false,
  trackingList: [],
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_TRACKING_SHIPPING:
      return { ...state, loading: true }
    case RECEIVE_TRACKING_SHIPPING:
      return {
        ...state,
        loading: false,
        trackingList: action.payload.trackingList
      }
    case FAILED_TRACKING_SHIPPING:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
