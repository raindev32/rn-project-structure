import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList
} from 'react-native'
import Item from './Item'

const styles = StyleSheet.create({
  container: {
    padding: 5
  }
})

class List extends Component {
  render () {
    const { data } = this.props

    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => {
          return (
            <Item item={item} index={index} />
          )
        }}
      />
    )
  }
}

export default List
