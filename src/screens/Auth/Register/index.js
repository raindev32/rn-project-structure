import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import color from 'theme/color'

import Container from './Container'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  txtRegister: {
    paddingVertical: 10,
    marginTop: -50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: color.secondaryText
  }
})

class Register extends Component {
  static navigationOptions = () => {
    let headerTitle = 'Register'
    let headerTitleStyle = {
      fontSize: 20,
      color: color.primaryColor,
      marginTop: 0,
      marginHorizontal: 0,
      textAlign: 'center',
      paddingVertical: 0
    }
    let headerTintColor = color.primaryColor
    let headerStyle = {
      elevation: 0,
      shadowOpacity: 0,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: color.textIcons // color.primaryColor
    }
    let headerBackTitle = ''
    return ({
      headerStyle,
      headerTitle,
      headerTitleStyle,
      headerTintColor,
      headerBackTitle,
      headerLayoutPreset: 'center'
    })
  }

  render () {
    const { navigation } = this.props

    return (
      <Container />
    )
  }
}

export default Register
