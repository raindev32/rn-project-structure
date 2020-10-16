import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert
} from 'react-native'
import {
  View, Text, Card, Item, Button, Icon
} from 'native-base'
import FastImage from 'react-native-fast-image'
import HTMLView from 'react-native-htmlview'
import ModalMessage from 'components/Modal'
import {
  getById,
  acceptProduct
} from 'actions/transaction/transactionAction'
import globalStyle from 'theme/style'
import color from 'theme/color'
import { currencyFormatter } from 'utils/string'
import {
  NOT_PAID,
  SEND,
  COMPLAIN
} from 'utils/constants'
import { TRANSFER } from 'utils/variable'
import Tracking from './Tracking'
import AccountNumber from './AccountNumber'

const styles = StyleSheet.create({
  scrollView: {
    padding: 0
  },
  root: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 10
  },
  imgBank: {
    margin: 5,
    width: 100,
    height: 100
  },
  padVert: {
    paddingVertical: 10
  },
  card: {
    padding: 10,
    borderRadius: 10
  },
  itemcard: {
    paddingVertical: 10,
    borderBottomWidth: 0
  },
  button: {
    marginVertical: 5,
    borderRadius: 5
  },
  value: {
    position: 'absolute',
    right: 5
  },
  title: {
    color: color.secondaryText
  },
  wrapTerm: {
    backgroundColor: color.termColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  btnTracking: {
    borderWidth: 1,
    borderColor: color.dividerColor,
    borderRadius: 10
  },
  iconShipping: {
    fontSize: 18,
    color: color.smoothText
  }
})

class Container extends Component {
  state = {
    refreshing: false,
    visible: false
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { dispatch, navigation } = this.props
    const { params } = navigation.state
    dispatch(getById(params.id))
  }

  acceptProduct = (id) => {
    const { dispatch, navigation } = this.props
    Alert.alert(
      'Have you received the product ?',
      'this action cannot be undone',
      [
        {
          text: 'No',
          style: 'cancel',
          color: color.primaryText,
          onPress: () => {
            console.log('Cancel Pressed!')
          }
        },
        {
          text: 'Yes',
          color: color.primaryColor,
          onPress: () => {
            dispatch(acceptProduct(id, navigation))
          }
        }
      ],
      { cancelable: true }
    )
  }

  render () {
    const {
      currentItem,
      navigation,
      loading
    } = this.props
    const {
      refreshing,
      visible
    } = this.state
    const { params, id } = navigation.state

    if (!currentItem || loading) return null

    const modalMessageProps = {
      visible,
      id,
      customHeader: 'Tracking Shipping',
      component: <Tracking id={currentItem.id} />,
      onClose: () => this.setState({ visible: false })
    }

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

          <ModalMessage
            {...modalMessageProps}
            navigation={navigation}
          />

          <View style={styles.container}>
            <AccountNumber />
            {
              currentItem && !currentItem.statusComplain && currentItem.status === SEND ? (
                <Card style={styles.card}>
                  <Text style={[globalStyle.boldText, styles.padVert]}>Tracking Shipping</Text>
                  <Button
                    full
                    bordered
                    style={styles.btnTracking}
                    onPress={() => this.setState({ visible: true })}
                  >
                    <Text uppercase={false} style={styles.title}>Check Tracking Shipping</Text>
                    <Icon name="luggage-cart" type="FontAwesome5" style={styles.iconShipping} />
                  </Button>
                </Card>
              ) : null
            }
            <Card style={styles.card}>
              <Text style={[globalStyle.boldText, styles.padVert]}>Payment Information</Text>
              <Item style={styles.itemcard}>
                <Text style={styles.title}>Subtotal: </Text>
                <Text style={styles.value}>{currencyFormatter(currentItem.subTotal)}</Text>
              </Item>
              <Item style={styles.itemcard}>
                <Text style={styles.title}>Courier: </Text>
                <Text style={styles.value}>{currencyFormatter(currentItem.courierCost)}</Text>
              </Item>
              <Item style={styles.itemcard}>
                <Text style={globalStyle.boldText}>Total: </Text>
                <Text style={[styles.value, globalStyle.boldText]}>{currencyFormatter(currentItem.totalPrice)}</Text>
              </Item>
            </Card>
            <Card style={styles.card}>
              <Text style={globalStyle.boldText}>Payment Method</Text>
              <Item style={styles.itemcard}>
                {
                  currentItem && currentItem.bankImage && currentItem.bankImage.url ? (
                    <FastImage
                      style={styles.imgBank}
                      source={{
                        uri: currentItem.bankImage.url,
                        priority: FastImage.priority.high
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ) : null
                }
                <View>
                  <Text>{currentItem.bankName}</Text>
                  <Text>{currentItem.bankAccountName}</Text>
                </View>
              </Item>
              <View style={styles.wrapTerm}>
                <Text style={globalStyle.padVert}>Term and conditions</Text>
                {currentItem && currentItem.bank && currentItem.bank.description ? (
                  <HTMLView
                    value={currentItem.bank.description}
                    stylesheet={styles}
                  />
                ) : null}
              </View>
            </Card>
            {currentItem && currentItem.paymentType === TRANSFER && currentItem.status === NOT_PAID && !currentItem.autoPayment ? (
              <Button
                full
                primary
                style={styles.button}
                onPress={() => navigation.navigate('UploadInvoice', {
                  id: params.id
                })}
              >
                <Text>Payment</Text>
              </Button>
            ) : null}
            {currentItem && currentItem.status === SEND ? (
              <Button
                full
                primary
                disabled={loading}
                style={styles.button}
                onPress={() => this.acceptProduct(currentItem.id)}
              >
                <Text>Confirm</Text>
              </Button>
            ) : null}
            {currentItem && !currentItem.statusComplain && currentItem.status === SEND ? (
              <Button
                full
                danger
                disabled={loading}
                style={styles.button}
                onPress={() => navigation.navigate('Complain', { id: currentItem.id })}
              >
                <Text>Complain</Text>
              </Button>
            ) : null}
            {currentItem && currentItem.status === COMPLAIN ? (
              <Button
                full
                primary
                disabled={loading}
                style={styles.button}
                onPress={() => navigation.navigate('HistoryComplain', { id: currentItem.id })}
              >
                <Text>History Complain</Text>
              </Button>
            ) : null}
            <Button
              full
              bordered
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text>Back to Home</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.transactionStore.loading,
  currentItem: state.transactionStore.currentItem
})

export default withNavigation(connect(mapStateToProps)(Container))
