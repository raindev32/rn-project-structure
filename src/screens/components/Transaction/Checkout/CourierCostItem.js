import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet
} from 'react-native'
import {
  CardItem,
  Item,
  Picker
} from 'native-base'
import {
  getCourierCost
} from 'actions/utils/courierAction'
import color from 'theme/color'
import { currencyFormatter } from 'utils/string'

const styles = StyleSheet.create({
  cardItem: {
    height: 70,
    flexDirection: 'column',
    borderRadius: 10
  },
  item: {
    flex: 1,
    padding: 0,
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderRadius: 10
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

class CourierCostItem extends PureComponent {
  componentDidMount () {
    this.setCourierCost()
  }

  setCourierCost = async () => {
    const {
      dispatch,
      cartDetail,
      currentItem,
      onChange
    } = this.props
    if (cartDetail
      && cartDetail.id
      && currentItem
      && currentItem.storeId
      && currentItem.store
      && currentItem.store.name) {
      const courierCost = await dispatch(getCourierCost(cartDetail.id, currentItem.storeId))
      if (courierCost && courierCost.length > 0) {
        onChange(JSON.stringify(courierCost[0]))
      }
    } else if (cartDetail
      && cartDetail.length > 0
      && currentItem
      && currentItem.storeId
      && currentItem.store
      && currentItem.store.name) {
      const courierCost = await dispatch(getCourierCost(cartDetail.map(item => item.id), currentItem.storeId))
      if (courierCost && courierCost.length > 0) {
        onChange(JSON.stringify(courierCost[0]))
      }
    }
  }

  render () {
    const {
      onChange,
      selectedValue,
      currentItem,
      list
    } = this.props

    if (currentItem && currentItem.store && currentItem.store.name) {
      return (
        <CardItem style={styles.cardItem} footer>
          <Item
            style={styles.item}
          >
            <Picker
              mode="dialog"
              placeholder="Choose Courier"
              placeholderStyle={styles.placeholder}
              placeholderIconColor={color.secondaryText}
              selectedValue={selectedValue}
              style={styles.input}
              textStyle={styles.inputText}
              iosHeader="Choose Courier"
              onValueChange={(value) => onChange(value)}
            >
              <Picker.Item value={null} label="Choose Courier" />
              {list.map((data, key) => <Picker.Item key={key} label={`${currencyFormatter(data.value)}-${data.name} (${data.etd})`} value={`${JSON.stringify(data)}`} />)}
            </Picker>
          </Item>
        </CardItem>
      )
    }

    return null
  }
}

const mapStateToProps = (state) => ({
  cartDetail: state.localTransactionStore.cartDetail,
  list: state.courierStore.list,
  currentItem: state.authStore.currentItem
})

export default connect(mapStateToProps)(CourierCostItem)
