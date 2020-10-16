import request from 'utils/request'
import { apiAuth } from 'utils/config'

const getMyData = async () => {
  return request({
    url: `${apiAuth}/me`,
    auth: true,
    method: 'get'
  })
}

const apiLogin = async (data) => {
  return request({
    url: `${apiAuth}/login`,
    data,
    method: 'post'
  })
}

const apiVerification = async (data) => {
  return request({
    url: `${apiAuth}/verification`,
    data,
    auth: true,
    method: 'post'
  })
}

const apiVerificationForgot = async (data) => {
  return request({
    url: `${apiAuth}/verification`,
    data,
    method: 'post'
  })
}

const getDataFB = async (token) => {
  return request({
    url: `https://graph.facebook.com/me?access_token=${token}&fields=email,name`,
    fullUrl: true,
    method: 'get'
  })
}

const getDataGoogle = async (token) => {
  return request({
    url: 'https://www.googleapis.com/oauth2/v1/userinfo',
    fullUrl: true,
    data: {
      access_token: token
    },
    method: 'get'
  })
}

const registerSocialMedia = async (data) => {
  return request({
    url: `${apiAuth}/sosmed/login`,
    data,
    method: 'post'
  })
}

export {
  getMyData,
  apiLogin,
  getDataFB,
  getDataGoogle,
  registerSocialMedia,
  apiVerification,
  apiVerificationForgot
}
