import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { View } from 'native-base'
import {
  getById
} from 'actions/product/bundleAction'

import color from 'theme/color'

import BundleImage from './BundleImage'
import BundleName from './BundleName'
import BundleDetail from './BundleDetail'
import BundleCost from './BundleCost'
import BottomButton from './BottomButton'
import BundleHeader from './BundleHeader'

const styles = StyleSheet.create({
  padLeft: {
    paddingLeft: 10
  }
})

class Container extends Component {
  componentDidMount () {
    this._refresh()
  }

  _refresh = () => {
    const { dispatch, navigation } = this.props
    const { params } = navigation.state
    if (params.id && params.categoryId) {
      dispatch(getById(params.id, params.categoryId))
    }
  }

  render () {
    const { currentItem, navigation } = this.props
    const { params } = navigation.state

    return (
      <ScrollView>
        <BundleHeader navigation={navigation} />
        {currentItem && currentItem.id ? (
          <View>
            <BundleImage item={currentItem} />
            <BundleName item={currentItem} />
            <BundleCost item={currentItem} />
            <BundleDetail item={currentItem} />
            {
              currentItem && currentItem.detail && currentItem.detail.length > 0 ? (
                <BottomButton item={currentItem} categoryName={params && params.categoryName ? params.categoryName : {}} />
              ) : (
                <View style={styles.padLeft}>
                  <Text style={{ color: color.errorColor }}>
                      doesnt have bundle detail, cant order !
                  </Text>
                </View>
              )
            }
          </View>
        ) : null}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  currentItem: state.bundleStore.currentItem
})

export default connect(mapStateToProps)(Container)
