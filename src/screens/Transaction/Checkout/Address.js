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
  Button
} from 'native-base'
import { withNavigation } from 'react-navigation'
import sharedStyle from './styles'

const BORDER_WIDTH = 2

const styles = StyleSheet.create({
  cardRadius: {
    alignItems: 'center',
    borderRadius: 10
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH
  },
  desc: {
    width: '100%'
  }
})

class Address extends Component {
  goToAddress = (title = 'add') => {
    const {
      item, navigation, callback, currentUser
    } = this.props
    navigation.navigate('AddAddress', {
      item,
      title,
      checkout: 1,
      dataAddress: currentUser.delivery,
      callback
    })
  }

  render () {
    const { currentUser } = this.props

    if (currentUser
      && currentUser.delivery
      && currentUser.delivery.id
      && currentUser.delivery.province
      && currentUser.delivery.city
      && currentUser.delivery.subdistrict) {
      return (
        <Card style={styles.cardRadius}>
          <CardItem
            header
            style={sharedStyle.cardItem}
          >
            <Body style={styles.body}>
              <Text numberOfLines={1} style={sharedStyle.title}>Shipping Address</Text>
              <Text numberOfLines={1} style={styles.desc} note>{currentUser.delivery.address}</Text>
              <Text numberOfLines={1} style={styles.desc} note>{`${currentUser.delivery.city.name}, ${currentUser.delivery.province.name}`}</Text>
              <Text numberOfLines={1} style={styles.desc} note>{currentUser.delivery.name}</Text>
            </Body>
          </CardItem>
          <CardItem
            button
            full
            style={sharedStyle.cardItem}
          >
            <Body style={styles.body}>
              <Button
                bordered
                full
                style={styles.button}
                onPress={() => this.goToAddress('Edit')}
              >
                <Text uppercase={false} numberOfLines={1}>Edit Address</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      )
    }

    return (
      <Card style={styles.cardRadius}>
        <CardItem
          header
          style={sharedStyle.cardItem}
        >
          <Text numberOfLines={1} style={sharedStyle.title}>Shipping Address</Text>
        </CardItem>
        <CardItem
          button
          full
          style={sharedStyle.cardItem}
          onPress={() => this.goToAddress('add')}
        >
          <Body style={styles.body}>
            <Button
              primary
              bordered
              style={styles.button}
            >
              <Text uppercase={false} numberOfLines={1}>Add Address</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.authStore.currentItem
})

export default connect(mapStateToProps)(withNavigation(Address))
