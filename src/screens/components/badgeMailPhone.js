import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import color from '../../theme/color'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  success: {
    fontSize: 10,
    color: color.successColor
  },
  error: {
    fontSize: 10,
    color: color.errorColor
  }
})

class BadgeMailPhone extends React.PureComponent {
  render () {
    const {
      status
    } = this.props
    return (
      <View style={styles.container}>
        {
          Number(status) ? <Text style={styles.success}>Terverifikasi</Text> : <Text style={styles.error}>Belum Terverifikasi</Text>
        }
      </View>
    )
  }
}

BadgeMailPhone.propTypes = {
  status: PropTypes.number
}

BadgeMailPhone.defaultProps = {
  status: 0
}

export default BadgeMailPhone
