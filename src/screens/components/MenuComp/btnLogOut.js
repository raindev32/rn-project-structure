import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { View, Alert, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import {
  logout
} from 'actions/auth/login'
import color from 'theme/color'

const styles = StyleSheet.create({
  icon: {
    marginRight: 0,
    fontSize: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: color.errorColor
  }
})

class ButtonLogOut extends Component {
  _signOutAsync = async () => {
    const { navigation, logout } = this.props
    await logout(navigation)
  }

  render () {
    return (
      <View>
        <Icon
          name="logout"
          type="AntDesign"
          style={styles.icon}
          light
          onPress={() => Alert.alert(
            'Log Out',
            'Are you sure to logout ?',
            [
              { text: 'Cancel', color: color.primaryText, onPress: () => { console.log('Cancel Pressed!') } },
              { text: 'Logout', color: color.primaryColor, onPress: () => { this._signOutAsync() } }
            ],
            { cancelable: false }
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(logout(navigation))
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ButtonLogOut))
