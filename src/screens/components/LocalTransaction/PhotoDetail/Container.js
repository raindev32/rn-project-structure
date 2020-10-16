import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { View, Text, Icon } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import {
  requestWriteStoragePermission,
  requestReadStoragePermission,
  requestCameraPermission
} from 'utils/permission'
import {
  optionsImage
} from 'utils/config'

import color from 'theme/color'
import globalStyle from 'theme/style'

import {
  editPhoto,
  getCurrentTransaction
} from 'actions/transaction/localTransactionAction'

import LocalImage from 'components/LocalImage'
import Detail from './Detail'
import BottomButton from './BottomButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  image: {
    backgroundColor: color.accentIcons,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200
  },
  txtChangePhoto: {
    paddingLeft: 5,
    fontSize: 12
  },
  topChange: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center'
  }
})

class Container extends Component {
  state = {
    storageWrite: true,
    storageRead: true,
    camera: true,
    errorPhotoLoad: false
  }

  componentDidMount () {
    this.askPermissionsAsync()
  }

  askPermissionsAsync = async () => {
    const storageWrite = await requestWriteStoragePermission()
    const storageRead = await requestReadStoragePermission()
    const camera = await requestCameraPermission()
    this.setState({
      storageWrite,
      storageRead,
      camera
    })
  }

  setImage = (uri) => {
    const { dispatch, navigation } = this.props
    const { params } = navigation.state
    dispatch(editPhoto(uri, params.index))
    this.setState({
      errorPhotoLoad: false
    })
  }

  onCancel = () => {
    const { navigation, dispatch } = this.props
    navigation.navigate('UploadPhotos', { onGoBack: dispatch(getCurrentTransaction()) })
  }

  render () {
    const {
      item,
      photoDetail,
      navigation
    } = this.props
    const {
      storageWrite,
      storageRead,
      errorPhotoLoad,
      camera
    } = this.state
    const { params } = navigation.state

    return (
      <View
        style={styles.container}
      >
        {storageWrite && storageRead && camera ? (
          <TouchableOpacity
            onPress={() => {
              ImagePicker.launchImageLibrary(optionsImage, (response) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker')
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error)
                } else {
                  this.setImage(response.uri)
                }
              })
            }}
          >
            <View style={[globalStyle.fdRow, styles.topChange]}>
              <Icon name="picture" type="AntDesign" />
              <Text style={styles.txtChangePhoto}>Change Photo</Text>
            </View>
            {photoDetail && !errorPhotoLoad ? (
              <LocalImage
                item={photoDetail}
                style={styles.image}
                resizeMode="cover"
                onError={() => {
                  this.setState({
                    errorPhotoLoad: true
                  })
                }}
              />
            ) : null}
            {errorPhotoLoad && (
              <Image
                source={require('assets/app/404/image-notfound.png')}
                resizeMode="contain"
                style={styles.image}
              />
            )}
            {!photoDetail && (
              <View style={styles.image}>
                <Text>Pick a picture</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : null}
        {item && <Detail item={item} />}
        <BottomButton onCancel={() => this.onCancel()} uri={photoDetail} index={params.index} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  photoDetail: state.localTransactionStore.photoDetail,
  item: state.localTransactionStore.photoList
})

export default connect(mapStateToProps)(withNavigation(Container))
