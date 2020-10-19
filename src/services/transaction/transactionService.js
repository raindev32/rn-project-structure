import request from 'utils/request'
import { apiTransaction, apiTransactionUser, apiFeedback } from 'utils/config'

// Transaction
const apiGet = async (data) => {
  return request({
    url: apiTransactionUser,
    data,
    auth: true,
    method: 'get'
  })
}

// Transaction
const apiGetId = async (id, data) => {
  return request({
    url: `${apiTransactionUser}/${id}`,
    data,
    auth: true,
    method: 'get'
  })
}

// Transaction
const apiInsert = async (data) => {
  return request({
    url: apiTransaction,
    auth: true,
    data,
    method: 'post'
  })
}

// Transaction
const apiAccept = async (id) => {
  return request({
    url: `${apiTransactionUser}/accept/${id}`,
    auth: true,
    method: 'put'
  })
}

// Transaction
const apiComplain = async (id, data) => {
  return request({
    url: `${apiFeedback}/user/complain/${id}`,
    auth: true,
    data,
    method: 'post'
  })
}

// Count Transaction
const apiCountTransaction = async (data) => {
  return request({
    url: '/count-transaction',
    auth: true,
    data,
    method: 'get'
  })
}

// Complain History
const apiComplainHistory = async (id, data) => {
  return request({
    url: `${apiFeedback}/user-acceptance/${id}`,
    auth: true,
    data,
    method: 'get'
  })
}

export {
  apiGet,
  apiGetId,
  apiInsert,
  apiAccept,
  apiComplain,
  apiCountTransaction,
  apiComplainHistory
}
