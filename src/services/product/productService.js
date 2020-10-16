import request from 'utils/request'
import { apiProduct } from 'utils/config'

const apiGetId = async (id, data) => {
  return request({
    url: `${apiProduct}/${id}`,
    data,
    method: 'get'
  })
}

const apiGet = async (data) => {
  return request({
    url: apiProduct,
    data,
    method: 'get'
  })
}

export {
  apiGetId,
  apiGet
}
