import request from '../../utils/request'

const queryProvince = () => {
  return request({
    url: '/province',
    auth: true,
    data: {
      type: 'all'
    },
    method: 'get'
  })
}

const queryCity = async (provinceId) => {
  return request({
    url: '/city',
    auth: true,
    data: {
      provinceId,
      type: 'all'
    },
    method: 'get'
  })
}

const querySubdistrict = async (cityId) => {
  return request({
    url: '/subdistrict',
    auth: true,
    data: {
      cityId,
      type: 'all'
    },
    method: 'get'
  })
}

export {
  queryProvince,
  queryCity,
  querySubdistrict
}
