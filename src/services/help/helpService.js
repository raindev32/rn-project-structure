import request from 'utils/request'

const apiGetHelp = async (data) => {
  return request({
    url: '/help',
    data,
    method: 'get'
  })
}

const apiGetHelpById = async (id, data) => {
  return request({
    url: `/help/${id}`,
    data,
    method: 'get'
  })
}

export {
  apiGetHelp,
  apiGetHelpById
}
