import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Header, Title, Body
} from 'native-base'

import color from 'theme/color'

import GoBack from 'components/GoBack'
import Memo from 'components/Memo'

const styles = StyleSheet.create({
  titleHeader: {
    fontWeight: 'bold',
    color: color.smoothText
  },
  padLeft: {
    paddingLeft: 20
  }
})

class HeaderTop extends Component {
  render () {
    const {
      photoList, params, navigation
    } = this.props

    return (
      <Header
        noShadow
        iosBarStyle={color.primaryColor}
        androidStatusBarColor={color.primaryColor}
        style={{ backgroundColor: color.textIcons }}
      >
        <GoBack
          iconName="arrow-back"
          type=""
          navigation={navigation}
          goTo="PhotoList"
        />
        <Body style={styles.padLeft}>
          <Title style={styles.titleHeader}>
            {params}
          </Title>
        </Body>
        <Memo navigation={navigation} goTo="PhotoList" />
        {
          photoList && photoList.length > 0 ? (
            <GoBack navigation={navigation} goTo="PhotoList" />
          ) : null
        }
      </Header>
    )
  }
}

export default connect(null)(HeaderTop)
