import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})

class Container extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>This is home pages.</Text>
      </View>
    )
  }
}

export default Container
