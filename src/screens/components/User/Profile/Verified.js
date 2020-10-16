import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text } from 'native-base'

import color from 'theme/color'
import globalStyle from 'theme/style'

class Verified extends Component {
  render () {
    const { data } = this.props

    return (
      <View>
        {
          data && data.emailVerified ? (
            <Text style={[globalStyle.smallText, { color: color.successColor }]}>Verified Account</Text>
          ) : (
            <Text style={[globalStyle.smallText, { color: color.errorColor }]}>unverified Account</Text>
          )
        }
      </View>
    )
  }
}

Verified.propTypes = {
  data: PropTypes.object
}

export default Verified
