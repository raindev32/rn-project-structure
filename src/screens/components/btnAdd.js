import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Button } from 'native-base'
import { withNavigation } from 'react-navigation'
import color from 'theme/color'

const styles = StyleSheet.create({
  circle: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class MyButtonAdd extends Component {
  render () {
    const { navigation, title } = this.props

    return (
      <Button
        light
        onPress={() => navigation.navigate('AddAddress')}
      >
        <View style={styles.circle}>
          <Text style={{ color: color.secondaryText }}>{title}</Text>
        </View>
      </Button>
    )
  }
}

MyButtonAdd.propTypes = {
  title: PropTypes.string
}

export default withNavigation(MyButtonAdd)
