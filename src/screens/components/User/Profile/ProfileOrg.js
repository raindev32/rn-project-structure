import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet,
  View
} from 'react-native'
import {
  Button,
  Text,
  Icon,
  Left,
  Right,
  Card,
  CardItem
} from 'native-base'

import color from 'theme/color'
import globalStyle from 'theme/style'

import Upgrade from './Upgrade'

const styles = StyleSheet.create({
  cardMenu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  button: {
    width: '40%',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  containButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10
  },
  cardAlreadyUpgrade: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10
  },
  viewAlreadyUpgrade: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignContent: 'flex-start'
  },
  txtUpgradeLink: {
    fontSize: 12,
    alignSelf: 'flex-start'
  },
  txtEvent: {
    fontSize: 18
  },
  txtOrganizer: {
    fontSize: 18,
    color: color.primaryColor
  },
  titleAlreadyUpgrade: {
    fontSize: 18,
    alignSelf: 'flex-start'
  },
  organizer: {
    fontSize: 13,
    alignSelf: 'flex-start',
    color: color.primaryColor
  }
})

class ProfileOrg extends Component {
  render () {
    const {
      navigation,
      data,
      currentItem,
      currentTime
    } = this.props

    return (
      <Card style={styles.cardMenu}>
        <CardItem style={styles.cardAlreadyUpgrade}>
          <View style={styles.viewAlreadyUpgrade}>
            <Left style={globalStyle.fdColl}>
              <Text style={styles.organizer}>Your Organizer</Text>
              <Text numberOfLines={2} style={styles.titleAlreadyUpgrade}>{data.name}</Text>
              <Text numberOfLines={1} style={styles.txtUpgradeLink}>{data.website}</Text>
            </Left>
            <Right>
              <Upgrade
                data={data}
                currentItem={currentItem}
                currentTime={currentTime}
              />
            </Right>
          </View>
          <View style={styles.containButton}>
            <Button
              iconLeft
              primary
              rounded
              style={styles.button}
              onPress={() => navigation.navigate('EventCreate', { organizerId: data.id })}
            >
              <Icon name="plus" type="AntDesign" />
              <Text uppercase={false} style={styles.txtEvent}>Event</Text>
            </Button>
            <Button
              light
              rounded
              style={styles.button}
              onPress={() => navigation.navigate('OrganizerMain', { id: data.id, isPrivate: data.isPrivate })}
            >
              <Text uppercase={false} style={styles.txtOrganizer}>Organize</Text>
            </Button>
          </View>
        </CardItem>
      </Card>
    )
  }
}

ProfileOrg.propTypes = {
  data: PropTypes.object
}

export default withNavigation(ProfileOrg)
