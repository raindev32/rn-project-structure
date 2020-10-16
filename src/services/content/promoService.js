import request from 'utils/request'
import { apiPromo } from 'utils/config'

const apiGetId = async (id, data) => {
  return request({
    url: `${apiPromo}/${id}`,
    data,
    method: 'get'
  })
}

const apiGet = async (data) => {
  return request({
    url: apiPromo,
    data,
    method: 'get'
  })
}

const apiInsert = async (data) => {
  return request({
    url: apiPromo,
    auth: true,
    data,
    method: 'post'
  })
}

const apiUpdate = async (id, data) => {
  return request({
    url: `${apiPromo}/${id}`,
    auth: true,
    data,
    method: 'put'
  })
}

const apiDelete = async (id, data) => {
  return request({
    url: `${apiPromo}/${id}`,
    auth: true,
    data,
    method: 'delete'
  })
}

export {
  apiGetId,
  apiGet,
  apiInsert,
  apiUpdate,
  apiDelete
}
