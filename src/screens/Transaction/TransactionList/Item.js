import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet
} from 'react-native'
import {
  ListItem,
  Text,
  Body,
  View
} from 'native-base'
import { withNavigation } from 'react-navigation'
import { dateTimeConverter } from 'utils/time'
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0
  },
  icon: {
    width: 70,
    height: 70
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10
  }
})

class Item extends PureComponent {
  render () {
    const {
      loading,
      currentItem,
      navigation
    } = this.props

    return (
      <View>
        {currentItem
          && currentItem.bundleDetailTransaction
          && currentItem.bundleDetailTransaction.length > 0
          && currentItem.bundleDetailTransaction[0]
          && currentItem.bundleDetailTransaction[0].bundle
          && currentItem.bundleDetailTransaction[0].bundle.image
          && currentItem.bundleDetailTransaction[0].bundle.image.url
          ? (
            <ListItem
              style={styles.listItem}
              onPress={() => {
                if (loading) return
                navigation.navigate('TransactionDetail', {
                  id: currentItem.id
                })
              }}
            >
              <FastImage
                style={styles.icon}
                source={{
                  uri: currentItem.bundleDetailTransaction[0].bundle.image.url,
                  priority: FastImage.priority.high
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Body>
                <Text
                  multiline={false}
                  numberOfLines={1}
                >
                  {currentItem.bundleDetailTransaction[0].bundle.name}
                </Text>
                <Text
                  note
                  multiline={false}
                  numberOfLines={1}
                >
                  {`${currentItem.transNo} (${dateTimeConverter(currentItem.createdAt)})`}
                </Text>

                <View style={styles.row}>
                  <Text
                    note
                    multiline={false}
                    numberOfLines={1}
                  >
                    from:
                  </Text>
                  <Text
                    note
                    multiline={false}
                    numberOfLines={1}
                  >
                    {currentItem.storeName}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text
                    note
                    multiline={false}
                    numberOfLines={1}
                  >
                    to:
                  </Text>
                  <Text
                    note
                    multiline={false}
                    numberOfLines={1}
                  >
                    {currentItem.userAddressName}
                  </Text>
                </View>
                <Text
                  note
                  multiline={false}
                  numberOfLines={1}
                >
                  {currentItem.statusText}
                </Text>
              </Body>
            </ListItem>
          )
          : (
            null
          )}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.transactionStore.loading
})

export default connect(mapStateToProps)(withNavigation(Item))
