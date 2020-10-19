import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  wrapEmptyState: {
    marginTop: 50,
    alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 15,
    marginVertical: 20,
    textAlign: 'center',
    color: color.secondaryText
  }
})

class EmptyState extends Component {
  render () {
    const { title } = this.props

    return (
      <View style={styles.wrapEmptyState}>
        <Text style={styles.emptyTitle}>{title}</Text>
      </View>
    )
  }
}

EmptyState.propTypes = {
  title: PropTypes.string
}

export default EmptyState
