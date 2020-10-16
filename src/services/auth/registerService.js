import request from 'utils/request'
import { apiAuth } from 'utils/config'

const apiRegister = async (data) => {
  return request({
    url: `${apiAuth}/register`,
    data,
    method: 'post'
  })
}

const apiVerification = async (data) => {
  return request({
    url: `${apiAuth}/verification`,
    auth: true,
    data,
    method: 'post'
  })
}

const apiRequestVerification = async (account, type) => {
  return request({
    url: `${apiAuth}/request-verify/${type === 1 ? 'email' : 'phone'}`,
    data: {
      account,
      typeAccount: type
    },
    method: 'post'
  })
}

export {
  apiRegister,
  apiVerification,
  apiRequestVerification
}
