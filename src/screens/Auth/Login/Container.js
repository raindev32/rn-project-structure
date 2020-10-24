import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native'
import color from 'theme/color'

import Form from './Form'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    zIndex: 1,
    position: 'absolute',
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  buttonSignUp: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.textIcons
  }
})

class Container extends Component {
  render () {
    const {
      navigation
    } = this.props

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonSignUp}>
                Sign Up
            </Text>
          </TouchableOpacity>
          <Form navigation={navigation} />
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(Container)
