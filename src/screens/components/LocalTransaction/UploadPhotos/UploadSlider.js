import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import { Icon, ActionSheet } from 'native-base'
import FastImage from 'react-native-fast-image'
import reactNativePackage from 'react-native/package.json'
import {
  addPhoto,
  deletePhoto,
  receivePhotoDetail
} from 'actions/transaction/localTransactionAction'
import { convertSizeByType } from 'utils/string'
import LocalImage from 'components/LocalImage'
import color from 'theme/color'
import globalStyle from 'theme/style'

const splitVersion = reactNativePackage.version.split('.')
const majorVersion = +splitVersion[0]
const minorVersion = +splitVersion[1]

const iconArrow = function (iconHeight) {
  return {
    width: 0,
    height: 0,
    margin: 0,
    backgroundColor: color.transparent,
    borderStyle: 'solid',
    borderTopColor: color.transparent,
    borderBottomColor: color.transparent,
    borderTopWidth: iconHeight / 2,
    borderBottomWidth: iconHeight / 2
  }
}

const iconArrowRight = function (iconHeight) {
  return {
    borderRightWidth: 0,
    borderLeftWidth: (iconHeight * 75) / 100,
    borderRightColor: color.primaryColor,
    borderLeftColor: color.primaryColor
  }
}

const iconArrowLeft = function (iconHeight) {
  return {
    borderRightWidth: (iconHeight * 75) / 100,
    borderLeftWidth: 0,
    borderRightColor: color.primaryColor,
    borderLeftColor: color.primaryColor
  }
}

const styles = StyleSheet.create({
  flexImageContain: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: color.textIcons
  },
  layoutIndicator: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.transparent
  },
  containerImage: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: color.primaryText
  },
  containImgSlider: {
    flex: 1,
    paddingRight: 20,
    paddingBottom: 50,
    justifyContent: 'center'
  },
  // wrapp slider and template.
  wrapperImageComp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: color.transparent
  },
  containTitleBottom: {
    paddingHorizontal: 50
  },
  txtBottomIndicator: {
    paddingRight: 10,
    fontWeight: 'bold'
  },
  txtCountBottomIndicator: {
    color: color.primaryColor,
    fontWeight: 'bold'
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%'
    // width: (Dimensions.get('window').width / 2) - 10,
  },
  wrapIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  iconPic: {
    fontSize: 30,
    position: 'absolute',
    right: 20,
    color: color.secondaryText
  },
  productTemplate: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})

const customStylePaddingFromApi = function (size) {
  return {
    paddingTop: convertSizeByType(size.paddingTop, size.paddingTopType),
    paddingBottom: convertSizeByType(size.paddingBottom, size.paddingBottomType),
    paddingLeft: convertSizeByType(size.paddingLeft, size.paddingLeftType),
    paddingRight: convertSizeByType(size.paddingRight, size.paddingRightType)
  }
}

class UploadSlider extends Component {
  state = {
    position: 0,
    errorPhotoLoad: false,
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  }

  _panResponder = {}

