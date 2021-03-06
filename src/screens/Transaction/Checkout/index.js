import React, { Component } from 'react'
import color from 'theme/color'
import Container from './Container'

class Checkout extends Component {
  static navigationOptions = () => {
    let headerTitle = 'Checkout'
    let headerTitleStyle = {
      fontSize: 20,
      fontWeight: 'bold',
      color: color.smoothText,
      marginTop: 0,
      marginHorizontal: 0,
      textAlign: 'left',
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: 10
    }
    let headerTintColor = color.smoothText
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
      <Container navigation={navigation} />
    )
  }
}

export default Checkout
