import React, { PureComponent } from 'react'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Alert
} from 'react-native'
import {
  View, Text, Button
} from 'native-base'
import color from 'theme/color'
import {
  addTransaction
} from 'actions/transaction/localTransactionAction'

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: color.textIcons,
    width: '100%',
    padding: 10
  },
  btnBottom: {
    borderRadius: 5
  },
  text: {
    fontSize: 16
  }
})

class BottomButton extends PureComponent {
  addOrder = (item) => {
    const { dispatch, navigation } = this.props

    Alert.alert(
      'Order this product',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          color: color.primaryText,
          onPress: () => {
            console.log('Cancel Pressed!')
          }
        },
        {
          text: 'Order now',
          color: color.primaryColor,
          onPress: () => {
            dispatch(addTransaction(item, navigation))
          }
        }
      ],
      { cancelable: true }
    )
  }

  render () {
    const { item } = this.props

    return (
      <View style={styles.buttonContainer}>
        <Button
          full
          onPress={() => this.addOrder(item)}
          style={styles.btnBottom}
        >
          <Text uppercase={false} style={styles.text}>
            Order Now
          </Text>
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentItem: state.localTransactionStore.currentItem
})

export default connect(mapStateToProps)(withNavigation(BottomButton))
