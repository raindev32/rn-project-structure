import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  Modal
} from 'react-native'
import {
  Button,
  Icon
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 10,
    backgroundColor: color.textIcons,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1
  },
  modal: {
    borderColor: color.secondaryText,
    marginHorizontal: 0,
    marginBottom: 0,
    width: '100%',
    height: 200
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: color.textIcons,
    alignSelf: 'center',
    marginLeft: 10
  },
  buttonCancel: {
    color: color.primaryText,
    alignSelf: 'center',
    marginLeft: 10
  },
  icon: {
    color: color.textIcons
  }
})

class ImageModal extends React.PureComponent {
  render () {
    const {
      visible,
      onCamera,
      onGallery,
      onCancel,
      cameraMessage,
      galleryMessage
    } = this.props

    return (
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        onRequestClose={() => onCancel()}
      >
        <View style={styles.container}>
          <View style={styles.modal}>

            {onGallery ? (
              <Button
                primary={!galleryMessage}
                light={!!galleryMessage}
                style={styles.button}
                onPress={onGallery}
              >
                <Icon
                  style={styles.icon}
                  name="ios-folder"
                  size={30}
                />
                <Text
                  style={galleryMessage ? styles.buttonCancel : styles.buttonText}
                >
                  {galleryMessage || 'Take Picture from Gallery'}
                </Text>
              </Button>
            ) : null}

            {onCamera ? (
              <Button
                primary={!cameraMessage}
                light={!!cameraMessage}
                style={styles.button}
                onPress={onCamera}
              >
                <Icon
                  style={styles.icon}
                  name="ios-camera"
                />
                <Text
                  style={cameraMessage ? styles.buttonCancel : styles.buttonText}
                >
                  {cameraMessage || 'Take Picture from Camera'}
                </Text>
              </Button>
            ) : null}

            {onCancel ? (
              <Button
                light
                style={styles.button}
                onPress={onCancel}
              >
                <Text
                  style={styles.buttonCancel}
                >
                  Cancel
                </Text>
              </Button>
            ) : null}
          </View>
        </View>
      </Modal>
    )
  }
}

ImageModal.propTypes = {
  visible: PropTypes.bool,
  onCamera: PropTypes.func,
  onGallery: PropTypes.func,
  onCancel: PropTypes.func
}

ImageModal.defaultProps = {
  visible: false
}

export default ImageModal
