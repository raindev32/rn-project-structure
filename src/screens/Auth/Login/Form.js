import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import {
  View,
  Icon,
  Button,
  Text
} from 'native-base'
import Input from 'components/Form/Input'
import color from 'theme/color'
import {
  submit
} from 'actions/auth/login'
import {
  userData
} from 'actions/auth/profile'
import SocialMedia from 'components/Auth/SocialMedia'
import AuthRoute from 'components/Auth/AuthRoute'
import LoadingScreen from 'components/LoadingScreen'

import {
  LoginGoogle,
  LoginFacebook
} from 'actions/auth/registerActions'

import validate from './validate'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 10,
    backgroundColor: color.textIcons
  },
  buttonText: {
    color: color.textIcons
  },
  button: {
    padding: 10,
    alignSelf: 'center',
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%'
  },
  mainContainer: {
    padding: 10,
    paddingBottom: 60
  },
  iconContainer: {
    padding: 5,
    paddingHorizontal: 10
  },
  field: {
    marginTop: 10,
    width: '100%'
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: color.textIcons,
    paddingBottom: 20
  }
})

class Form extends Component {
  state = {
    secureTextEntry: true,
    isLoading: false
  }

  onSubmit = async (values) => {
    const { error, navigation, dispatch } = this.props
    if (!error) {
      await dispatch(submit(values, navigation))
    }
  }

  refreshUser = async () => {
    const { dispatch } = this.props
    await dispatch(userData())
  }

  loginFacebook = async () => {
    const { navigation } = this.props
    this.setState({
      isLoading: true
    })
    try {
      await LoginFacebook(navigation, {
        success: () => this.setState({ isLoading: false })
      })
      this.refreshUser()
    } catch (error) {
      console.log('Request Failed: ', error)
    }
    this.setState({
      isLoading: false
    })
  }

  loginGoogle = async () => {
    const { navigation } = this.props
    this.setState({
      isLoading: true
    })
    try {
      await LoginGoogle(navigation, {
        success: () => this.setState({ isLoading: false })
      })
      this.refreshUser()
    } catch (error) {
      console.log('Request Failed: ', error)
    }
    this.setState({
      isLoading: false
    })
  }

  viewPassword () {
    const { secureTextEntry } = this.state
    this.setState({ secureTextEntry: !secureTextEntry })
  }

  render () {
    const {
      navigation,
      error,
      errorMessage,

      loading,
      handleSubmit,
      submitting,
      invalid
    } = this.props
    const {
      isLoading,
      secureTextEntry
    } = this.state

    if (isLoading) {
      return (
        <LoadingScreen onClose={() => this.setState({ isLoading: false })} />
      )
    }

    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}
        >
          <View style={styles.container}>
            <View style={styles.field}>
              <Field
                name="email"
                placeholder="Email"
                maxLength={255}
                component={Input}
                iconName="user"
                iconType="AntDesign"
              />
            </View>
            <View style={styles.field}>
              <Field
                name="password"
                placeholder="Password"
                maxLength={255}
                component={Input}
                secureTextEntry={secureTextEntry}
                iconName="lock-outline"
                iconType="MaterialIcons"
                iconRight={(
                  <TouchableOpacity
                    onPress={() => this.viewPassword()}
                  >
                    <View style={styles.iconContainer}>
                      <Icon
                        type="AntDesign"
                        name="eyeo"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Button
          full
          disabled={invalid || loading || submitting}
          style={styles.button}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={styles.buttonText}
            uppercase={false}
          >
            Log In
          </Text>
        </Button>
        {error && <Text>{errorMessage}</Text>}

        <AuthRoute navigation={navigation} route="Register" />
        <SocialMedia google={() => this.loginGoogle()} facebook={() => this.loginFacebook()} />

      </View>
    )
  }
}

const mapStateToProps = state => ({
  values: getFormValues('LoginForm')(state),
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

export default reduxForm({
  form: 'LoginForm',
  validate
})(connect(mapStateToProps)(Form))
