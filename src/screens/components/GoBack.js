import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import {
  getCurrentTransaction
} from 'actions/transaction/localTransactionAction'

import color from 'theme/color'

const styles = StyleSheet.create({
  wrapIcon: {
    justifyContent: 'center'
  },
  icon: {
    color: color.smoothText
  }
})

const GoBack = ({
  iconName = 'check',
  type = 'AntDesign',
  goTo = '',
  navigation,
  dispatch
}) => (
  <View style={styles.wrapIcon}>
    <Icon
      name={iconName}
      type={type}
      style={styles.icon}
      onPress={() => navigation.navigate(goTo, { onGoBack: dispatch(getCurrentTransaction()) })}
    />
  </View>
)

GoBack.propTypes = {
  navigation: PropTypes.object.isRequired,
  goTo: PropTypes.string,
  iconName: PropTypes.string,
  type: PropTypes.string
}

export default connect(null)(GoBack)
