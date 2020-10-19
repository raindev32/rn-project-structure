import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import FastImage from 'react-native-fast-image'
import reactNativePackage from 'react-native/package.json'
import color from 'theme/color'

const splitVersion = reactNativePackage.version.split('.')
const majorVersion = +splitVersion[0]
const minorVersion = +splitVersion[1]

const setIndicatorSize = function (size) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2
  }
}

const setIndicatorColor = function (color) {
  return {
    backgroundColor: color
  }
}

const layoutArrow = function (imageHeight, iconHeight) {
  return {
    position: 'absolute',
    backgroundColor: color.transparent,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    top: (imageHeight - iconHeight) / 2,
    bottom: (imageHeight - iconHeight) / 2
  }
}

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
    borderRightColor: color.transparent,
    borderLeftColor: color.textIcons
  }
}

const iconArrowLeft = function (iconHeight) {
  return {
    borderRightWidth: (iconHeight * 75) / 100,
    borderLeftWidth: 0,
    borderRightColor: color.textIcons,
    borderLeftColor: color.transparent
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: color.textIcons
  },
  left: { left: 10 },
  right: { right: 10 },
  layoutIndicator: {
    height: 15,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.transparent
  },
  indicator: {
    margin: 3,
    opacity: 0.9
  },
  indicatorSelected: {
    opacity: 1
  },
  containerImage: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: color.primaryText
  },
  layoutText: {
    position: 'absolute',
    paddingHorizontal: 15,
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: color.transparent
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: color.textIcons
  },
  textCaption: {
    fontWeight: '400',
    fontSize: 12,
    color: color.textIcons
  },
  imgSlider: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    paddingRight: 10,
    paddingHorizontal: 10
  },
  containImgSlider: {
    paddingRight: 20,
    justifyContent: 'center'
  }
})

export default class Slideshow extends Component {
  state = {
    position: 0,
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
    const pos = position === dataSource.length - 1 ? 0 : position + 1
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
      dataSource,
      containerStyle,
      scrollEnabled,
      onPress,
      overlay,
      indicatorSize,
      indicatorColor,
      indicatorSelectedColor,
      arrow,
      arrowSize,
      arrowLeft,
      arrowRight
    } = this.props
    const { width } = this.state
    const height = this._getHeight()
    const position = this._getPosition()

    return (
      <View style={[
        containerStyle,
        { height }
      ]}
      >
        {/* SECTION IMAGE */}
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
            { height }
          ]}
        >
          {dataSource.map((image, index) => {
            const imageObject = typeof image.url === 'string' ? { uri: image.url } : image.url
            const textComponent = (
              <View style={styles.layoutText}>
                {image.title === undefined ? null : <Text style={styles.textTitle}>{image.title}</Text>}
                {image.caption === undefined ? null : <Text style={styles.textCaption}>{image.caption}</Text>}
              </View>
            )
            const imageComponent = (
              <View style={styles.containImgSlider}
                key={index}
              >
                <FastImage
                  style={styles.imgSlider}
                  source={imageObject}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                {textComponent}
              </View>
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
                {textComponent}
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
        {/* END SECTION IMAGE */}
        {/* SECTION INDICATOR */}
        <View
          style={[
            styles.layoutIndicator
          ]}
        >
          {dataSource.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => { return this._move(index) }}
                style={[
                  [
                    styles.indicator,
                    setIndicatorSize(indicatorSize),
                    setIndicatorColor(indicatorColor)
                  ],
                  Math.ceil(position) === index
                  && [
                    styles.indicatorSelected,
                    setIndicatorColor(indicatorSelectedColor)
                  ]
                ]}
              >
                <View />
              </TouchableOpacity>
            )
          })}
        </View>
        {arrow
          && (
            <View
              style={[
                layoutArrow(height, arrowSize),
                styles.left
              ]}
            >
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
            </View>
          )}
        {arrow
          && (
            <View
              style={[
                layoutArrow(height, arrowSize),
                styles.right
              ]}
            >
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
            </View>
          )}
      </View>
    )
  }
}

Slideshow.defaultProps = {
  height: 400,
  indicatorSize: 8,
  indicatorColor: color.dividerColor,
  indicatorSelectedColor: color.primaryColor,
  scrollEnabled: true,
  arrowSize: 16,
  arrow: true,
  downloadable: true
}

Slideshow.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    caption: PropTypes.string,
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  })).isRequired,
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
