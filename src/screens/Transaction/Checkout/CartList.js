import React from 'react'
import {
  View
} from 'react-native'
import CartItem from './CartItem'

const CartList = ({
  list
}) => {
  return (
    <View>
      {list ? list.map(item => (
        <CartItem item={item} key={item.id} />
      )) : null}
    </View>
  )
}

export default CartList
