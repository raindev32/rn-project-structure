import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import {
  Header
} from 'native-base'
import {
  HeaderBackButton
} from 'react-navigation-stack'
import color from 'theme/color'

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    height: 400,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.textIcons
  },
  text: {
    color: color.primaryText
  },
  header: {
    backgroundColor: color.primaryColor,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

class LoadingScreen extends Component {
  render () {
    const {
      title,
      header,
      onClose
    } = this.props

    return (
      <View style={styles.container}>
        {header && (
          <Header style={styles.header} androidStatusBarColor={color.primaryColor}>
            <HeaderBackButton tintColor={color.textIcons} onPress={() => onClose()} />
          </Header>
        )}
        <View
          style={styles.content}
        >
          <ActivityIndicator size="large" color={color.primaryColor} />
          <Text style={styles.text}>
            {
              title || 'Please wait...'
            }
          </Text>
        </View>
      </View>
    )
  }
}

LoadingScreen.propTypes = {
  title: PropTypes.string,
  header: PropTypes.bool,
  onClose: PropTypes.func
}

LoadingScreen.defaultProps = {
  header: false
}

export default LoadingScreen
