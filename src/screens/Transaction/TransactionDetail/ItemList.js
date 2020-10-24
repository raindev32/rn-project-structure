import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { List, ListItem, Text } from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  txtDesc: {
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'flex-start',
    color: color.smoothText
  },
  pad: {
    paddingVertical: 5
  },
  dateTime: {
    fontSize: 13,
    alignSelf: 'flex-start',
    color: color.secondaryText
  }
})

class ItemList extends Component {
  render () {
    const { key, data } = this.props

    return (
      <List key={key}>
        <ListItem style={styles.listItem}>
          <Text style={styles.txtDesc}>
            {data.manifest_description}
          </Text>
          <View style={styles.pad}>
            <Text style={styles.dateTime}>{`${data.manifest_date} ${data.manifest_time}`}</Text>
          </View>
        </ListItem>
      </List>
    )
  }
}
export default ItemList
