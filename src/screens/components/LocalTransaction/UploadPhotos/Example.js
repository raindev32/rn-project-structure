import React, { Component } from 'react'
import {
  View, Text, Image, StyleSheet
} from 'react-native'
import { Card, CardItem } from 'native-base'
import FastImage from 'react-native-fast-image'
import color from 'theme/color'
import globalStyle from 'theme/style'
import NoImage from 'assets/app/404/no-image-upload.png'

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  exampleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.smoothText
  },
  card: {
    borderRadius: 10
  },
  padHorizon: {
    paddingHorizontal: 20,
    paddingBottom: 100
  }
})

class Example extends Component {
  render () {
    const { data } = this.props

    return (
      <View style={styles.padHorizon}>
        <View style={globalStyle.padVert}>
          <Text style={styles.exampleTxt}>Example</Text>
          <Text>Product example.</Text>
        </View>
        {data && data.exampleImage && data.exampleImage.length > 0
          ? data.exampleImage.map((item, index) => (
            <Card key={index} style={styles.card}>
              <CardItem style={[styles.card]}>
                {item && item.url ? (
                  <FastImage
                    source={{ uri: item.url }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : <Image source={NoImage} style={styles.image} />}
              </CardItem>
            </Card>
          )) : null}
      </View>
    )
  }
}
export default Example
