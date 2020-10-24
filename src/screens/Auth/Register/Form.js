import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { withNavigation } from 'react-navigation'
import {
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {
  Text,
  Icon,
  Button,
  ListItem,
  Radio
} from 'native-base'
import {
  submit
} from 'actions/auth/register'
import { convertTimeStampToDate } from 'utils/time'
import color from 'theme/color'
import Input from 'components/Form/Input'
import validate from './validate'

const styles = StyleSheet.create({
  field: {
    height: 100,
    width: '100%'
  },
  padHorizon: {
    paddingHorizontal: 10
  },
  buttonText: {
    alignSelf: 'center',
    color: color.textIcons
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: color.textIcons
  },
  label: {
    paddingLeft: 18,
    color: color.secondaryText
  },
  btnRegister: {
    marginTop: 40,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    width: '100%'
  }
})

class Form extends Component {
  state = {
    secureTextEntry: true,
    gender: '1'
  }

  onSubmit = (values) => {
    const { error, navigation, dispatch } = this.props
    const { gender } = this.state
    if (!error) {
      const data = {
        ...values
      }
      if (data.birth) {
        data.birth = convertTimeStampToDate(data.birth)
      }
      data.gender = gender
      dispatch(submit(data, navigation))
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
      secureTextEntry,
      gender
    } = this.state

    const radioItem = [
      { label: 'Male', value: '1' },
      { label: 'Female', value: '0' }
    ]

    return (
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.field}>
          <Field
            name="email"
            placeholder="Email"
            maxLength={255}
            keyboardType="email-address"
            component={Input}
          />
        </View>
        <View style={styles.field}>
          <Field
            name="firstName"
            placeholder="First Name"
            maxLength={255}
            component={Input}
          />
        </View>
        <View style={styles.field}>
          <Field
            name="lastName"
            placeholder="Last Name"
            maxLength={255}
            component={Input}
          />
        </View>
        <View style={styles.field}>
          <Field
            name="password"
            placeholder="Password"
            maxLength={255}
            component={Input}
            secureTextEntry={secureTextEntry}
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
        <View style={styles.field}>
          <Field
            name="confirmPassword"
            placeholder="Confirm Password"
            maxLength={255}
            component={Input}
            secureTextEntry={secureTextEntry}
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
        <View style={styles.field}>
          <Text style={styles.label}>Gender </Text>
          {
            radioItem.map((data, key) => {
              return (
                <ListItem key={key} onPress={() => this.setState({ gender: data.value })} style={styles.radioContainer}>
                  <Radio
                    onPress={() => this.setState({ gender: data.value })}
                    color={color.dividerColor}
                    selectedColor={color.primaryColor}
                    selected={data.value === gender}
                    style={styles.radio}
                  />
                  <Text style={styles.padHorizon}>{data.label}</Text>
                </ListItem>
              )
            })
          }
        </View>
        <Button
          disabled={invalid || loading || submitting}
          style={styles.btnRegister}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={styles.buttonText}
          >
            Register
          </Text>
        </Button>
        {error && <Text>{error}</Text>}
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  values: getFormValues('RegisterForm')(state),
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

export default reduxForm({
  form: 'RegisterForm',
  validate
})(withNavigation(connect(mapStateToProps)(Form)))
