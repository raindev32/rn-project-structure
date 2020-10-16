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
import Dropdown from 'components/Form/Dropdown'
import AuthRoute from 'components/Auth/AuthRoute'
import LoadingScreen from 'components/LoadingScreen'

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
  }
})

class Form extends Component {
  state = {
    isLoading: false
  }

  onSubmit = async (values) => {
    const { onSubmit, error, navigation } = this.props
    const data = {
      account: values.account,
      typeAccount: values.type
    }
    if (!error) {
      await onSubmit(data, navigation)
    }
  }

  render () {
    const {
      error,
      errorMessage,

      loading,
      handleSubmit,
      submitting,
      invalid
    } = this.props
    const {
      isLoading
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
                name="account"
                placeholder="Email / Phone"
                maxLength={255}
                component={Input}
                iconName="verified-user"
                iconType="MaterialIcons"
              />
            </View>

            <View style={styles.field}>
              <Field
                name="type"
                placeholder="Pilih Metode"
                data={[
                  {
                    id: 0,
                    value: 'phone'
                  },
                  {
                    id: 1,
                    value: 'email'
                  }
                ]}
                component={Dropdown}
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
            Send Verification Code
          </Text>
        </Button>
        {error && <Text>{errorMessage}</Text>}

        <AuthRoute route="Register" forgot={false} />

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  values: getFormValues('ForgotPasswordForm')(state),
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data, navigation) => dispatch(request(data, navigation))
})

export default reduxForm({
  form: 'ForgotPasswordForm',
  validate
})(connect(mapStateToProps, mapDispatchToProps)(Form))
