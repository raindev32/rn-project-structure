import request from '../../utils/request'
import { apiAuth } from '../../utils/config'

const codeVerification = async (data) => {
  return request({
    url: `${apiAuth}/verification`,
    auth: true,
    data,
    method: 'post'
  })
}

const resendCodeVerification = async (data) => {
  return request({
    url: `${apiAuth}/request-verify/${data.type}`,
    auth: false,
    data,
    method: 'post'
  })
}

export {
  codeVerification,
  resendCodeVerification
}
