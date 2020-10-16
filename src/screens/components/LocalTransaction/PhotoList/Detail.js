import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import {
  View, Text, Icon, Card, CardItem, Thumbnail, Left, Right
} from 'native-base'
import {
  currencyFormatter
} from 'utils/string'

import color from 'theme/color'
import globalStyle from 'theme/style'

import FastImage from 'react-native-fast-image'

import PacketImage from 'assets/mock/product-image.png'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5
  },
  card: {
    borderRadius: 10
  },
  image: {
    width: 60,
    height: 60,
    overflow: 'hidden'
  },
  flexLeft: {
    flex: 2,
    paddingRight: 10,
    justifyContent: 'center'
  },
  flexRight: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  flexCenter: {
    flex: 6
  },
  txtProductName: {
    fontSize: 16
  },
  txtProductSize: {
    fontSize: 13,
    color: color.secondaryText
  },
  txtPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: color.priceText
  },
  iconChevron: {
    fontSize: 20,
    color: color.dividerColor,
    alignSelf: 'flex-end'
  }
})

class Detail extends Component {
  render () {
    const { item, navigation, bundleName } = this.props

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('UploadPhotos', { bundleName, item })}
        >
          <Card style={styles.card}>
            <CardItem style={styles.card}>
              <Left style={styles.flexLeft}>
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
              </Left>

              <View style={styles.flexCenter}>
                <Text style={styles.txtProductName}>{`${item.product.name}`}</Text>
                <View>
                  <View>
                    <Text style={styles.txtProductSize} numberOfLines={2}>
                      {
                        item
                          && item.product
                          && item.product.description
                          ? item.product.description
                          : null
                      }
                    </Text>
                  </View>
                  <View style={globalStyle.padVert}>
                    <Text style={styles.txtPrice}>{currencyFormatter(item.price)}</Text>
                  </View>
                </View>
              </View>

              <Right style={styles.flexRight}>
                <Icon
                  name="chevron-right"
                  type="FontAwesome"
                  style={styles.iconChevron}
                />
              </Right>
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default Detail
