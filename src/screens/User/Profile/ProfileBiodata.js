import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  Left,
  Body,
  View
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  containBiodata: {
    width: '100%',
    flexDirection: 'row'
  },
  flexLeft: {
    width: '50%',
    fontWeight: 'normal',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  flexRight: {
    width: '50%',
    fontWeight: 'normal',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-end'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: color.primaryColor
  },
  txtTitle: {
    fontSize: 15,
    paddingVertical: 5
  }
})

class ProfileCard extends Component {
  render () {
    const { data } = this.props
    const biodataLeft = [
      { title: 'Birth Of Date' },
      { title: 'Gender' }
    ]

    const biodataRight = [
      { title: data.birth },
      { title: data.gender ? 'Male' : 'Female' }
    ]

    return (
      <View style={styles.flex}>
        <Text style={styles.headerText}>
          Biodata
        </Text>
        <View style={styles.containBiodata}>
          <Left style={styles.flexLeft}>
            {
              biodataLeft.map((data, index) => (
                <Text key={index} style={styles.txtTitle}>{data.title}</Text>
              ))
            }
          </Left>
          <Body style={styles.flexRight}>
            {
              biodataRight.map((data, index) => (
                <Text key={index} style={styles.txtTitle}>{data.title || '-'}</Text>
              ))
            }
          </Body>
        </View>

      </View>
    )
  }
}

ProfileCard.propTypes = {
  data: PropTypes.object
}

export default withNavigation(ProfileCard)
