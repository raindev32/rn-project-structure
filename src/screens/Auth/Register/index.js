import React, { Component } from 'react'

import color from 'theme/color'

import Container from './Container'

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
    return (
      <Container />
    )
  }
}

export default Register
