import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
  Alert,
  Image,
  Dimensions
} from 'react-native'
import {
  View,
  Text,
  Button
} from 'native-base'
import HTMLView from 'react-native-htmlview'
import color from 'theme/color'
import { getUserToken, remove } from 'utils/storage'
import { getMyData } from 'services/auth/loginService'
import VersionNumber from 'react-native-version-number'
import VersionImage from 'assets/app/icon-intro/update-screen.png'
import { appleId } from 'utils/config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whiteCream
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 28,
    color: color.secondaryText
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2
  },
  description: {
    alignItems: 'flex-start',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  buttonContainer: {
    paddingHorizontal: '20%'
  },
  button: {
    borderRadius: 5,
    borderWidth: 0,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18
  }
})

class VersionChecker extends Component {
  state = {
    data: {},
    type: 'force',
    loading: false
  }

  componentDidMount () {
    const { navigation } = this.props
    const { params } = navigation.state
    this.setState({
      ...params.typeVersion
    })
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
          await remove('@Booking')
        }
      } catch (error) {
        await remove('userToken')
        await remove('@Booking')
        navigation.navigate('Auth')
        console.log('Gagal', error)
      }
    } else {
      const { navigation } = this.props
      navigation.navigate('Auth')
    }
  }

  handleClick = () => {
    const linkUrl = Platform.OS === 'ios'
      ? `itms://itunes.apple.com/us/app/apple-store/${appleId}?mt=8`
      : `market://details?id=${VersionNumber.bundleIdentifier}`
    Linking.canOpenURL(linkUrl).then((supported) => {
      if (supported) {
        Linking.openURL(linkUrl)
      } else {
        Alert.alert('Cannot open store', 'Please update your app manually!')
      }
    }, err => console.log(err))
  }

  render () {
    const { data, type, loading } = this.state

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMethod="scale"
            resizeMode="contain"
            source={VersionImage}
            style={styles.image}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.h1}>Update is available</Text>
        </View>
        <View style={styles.description}>
          {data.release_note ? (
            <HTMLView
              value={data.release_note}
              stylesheet={styles}
            />
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={loading}
            full
            onPress={() => this.handleClick()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Update App</Text>
          </Button>
          {type === 'popup' && (
            <Button
              disabled={loading}
              bordered
              full
              style={[styles.button]}
              onPress={() => this.checkLogin()}
            >
              <Text style={styles.buttonText}>Not Now</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    )
  }
}

export default VersionChecker
