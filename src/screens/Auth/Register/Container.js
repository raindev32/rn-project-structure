import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Text } from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'
import Form from './Form'
import ButtonBottom from './ButtonBottom'

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

class Container extends Component {
  render () {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <View style={globalStyle.padDefault}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.txtRegister}>Register Your New Account</Text>
            <Form />
            <ButtonBottom navigation={navigation} />
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default withNavigation(Container)
