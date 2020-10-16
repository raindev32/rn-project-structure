import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { withNavigation } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import {
  receivePhotoList
} from 'actions/transaction/localTransactionAction'

const styles = StyleSheet.create({
  image: {
    width: 56,
    height: 56,
    overflow: 'hidden'
  },
  cardRadius: {
    alignItems: 'center',
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    width: '100%'
  },
  desc: {
    width: '100%'
  }
})

class CartItem extends Component {
  goToDetail = () => {
    const {
      navigation, item, receivePhotoList
    } = this.props
    const { params } = navigation.state
    receivePhotoList(item)
    navigation.navigate('PhotoList', { item, bundleName: params && params.name ? params : {} })
  }

  render () {
    const { item } = this.props
    if (item && !item.id) return

    return (
      <Card style={styles.cardRadius}>
        <CardItem
          button
          onPress={() => this.goToDetail()}
          style={styles.cardRadius}
        >
          <Left>
            {item && item.product && item.product.image && item.product.image.url ? (
              <FastImage
                style={styles.image}
                source={{
                  uri: item.product.image.url,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )
              : (
                <Thumbnail
                  source={PacketImage}
                />
              )}

            <View style={styles.body}>
              <Text numberOfLines={1} style={styles.title}>{item.product.name}</Text>
              <Text style={styles.desc} numberOfLines={2} note>
                {
                  item
                    && item.product
                    && item.product.description
                    ? item.product.description
                    : null
                }
              </Text>
              <Text numberOfLines={1} style={styles.desc} note>{`Qty: ${item && item.photos && item.photos.length > 0 ? item.photos.length : 0} / ${item.qty}`}</Text>
            </View>
          </Left>
        </CardItem>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  receivePhotoList: (list) => dispatch(receivePhotoList(list))
})

export default connect(null, mapDispatchToProps)(withNavigation(CartItem))
