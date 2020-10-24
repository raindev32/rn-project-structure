import request from 'utils/request'

const apiGetProductCategory = async (data) => {
  return request({
    url: '/category',
    data,
    method: 'get'
  })
}

export {
  apiGetProductCategory
}
