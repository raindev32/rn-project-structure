import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'

const styles = StyleSheet.create({
  packet: {
    paddingVertical: 5,
    alignItems: 'center'
  },
  qty: {
    padding: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.dividerColor
  },
  qtyText: {
    color: color.darkPrimaryColor
  },
  title: {
    paddingLeft: 10,
    color: color.darkPrimaryColor
  }
})

class BundleDetail extends Component {
  render () {
    const { item } = this.props

    return (
      <View style={globalStyle.padDefault}>
        <Text style={globalStyle.boldText}>Bundle Detail</Text>
        {item && item.detail && item.detail.length > 0 ? item.detail.map((data, index) => {
          return (
            <View key={index} style={[styles.packet, globalStyle.fdRow]}>
              <View style={styles.qty}>
                <Text note style={styles.qtyText}>{`x${data.qty}`}</Text>
              </View>
              <Text style={styles.title}>{data.product.name}</Text>
            </View>
          )
        }) : null}
      </View>
    )
  }
}
export default BundleDetail
