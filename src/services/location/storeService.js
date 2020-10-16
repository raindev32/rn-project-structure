import request from 'utils/request'
import { apiStore, apiAuth } from 'utils/config'

const apiGetId = async (id) => {
  return request({
    url: `${apiStore}/${id}`,
    method: 'get'
  })
}

const apiGet = async (data) => {
  return request({
    url: apiStore,
    data,
    method: 'get'
  })
}

const apiChooseStore = async (data) => {
  return request({
    url: `${apiAuth}/edit-store`,
    auth: true,
    data,
    method: 'put'
  })
}

export {
  apiGetId,
  apiGet,
  apiChooseStore
}
