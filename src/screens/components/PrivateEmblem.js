import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    paddingRight: 5,
    color: color.errorColor
  }
})

class PrivateEmblem extends Component {
  render () {
    const { isPrivate } = this.props

    return (
      <Icon
        name={isPrivate ? 'lock' : 'globe'}
        type="FontAwesome"
        style={[
          styles.icon, isPrivate ? { color: color.lightPrimaryColor } : { color: color.primaryColor }
        ]}
      />
    )
  }
}

PrivateEmblem.propTypes = {
  isPrivate: PropTypes.bool
}

PrivateEmblem.defaultProps = {
  isPrivate: false
}

export default PrivateEmblem
