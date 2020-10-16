import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Header, Button, Icon, Title, Body
} from 'native-base'

import color from 'theme/color'

import Memo from 'components/Memo'
import IconTrolli from './IconTrolli'

const styles = StyleSheet.create({
  titleHeader: {
    fontWeight: 'bold',
    color: color.smoothText
  }
})

class HeaderTop extends Component {
  render () {
    const {
      customHeader, navigation
    } = this.props

    return (
      <Header
        noShadow
        iosBarStyle={color.primaryColor}
        androidStatusBarColor={color.primaryColor}
        style={{ backgroundColor: color.textIcons }}
      >
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" style={{ color: color.smoothText }} />
        </Button>
        <Body>
          <Title style={styles.titleHeader}>{customHeader}</Title>
        </Body>
        <Memo navigation={navigation} goTo="PhotoList" />
        <IconTrolli navigation={navigation} />
      </Header>
    )
  }
}

export default HeaderTop