  componentDidMount () {
    let release = (e, { vx, dx }) => {
      const { dataSource } = this.props
      const { width } = this.state
      const relativeDistance = dx / width
      let change = 0

      if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
        change = 1
      } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
        change = -1
      }
      const position = this._getPosition()
      if (position === 0 && change === -1) {
        change = 0
      } else if (position + change >= dataSource.length) {
        change = (dataSource.length) - (position + change)
      }
      this._move(position + change)
      return true
    }

    this._panResponder = PanResponder.create({
      onPanResponderRelease: release
    })

    this._interval = setInterval(() => {
      const { width } = this.state
      const newWidth = Dimensions.get('window').width
      if (newWidth !== width) {
        this.setState({ width: newWidth })
      }
    }, 16)
  }

  componentDidUpdate (prevProps) {
    const { position } = this.props
    if (prevProps.position !== position) {
      this._move(position)
    }
  }

  componentWillUnmount () {
    clearInterval(this._interval)
  }

  goToDetail = (uri, index) => {
    const { dispatch } = this.props
    dispatch(receivePhotoDetail(uri))
    return (
      this.showToast(uri, index, dispatch)
    )
  }

  onCancel = () => {
    const { navigation } = this.props
    navigation.navigate('UploadBooks')
  }

  showToast = (item, index, dispatch) => {
    const BUTTONS = [
      {
        text: 'Edit', icon: 'crop', iconColor: color.secondaryText
      },
      {
        text: 'Change', icon: 'image', iconColor: color.secondaryText
      },
      {
        text: 'Duplicate', icon: 'copy', iconColor: color.secondaryText
      },
      {
        text: 'Delete', icon: 'trash', iconColor: color.secondaryText
      },
      {
        text: 'Cancel', icon: 'close', iconColor: color.secondaryText
      }
    ]

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: 2,
        title: 'Image Picker'
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.openDetail(index, { goTo: 'UploadPhotos' })
            break
          case 1:
            this.openDetail(index, { goTo: 'UploadPhotos' })
            break
          case 2:
            dispatch(addPhoto(item))
            break
          case 3:
            dispatch(deletePhoto(index))
            break
          default:
            break
        }
      }
    )
  }

  openDetail = (index, goTo) => {
    const { navigation } = this.props
    navigation.navigate('PhotoDetail', { index, goTo })
  }

  _onRef (ref) {
    const { position } = this.state
    this._ref = ref
    if (ref && position !== this._getPosition()) {
      this._move(this._getPosition())
    }
  }

  _move (index) {
    const { onPositionChanged } = this.props
    const { width } = this.state
    const isUpdating = index !== this._getPosition()
    const x = width * index
    if (majorVersion === 0 && minorVersion <= 19) {
      this._ref.scrollTo(0, x, true) // use old syntax
    } else {
      this._ref.scrollTo({ x: width * index, y: 0, animated: true })
    }
    this.setState({ position: index })
    if (isUpdating && onPositionChanged) {
      onPositionChanged(index)
    }
  }

  handleScroll (event, width) {
    const { onScroll } = this.props
    const position = event.nativeEvent.contentOffset.x / width
    this.setState({
      position
    })

    if (onScroll) {
      onScroll({
        position
      })
    }
  }

  _getPosition () {
    let currentPosition = 0
    const { position } = this.props
    if (typeof position === 'number') {
      currentPosition = position
    } else {
      const { position } = this.state
      currentPosition = position
    }
    return currentPosition
  }

  _next () {
    const { dataSource } = this.props
    const { position } = this.state
    const pos = Math.ceil(position + 1) === dataSource.length ? 0 : position + 1

    this._move(pos)
    this.setState({ position: pos })
  }

  _prev () {
    const { dataSource } = this.props
    const { position } = this.state
    const pos = position === 0 ? dataSource.length - 1 : position - 1
    this._move(pos)
    this.setState({ position: pos })
  }

  _getHeight () {
    let currentHeight = 400
    let { height } = this.props
    if (height !== undefined) {
      currentHeight = height
    } else {
      const { height } = this.state
      currentHeight = height
    }
    return currentHeight
  }

  render () {
    const {
      qty,
      dataSource,
      containerStyle,
      scrollEnabled,
      onPress,
      overlay,
      arrow,
      arrowSize,
      arrowLeft,
      arrowRight,
      data,
      sizeProduct
    } = this.props
    const { width, errorPhotoLoad } = this.state
    const height = this._getHeight()
    const position = this._getPosition()

    return (
      <View style={[
        containerStyle,
        { height }
      ]}
      >
        {/* SECTION IMAGE */}
        <View style={styles.flexImageContain}>
          <FastImage
            source={{ uri: data.product.image.url }}
            style={styles.productTemplate}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <ScrollView
            ref={(ref) => this._onRef(ref)}
            decelerationRate={0.99}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            indicatorStyle="black"
            scrollEnabled={scrollEnabled}
            onScroll={(event) => this.handleScroll(event, width)}
            {...this._panResponder.panHandlers}
            style={[
              styles.container,
              { height, backgroundColor: color.transparent }
            ]}
          >
            {dataSource.map((image, index) => {
              const imageObject = image || ''
              const imageComponent = (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => { this.goToDetail(image, index) }}
                >
                  <View
                    style={styles.containImgSlider}
                  >
                    <View style={styles.wrapIcon}>
                      <Icon
                        name="edit"
                        type="Entypo"
                        style={styles.iconPic}
                      />
                    </View>
                    <View
                      style={[styles.wrapperImageComp, customStylePaddingFromApi(sizeProduct)]}
                    >
                      {!errorPhotoLoad ? (
                        <LocalImage
                          item={imageObject}
                          resizeMode="contain"
                          style={styles.image}
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
                          resizeMode="cover"
                          style={styles.image}
                        />
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
              const imageComponentWithOverlay = (
                <View key={index} style={styles.containerImage}>
                  <View style={styles.overlay}>
                    <FastImage
                      style={{ height, width }}
                      source={imageObject}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  </View>
                </View>
              )
              if (onPress) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ height, width }}
                    onPress={() => onPress({ image, index: image.name })}
                    delayPressIn={200}
                  >
                    {overlay ? imageComponentWithOverlay : imageComponent}
                  </TouchableOpacity>
                )
              }
              return overlay ? imageComponentWithOverlay : imageComponent
            })}
          </ScrollView>
        </View>
        {/* END SECTION IMAGE */}
        {/* SECTION INDICATOR */}
        <View
          style={[
            styles.layoutIndicator
          ]}
        >
          {arrow
            && (
              <TouchableOpacity
                onPress={() => this._prev()}
              >
                {
                  arrowRight === undefined
                    ? (
                      <View
                        style={[
                          iconArrow(arrowSize),
                          iconArrowLeft(arrowSize)
                        ]}
                      />
                    )
                    : arrowLeft
                }
              </TouchableOpacity>
            )}
          <View style={styles.containTitleBottom}>
            <View style={globalStyle.fdRow}>
              <Text style={styles.txtBottomIndicator}>Page</Text>
              <Text style={styles.txtCountBottomIndicator}>{`${Math.ceil(position + 1)} / ${qty}`}</Text>
            </View>
          </View>
          {arrow
            && (
              <TouchableOpacity
                onPress={() => this._next()}
              >
                {
                  arrowRight === undefined
                    ? (
                      <View
                        style={[
                          iconArrow(arrowSize),
                          iconArrowRight(arrowSize)
                        ]}
                      />
                    )
                    : arrowRight
                }
              </TouchableOpacity>
            )}
        </View>
      </View>
    )
  }
}

UploadSlider.defaultProps = {
  height: 400,
  indicatorSize: 8,
  indicatorColor: color.dividerColor,
  indicatorSelectedColor: color.primaryColor,
  scrollEnabled: true,
  arrowSize: 16,
  arrow: true,
  downloadable: true
}

UploadSlider.propTypes = {
  dataSource: PropTypes.array.isRequired,
  downloadable: PropTypes.bool,
  arrow: PropTypes.bool,
  indicatorSize: PropTypes.number,
  indicatorColor: PropTypes.string,
  indicatorSelectedColor: PropTypes.string,
  height: PropTypes.number,
  position: PropTypes.number,
  scrollEnabled: PropTypes.bool,
  containerStyle: PropTypes.object,
  overlay: PropTypes.bool,
  arrowSize: PropTypes.number,
  arrowLeft: PropTypes.object,
  arrowRight: PropTypes.object,
  onScroll: PropTypes.func,
  onPress: PropTypes.func,
  onPositionChanged: PropTypes.func
}

export default connect(null)(withNavigation(UploadSlider))
