import request from 'utils/request'

const checkLatestBuild = async (data) => {
  return request({
    url: '/mobile-version/latest',
    data,
    method: 'get'
  })
}

const checkLatestRequire = async (data) => {
  return request({
    url: '/mobile-version/require',
    data,
    method: 'get'
  })
}

export {
  checkLatestBuild,
  checkLatestRequire
}
