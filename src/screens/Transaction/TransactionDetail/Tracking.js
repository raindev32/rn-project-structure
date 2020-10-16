import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View, StyleSheet, ScrollView, RefreshControl
} from 'react-native'
import {
  getTrackingShipping
} from 'actions/utils/trackingShippingAction'

import ItemList from './ItemList'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})

class Tracking extends Component {
  state = {
    refreshing: false
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { dispatch, id } = this.props
    await dispatch(getTrackingShipping({ id }))
  }

  render () {
    const { trackingList } = this.props
    const { refreshing } = this.state

    return (
      <View style={styles.container}>
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
            (trackingList.manifest || []).map((item, index) => (
              <ItemList key={index} data={item} />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingTracking: state.trackingShippingStore.loading,
  trackingList: state.trackingShippingStore.trackingList
})

export default connect(mapStateToProps)(Tracking)
