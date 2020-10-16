import request from 'utils/request'
import { apiAuth } from 'utils/config'

const apiSendRequestForgotPassword = async (account, type) => {
  return request({
    url: `${apiAuth}/forgot-password/${type === '1' ? 'email' : 'phone'}`,
    data: {
      account,
      typeAccount: type
    },
    method: 'post'
  })
}

const apiResetPassword = async (data) => {
  return request({
    url: `${apiAuth}/reset-password/${data.data.typeAccount === '1' ? 'email' : 'phone'}`,
    data: {
      account: data.data.account,
      password: data.password
    },
    method: 'post'
  })
}

export {
  apiSendRequestForgotPassword,
  apiResetPassword
}
