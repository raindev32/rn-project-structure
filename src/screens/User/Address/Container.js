import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import globalStyle from 'theme/style'
import AddressList from './AddressList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})

class Container extends Component {
  render () {
    const { navigation } = this.props

    return (
      <View style={[styles.container, globalStyle.padDefault]}>
        <AddressList navigation={navigation} />
      </View>
    )
  }
}
export default Container
