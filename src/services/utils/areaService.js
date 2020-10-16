import request from 'utils/request'
import { apiUtils } from 'utils/config'

// User
const apiGet = async (data) => {
  return request({
    url: `${apiUtils}/codearea`,
    auth: true,
    data,
    method: 'get'
  })
}

export {
  apiGet
}
