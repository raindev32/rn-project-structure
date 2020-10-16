import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native'
import {
  View, Text, Button, Thumbnail
} from 'native-base'
import { withNavigation } from 'react-navigation'
import {
  addPhoto,
  receivePhotoDetail,
  getCurrentTransaction
} from 'actions/transaction/localTransactionAction'
import ImagePicker from 'react-native-image-picker'
import {
  optionsImage
} from 'utils/config'
import ProductEmpty from 'components/EmptyState/ProductEmpty'
import {
  requestReadStoragePermission
} from 'utils/permission'
import imageNotFound from 'assets/app/404/no-image-upload.png'

import color from 'theme/color'

import List from './List'
import Detail from './Detail'

const styles = StyleSheet.create({
  containerList: {
    flex: 1
  },
  root: {
    flex: 1
  },
  scrollView: {
    paddingBottom: 100
  },
  imagePic: {
    width: 150,
    height: 150,
    marginTop: 80
  },
  containerEmpty: {
    alignItems: 'center'
  },
  txtCurrentImage: {
    textAlign: 'center'
  },
  bottom: {
    bottom: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: color.textIcons
  },
  button: {
    borderRadius: 5
  }
})

class Container extends Component {
  state = {
    refreshing: false,
    storageRead: false

  }

  componentDidMount = async () => {
    this._refresh()
    this.askPermissionsAsync()
  }

  openGallery = () => {
    ImagePicker.launchImageLibrary(optionsImage, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        this.setImage(response.uri)
      }
    })
  }

  goToDetail = () => {
    const { dispatch } = this.props
    dispatch(receivePhotoDetail({}))
    this.openGallery()
  }

  setImage = (uri) => {
    const { dispatch, productItem } = this.props
    dispatch(addPhoto(uri, productItem))
  }

  askPermissionsAsync = async () => {
    const storageRead = await requestReadStoragePermission()
    this.setState({
      storageRead
    })
  }

  _refresh = async () => {
    const { dispatch } = this.props
    await dispatch(getCurrentTransaction())
  }

  render () {
    const { navigation, photoList } = this.props
    const { params } = navigation.state
    const {
      refreshing,
      storageRead
    } = this.state

    return (
      <View
        style={styles.root}
      >
        {photoList && (
          <Detail
            bundleName={params && params.bundleName && params.bundleName.name ? params.bundleName.name : {}}
            item={photoList}
            navigation={navigation}
          />
        )}
        <Text style={styles.txtCurrentImage} note>
          {`Current : ${photoList && photoList.photos && photoList.photos.length > 0 ? photoList.photos.length : 0} / ${photoList.qty} Image`}
        </Text>
        {storageRead ? (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={300}
            removeClippedSubviews
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._refresh()}
              />
            )}
          >
            {photoList && (!photoList.photos || photoList.photos.length === 0) ? (
              <View style={styles.containerEmpty}>
                <Thumbnail source={imageNotFound} style={styles.imagePic} />
                <ProductEmpty
                  text="Photo list"
                  data={photoList.photos || []}
                  loading={false}
                  navigation={navigation}
                />
              </View>
            )
              : (
                <View style={styles.containerList}>
                  <List data={photoList.photos} />
                </View>
              )}
          </ScrollView>
        ) : null}
        <View style={styles.bottom}>
          <Button
            full
            primary
            disabled={!!(photoList && photoList.photos && photoList.photos.length >= photoList.qty)}
            onPress={() => this.goToDetail({ goTo: 'PhotoList' })}
            style={styles.button}
          >
            {photoList && photoList.photos && photoList.photos.length > 0 ? (
              <Text uppercase={false} style={styles.title}>{`Upload ( ${photoList.photos.length} of ${photoList.qty} )`}</Text>
            )
              : (
                <Text uppercase={false} style={styles.title}>Upload</Text>
              )}
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  photoList: state.localTransactionStore.photoList,
  loading: state.productStore.loading,
  productItem: state.productStore.productItem,
  errorMessage: state.productStore.errorMessage
})

export default connect(mapStateToProps)(withNavigation(Container))
