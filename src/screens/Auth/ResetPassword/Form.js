import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { withNavigation } from 'react-navigation'
import {
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import {
  Text,
  Icon,
  Button
} from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'
import Input from 'components/Form/Input'
import {
  submit
} from 'actions/auth/forgotPassword'
import validate from './validate'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  field: {
    height: 100
  },
  buttonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: color.textIcons
  },
  btnNext: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20
  },
  keyboardContainer: {
    width: '100%',
    backgroundColor: color.textIcons,
    paddingBottom: 20
  }
})

class Form extends Component {
  state = {
    secureTextEntry: true
  }

  onSubmit = async (values) => {
    const {
      data,
      error,
      navigation,
      dispatch
    } = this.props

    const dataReset = {
      data,
      ...values
    }
    if (!error) {
      await dispatch(submit(dataReset, navigation))
    }
  }

  viewPassword () {
    const { secureTextEntry } = this.state
    this.setState({ secureTextEntry: !secureTextEntry })
  }

  render () {
    const {
      invalid,
      loading,
      submitting,
      handleSubmit,
      error
    } = this.props

    const {
      secureTextEntry
    } = this.state

    return (
      <View style={[globalStyle.padDefault, styles.container]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}
        >
          <View style={styles.field}>
            <Field
              name="password"
              placeholder="New Password"
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
        </KeyboardAvoidingView>
        <Button
          full
          primary
          style={styles.btnNext}
          disabled={invalid || loading || submitting}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={styles.buttonText}
            uppercase={false}
          >
            Reset Password
          </Text>
        </Button>
        {error && <Text>{error}</Text>}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  values: getFormValues('ResetPasswordForm')(state),
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

export default reduxForm({
  form: 'ResetPasswordForm',
  validate
})(withNavigation(connect(mapStateToProps)(Form)))
