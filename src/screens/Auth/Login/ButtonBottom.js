import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  txtForget: {
    color: color.primaryColor,
    textAlign: 'center'
  }
})

class BottomButton extends Component {
  render () {
    return (
      <Text style={styles.txtForget}>
          Forget your password ?
      </Text>
    )
  }
}
export default BottomButton
