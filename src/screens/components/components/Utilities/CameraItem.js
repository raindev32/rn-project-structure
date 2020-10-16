import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  View,
  Button,
  Icon
} from 'native-base'
import color from 'theme/color'

const ICON_SIZE = 20

const styles = StyleSheet.create({
  capture: {
    flex: 0,
    color: color.textIcons,
    borderRadius: 40,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    fontSize: ICON_SIZE * 1.5,
    paddingTop: 0,
    marginLeft: 0,
    marginRight: 0
  },
  button: {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    width: ICON_SIZE * 2,
    height: ICON_SIZE * 2,
    backgroundColor: color.transparent,
    opacity: 0.8,
    margin: ICON_SIZE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainButton: {
    width: ICON_SIZE * 3.8,
    height: ICON_SIZE * 3.8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

class CameraItem extends Component {
  getSizeStyles () {
    const {
      width,
      height
    } = this.props

    return {
      width,
      height
    }
  }

  render () {
    const {
      camera,
      flashMode,
      type,
      takePicture,
      changeFlash,
      changeCamera
    } = this.props

    return (
      <View style={styles.buttonContainer}>
        <Button
          rounded
          primary
          style={[
            styles.button,
            {
              backgroundColor: flashMode ? color.textIcons : color.transparent
            }
          ]}
        >
          <Icon
            type="Entypo"
            name="flash"
            onPress={() => changeFlash()}
            style={[
              styles.capture,
              {
                fontSize: ICON_SIZE * 1,
                color: flashMode ? color.primaryText : color.textIcons
              }
            ]}
          />
        </Button>
        <TouchableOpacity
          onPress={() => {
            takePicture(camera)
          }}
          style={[styles.button, styles.mainButton]}
        >
          <View>
            <Icon
              type="Entypo"
              name="circle"
              style={[
                styles.capture,
                {
                  fontSize: ICON_SIZE * 3
                }
              ]}
            />
          </View>
        </TouchableOpacity>
        <Button
          rounded
          primary
          style={[
            styles.button,
            {
              backgroundColor: type ? color.textIcons : color.transparent
            }
          ]}
        >
          <Icon
            type="Ionicons"
            name="md-reverse-camera"
            onPress={() => changeCamera()}
            style={[
              styles.capture,
              {
                fontSize: ICON_SIZE * 1,
                color: type ? color.primaryText : color.textIcons
              }
            ]}
          />
        </Button>
      </View>
    )
  }
}

export default CameraItem
