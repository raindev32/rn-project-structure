import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet, ScrollView } from 'react-native'
import {
  Text,
  Icon,
  List,
  ListItem
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  iconView: {
    width: 30
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: color.itemUnderline
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  flex: {
    flex: 1,
    flexShrink: 2
  },
  iconChevron: {
    fontSize: 12,
    color: color.dividerColor
  }
})

class SettingList extends Component {
  render () {
    const { navigation } = this.props

    const listSetting = [
      {
        name: 'user',
        title: 'Edit Profile',
        type: 'FontAwesome',
        onPress: () => navigation.navigate('EditProfile')
      },
      {
        name: 'mail',
        title: 'Email',
        type: 'Ionicons',
        onPress: () => navigation.navigate('EmailScreen')
      },
      {
        name: 'key',
        title: 'Password',
        type: 'Ionicons',
        onPress: () => navigation.navigate('ChangePassword')
      }
    ]

    return (
      <View>
        <ScrollView>
          <List style={styles.list}>
            {
              listSetting.map((data, index) => (
                <ListItem
                  key={index}
                  onPress={data.onPress}
                  style={styles.listItem}
                >
                  <View style={styles.flex}>
                    <View style={styles.row}>
                      <View style={styles.iconView}>
                        <Icon
                          name={data.name}
                          type={data.type}
                          style={{ color: color.secondaryText }}
                        />
                      </View>
                      <Text style={{ color: color.primaryText }}>
                        {data.title}
                      </Text>
                    </View>
                  </View>
                  <Icon
                    name="chevron-right"
                    type="FontAwesome"
                    style={styles.iconChevron}
                  />
                </ListItem>
              ))
            }
          </List>
        </ScrollView>
      </View>
    )
  }
}
export default withNavigation(SettingList)
