import React from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import {
  Text
} from 'native-base'
import { sprintf } from 'sprintf-js'
import color from 'theme/color'

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  timeTxt: {
    color: color.secondaryText,
    marginVertical: 2
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  digitCont: {
    borderRadius: 5,
    marginHorizontal: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  digitTxt: {
    color: color.textIcons,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums']
  },
  separatorTxt: {
    backgroundColor: color.transparent,
    fontWeight: 'bold'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const DEFAULT_DIGIT_STYLE = { backgroundColor: color.primaryColor }
const DEFAULT_DIGIT_TXT_STYLE = { color: color.textIcons }
const DEFAULT_TIME_LABEL_STYLE = { color: color.secondaryText }
const DEFAULT_SEPARATOR_STYLE = { color: color.textIcons }
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S']
const DEFAULT_TIME_LABELS = {
  d: 'Days',
  h: 'Hours',
  m: 'Minutes',
  s: 'Seconds'
}

class CountDown extends React.Component {
  static propTypes = {
    digitStyle: PropTypes.object,
    digitTxtStyle: PropTypes.object,
    timeLabelStyle: PropTypes.object,
    timeLabels: PropTypes.object,
    separatorStyle: PropTypes.object,
    timeToShow: PropTypes.array,
    showSeparator: PropTypes.bool,
    size: PropTypes.number,
    until: PropTypes.number,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    onFinish: PropTypes.func,
    running: PropTypes.bool
  };

  constructor (props) {
    super(props)
    const { until } = props
    this.timer = setInterval(this.updateTimer, 1000)
    this.state = {
      until: Math.max(until, 0),
      lastUntil: null,
      wentBackgroundAt: null
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { until } = this.props
    if (until !== nextProps.until) {
      const { until } = this.state
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        lastUntil: until,
        until: Math.max(nextProps.until, 0)
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  _handleAppStateChange = (currentAppState) => {
    const { running } = this.props
    const { until, wentBackgroundAt } = this.state
    if (currentAppState === 'active' && wentBackgroundAt && running) {
      const diff = (Date.now() - wentBackgroundAt)
      this.setState({
        lastUntil: until,
        until: Math.max(0, until - diff)
      })
    }
    if (currentAppState === 'background') {
      this.setState({ wentBackgroundAt: Date.now() })
    }
  }

  getTimeLeft = () => {
    const { until } = this.state
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10)
    }
  };

  updateTimer = () => {
    const { running, onFinish, onChange } = this.props
    const { lastUntil, until } = this.state

    if (lastUntil === until || !running) {
      return
    }
    if (until === 1 || until <= 0 || (until === 0 && lastUntil !== 1)) {
      if (onFinish) {
        onFinish()
      }
      if (onChange) {
        onChange()
      }
    }

    if (until === 0) {
      this.setState({ lastUntil: 0, until: 0 })
    } else {
      if (onChange) {
        onChange()
      }
      this.setState({ lastUntil: until, until: until - 1 })
    }
  };

  renderDigit = (d) => {
    const { digitStyle, digitTxtStyle, size } = this.props
    return (
      <View style={[
        styles.digitCont,
        digitStyle,
        { width: size * 2.3, height: size * 2.6 }
      ]}
      >
        <Text style={[
          styles.digitTxt,
          { fontSize: size },
          digitTxtStyle
        ]}
        >
          {d}
        </Text>
      </View>
    )
  };

  renderLabel = (label) => {
    const { timeLabelStyle, size } = this.props
    if (label) {
      return (
        <Text style={[
          styles.timeTxt,
          { fontSize: size / 1.4 },
          timeLabelStyle
        ]}
        >
          {label}
        </Text>
      )
    }
  };

  renderDoubleDigits = (label, digits) => {
    return (
      <View style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>
          {this.renderDigit(digits)}
        </View>
        {this.renderLabel(label)}
      </View>
    )
  };

  renderSeparator = () => {
    const { separatorStyle, size } = this.props
    return (
      <View style={styles.center}>
        <Text style={[
          styles.separatorTxt,
          { fontSize: size * 1.2 },
          separatorStyle
        ]}
        >
          :
        </Text>
      </View>
    )
  };

  renderCountDown = () => {
    const {
      timeToShow,
      timeLabels,
      showSeparator,
      onPress
    } = this.props
    const {
      days, hours, minutes, seconds
    } = this.getTimeLeft()
    const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':')
    const Component = onPress ? TouchableOpacity : View

    return (
      <Component
        style={styles.timeCont}
        onPress={onPress}
      >
        {timeToShow.includes('D') ? this.renderDoubleDigits(timeLabels.d, newTime[0]) : null}
        {showSeparator && timeToShow.includes('D') && timeToShow.includes('H') ? this.renderSeparator() : null}
        {timeToShow.includes('H') ? this.renderDoubleDigits(timeLabels.h, newTime[1]) : null}
        {showSeparator && timeToShow.includes('H') && timeToShow.includes('M') ? this.renderSeparator() : null}
        {timeToShow.includes('M') ? this.renderDoubleDigits(timeLabels.m, newTime[2]) : null}
        {showSeparator && timeToShow.includes('M') && timeToShow.includes('S') ? this.renderSeparator() : null}
        {timeToShow.includes('S') ? this.renderDoubleDigits(timeLabels.s, newTime[3]) : null}
      </Component>
    )
  };

  render () {
    const {
      style
    } = this.props
    return (
      <View style={style}>
        {this.renderCountDown()}
      </View>
    )
  }
}

CountDown.defaultProps = {
  digitStyle: DEFAULT_DIGIT_STYLE,
  digitTxtStyle: DEFAULT_DIGIT_TXT_STYLE,
  timeLabelStyle: DEFAULT_TIME_LABEL_STYLE,
  timeLabels: DEFAULT_TIME_LABELS,
  separatorStyle: DEFAULT_SEPARATOR_STYLE,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  showSeparator: false,
  until: 0,
  size: 15,
  running: true
}

module.exports = CountDown
