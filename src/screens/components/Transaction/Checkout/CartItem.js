import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Left,
  Thumbnail
} from 'native-base'
import PacketImage from 'assets/mock/product-image.png'
import FastImage from 'react-native-fast-image'
import { currencyFormatter } from 'utils/string'
import sharedStyle from './styles'

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
    overflow: 'hidden',
    borderRadius: 56 / 2
  },
  cardRadius: {
    alignItems: 'center',
    borderRadius: 10
  },
  desc: {
    width: '100%'
  }
})

class CartItem extends Component {
  render () {
    const { item } = this.props
    if (!item || (item && !item.id)) return null

    return (
      <Card style={styles.cardRadius}>
        <CardItem
          header
          style={sharedStyle.cardItem}
        >
          <Text numberOfLines={1} style={sharedStyle.title}>Product</Text>
        </CardItem>
        <CardItem
          button
          style={sharedStyle.cardItem}
        >
          <Left>
            {item && item.image && item.image.url ? (
              <FastImage
                style={styles.image}
                source={{
                  uri: item.image.url,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )
              : (
                <Thumbnail
                  source={PacketImage}
                />
              )}

            <View style={styles.body}>
              <Text numberOfLines={1} style={sharedStyle.title}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.desc} note>{item.qty}</Text>
              <Text numberOfLines={1} style={styles.desc} note>{currencyFormatter(item.price)}</Text>
            </View>
          </Left>
        </CardItem>
      </Card>
    )
  }
}

export default CartItem
