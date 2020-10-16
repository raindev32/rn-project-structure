import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  Card,
  CardItem
} from 'native-base'
import { withNavigation } from 'react-navigation'
import sharedStyle from './styles'
import Store from './Store'
import CourierCostItem from './CourierCostItem'

const styles = StyleSheet.create({
  cardRadius: {
    alignItems: 'center',
    borderRadius: 10
  }
})

class Courier extends Component {
  render () {
    const {
      loading,
      onChange,
      selectedValue,
      currentItem,
      callback
    } = this.props
    if (currentItem && currentItem.store && currentItem.store.name) {
      return (
        <Card style={styles.cardRadius}>
          <CardItem
            header
            style={sharedStyle.cardItem}
          >
            <Text numberOfLines={1} style={sharedStyle.title}>Courier</Text>
          </CardItem>
          {!loading && <Store callback={callback} />}
          <CourierCostItem onChange={onChange} selectedValue={selectedValue} />
        </Card>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => ({
  loading: state.authStore.loading,
  cartDetail: state.localTransactionStore.cartDetail,
  currentItem: state.authStore.currentItem
})

export default connect(mapStateToProps)(withNavigation(Courier))
