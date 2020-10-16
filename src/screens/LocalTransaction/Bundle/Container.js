import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'

import globalStyle from 'theme/style'

class Product extends Component {
  render () {
    return (
      <View style={globalStyle.container}>
        <Text>This is category pages</Text>
      </View>
    )
  }
}
export default Product
