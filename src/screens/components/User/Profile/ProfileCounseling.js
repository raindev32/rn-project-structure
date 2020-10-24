import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet, TouchableOpacity
} from 'react-native'
import {
  Text,
  Left,
  Right,
  View,
  Icon
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    paddingVertical: 10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: color.primaryColor
  },
  txtTitle: {
    fontSize: 15
  },
  btnHistory: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row'
  }
})

class ProfileCounseling extends Component {
  render () {
    const { navigation, data } = this.props

    return (
      <View style={styles.flex}>
        <Text style={styles.headerText}>
          Counseling
        </Text>
        <TouchableOpacity
          style={styles.btnHistory}
          onPress={() => navigation.navigate('HistoryCounseling',
            {
              organizerId: data
                && data.organizer
                && data.organizer.id
                ? data.organizer.id : {}
            })}
        >
          <Left>
            <Text uppercase={false}>Counseling</Text>
          </Left>
          <Right>
            <Icon name="right" type="AntDesign" style={styles.txtTitle} />
          </Right>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withNavigation(ProfileCounseling)
