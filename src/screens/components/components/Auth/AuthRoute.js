import React, { PureComponent } from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  View,
  Text
} from 'native-base'
import color from 'theme/color'
import { withNavigation } from 'react-navigation'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  center: {
    flex: 1,
    justifyContent: 'center'
  },
  textQuestion: {
    color: color.primaryText
  },
  bottomText: {
    marginVertical: 30,
    fontSize: 16,
    color: color.secondaryText
  },
  bottomTextContainer: {
    paddingVertical: 10
  }
})

class AuthRoute extends PureComponent {
  render () {
    const {
      navigation,
      forgot
    } = this.props
    return (
      <View>
        {forgot && (
          <View style={[styles.row, styles.center]}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>Forget your password ?</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.row, styles.center]}>
          <Text style={styles.textQuestion}>Or Login With</Text>
        </View>
      </View>
    )
  }
}

AuthRoute.defaultProps = {
  forgot: true
}

export default withNavigation(AuthRoute)
