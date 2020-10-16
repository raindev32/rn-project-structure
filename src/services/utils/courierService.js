import request from 'utils/request'
import { apiCourier } from 'utils/config'

// Courier Cost
const apiGetProductCost = async (data) => {
  return request({
    url: `${apiCourier}/product`,
    auth: true,
    data,
    method: 'post'
  })
}

// Courier Cost
const apiGetWayBill = async (data) => {
  return request({
    url: `${apiCourier}/waybill`,
    auth: true,
    data,
    method: 'post'
  })
}

export {
  apiGetProductCost,
  apiGetWayBill
}
