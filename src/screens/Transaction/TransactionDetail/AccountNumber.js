import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard
} from 'react-native'
import {
  View, Text, Card, Toast
} from 'native-base'
import color from 'theme/color'
import { TRANSFER, VIRTUAL_ACCOUNT } from 'utils/variable'
import moment from 'moment'

import waitingPayment from 'assets/app/icon-transaksi/waiting-payment.png'

const styles = StyleSheet.create({
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
  danger: {
    color: color.errorColor
  },
  txtCopy: {
    fontSize: 15,
    color: color.primaryColor
  },
  imgWaiting: {
    alignSelf: 'center',
    width: 150,
    height: 100
  }
})

class AccountNumber extends Component {
  copyAccountNumber = (number) => {
    Clipboard.setString(`${number}`)
    Toast.show({
      text: 'Account number copied',
      type: 'success'
    })
  }

  render () {
    const {
      currentItem
    } = this.props
    if (!currentItem) return null

    if (currentItem && currentItem.paymentType === TRANSFER && currentItem.bankAccountNo) {
      return (
        <View>
          {currentItem && currentItem.bankAccountNo ? (
            <Card style={styles.card}>
              <Image source={waitingPayment} style={styles.imgWaiting} resizeMode="contain" />
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
            </Card>
          )
            : null}
        </View>
      )
    }

    if (currentItem && currentItem.paymentType === VIRTUAL_ACCOUNT && currentItem.virtualAccount) {
      const expiredDate = moment(currentItem.expireDate).format('lll')
      const expire = moment.utc(currentItem.expireDate)
      const expired = expire.isAfter(moment())

      return (
        <View>
          {currentItem && currentItem.virtualAccount ? (
            <Card style={styles.card}>
              <Image source={waitingPayment} style={styles.imgWaiting} resizeMode="contain" />
              <TouchableOpacity
                onPress={() => {
                  this.copyAccountNumber(currentItem.virtualAccount)
                }}
              >
                <View style={styles.primaryItem}>
                  <Text style={styles.bold}>{currentItem.virtualAccount}</Text>
                  <Text style={styles.txtCopy}>Click to copy</Text>
                  {currentItem.expireDate && (<Text note>{`Expire: ${expiredDate}`}</Text>)}
                  {!expired && (<Text style={styles.danger}>EXPIRED</Text>)}
                </View>
              </TouchableOpacity>
            </Card>
          )
            : null}
        </View>
      )
    }

    return (
      <View style={styles.primaryItem}>
        <Text style={styles.bold}>Account number not found, call for administrator</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentItem: state.transactionStore.currentItem
})

export default connect(mapStateToProps)(AccountNumber)
