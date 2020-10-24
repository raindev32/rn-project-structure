import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Text,
  // Button,
  Icon,
  Badge
} from 'native-base'
import { getDayDiff } from 'utils/time'

import color from 'theme/color'
import globalStyle from 'theme/style'

const styles = StyleSheet.create({
  containUpgrade: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.highlightColor,
    backgroundColor: color.highlightColor
  },
  containUpgradeDay: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  badge: {
    marginHorizontal: 5,
    backgroundColor: color.dividerColor
  },
  icon: {
    fontSize: 18,
    color: color.textIcons,
    paddingHorizontal: 5
  },
  txtUpgrade: {
    fontSize: 14
  }
})

class Upgrade extends Component {
  render () {
    const {
      data, navigation, currentItem, currentTime
    } = this.props

    return (
      <View>
        {
          currentItem
            && currentItem.subscription
            && currentItem.subscription.expired
            && currentItem.subscription.expired.length > 0
            ? (
              <TouchableOpacity style={styles.containUpgradeDay}>
                <Icon name="diamond" type="FontAwesome" style={styles.icon} />
                <Text uppercase={false} style={[styles.txtUpgrade, { color: color.errorColor }]}>Gold</Text>
                <Badge style={styles.badge}>
                  <Text style={globalStyle.smallText}>{getDayDiff(currentTime, currentItem.subscription.expired)}</Text>
                </Badge>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.containUpgrade}
                onPress={() => navigation.navigate('Subscription', { data })}
              >
                <Icon name="diamond" type="FontAwesome" style={styles.icon} />
                <Text uppercase={false} style={[styles.txtUpgrade, { color: color.textIcons }]}>Upgrade</Text>
              </TouchableOpacity>
            )
        }
      </View>
    )
  }
}
export default withNavigation(Upgrade)
