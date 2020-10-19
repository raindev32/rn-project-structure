import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native'
import {
  View, Button, Text, Icon
} from 'native-base'
import { withNavigation } from 'react-navigation'
import {
  addPhoto,
  receivePhotoDetail,
  getCurrentTransaction
} from 'actions/transaction/localTransactionAction'
import {
  getById
} from 'actions/product/productAction'
import ImagePicker from 'react-native-image-picker'
import SwipeUpDown from 'components/SwipeUpDown'
import {
  optionsImage
} from 'utils/config'
import {
  requestReadStoragePermission
} from 'utils/permission'

import color from 'theme/color'

import Slider from './Slider'
import Example from './Example'

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  button: {
    borderRadius: 5,
    zIndex: 2
  },
  containBtnBottom: {
    width: '100%',
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: color.textIcons
  },
  halfContain: {
    width: '50%'
  },
  txtMinSize: {
    fontSize: 14,
    color: color.dividerColor
  },
  txtSize: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.smoothText
  },
  swipeUpDown: {
    borderWidth: 2,
    elevation: 10,
    backgroundColor: color.textIcons,
    borderColor: color.dividerColor
  },
  txtSwipeUp: {
    fontSize: 10,
    textAlign: 'center',
    color: color.secondaryText
  },
  wrapScroll: {
    width: '100%',
    height: '100%',
    paddingBottom: 80
  }
})

class Container extends Component {
  state = {
    refreshing: false,
    storageRead: false,
    animation: 'easeInEaseOut'
  }

  componentDidMount () {
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
    const { dispatch, photoList } = this.props

    await dispatch(getCurrentTransaction())
    await dispatch(getById(photoList.productId))
  }

  render () {
    const { navigation, photoList, productItem } = this.props
    const { params } = navigation.state
    const {
      refreshing,
      storageRead,
      animation
    } = this.state

    return (
      <View
        style={styles.root}
      >
        <View style={styles.wrapScroll}>
          <ScrollView
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
            {
              storageRead ? (
                <Slider data={photoList} photoList={photoList.photos} navigation={navigation} />
              ) : null
            }
          </ScrollView>

          <View style={styles.containBtnBottom}>
            <View style={styles.halfContain}>
              <Text style={styles.txtMinSize}>Min Size</Text>
              {
                params && params.item && params.item.product ? (
                  <Text style={styles.txtSize}>
                    {`${params.item.product.width} x ${params.item.product.height} px`}
                  </Text>
                ) : null
              }
            </View>
            <Button
              full
              primary
              disabled={!!(photoList && photoList.photos && photoList.photos.length >= photoList.qty)}
              onPress={() => this.goToDetail()}
              style={[styles.button, styles.halfContain]}
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

        <SwipeUpDown
          disablePressToShow
          itemMini={(
            <View>
              <Text style={styles.txtSwipeUp}>Swipe Up For Example</Text>
              <Icon style={styles.txtSwipeUp} name="caretup" type="AntDesign" />
              <Example data={productItem} />
            </View>
          )}
          itemFull={(
            <Example data={productItem} />
          )}
          onShowMini={() => console.log('mini')}
          onShowFull={() => console.log('full')}
          swipeHeight={140}
          style={styles.swipeUpDown}
          animation={animation}
        />

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
