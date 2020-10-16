import React, { PureComponent } from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'
import PacketImage from 'assets/mock/product-image.png'
import { View } from 'native-base'
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%'
  }
})

class BundleImage extends PureComponent {
  render () {
    const { item } = this.props
    return (
      <View>
        {item && item.image ? (
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
            <Image source={PacketImage} style={styles.image} />
          )}
      </View>
    )
  }
}

export default BundleImage
