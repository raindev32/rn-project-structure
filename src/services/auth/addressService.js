import request from '../../utils/request'
import { apiAuth } from '../../utils/config'

const updateAdress = async (data) => {
  return request({
    url: `${apiAuth}/address`,
    auth: true,
    data,
    method: 'put'
  })
}

export {
  updateAdress
}
