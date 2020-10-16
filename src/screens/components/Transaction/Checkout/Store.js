import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  withNavigation
} from 'react-navigation'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  View,
  Text,
  Card
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10
  },
  card: {
    padding: 10
  },
  cardItem: {
    padding: 10
  },
  title: {
    color: color.secondaryText
  }
})

class Store extends PureComponent {
  render () {
    const {
      currentItem,
      navigation,
      list,
      callback
    } = this.props

    if (currentItem && currentItem.store && currentItem.store.name) {
      return (
        <View style={styles.content}>
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChooseStore', { checkout: 1, callback })}
            >
              <View style={styles.cardItem}>
                <Text style={styles.title}>{currentItem.store.name}</Text>
                <Text note>{currentItem.store.address}</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      )
    }
    const item = list && list.length > 0 ? list[0] : {}

    return (
      <View style={styles.content}>
        <Card style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChooseStore', { checkout: 1, callback })}
          >
            <View style={styles.cardItem}>
              <Text style={styles.title}>{item.name}</Text>
              <Text note>{item.address}</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentItem: state.authStore.currentItem,
  list: state.storeStore.list,
  listDropdown: state.storeStore.listDropdown
})

export default connect(mapStateToProps)(withNavigation(Store))
