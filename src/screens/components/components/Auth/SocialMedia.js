import React, { PureComponent } from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  View,
  Icon,
  Button,
  Text
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  buttonTextIcon: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 15,
    color: color.primaryColor
  },
  icon: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 24,
    color: color.primaryColor
  },
  buttonContainer: {
    paddingHorizontal: 5,
    width: '50%',
    color: color.primaryColor
  },
  buttonIcon: {
    marginTop: 10,
    padding: 10,
    // textAlign: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    borderRadius: 25,
    width: '100%'
  },
  row: {
    flexDirection: 'row'
  }
})

class SocialMedia extends PureComponent {
  render () {
    const { facebook, google } = this.props

    return (
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => facebook()}
            bordered
            style={styles.buttonIcon}
          >
            <Icon
              type="AntDesign"
              name="facebook-square"
              style={styles.icon}
            />
            <Text
              style={styles.buttonTextIcon}
            >
              Facebook
            </Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => google()}
            bordered
            style={styles.buttonIcon}
          >
            <Icon
              type="AntDesign"
              name="google"
              style={styles.icon}
            />
            <Text
              style={styles.buttonTextIcon}
            >
              Google
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

export default SocialMedia
