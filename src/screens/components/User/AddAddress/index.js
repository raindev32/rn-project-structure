import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import color from 'theme/color'

import Form from './Form'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: color.textIcons
  }
})

class AddAddress extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const { title } = params || undefined || ''
    let titleAdd = 'Add'
    let headerTitle = `${title || titleAdd} Address`
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
    const { navigation } = this.props
    const { params } = navigation.state

    return (
      <View style={styles.container}>
        <Form
          data={params && params.dataAddress ? params.dataAddress : {}}
          navigation={navigation}
          status={params && params.title ? params.title : 'add'}
          checkout={params && params.checkout}
        />
      </View>
    )
  }
}
export default AddAddress
