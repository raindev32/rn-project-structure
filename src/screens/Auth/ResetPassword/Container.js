import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import Form from './Form'

class Container extends Component {
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
export default Container
