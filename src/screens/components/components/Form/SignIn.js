import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {
  Text
} from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  buttonSignIn: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.primaryColor
  }
})

class SignIn extends Component {
  render () {
    const {
      navigation
    } = this.props
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonSignIn}>
            Sign In
        </Text>
      </TouchableOpacity>
    )
  }
}

export default SignIn
