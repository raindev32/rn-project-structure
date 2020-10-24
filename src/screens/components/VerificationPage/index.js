import React, { Component } from 'react'
import {
  StyleSheet, ScrollView, View
} from 'react-native'
// import logoPrintart from 'assets/app/logo-printart.png'
import Form from './Form'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class Login extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Image
            source={logoPrintart}
            resizeMode="contain"
            style={styles.image}
          /> */}
          <Form navigation={navigation} />
        </ScrollView>
      </View>
    )
  }
}

export default Login
