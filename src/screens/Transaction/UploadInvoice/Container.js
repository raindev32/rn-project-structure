import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Clipboard
} from 'react-native'
import {
  View, Text, Card, Toast, Item, Button
} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import HTMLView from 'react-native-htmlview'
import {
  getById,
  uploadInvoice
} from 'actions/transaction/transactionAction'
import globalStyle from 'theme/style'
import color from 'theme/color'
import { currencyFormatter } from 'utils/string'
import { optionsImage } from 'utils/config'

import waitingPayment from 'assets/app/icon-transaksi/waiting-payment.png'

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
  primaryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 20
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
    borderRadius: 5
  },
  value: {
    position: 'absolute',
    right: 5
  },
  title: {
    color: color.secondaryText
  },
  imgWaiting: {
    alignSelf: 'center',
    width: 150,
    height: 100
  },
  txtCopy: {
    fontSize: 15,
    color: color.primaryColor
  },
  wrapTerm: {
    backgroundColor: color.termColor,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
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
    const { dispatch, navigation } = this.props
    const { params } = navigation.state
    dispatch(getById(params.id))
  }

  copyAccountNumber = (number) => {
    Clipboard.setString(`${number}`)
    Toast.show({
      text: 'Account number copied',
      type: 'success'
    })
  }

  uploadInvoice = () => {
    const { dispatch, navigation } = this.props
    const { params } = navigation.state
    ImagePicker.showImagePicker(optionsImage, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        dispatch(uploadInvoice(params.id, response.uri, navigation))
        // this.setImage(response.uri)
      }
    })
  }

  render () {
    const {
      currentItem,
      loading
    } = this.props
    const {
      refreshing
    } = this.state
    if (!currentItem) return null

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
          <View style={styles.container}>
            <Card style={styles.card}>
              <Image source={waitingPayment} style={styles.imgWaiting} resizeMode="contain" />
              {currentItem && currentItem.bankAccountNo ? (
                <TouchableOpacity
                  onPress={() => {
                    this.copyAccountNumber(currentItem.bankAccountNo)
                  }}
                >
                  <View style={styles.primaryItem}>
                    <Text style={styles.bold}>{currentItem.bankAccountNo}</Text>
                    <Text style={styles.txtCopy}>Click to copy</Text>
                  </View>
                </TouchableOpacity>
              )
                : (
                  <View style={styles.primaryItem}>
                    <Text style={styles.bold}>Account number not found, call for administrator</Text>
                  </View>
                )}
            </Card>
            {currentItem
              && currentItem.payment
              && currentItem.payment.image
              && currentItem.payment.image.url ? (
                <Card style={styles.card}>
                  <Text style={[globalStyle.boldText, styles.padVert]}>Payment Invoice</Text>
                  {
                    currentItem
                      && currentItem.payment
                      && currentItem.payment.image
                      && currentItem.payment.image.url ? (
                        <FastImage
                          style={styles.imgBank}
                          source={{
                            uri: currentItem.payment.image.url,
                            priority: FastImage.priority.high
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      )
                      : null
                  }
                </Card>
              ) : null}
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
                <Text>Term and conditions</Text>
                {currentItem && currentItem.bank && currentItem.bank.description ? (
                  <HTMLView
                    value={currentItem.bank.description}
                    stylesheet={styles}
                  />
                ) : null}
              </View>
            </Card>
            {currentItem && !currentItem.autoPayment ? (
              <Button
                full
                primary
                disabled={(currentItem && currentItem.payment && currentItem.payment.length > 0) || loading}
                style={styles.button}
                onPress={() => this.uploadInvoice()}
              >
                <Text>Upload Invoice</Text>
              </Button>
            ) : null}
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

export default connect(mapStateToProps)(Container)
