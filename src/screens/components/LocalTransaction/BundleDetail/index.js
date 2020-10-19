import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import color from 'theme/color'

import Container from './Container'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBackgroundColor
  }
})

class BundleDetail extends Component {
  static navigationOptions = () => {
    let headerStyle = {
      height: 0
    }

    return ({
      headerLeft: null,
      headerStyle,
      headerLayoutPreset: 'center'
    })
  }

  render () {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Container navigation={navigation} />
      </View>
    )
  }
}
export default BundleDetail
