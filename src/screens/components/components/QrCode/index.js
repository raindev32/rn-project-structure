import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Icon, Right, Button
} from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  wrapIcon: {
    position: 'absolute',
    right: -10
  },
  icon: {
    fontSize: 30,
    color: color.primaryColor
  },
  btnMemo: {
    backgroundColor: color.textIcons,
    elevation: 0
  }
})

class Memo extends Component {
  render () {
    const { navigation } = this.props

    return (
      <Right style={styles.wrapIcon}>
        <Button
          style={styles.btnMemo}
          onPress={() => navigation.navigate('QrCodePage')}
        >
          <Icon
            name="qrcode"
            type="AntDesign"
            style={styles.icon}
          />
        </Button>
      </Right>
    )
  }
}

export default connect(null)(Memo)
