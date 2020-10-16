import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Icon, Badge } from 'native-base'

import color from 'theme/color'

import { getCurrentTransaction } from 'actions/transaction/localTransactionAction'

const styles = StyleSheet.create({
  badge: {
    backgroundColor: color.primaryColor,
    position: 'absolute',
    right: 0,
    height: 12,
    width: 12
  },
  focusColor: {
    color: color.primaryColor
  },
  notFocusColor: {
    color: color.primaryText
  }
})

class TabBarItem extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getCurrentTransaction())
  }

  render () {
    const {
      currentItem, iconName, focused, countTransactionList
    } = this.props
    let count = 0
    if (countTransactionList && countTransactionList.count) {
      const { unpaid, paid, send } = countTransactionList.count
      count = Number(unpaid) + Number(paid) + Number(send)
    }

    return (
      <View>
        {
          iconName === 'shoppingcart'
            && currentItem
            && currentItem.detail
            && currentItem.detail.length > 0
            ? (
              <Badge style={styles.badge} />
            ) : null
        }
        {
          iconName === 'user'
            && countTransactionList
            && countTransactionList.count
            && count
            ? (
              <Badge style={styles.badge} />
            ) : null
        }
        <Icon
          style={focused ? styles.focusColor : styles.notFocusColor}
          name={iconName}
          type="AntDesign"
        />
      </View>
    )
  }
}

TabBarItem.propTypes = {
  iconName: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  loading: state.localTransactionStore.loading,
  currentItem: state.localTransactionStore.currentItem,
  errorMessage: state.localTransactionStore.errorMessage,
  countTransactionList: state.countTransactionStore.countTransactionList
})

export default connect(mapStateToProps)(TabBarItem)
