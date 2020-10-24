import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  Dimensions
} from 'react-native'
import {
  Button,
  Text,
  Item,
  View,
  Separator
} from 'native-base'
import { withNavigation } from 'react-navigation'
import { currencyFormatter } from 'utils/string'

import color from 'theme/color'
import globalStyle from 'theme/style'

import {
  insert,
  failed
} from 'actions/transaction/transactionAction'

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0
  },
  totalPrice: {
    width: '50%',
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 5,
    marginBottom: 30
  },
  button: {
    width: '50%',
    marginVertical: 10,
    borderRadius: 5,
    marginBottom: 30
  },
  totalTitle: {
    color: color.primaryText
  },
  total: {
    color: color.secondaryText
  },
  loadingBar: {
    backgroundColor: color.primaryColor,
    height: 20
  }
})

class Container extends Component {
  createTransaction = () => {
    const {
      dispatch,
      item,
      list,
      bank,
      courier,
      navigation,
      paymentType
    } = this.props
    if (courier && bank && item) {
      dispatch(insert(item && item.id ? item : list, bank, courier, paymentType, navigation))
    } else if (!courier) {
      dispatch(failed('Validation: Courier is required'))
    } else if (!bank) {
      dispatch(failed('Validation: Bank is required'))
    } else if (!item) {
      dispatch(failed('Validation: Item is required'))
    } else if (!paymentType) {
      dispatch(failed('Validation: Payment Type is required'))
    }
  }

  render () {
    const {
      loading,
      item,
      list,
      courier,
      progress,
      countPhoto
    } = this.props
    let courierObject
    if (courier) {
      courierObject = JSON.parse(courier)
    } else {
      courierObject = {
        value: 0
      }
    }

    return (
      <View>
        <Separator style={{ backgroundColor: color.textIcons }} />
        {loading && countPhoto > 0 && (
          <View>
            <View
              style={[
                styles.loadingBar,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  width: (progress / countPhoto) * deviceWidth
                }
              ]}
            >
              <Text style={[globalStyle.centerText, { color: color.textIcons }]}>
                {`${Math.round(Number((progress / countPhoto) * 100))} %`}
              </Text>
            </View>
          </View>
        )}
        <Item style={styles.item}>
          <View
            style={styles.totalPrice}
          >
            <Text uppercase={false} style={styles.totalTitle}>
              Invoice Total
            </Text>
            <Text uppercase={false} style={styles.total}>
              {currencyFormatter(parseFloat(list ? list.reduce((prev, next) => prev + next.price, 0) : item.price) + parseFloat(courierObject.value))}
            </Text>
          </View>
          <Button
            primary
            full
            disabled={loading}
            style={styles.button}
            onPress={() => this.createTransaction()}
          >
            <Text uppercase={false} style={styles.title}>Create Order</Text>
          </Button>
        </Item>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  progress: state.transactionStore.progress,
  countPhoto: state.transactionStore.countPhoto,
  loading: state.transactionStore.loading
})

export default connect(mapStateToProps)(withNavigation(Container))
