import { get } from 'utils/storage'

const getPlayerId = async () => {
  const notif = await get('@NotificationBS')
  if (notif && notif !== 'undefined' && notif !== 'null') {
    const deviceInfo = JSON.parse(notif)
    return deviceInfo.userId
  }
  return null
}

export {
  getPlayerId
}
