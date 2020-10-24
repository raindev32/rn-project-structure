import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Clipboard
} from 'react-native'
import {
  View, Text, Toast
} from 'native-base'
// import ProductEmpty from 'components/EmptyState/ProductEmpty'
import {
  resetList,
  changeFilter
} from 'actions/transaction/transactionAction'

import globalStyle from 'theme/style'
// import Content from './Item'

class Container extends Component {
  // state = {
  //   refreshing: false
  // }

  componentDidMount () {
    this._refresh()
  }

  copyAccountNumber = (number) => {
    Clipboard.setString(`${number}`)
    Toast.show({
      text: 'Account number copied',
      type: 'success'
    })
  }

  _refresh = () => {
    const { dispatch, navigation } = this.props
    const { params } = navigation.state
    dispatch(resetList())
    dispatch(changeFilter({
      page: 1,
      ...params
    }))
  }

  setCurrentReadOffset = (event) => {
    const { dataSet } = this.props
    let itemHeight = 300
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y)
    let currentItemIndex = Math.ceil(currentOffset / itemHeight)
    dataSet.setReadOffset(currentItemIndex)
  }

  render () {
    const {
      // list,
      // loading,
      navigation
    } = this.props
    const { params } = navigation.state
    // const {
    //   refreshing
    // } = this.state

    return (
      <View style={globalStyle.container}>
        {/* <ScrollView
          scrollEventThrottle={300}
          onScroll={this.setCurrentReadOffset}
          removeClippedSubviews
          style={styles.scrollView}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => this._refresh()}
            />
          )}
        > */}
        <Text>{`This is ${params && params.title} pages`}</Text>
        {/* {!loading && list && list.length === 0 && (
            <ProductEmpty
              text="Data"
              data={list}
              loading={loading}
              navigation={navigation}
              searchable={false}
            />
          )}
          {
            list && list.length > 0 ? (
              list.map((record, index) => {
                if (!record.isSettled) {
                  return
                }
                const item = record.content
                return (
                  <Content
                    key={index}
                    currentItem={item}
                  />
                )
              })
            ) : null
          } */}
        {/* </ScrollView> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.transactionStore.filter,
  loading: state.transactionStore.loading,
  list: state.transactionStore.list,
  dataSet: state.transactionStore.dataSet,
  errorMessage: state.transactionStore.errorMessage
})

export default connect(mapStateToProps)(Container)
