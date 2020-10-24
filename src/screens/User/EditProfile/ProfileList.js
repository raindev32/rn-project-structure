import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native'
import {
  userData
} from 'actions/auth/profile'

import Form from './Form'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10
  }
})

class ProfileList extends Component {
  state = {
    refreshing: false
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { onRefresh } = this.props
    onRefresh()
  }

  render () {
    const { refreshing } = this.state

    return (
      <View style={styles.mainContainer}>
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
          <Form />
        </ScrollView>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  loading: state.authStore.loading,
  errorMessage: state.authStore.errorMessage
})

const mapDispatchToProps = dispatch => ({
  onRefresh: () => dispatch(userData())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList)
