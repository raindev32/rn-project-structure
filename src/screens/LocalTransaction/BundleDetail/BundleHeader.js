import React, { PureComponent } from 'react'
import {
  StyleSheet,
  Platform
} from 'react-native'
import { View } from 'native-base'
import {
  HeaderBackButton
} from 'react-navigation-stack'
import color from 'theme/color'

const HEIGHT = Platform.OS === 'ios' ? 64 : 56

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2,
    backgroundColor: Platform.OS === 'ios' ? color.primaryColorTransparent : color.primaryColorTransparent,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class BundleHeader extends PureComponent {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.header}>
        <HeaderBackButton tintColor={color.textIcons} onPress={() => navigation.goBack()} />
      </View>
    )
  }
}

export default BundleHeader
