import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View } from 'react-native'
import color from 'theme/color'
import globalStyle from 'theme/style'
import SettingList from './SettingList'

class Container extends Component {
  static navigationOptions = () => {
    let headerTitle = 'Settings'
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
    return (
      <View style={globalStyle.padDefault}>
        <SettingList />
      </View>
    )
  }
}
export default withNavigation(Container)
