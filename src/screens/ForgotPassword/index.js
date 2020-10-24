import React, { Component } from 'react'
import {
  StyleSheet, Dimensions
} from 'react-native'

import Container from './Container'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: Dimensions.get('window').width / 2,
    marginBottom: 0
  }
})

class ForgotPassword extends Component {
  render () {
    return (
      <Container />
    )
  }
}

export default ForgotPassword
