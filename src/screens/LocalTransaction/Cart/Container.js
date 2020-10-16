import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'

import globalStyle from 'theme/style'

class Container extends Component {
  render () {
    return (
      <View style={globalStyle.container}>
        <Text>This is cart pages</Text>
      </View>
    )
  }
}

export default Container
