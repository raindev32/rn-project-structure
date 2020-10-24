import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, Alert
} from 'react-native'
import {
  View, Text, Button, Icon
} from 'native-base'
import {
  photoEditor
} from 'actions/transaction/localTransactionAction'

const styles = StyleSheet.create({
  bottom: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10
  },
  button: {
    borderRadius: 5
  }
})

class BottomButton extends Component {
  openEditor = async () => {
    const {
      dispatch,
      onCancel,
      uri,
      index
    } = this.props

    try {
      dispatch(photoEditor(uri, onCancel, index))
    } catch (error) {
      console.log('Error photo editor', error)
      Alert.alert(error)
    }
  }

  render () {
    return (
      <View style={styles.bottom}>
        <Button
          primary
          full
          iconLeft
          onPress={() => this.openEditor()}
          style={styles.button}
        >
          <Icon
            type="FontAwesome"
            name="edit"
          />
          <Text style={styles.title}>Edit Photo</Text>
        </Button>
      </View>
    )
  }
}

export default connect(null)(BottomButton)
