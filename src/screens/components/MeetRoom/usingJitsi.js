import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { API_PROTOCOL, DEFAULT_API_MEET } from 'utils/variable'
import JitsiMeet from 'react-native-jitsi-meet'

const usingJitsi = (
  roomName,
  userData,
  password,
  protocol = API_PROTOCOL,
  domain = DEFAULT_API_MEET
) => {
  useEffect(() => {
    const url = `${protocol}${domain}${roomName}`
    const userInfo = {
      displayName: userData.name,
      email: userData.email,
      avatar: userData.avatar
    }
    const authentication = password

    JitsiMeet.call(url, userInfo, authentication)
    /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
    /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
  }, [])

  return JitsiMeet
}

usingJitsi.propTypes = {
  options: PropTypes.shape({
    roomName: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    parentNode: PropTypes.string,
    configOverwrite: PropTypes.string,
    interfaceConfigOverwrite: PropTypes.object,
    noSSL: PropTypes.bool,
    jwt: PropTypes.string,
    onload: PropTypes.func,
    invitees: PropTypes.array,
    devices: PropTypes.object,
    userInfo: PropTypes.object
  }),
  domain: PropTypes.string
}
export default usingJitsi
