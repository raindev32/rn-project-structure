import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native'
import color from 'theme/color'
import VersionNumber from 'react-native-version-number'

// import logoPrintart from 'assets/app/logo-printart.png'
import versionChecker from 'utils/versionChecker'
import { getUserToken, remove } from 'utils/storage'
import { getMyData } from 'services/auth/loginService'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.textIcons
  },
  statusText: {
    color: color.darkPrimaryColor,
    fontSize: 16
  },
  loadingContainer: {
    padding: 30
  }
})

class AuthLoadingScreen extends Component {
  state = {
    status: ''
  };

  componentDidMount () {
    this._bootstrapAsync()
  }

  checkLogin = async () => {
    const { navigation } = this.props
    const userToken = await getUserToken()
    if (userToken && userToken !== '') {
      let userInfo
      try {
        userInfo = await getMyData()
        if (userInfo.success) {
          navigation.navigate('App')
        } else {
          navigation.navigate('Auth')
          await remove('userToken')
        }
      } catch (error) {
        await remove('userToken')
        navigation.navigate('Auth')
        console.log('Gagal', error)
      }
    } else {
      const { navigation } = this.props
      navigation.navigate('Auth')
    }
  };

  // Ambil token dari penyimpanan lalu navigasikan ke tempat yang sesuai
  _bootstrapAsync = async () => {
    const { navigation } = this.props
    this.setState({ status: 'Checking version' })
    // Aktifkan jika sudah mau checker
    const typeVersion = await versionChecker({
      currentVersion: VersionNumber.buildVersion
    })

    switch (typeVersion.type) {
      case 'popup':
        navigation.navigate('VersionChecker', {
          typeVersion
        })
        break
      case 'force':
        navigation.navigate('VersionChecker', {
          typeVersion
        })
        break
      case 'none': {
        this.checkLogin()
        break
      }
      default:
        this.checkLogin()
        break
    }
  };

  // Render setiap konten pemuatan yang Anda suka di sini
  render () {
    const { status } = this.state
    return (
      <View style={styles.container}>
        {/* <Image style={styles.image} source={logoPrintart} /> */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
        <Text style={styles.statusText}>{status}</Text>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={color.primaryColor}
        />
      </View>
    )
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default AuthLoadingScreen
