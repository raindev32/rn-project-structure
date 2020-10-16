import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from 'react-native'
import { Thumbnail } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import { optionsImage } from 'utils/config'

const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 100,
    width: 100
  }
})

class ProfilePic extends PureComponent {
  state = {
    profileImage: ''
  }

  componentDidMount () {
    this.askPermissionsAsync()
  }

  // Camera & Gallery function
  askPermissionsAsync = async () => {
    await this.requestWriteStoragePermission()
    await this.requestReadStoragePermission()
    await this.requestCameraPermission()
  }

  requestWriteStoragePermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message: 'App need access to storage'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (err) {
      console.warn(err)
    }
  }

  requestReadStoragePermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message: 'App need access to storage'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (err) {
      console.warn(err)
    }
  }

  requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera access',
          message: 'App need access to camera'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      return false
    } catch (err) {
      console.warn(err)
    }
  }

  render () {
    const { data, dispatch } = this.props
    const { profileImage } = this.state

    return (
      <TouchableOpacity
        onPress={() => {
          ImagePicker.showImagePicker(optionsImage, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker')
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error)
            } else {
              this.setState({ profileImage: response.uri })
              dispatch(change('EditProfileForm', 'image', response.uri))
            }
          })
        }}
      >
        { profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          data && data.image && data.image.url ? (
            <FastImage
              style={styles.image}
              source={{
                uri: data.image.url,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Thumbnail
              style={styles.image}
              source={require('assets/app/profile/icon-user.png')}
              resizeMode="contain"
            />
          ))}
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.authStore.loading
})

export default connect(mapStateToProps)(ProfilePic)
