import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import {
  Text, List, Body, ListItem
} from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 0,
    width: '100%',
    paddingBottom: 60
  },
  listItem: {
    alignItems: 'flex-start',
    borderBottomWidth: 1 / 4,
    paddingBottom: 10
  },
  scrollView: {
    backgroundColor: color.textIcons,
    padding: 0
  }
})

class NotificationList extends Component {
  render () {
    const listNotification = [
      {
        title: 'Pesanan anda #INV12345678 telah dikirim',
        subtitle: '12 Agustus 2019'
      },
      {
        title: 'Pesanan anda #INV12345678 telah sampai',
        subtitle: '12 Agustus 2019'
      },
      {
        title: 'Pesanan anda #INV12345678 telah diproses',
        subtitle: '12 Agustus 2019'
      },
      {
        title: 'Dapatkan segera promo MERDEKA',
        subtitle: '12 Agustus 2019'
      }
    ]

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollView}
        scrollEventThrottle={300}
        onScroll={this.setCurrentReadOffset}
        removeClippedSubviews
      >
        {
          listNotification.map((data, index) => (
            <List key={index}>
              <ListItem style={styles.listItem}>
                <Body>
                  <Text style={[globalStyle.h3, globalStyle.boldText]}>{data.title}</Text>
                  <Text style={[globalStyle.smallText, { color: color.secondaryText }]}>{data.subtitle}</Text>
                </Body>
              </ListItem>
            </List>
          ))
        }
      </ScrollView>
    )
  }
}
export default NotificationList
