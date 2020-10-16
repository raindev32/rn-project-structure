import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 10,
    backgroundColor: color.textIcons
  },
  txtTitle: {
    color: color.secondaryText,
    paddingVertical: 10
  },
  btnBackOrder: {
    marginVertical: 30
  }
})

class Timeout extends Component {
  render () {
    const { navigation, goTo } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.txtTitle}>Time Limit Reached</Text>
        <Text style={styles.txtTitle}> Your payment term has expired</Text>

        <Button
          primary
          bordered
          style={styles.btnBackOrder}
          onPress={() => navigation.navigate(goTo)}
        >
          <Text>Back To Order Again</Text>
        </Button>
      </View>
    )
  }
}

Timeout.propTypes = {
  navigation: PropTypes.object.isRequired,
  goTo: PropTypes.string
}

export default Timeout
