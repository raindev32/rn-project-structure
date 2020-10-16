import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import {
  Text,
  Body,
  Card,
  Icon,
  Item,
  Right,
  Button,
  CardItem
} from 'native-base'
import globalStyle from 'theme/style'
import color from 'theme/color'
import {
  userData
} from 'actions/auth/profile'
import EmptyAddress from './EmptyAddress'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: color.textIcons
  },
  // Icons: {
  //   paddingHorizontal: 10,
  //   color: color.errorColor
  // },
  cardContainer: {
    width: '100%',
    borderRadius: 10
  },
  fontName: {
    fontSize: 18
  },
  mediumText: {
    fontSize: 14
  },
  addressText: {
    fontSize: 16,
    paddingVertical: 10
  }
})

class AddressList extends Component {
  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { onRefresh } = this.props
    await onRefresh()
  }

  render () {
    const { currentItem, navigation } = this.props
    const {
      name,
      address,
      city,
      province,
      subdistrict
    } = currentItem.delivery

    return (
      <View style={styles.container}>
        {
          currentItem && currentItem.delivery && currentItem.delivery.id ? (
            <Card
              style={styles.cardContainer}
            >
              <CardItem style={styles.cardContainer}>
                <Body>
                  <Text style={[globalStyle.boldText, globalStyle.padVert, styles.fontName]}>{name}</Text>
                  <Text style={styles.addressText}>{address}</Text>
                  <Text style={styles.mediumText}>{`${subdistrict.name}`}</Text>
                  <Text style={styles.mediumText}>{`${city.name}, ${province.name}`}</Text>
                </Body>
              </CardItem>
              <Item>
                <Right>
                  <Button
                    light
                    onPress={() => navigation.navigate('AddAddress', { title: 'Edit', dataAddress: currentItem.delivery })}
                  >
                    <Icon
                      type="FontAwesome"
                      name="pencil"
                    />
                  </Button>
                </Right>
              </Item>
            </Card>
          ) : <EmptyAddress />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  onRefresh: () => dispatch(userData())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressList)
