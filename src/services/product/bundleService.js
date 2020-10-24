import request from 'utils/request'
import { apiBundle } from 'utils/config'

const apiGetId = async (id, data) => {
  return request({
    url: `${apiBundle}/${id}`,
    data,
    method: 'get'
  })
}

const apiGet = async (data) => {
  return request({
    url: apiBundle,
    data,
    method: 'get'
  })
}

export {
  apiGetId,
  apiGet
}
