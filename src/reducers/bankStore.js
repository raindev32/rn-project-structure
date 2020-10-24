import {
  FETCH_BANK,
  FAILED_BANK,
  RECEIVE_BANK_DROPDOWN
} from '../actions/types'

const initialState = {
  loading: false,
  listDropdown: [],
  errorMessage: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_BANK:
      return { ...state, loading: true }
    case RECEIVE_BANK_DROPDOWN:
      return {
        ...state,
        loading: false,
        listDropdown: action.payload.listDropdown,
        meta: action.payload.meta
      }
    case FAILED_BANK:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
