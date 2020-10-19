import { get, set } from 'utils/storage'
import { queryProvince, queryCity, querySubdistrict } from 'services/utils/regionalService'
import {
  composeData
} from 'utils/string'

const returnData = (data, type) => {
  switch (type) {
    case 'province':
      return data.map(({ id, name }) => composeData(id, name))
    case 'city':
      return data.map(({ id, name }) => composeData(id, name))
    case 'subdistrict':
      return data.map(({ id, name }) => composeData(id, name))
    default: {
      return []
    }
  }
}

const regional = async ({ id, type = 'province' }) => {
  let responseData = []
  let data = []
  let storage
  let key = '@Province'
  switch (type) {
    case 'province': {
      key = '@Province'
      break
    }
    case 'city': {
      key = '@City'
      break
    }
    case 'subdistrict': {
      key = '@Subdistrict'
      break
    }
    default: {
      data = []
    }
  }

  try {
    storage = await get(key)
  } catch (error) {
    console.log('Storage Failed: ', storage)
  }

  if (storage !== null) {
    data = JSON.parse(storage || '[]')
    if (type === 'city') data = data.filter(filtered => Number(filtered.provinceId) === Number(id))
    if (type === 'subdistrict') data = data.filter(filtered => Number(filtered.cityId) === Number(id))
    responseData = returnData(data, type)
  }
  if (data.length === 0) {
    let api
    try {
      if (type === 'province') {
        api = await queryProvince()
      } else if (type === 'city') {
        api = await queryCity(id, type)
      } else {
        api = await querySubdistrict(id, type)
      }
      if (api.success) {
        const { data } = api
        await set(key, JSON.stringify(data.concat(JSON.parse(storage || '[]'))))
        responseData = returnData(data, type)
      }
    } catch (error) {
      console.log('Request Failed: ', error)
    }
  }
  return responseData
}

export default regional
