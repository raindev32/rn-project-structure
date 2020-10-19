import request from 'utils/request'

const apiSendComplain = async (id, data) => {
  return request({
    url: `/feedback/user/complain/${id}`,
    data,
    method: 'post'
  })
}

export {
  apiSendComplain
}
