import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import color from 'theme/color'
import MyButtonAdd from 'components/btnAdd'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.textIcons
  }
})

class EmptyAddress extends Component {
  render () {
    return (
      <View style={styles.container}>
        <MyButtonAdd title="[+] Add new address" />
      </View>
    )
  }
}
export default EmptyAddress
