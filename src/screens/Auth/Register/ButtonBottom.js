import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'

const styles = StyleSheet.create({
  contentBtn: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

class BottomButton extends Component {
  render () {
    const { navigation } = this.props

    return (
      <View style={styles.contentBtn}>
        <Text>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[globalStyle.centerText, { color: color.primaryColor }]}> Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default BottomButton
