import { get, set } from 'utils/storage'
import {
  composeData
} from 'utils/string'

/**
 * @author Yosef
 * @param {Array} data
 * @param {string} type
 * @param {string} id
 * @param {string} name
 * @returns {Array}
 */
const returnData = (data, type, id, name) => {
  switch (type) {
    case 'dropdown':
      return data.map((data) => {
        const idData = data[id]
        const nameData = data[name]
        return composeData(idData, nameData)
      })
    case 'data':
      return data
    default:
      return data
  }
}

/**
 * @author Yosef
 * @param {Object} params
 * @param {number} params.expired date to cache (in hour)
 * @param {string} params.key key to the AsyncStorage
 * @param {string} params.key key to the AsyncStorage
 * @param {Function} params.api api function to access server
 * @param {string} params.id api function to access server
 * @param {string} params.name api function to access server
 * @returns {Array}
 *
 * @private
 */
const getUsingApi = async (params) => {
  const {
    key,
    api,
    expired,
    type,
    id,
    name,
    apiParams
  } = params
  Date.prototype.getUnixTime = function () { return this.getTime() / 1000 || 0 }
  if (!Date.now) Date.now = function () { return new Date() }
  Date.time = function () { return Date.now().getUnixTime() }
  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h)
    return this
  }

  try {
    const response = await api(apiParams)
    if (response.success) {
      const { data } = response
      await set(key, JSON.stringify({ expired: new Date().addHours(expired).getUnixTime(), data }))
      const responseData = returnData(data, type, id, name)
      return responseData
    }
  } catch (error) {
    console.log('Request Failed: ', error)
  }
}

/**
 * @author Yosef
 * @param {Object} params
 * @param {number} params.expired date to cache (in hour)
 * @param {string} params.key key to the AsyncStorage
 * @param {string} params.key key to the AsyncStorage
 * @param {Function} params.api api function to access server
 * @param {string} params.id api function to access server
 * @param {string} params.name api function to access server
 * @returns {Array}
 *
 * @private
 */
const getUsingCache = async (params) => {
  const {
    key,
    api,
    expired,
    type,
    id,
    name,
    apiParams
  } = params
  Date.prototype.getUnixTime = function () { return this.getTime() / 1000 || 0 }
  if (!Date.now) Date.now = function () { return new Date() }
  Date.time = function () { return Date.now().getUnixTime() }

  let storage
  try {
    storage = await get(key)

    const asyncStorage = JSON.parse(storage || '{}')
    const { data } = asyncStorage
    let responseData
    if (storage !== null && parseFloat(asyncStorage.expired) > new Date().getUnixTime() && (Array.isArray(data) === false || data.length > 0)) {
      responseData = returnData(data, type, id, name)
    } else {
      responseData = await getUsingApi({
        key,
        api,
        expired,
        type,
        id,
        name,
        apiParams
      })
    }
    return responseData
  } catch (error) {
    console.log('Storage Failed: ', storage)
  }
}

/**
 * @author Yosef
 * @param {Object} params
 * @param {number} params.expired date to cache (in hour)
 * @param {string} params.key key to the AsyncStorage
 * @param {string} params.key key to the AsyncStorage
 * @param {Function} params.api api function to access server
 * @param {string} params.id api function to access server
 * @param {string} params.name api function to access server
 * @returns {Array}
 *
 * @private
 */
const cache = async (params) => {
  const {
    expired = 1,
    api,
    key,
    type = 'dropdown',
    id,
    name,
    apiParams
  } = params
  let responseData = []

  responseData = await getUsingCache({
    key,
    api,
    expired,
    type,
    id,
    name,
    apiParams
  })
  return responseData
}

export default cache
