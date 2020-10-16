import {
  API_DEBUG,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_VERSION,

  IMAGE_PROTOCOL,
  IMAGE_HOST,
  IMAGE_PORT,
  IMAGE_VERSION
} from 'react-native-dotenv'

export const debug = API_DEBUG
export const APIPROTOCOL = API_PROTOCOL
export const APIHOST = API_HOST
export const APIPORT = API_PORT
export const APIVERSION = API_VERSION
export const APIURL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}${APIVERSION}`

export const IMAGEPROTOCOL = IMAGE_PROTOCOL
export const IMAGEHOST = IMAGE_HOST
export const IMAGEPORT = IMAGE_PORT
export const IMAGEVERSION = IMAGE_VERSION
export const IMAGEURL = `${IMAGE_PROTOCOL}://${IMAGE_HOST}:${IMAGE_PORT}${IMAGEVERSION}`

export const apiAuth = '/auth'
export const apiSetting = '/setting'
export const apiPromo = '/promo'
export const apiStore = '/store'
export const apiStoreTime = '/store-time'
export const apiMemberFeature = '/member-feature'
export const apiMemberFeatureUsage = '/member-feature-usage'
export const apiMemberType = '/member-type'
export const apiProduct = '/product'
export const apiProductCategory = '/product-category'
export const apiMemberRequirement = '/member-requirement'
export const apiEmployee = '/employee'
export const apiUpgradeMember = '/upgrade-member'
export const apiUtils = '/utils'
export const apiBank = '/bank'
export const apiCourier = '/courier'
export const apiBooking = '/booking'
export const apiTransaction = '/transaction'
export const apiTransactionUser = '/transaction-user'
export const apiFeedback = '/feedback'
export const apiPayment = '/payment'
export const apiMemberPoint = '/member-point'
export const apiImage = '/image/upload'
export const apiReport = '/report'
export const apiBundle = '/bundle'

export const optionsImage = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
