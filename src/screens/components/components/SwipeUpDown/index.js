import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
  Platform,
  StyleSheet,
  View,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import color from 'theme/color'

const MARGIN_TOP = Platform.OS === 'ios' ? 20 : 0
const DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP

const styles = StyleSheet.create({
  wrapSwipe: {
    padding: 10,
    backgroundColor: color.smoothText,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  iconTopHandle: {
    alignSelf: 'center',
    height: 5,
    width: 100,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: color.dividerColor
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 100
  },
  marginBottom: {
    marginBottom: -80
  }
})

class SwipeUpDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
    this.disablePressToShow = props.disablePressToShow
    this.SWIPE_HEIGHT = props.swipeHeight || 60
    this._panResponder = null
    this.top = this.SWIPE_HEIGHT
    this.height = this.SWIPE_HEIGHT
    this.customStyle = {
      style: {
        bottom: 0,
        top: this.top,
        height: this.height,
        marginBottom: -200
      }
    }
    this.checkCollapsed = true
    this.showFull = this.showFull.bind(this)
  }

  componentDidMount () {
    const { hasRef } = this.props
    hasRef && hasRef(this)
  }

  updateNativeProps () {
    const { animation } = this.props
    switch (animation) {
      case 'linear':
        LayoutAnimation.linear()
        break
      case 'spring':
        LayoutAnimation.spring()
        break
      case 'easeInEaseOut':
        LayoutAnimation.easeInEaseOut()
        break
      case 'none':
      default:
        break
    }
    this.viewRef.setNativeProps(this.customStyle)
  }

  _onPanResponderMove (event, gestureState) {
    const { collapsed } = this.state
    if (gestureState.dy > 0 && !this.checkCollapsed) {
      // SWIPE DOWN

      this.customStyle.style.top = this.top + gestureState.dy
      this.customStyle.style.height = DEVICE_HEIGHT - gestureState.dy
      // this.swipeIconRef && this.swipeIconRef.setState({ icon: images.minus })
      !collapsed && this.setState({ collapsed: true })
      this.updateNativeProps()
    } else if (this.checkCollapsed && gestureState.dy < -60) {
      // SWIPE UP
      this.top = 0
      this.customStyle.style.top = DEVICE_HEIGHT + gestureState.dy
      this.customStyle.style.height = -gestureState.dy + this.SWIPE_HEIGHT
      this.swipeIconRef
      // && this.swipeIconRef.setState({ icon: images.minus, showIcon: true })
      if (this.customStyle.style.top <= DEVICE_HEIGHT / 2) {
        this.swipeIconRef
          && this.swipeIconRef.setState({
            // icon: images.arrow_down,
            showIcon: true
          })
      }
      this.updateNativeProps()
      collapsed && this.setState({ collapsed: false })
    }
  }

  _onPanResponderRelease (event, gestureState) {
    if (gestureState.dy < -100 || gestureState.dy < 100) {
      this.showFull()
    } else {
      this.showMini()
    }
  }

  showFull () {
    const { onShowFull } = this.props
    const { collapsed } = this.state
    this.customStyle.style.top = 0
    this.customStyle.style.height = DEVICE_HEIGHT
    this.swipeIconRef
    // && this.swipeIconRef.setState({ icon: images.arrow_down, showIcon: true })
    this.updateNativeProps()
    collapsed && this.setState({ collapsed: false })
    this.checkCollapsed = false
    onShowFull && onShowFull()
  }

  showMini () {
    const { onShowMini, itemMini } = this.props
    const { collapsed } = this.state
    this.customStyle.style.top = itemMini
      ? DEVICE_HEIGHT - this.SWIPE_HEIGHT
      : DEVICE_HEIGHT
    // this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0
    // this.swipeIconRef && this.swipeIconRef.setState({ showIcon: false })
    this.updateNativeProps()
    !collapsed && this.setState({ collapsed: true })
    this.checkCollapsed = true
    onShowMini && onShowMini()
  }

  render () {
    const { itemMini, itemFull, style } = this.props
    const { collapsed } = this.state

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    })

    return (
      <View
        {...this._panResponder.panHandlers}
        ref={(el) => { this.viewRef = el }}
        style={[
          styles.wrapSwipe,
          {
            height: this.SWIPE_HEIGHT,
            marginTop: MARGIN_TOP
          },
          itemMini ? styles.marginBottom : null,
          !itemMini && collapsed ? style.marginBottom : null,
          style
        ]}
      >
        <View
          style={styles.iconTopHandle}
        />
        {collapsed ? (
          itemMini ? (
            <TouchableOpacity
              activeOpacity={this.disablePressToShow ? 1 : 0.6}
              style={{ height: this.SWIPE_HEIGHT }}
            >
              {itemMini}
            </TouchableOpacity>
          ) : null
        )
          : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
            >
              {itemFull}
            </ScrollView>
          )}
      </View>
    )
  }
}

SwipeUpDown.defaultProps = {
  disablePressToShow: false,
  animation: 'easeInEaseOut'
}

SwipeUpDown.propTypes = {
  hasRef: PropTypes.func, // void
  disablePressToShow: PropTypes.bool,
  swipeHeight: PropTypes.number,
  style: PropTypes.object,
  itemFull: PropTypes.object,
  itemMini: PropTypes.object,
  onShowMini: PropTypes.func, // void
  onShowFull: PropTypes.func, // void
  animation: PropTypes.string // linear, spring, easeInEaseOut, none
}

export default SwipeUpDown
