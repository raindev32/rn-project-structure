import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Body
} from 'native-base'
import color from 'theme/color'
import {
  currencyFormatter
} from 'utils/string'
import sharedStyle from './styles'

const styles = StyleSheet.create({
  cardRadius: {
    alignItems: 'center',
    borderRadius: 10
  },
  padLeft: {
    textAlign: 'right',
    paddingLeft: 20
  },
  totalPrice: {
    position: 'absolute',
    color: color.secondaryText,
    right: 0
  },
  title: {
    color: color.secondaryText
  }
})

class Payment extends Component {
  render () {
    const { item, courier } = this.props
    let courierObject
    if (courier) {
      courierObject = JSON.parse(courier)
    }

    if (item && item.price) {
      return (
        <Card style={styles.cardRadius}>
          <CardItem
            header
            style={sharedStyle.cardItem}
          >
            <Body style={styles.body}>
              <Text numberOfLines={1} style={sharedStyle.title}>Order Summary</Text>
            </Body>
          </CardItem>
          <CardItem
            header
            style={sharedStyle.cardItem}
          >
            <Body style={styles.body}>
              <Text style={styles.title}>Subtotal</Text>
              <Text style={[styles.padLeft, styles.totalPrice]}>
                {currencyFormatter(item.price)}
              </Text>
            </Body>
          </CardItem>
          {courierObject && courierObject.value ? (
            <CardItem
              header
              style={sharedStyle.cardItem}
            >
              <Body style={styles.body}>
                <Text style={styles.title}>Shipping</Text>
                <Text style={[styles.padLeft, styles.totalPrice]}>
                  {currencyFormatter(courierObject.value)}
                </Text>
              </Body>
            </CardItem>
          )
            : null}
        </Card>
      )
    }
    return null
  }
}

export default Payment
