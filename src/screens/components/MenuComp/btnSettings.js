import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Icon
} from 'native-base'

import color from 'theme/color'
import globalStyle from 'theme/style'

const styles = StyleSheet.create({
  icon: {
    fontSize: 38,
    color: color.primaryColor
  },
  btnSetting: {
    paddingHorizontal: 10
  }
})

class btnSettings extends Component {
  render () {
    const { navigation, routes, paramsId } = this.props

    return (
      <TouchableOpacity
        style={styles.btnSetting}
        onPress={() => navigation.navigate(routes, { id: paramsId })}
      >
        <View style={globalStyle.fdRow}>
          <Icon type="EvilIcons" name="gear" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }
}

btnSettings.propTypes = {
  routes: PropTypes.string.isRequired,
  paramsId: PropTypes.number
}

export default withNavigation(btnSettings)
