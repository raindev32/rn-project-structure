import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import PropTypes from 'prop-types'

import color from 'theme/color'

import { likeEvent } from 'actions/event/eventLikeAction'
import { unLikeEvent } from 'actions/event/eventUnlikeAction'
import { userData } from 'actions/auth/profile'

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 30
  },
  wrapIcon: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

class Like extends Component {
  state = {
    like: false
  }

  componentDidMount () {
    this._getUserData()
  }

  eventLike = async (id) => {
    const { dispatch, navigation } = this.props
    await dispatch(likeEvent({ eventId: id }, navigation))
    this.setState({
      like: true
    })
  }

  eventUnlike = async (id) => {
    const { dispatch, navigation } = this.props
    await dispatch(unLikeEvent({ eventId: id }, navigation))
    this.setState({
      like: false
    })
  }

  _getUserData = async () => {
    const { dispatch } = this.props
    await dispatch(userData())
  }

  render () {
    const { data, currentItem } = this.props
    const { like } = this.state

    return (
      <View style={styles.wrapIcon}>
        {
          currentItem && currentItem.id ? (
            !like ? (
              <TouchableOpacity
                onPress={() => this.eventLike(data.id)}
              >
                <Icon
                  style={[styles.iconStyle, { color: color.secondaryText }]}
                  type="AntDesign"
                  name="hearto"
                />
              </TouchableOpacity>
            )
              : (
                <TouchableOpacity
                  onPress={() => this.eventUnlike(data.id)}
                >
                  <Icon
                    style={[styles.iconStyle, { color: color.errorColor }]}
                    type="AntDesign"
                    name="heart"
                  />
                </TouchableOpacity>
              )
          ) : null
        }
      </View>
    )
  }
}

Like.propTypes = {
  data: PropTypes.object
}

const mapStateToProps = state => ({
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

export default withNavigation(connect(mapStateToProps)(Like))
