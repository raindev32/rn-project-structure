import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text
} from 'native-base'

import globalStyle from 'theme/style'

class HeaderTitle extends Component {
  render () {
    const { title } = this.props

    return (
      <Text style={globalStyle.headTitle}>
        {title}
      </Text>
    )
  }
}

HeaderTitle.propTypes = {
  title: PropTypes.string
}

export default HeaderTitle
