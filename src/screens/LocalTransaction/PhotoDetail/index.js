import React, { Component } from 'react'
import { connect } from 'react-redux'
import color from 'theme/color'

import GoBack from 'components/GoBack'
import Container from './Container'

class PhotoDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    let { params } = navigation.state
    let { goTo } = params
    let headerTitle = 'Photo Detail'
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
    let headerRight = (<GoBack navigation={navigation} goTo={goTo && goTo.goTo ? goTo.goTo : ''} />)
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
    const { navigation, onCancel } = this.props

    return (
      <Container navigation={navigation} onCancel={onCancel} />
    )
  }
}
export default connect(null)(PhotoDetail)
