import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { View, ScrollView, RefreshControl } from 'react-native'

import globalStyle from 'theme/style'

import {
  userData
} from 'actions/auth/profile'

import ProfileCard from './ProfileCard'
import ProfileTransaction from './ProfileTransaction'
import ProfileBiodata from './ProfileBiodata'
import ProfileContact from './ProfileContact'

class Container extends Component {
  state = {
    refreshing: false
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { onRefresh } = this.props
    await onRefresh()
  }

  render () {
    const {
      currentItem
    } = this.props
    const { refreshing } = this.state

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this._refresh()}
          />
        )}
      >
        <View style={globalStyle.container}>
          <ProfileCard data={currentItem} />
          <ProfileTransaction />
          <ProfileBiodata data={currentItem} />
          <ProfileContact data={currentItem} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

const mapDispatchToProps = dispatch => ({
  onRefresh: () => {
    dispatch(userData())
  }
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Container))
