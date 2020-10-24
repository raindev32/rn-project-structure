import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import color from 'theme/color'
import Form from './Form'

class ResetPassword extends Component {
    static navigationOptions = () => {
      let headerTitle = 'Reset Password'
      let headerTitleStyle = {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.textIcons,
        marginTop: 0,
        marginHorizontal: 0,
        textAlign: 'left',
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 10
      }
      let headerTintColor = color.textIcons
      let headerStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: color.primaryColor // color.primaryColor
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

    componentDidMount () {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton = () => {
      const { navigation } = this.props
      navigation.navigate('Home')
      return true
    }

    render () {
      const { navigation } = this.props
      const { params } = navigation.state

      return (
        <Form
          data={params && params.data ? params.data : {}}
        />
      )
    }
}
export default ResetPassword
