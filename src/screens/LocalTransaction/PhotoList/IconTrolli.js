import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'
// import { connect } from 'react-redux'
import {
  Icon
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: Dimensions.get('window').width / 10,
    paddingVertical: 5,
    alignItems: 'center'
  },
  icon: {
    marginRight: 0,
    fontSize: 25,
    paddingVertical: 5,
    color: color.smoothText
  }
})

class IconTrolli extends Component {
  render () {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
      >
        <View style={styles.container}>
          <Icon name="shoppingcart" type="AntDesign" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(IconTrolli)
