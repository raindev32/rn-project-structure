import request from 'utils/request'
import { apiBank } from 'utils/config'

// Bank
const apiGet = async (data) => {
  return request({
    url: apiBank,
    auth: true,
    data,
    method: 'get'
  })
}

export {
  apiGet
}
