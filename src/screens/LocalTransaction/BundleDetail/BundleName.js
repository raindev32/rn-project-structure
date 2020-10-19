import React, { PureComponent } from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  View,
  Content
} from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'
import { currencyFormatter } from 'utils/string'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: color.textIcons,
    padding: 10,
    marginBottom: 10
  },
  contentHead: {
    borderBottomWidth: 1,
    borderColor: color.dividerColor
  },
  price: {
    marginTop: 10
  }
})

class BundleName extends PureComponent {
  render () {
    const { item } = this.props

    return (
      <Content style={[styles.content, styles.contentHead]}>
        <View>
          <Text style={[globalStyle.h1, globalStyle.boldText]}>{item.name}</Text>
          <Text style={[globalStyle.h2]}>{item.qty}</Text>
          <Text style={[globalStyle.h1, globalStyle.boldText, styles.price, { color: color.primaryColor }]}>{currencyFormatter(item.price)}</Text>
        </View>
      </Content>
    )
  }
}

export default BundleName
