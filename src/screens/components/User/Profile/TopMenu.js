import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet
} from 'react-native'

import globalStyle from 'theme/style'

import ButtonLogOut from 'components/MenuComp/btnLogOut'
import ButtonSettingProfile from 'components/MenuComp/btnSettings'
import MyNotifications from 'components/MenuComp/btnNotifications'

const styles = StyleSheet.create({
  containTopMenu: {
    alignItems: 'center',
    paddingHorizontal: 10
  }
})

class TopMenu extends PureComponent {
  render () {
    const { navigation } = this.props

    return (
      <View style={[globalStyle.fdRow, styles.containTopMenu]}>
        <ButtonLogOut navigation={navigation} />
        <ButtonSettingProfile routes="EditProfile" />
        <MyNotifications />
      </View>
    )
  }
}

TopMenu.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default withNavigation(TopMenu)
