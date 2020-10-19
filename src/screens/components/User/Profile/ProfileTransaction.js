import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Text, Badge } from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'

import IconBelumBayar from 'assets/app/icon-transaksi/icon-belum-bayar.png'
import IconProses from 'assets/app/icon-transaksi/icon-diproses.png'
import IconKirim from 'assets/app/icon-transaksi/icon-dikirim.png'
import IconSampai from 'assets/app/icon-transaksi/icon-sampai.png'

import {
  NOT_PAID,
  PAID,
  SEND,
  SENT
} from 'utils/constants'

const styles = StyleSheet.create({
  optionMenu: {
    flex: 4,
    alignItems: 'center'
  },
  imageTransaction: {
    width: 40,
    height: 40
  },
  badge: {
    top: -10,
    right: 18,
    width: 30,
    height: 28,
    position: 'absolute',
    justifyContent: 'center'
  },
  txtCount: {
    fontSize: 10
  }
})

class ProfileTransaction extends Component {
  routeToDetail = (status = 0, title) => {
    const { navigation } = this.props
    navigation.navigate('TransactionList', {
      status,
      title
    })
  }

  render () {
    // const { count } = this.props

    const listTransaksi = [
      {
        key: 'pending',
        image: IconBelumBayar,
        title: 'Not Paid',
        // count: count.unpaid,
        onPress: () => this.routeToDetail(NOT_PAID, 'Not Paid')
      },
      {
        key: 'process',
        image: IconProses,
        title: 'Paid',
        // count: count.paid,
        onPress: () => this.routeToDetail(PAID, 'Paid')
      },
      {
        key: 'send',
        image: IconKirim,
        title: 'Send',
        // count: count.send,
        onPress: () => this.routeToDetail(SEND, 'Send')
      },
      {
        key: 'sent',
        image: IconSampai,
        title: 'Done',
        onPress: () => this.routeToDetail(SENT, 'Done')
      }
    ]

    return (
      <View style={globalStyle.padVert}>
        <Text style={[globalStyle.navTitle, globalStyle.boldText, { color: color.primaryColor }]}>Transaction</Text>
        <View style={[globalStyle.fdRow, globalStyle.fullWidth, globalStyle.padVert]}>
          {
            listTransaksi.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionMenu}
                onPress={data.onPress}
              >
                <Image
                  style={styles.imageTransaction}
                  source={data.image}
                  resizeMode="contain"
                />
                {
                  data && data.count ? (
                    <Badge style={styles.badge}>
                      <Text style={styles.txtCount}>{data.count}</Text>
                    </Badge>
                  ) : null
                }
                <Text style={globalStyle.smallText}>{data.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

export default withNavigation(ProfileTransaction)
