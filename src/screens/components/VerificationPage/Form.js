import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import {
  View,
  Button,
  Text
} from 'native-base'
import Input from 'components/Form/Input'
import color from 'theme/color'
import {
  request
} from 'actions/auth/forgotPassword'
import CountDown from 'components/Decoration/CountDown'
import { getTimeDiff } from 'utils/time'
import {
  submitForgotPassword,
  submitRegisterVerify
} from 'actions/auth/verification'
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
    marginTop: 10,
    padding: 10,
    alignSelf: 'center',
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    width: '100%'
  },
  mainContainer: {
    padding: 10,
    paddingBottom: 60
  },
  field: {
    marginTop: 10,
    width: '100%'
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: color.textIcons,
    paddingBottom: 20
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bottomText: {
    marginBottom: 10,
    textAlign: 'center'
  },
  link: {
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 4,
    color: color.link
  }
})

class Form extends Component {
  state = {
    countdown: true
  }

  onSubmit = async (values) => {
    const {
      onSubmitForgot,
      onSubmitVerify,
      error,
      navigation
    } = this.props
    const { params } = navigation.state
    values.account = params.account
    values.typeCode = 0
    values.typeAccount = params.typeAccount
    values.code
    if (!error) {
      if (params.typeCode) {
        await onSubmitVerify(values, navigation)
      }
      await onSubmitForgot(values, navigation)
    }
  }

  render () {
    const { countdown } = this.state
    const {
      error,
      errorMessage,
      loading,
      handleSubmit,
      submitting,
      invalid,

      navigation,
      onRequest
    } = this.props
    const { params } = navigation.state

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
                name="code"
                maxLength={4}
                placeholder="Verification Code"
                component={Input}
                iconName="lock-outline"
                iconType="MaterialIcons"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Button
          primary
          full
          disabled={invalid || loading || submitting}
          style={styles.button}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={styles.buttonText}
            uppercase={false}
          >
            Submit Verification Code
          </Text>
        </Button>

        {countdown && params && params.data && params.data.now && params.data.expired && (
          <CountDown
            onFinish={() => this.setState({ countdown: false })}
            timeLabels={{
              m: 'Menit',
              s: 'Detik'
            }}
            timeToShow={['M', 'S']}
            until={getTimeDiff(params.data.now, params.data.expired)}
            size={15}
          />
        )}
        {!loading && !countdown && (
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.bottomText}>
              Not receive code?
            </Text>
            <View style={styles.row}>
              <Text
                onPress={async () => {
                  const resend = await onRequest(params, navigation)
                  this.setState({
                    countdown: resend
                  })
                }}
                numberOfLines={1}
                style={styles.link}
              >
                Resend
              </Text>
            </View>
          </View>
        )}
        {error && <Text>{errorMessage}</Text>}

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  values: getFormValues('ValidationForm')(state),
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  onRequest: (data, navigation) => dispatch(request(data, navigation)),
  onSubmitForgot: (data, navigation) => dispatch(submitForgotPassword(data, navigation)),
  onSubmitVerify: (data, navigation) => dispatch(submitRegisterVerify(data, navigation))
})

export default reduxForm({
  form: 'ValidationForm',
  validate
})(connect(mapStateToProps, mapDispatchToProps)(Form))
