import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet,
  TouchableOpacity
  // Dimensions
} from 'react-native'
// import { connect } from 'react-redux'
import {
  Icon
} from 'native-base'

import color from 'theme/color'
import globalStyle from 'theme/style'

const styles = StyleSheet.create({
  icon: {
    marginRight: 0,
    fontSize: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: color.primaryColor
  }
})

class btnSettings extends Component {
  render () {
    const { navigation } = this.props

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
      >
        <View style={globalStyle.fdRow}>
          <Icon type="Feather" name="search" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(btnSettings)
