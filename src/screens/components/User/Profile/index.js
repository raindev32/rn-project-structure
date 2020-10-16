import React, { Component } from 'react'

import color from 'theme/color'

import TopMenu from './TopMenu'
import Container from './Container'

class Profile extends Component {
  static navigationOptions = () => {
    let headerTitle = 'Profile'
    let headerTitleStyle = {
      fontSize: 20,
      color: color.primaryColor,
      marginTop: 0,
      marginHorizontal: 0,
      textAlign: 'left',
      flex: 1,
      fontWeight: 'bold',
      paddingVertical: 0,
      paddingHorizontal: 10
    }
    let headerTintColor = color.primaryColor
    let headerRight = <TopMenu />
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
      headerRight,
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
export default Profile
