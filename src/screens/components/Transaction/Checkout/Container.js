import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native'
import {
  View
} from 'native-base'
import { withNavigation } from 'react-navigation'
import { getCurrentTransaction } from 'actions/transaction/localTransactionAction'
import { userData } from 'actions/auth/profile'
import {
  get as getStore
} from 'actions/location/storeAction'
import BottomButton from './BottomButton'
import Address from './Address'
import CartItem from './CartItem'
import Courier from './Courier'
import Payment from './Payment'
import Form from './Form'
import CartList from './CartList'

const styles = StyleSheet.create({
  scrollView: {
    padding: 10
  },
  root: {
    flex: 1
  }
})

class Container extends Component {
  state = {
    refreshing: false,
    courier: null,
    bank: null,
    paymentType: 1
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = () => {
    const { dispatch } = this.props
    dispatch(getCurrentTransaction())
    dispatch(userData())
    dispatch(getStore())
  }

  setCourier = (value) => {
    this.setState({
      courier: value
    })
  }

  setBank = (bank) => {
    this.setState({
      bank
    })
  }

  callbackCourier = async (courierCost) => {
    if (courierCost && courierCost.length > 0) {
      this.setCourier(JSON.stringify(courierCost[0]))
      return
    }
    this.setCourier()
  }

  setPaymentType = (paymentType) => {
    this.setState({
      bank: null
    })
    this.setState({
      paymentType
    })
  }

  render () {
    const {
      navigation
    } = this.props
    const {
      refreshing,
      courier,
      bank,
      paymentType
    } = this.state
    const { params } = navigation.state
    const { item, list } = params

    return (
      <View style={styles.root}>
        <ScrollView
          style={styles.scrollView}
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
          <Address item={item} callback={this.callbackCourier} />
          {list ? (<CartList list={list} />) : (<CartItem item={item} />)}
          <Courier onChange={this.setCourier} callback={this.callbackCourier} selectedValue={courier} />
          <Payment
            setBank={this.setBank}
            setPaymentType={this.setPaymentType}
            selectedValue={bank}
            paymentType={paymentType}
          />
          <Form courier={courier} item={item} />
          <BottomButton
            bank={bank}
            courier={courier}
            item={item}
            list={list}
            paymentType={paymentType}
          />
        </ScrollView>
      </View>
    )
  }
}

export default connect(null)(withNavigation(Container))
