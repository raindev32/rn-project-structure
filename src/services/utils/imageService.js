import request from 'utils/request'
import { IMAGEURL, apiImage } from 'utils/config'

// User
const apiUpload = async (type = 'products', data) => {
  return request({
    url: `${IMAGEURL}${apiImage}/${type}`,
    fullUrl: true,
    auth: true,
    data,
    method: 'post'
  })
}

export {
  apiUpload
}
