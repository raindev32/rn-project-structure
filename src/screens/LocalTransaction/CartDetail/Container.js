import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native'
import {
  View,
  Button,
  Text,
  Toast
} from 'native-base'
import ProductEmpty from 'components/EmptyState/ProductEmpty'
import { withNavigation } from 'react-navigation'
import { getCurrentTransaction } from 'actions/transaction/localTransactionAction'
import CartItem from './CartItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  scrollView: {
    padding: 10
  },
  root: {
    flex: 1
  },
  bottom: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10
  },
  button: {
    borderRadius: 5
  }
})

class Container extends Component {
  state = {
    refreshing: false
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = () => {
    const { dispatch } = this.props
    dispatch(getCurrentTransaction())
  }

  checkValid = async () => {
    const { item } = this.props
    if (item && item.detail) {
      const list = item.detail.filter((filtered) => {
        if (filtered.photos) {
          if (filtered.photos.length < filtered.qty) {
            Toast.show({
              text: `Validation: Product ${filtered.product.name} require more picture`,
              buttonText: 'Okay',
              type: 'warning'
            })
            return true
          }
          return false
        }
        Toast.show({
          text: `Validation: Product ${filtered.product.name} require more picture`,
          buttonText: 'Okay',
          type: 'warning'
        })
        return true
      })

      if (list && list.length > 0) {
        return false
      }
      if (list && list.length === 0) {
        return true
      }
    }
    return false
  }

  checkout = async () => {
    const { item, navigation, currentUser } = this.props
    const valid = await this.checkValid()

    if (valid) {
      if (currentUser && currentUser.delivery && currentUser.delivery.id) {
        navigation.navigate('Checkout', {
          item
        })
      } else {
        navigation.navigate('AddAddress', {
          title: 'Add',
          item,
          checkout: 1
        })
      }
    }
  }

  render () {
    const {
      navigation,
      item
    } = this.props
    const { refreshing } = this.state

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
          {item && item.detail && item.detail.length === 0 && (
            <ProductEmpty
              text="Shopping Cart"
              additional="is empty"
              data={item.detail}
              loading={false}
              navigation={navigation}
            />
          )}
          {item && item.detail ? item.detail.map((item, index) => (
            <CartItem item={item} parent={item.index} key={index} />
          )) : null}

        </ScrollView>
        <View
          style={styles.container}
        >
          <View style={styles.bottom}>
            <Button
              primary
              full
              onPress={() => this.checkout()}
              style={styles.button}
            >
              <Text style={styles.title}>Checkout</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authStore.currentItem,
  item: state.localTransactionStore.cartDetail
})

export default connect(mapStateToProps)(withNavigation(Container))
