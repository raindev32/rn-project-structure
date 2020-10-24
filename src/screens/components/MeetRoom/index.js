import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'

import usingJitsi from './usingJitsi'

const MeetRoom = ({
  roomName,
  userData,
  password
}) => {
  const styles = StyleSheet.create({
    JitsiMeetView: {
      flex: 1
    }
  })

  const jitsi = usingJitsi(
    roomName,
    userData,
    password

  )

  useEffect(() => {
    return () => {
      JitsiMeet.endCall()
    }
  }, [jitsi])

  function onConferenceTerminated (nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent)
  }

  function onConferenceJoined (nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent)
  }

  function onConferenceWillJoin (nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent)
  }

  return (
    <JitsiMeetView
      onConferenceTerminated={e => onConferenceTerminated(e)}
      onConferenceJoined={e => onConferenceJoined(e)}
      onConferenceWillJoin={e => onConferenceWillJoin(e)}
      style={styles.JitsiMeetView}
    />
  )
}

MeetRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
  userData: PropTypes.object
}

export default MeetRoom
