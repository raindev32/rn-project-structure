import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View
  // StyleSheet
} from 'react-native'
import {
  Text
  // Icon
} from 'native-base'
import globalStyle from 'theme/style'
// import color from 'theme/color'

import {
  userData
} from 'actions/auth/profile'

// const styles = StyleSheet.create({
//   contentText: {
//     paddingVertical: 10,
//     alignItems: 'center'
//   },
//   padLeft: {
//     paddingLeft: 5
//   }
// })

class BundleCost extends Component {
  componentDidMount () {
    this._refresh()
  }

  _refresh = () => {
    const { dispatch } = this.props
    dispatch(userData())
  }

  render () {
    const { currentItem } = this.props
    if (currentItem && currentItem.delivery && currentItem.delivery.id) {
      return (
        <View style={globalStyle.padDefault}>
          <Text style={globalStyle.boldText}>Delivery</Text>
          <Text style={globalStyle.smallText}>{`To ${currentItem.delivery.subdistrict.name}, ${currentItem.delivery.city.name}`}</Text>
          {/* <View style={[globalStyle.fdRow, styles.contentText]}>
            <Icon type="FontAwesome5" name="truck" style={{ color: color.secondaryColor }} />
            <Text style={[styles.padLeft, globalStyle.smallText]}>Ongkos kirim mulai dari Rp. 21.000</Text>
            <Icon type="FontAwesome5" name="angle-down" style={[styles.padLeft, { color: color.dividerColor }]} />
          </View> */}
        </View>
      )
    }

    return null
  }
}

const mapStateToProps = (state) => ({
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem
})

export default connect(mapStateToProps)(BundleCost)
