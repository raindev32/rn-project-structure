import request from 'utils/request'
import { apiPayment } from 'utils/config'

// Transaction
const apiInsert = async (id, data) => {
  return request({
    url: `${apiPayment}/invoice/${id}`,
    auth: true,
    data,
    method: 'post'
  })
}

export {
  apiInsert
}
