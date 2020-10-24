import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import color from 'theme/color'

import Form from './Form'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: color.textIcons
  }
})

class Container extends Component {
  render () {
    const { navigation } = this.props
    const { params } = navigation.state

    return (
      <View style={styles.container}>
        <Form
          data={params && params.dataAddress ? params.dataAddress : {}}
          navigation={navigation}
          status={params && params.title ? params.title : 'add'}
          checkout={params && params.checkout}
        />
      </View>
    )
  }
}
export default Container
