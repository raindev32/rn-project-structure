import { Alert } from 'react-native'

import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'

import {
  getDataFB,
  getDataGoogle,
  registerSocialMedia
} from 'services/auth/loginService'
import { set } from 'utils/storage'

const failed = error => {
  Alert.alert('Failed', error ? `Login Failed: ${error}` : 'Login Failed')
}

const handleLogin = async (navigation, { props, expoSosmed, driver }) => {
  const { type, accessToken } = expoSosmed

  if (type !== 'success') {
    await props.success()
    return
  }

  let dataSocial
  if (driver === 'facebook') {
    dataSocial = await getDataFB(accessToken)
  } else {
    dataSocial = await getDataGoogle(accessToken)
  }

  if (!dataSocial.success) {
    failed()
    return
  }

  if (!dataSocial.email && driver === 'facebook') {
    return Alert.alert(
      'Login failed',
      'Make sure your privacy setting is public',
    )
  }
  if (driver === 'google' && !dataSocial.email) {
    return Alert.alert(
      'Login failed',
      'Make sure your privacy setting is public',
    )
  }

  if (dataSocial.success && dataSocial.email) {
    const dataLogin = await registerSocialMedia({
      driver,
      token: accessToken
    })
    if (dataLogin.success) {
      if (!dataLogin.data.token) return failed()
      Alert.alert(
        'Login Success',
        `Hi ${dataLogin.data.firstName
          || dataSocial.name
          || expoSosmed.user.givenName}!`,
      )
      await set('userToken', JSON.stringify(dataLogin.data.token))
      await props.success()
      await navigation.navigate('App')
      return
    }
    failed()
    return
  }
  failed()
}

const LoginFacebook = async (navigation, props) => {
  try {
    await LoginManager.logInWithPermissions(['public_profile', 'email'])
    const expoSosmed = await AccessToken.getCurrentAccessToken()
    console.log('expoSosmed', expoSosmed)

    handleLogin(navigation, {
      props,
      expoSosmed: { type: 'success', ...expoSosmed },
      driver: 'facebook'
    })
  } catch (error) {
    await props.success()
    console.log('Request Failed: ', error)
    if (error.search('401') > 0) {
      failed("Check facebook's login session")
    } else {
      failed(error)
    }
  }
}

const LoginGoogle = async (navigation, props) => {
  try {
    await GoogleSignin.configure()
    await GoogleSignin.signOut()
    await GoogleSignin.signIn()
    const token = await GoogleSignin.getTokens()

    handleLogin(navigation, {
      props,
      expoSosmed: { type: 'success', ...token },
      driver: 'google'
    })
  } catch (error) {
    await props.success()
    console.log('Request Failed: ', error)
    failed(error)
  }
}

export { LoginFacebook, LoginGoogle }
