import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import {
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import {
  Text,
  Card,
  CardItem,
  Left,
  Right
} from 'native-base'

import globalStyle from 'theme/style'
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  cardProfile: {
    borderRadius: 10
  },
  cardRadius: {
    borderRadius: 10
  },
  flexLeft: {
    flex: 2
  },
  picThumb: {
    borderRadius: 20,
    width: 100,
    height: 100
  },
  containerRight: {
    flex: 4,
    alignItems: 'flex-start'
  },
  containMenuCount: {
    alignItems: 'center',
    paddingHorizontal: 10
  }
})

class ProfileCard extends Component {
  render () {
    const { navigation, data } = this.props

    return (
      <Card style={styles.cardProfile}>
        <CardItem style={styles.cardRadius}>
          <Left style={styles.flexLeft}>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              {data && data.image && data.image.url
                ? (
                  <FastImage
                    style={styles.picThumb}
                    source={{
                      uri: data.image.url,
                      priority: FastImage.priority.high
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                )
                : (
                  <Image
                    style={styles.picThumb}
                    source={require('assets/app/profile/icon-user.png')}
                    resizeMode="contain"
                  />
                )}
            </TouchableOpacity>
          </Left>
          <Right style={styles.containerRight}>
            {data && (
              <Text numberOfLines={2} style={[globalStyle.boldText, globalStyle.navTitle, globalStyle.h1, globalStyle.padVert, styles.containMenuCount]}>
                {`${data.firstName || ''} ${data.lastName || ''}`}
              </Text>
            )}
          </Right>
        </CardItem>
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default withNavigation(ProfileCard)
