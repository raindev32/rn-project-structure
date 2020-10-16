import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Body,
  Item,
  Picker
} from 'native-base'
import { withNavigation } from 'react-navigation'
import HTMLView from 'react-native-htmlview'
import {
  get,
  receiveDropdown
} from 'actions/transaction/bankAction'
import color from 'theme/color'
import {
  TRANSFER,
  VIRTUAL_ACCOUNT
} from 'utils/variable'
import sharedStyle from './styles'

const styles = StyleSheet.create({
  cardRadius: {
    alignItems: 'center',
    borderRadius: 10
  },
  item: {
    flex: 1,
    padding: 0,
    flexDirection: 'row',
    borderBottomWidth: 0
  },
  input: {
    paddingHorizontal: 0,
    paddingLeft: 0,
    padding: 0,
    minHeight: 40,
    height: '100%'
  },
  inputText: {
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    padding: 0,
    justifyContent: 'flex-start',
    width: '100%',
    fontSize: 17
  },
  placeholder: {
    color: color.secondaryText,
    paddingVertical: 10
  }
})

class Payment extends Component {
  componentDidMount () {
    this.setBank()
  }

  setBank = async (value) => {
    const { dispatch, setBank, paymentType } = this.props
    let data
    if (value) {
      data = await dispatch(get(value))
    } else {
      data = await dispatch(get(paymentType))
    }
    if (value === null) {
      dispatch(receiveDropdown([]))
    }

    if (data && data.length > 0) {
      setBank(JSON.stringify(data[0]))
    }
  }

  render () {
    const {
      listDropdown,
      selectedValue,
      paymentType,
      setPaymentType,
      setBank
    } = this.props

    let item = {}

    if (selectedValue) {
      item = JSON.parse(selectedValue)
    }

    const listType = [
      {
        id: `${TRANSFER}`,
        value: 'TRANSFER'
      },
      {
        id: `${VIRTUAL_ACCOUNT}`,
        value: 'VIRTUAL ACCOUNT'
      }
    ]

    return (
      <Card style={styles.cardRadius}>
        <CardItem
          header
          style={sharedStyle.cardItem}
        >
          <Body style={styles.body}>
            <Text numberOfLines={1} style={sharedStyle.title}>Payment Method</Text>
          </Body>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <Item
            style={styles.item}
          >
            <Picker
              mode="dialog"
              placeholder="Payment Type"
              placeholderStyle={styles.placeholder}
              placeholderIconColor={color.secondaryText}
              selectedValue={`${paymentType}`}
              style={styles.input}
              textStyle={styles.inputText}
              iosHeader="Payment Type"
              onValueChange={(value) => {
                setPaymentType(value)
                this.setBank(value)
              }}
            >
              <Picker.Item value={null} label="Payment Type" />
              {listType.map((data, key) => <Picker.Item key={key} label={`${data.value}`} value={`${data.id}`} />)}
            </Picker>
          </Item>
        </CardItem>
        {listDropdown
          && listDropdown.length > 0 ? (
            <CardItem style={styles.cardItem}>
              <Item
                style={styles.item}
              >
                <Picker
                  mode="dialog"
                  placeholder="Choose Bank"
                  placeholderStyle={styles.placeholder}
                  placeholderIconColor={color.secondaryText}
                  selectedValue={selectedValue}
                  style={styles.input}
                  textStyle={styles.inputText}
                  iosHeader="Choose Bank"
                  onValueChange={(value) => setBank(value)}
                >
                  <Picker.Item value={null} label="Choose Bank" />
                  {listDropdown.map((data, key) => <Picker.Item key={key} label={`${data.name}`} value={`${JSON.stringify(data)}`} />)}
                </Picker>
              </Item>
            </CardItem>
          ) : null}
        <CardItem style={styles.cardItem}>
          <Body style={styles.body}>
            {item && item.description ? (
              <HTMLView
                value={item.description}
                stylesheet={styles}
              />
            ) : null}
          </Body>
        </CardItem>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  listDropdown: state.bankStore.listDropdown
})

export default connect(mapStateToProps)(withNavigation(Payment))
