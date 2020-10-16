import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  View, Text
} from 'native-base'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50
  },
  title: {
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 10
  }
})

class Detail extends Component {
  render () {
    const { item } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Name</Text>
          <Text>{`${item.product.name}`}</Text>
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.title}>Size</Text>
          <Text>{`${item.product.width} cm x ${item.product.height} cm`}</Text>
        </View>
      </View>
    )
  }
}

export default Detail
