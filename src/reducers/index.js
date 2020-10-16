import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authStore from './authStore'
import bundleStore from './bundleStore'
import localTransactionStore from './localTransactionStore'
import transactionStore from './transactionStore'
import bankStore from './bankStore'
import storeStore from './storeStore'
import courierStore from './courierStore'
import countTransactionStore from './countTransactionStore'
import productStore from './productStore'
import productCategoryStore from './productCategoryStore'
import trackingShippingStore from './trackingShippingStore'

export default combineReducers({
  form: formReducer,
  authStore,
  bundleStore,
  localTransactionStore,
  transactionStore,
  bankStore,
  storeStore,
  courierStore,
  countTransactionStore,
  productStore,
  productCategoryStore,
  trackingShippingStore
})
