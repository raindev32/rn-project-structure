import {
  Platform
} from 'react-native'
import {
  checkLatestBuild,
  checkLatestRequire
} from 'services/utils/mobileVersionService'
import cache from 'cache'

/**
 *
 * @param {number} params.currentVersion
 */
const versionChecker = async (params) => {
  const { currentVersion } = params
  const platform = {
    device: Platform.OS
  }
  let latestRequire
  let latestBuild
  let latestBuildRequire = Number(currentVersion)
  let latestBuildNumber = Number(currentVersion)
  try {
    latestRequire = await cache({
      expired: 1 /* hour */,
      key: '@RequireVersion',
      api: checkLatestRequire,
      type: 'data',
      apiParams: platform
    })
    if (latestRequire) latestBuildRequire = latestRequire.build_number
    latestBuild = await cache({
      expired: 1 /* hour */,
      key: '@BuildVersion',
      api: checkLatestBuild,
      type: 'data',
      apiParams: platform
    })
    if (latestBuild) latestBuildNumber = latestBuild.build_number
  } catch (error) {
    console.log('error: ', error)
  }

  if (Number(currentVersion) < latestBuildRequire) {
    return {
      data: latestRequire,
      type: 'force'
    }
  }
  if (Number(currentVersion) < latestBuildNumber) {
    return {
      data: latestBuild,
      type: 'popup'
    }
  }
  return 'none'
}

export default versionChecker
