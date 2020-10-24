import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { withNavigation } from 'react-navigation'
import {
  View,
  StyleSheet
} from 'react-native'
import {
  Text,
  Button,
  Radio,
  ListItem
} from 'native-base'
import { convertDateToTimeStamp, convertTimeStampToDate } from 'utils/time'
import {
  updateProfile
} from 'actions/auth/profile'

import color from 'theme/color'

import InputEditProfile from 'components/Form/Input'
import Calendar from 'components/Form/Calendar'
import LoadingScreen from 'components/LoadingScreen'
import TextArea from 'components/Form/TextArea'

import ModalMessage from 'components/ModalMessage'
import validate from './validate'
import ProfilePicture from './ProfilePicture'

const styles = StyleSheet.create({
  field: {
    height: 100,
    width: '100%'
  },
  field2: {
    height: 250,
    width: '100%'
  },
  padHorizon: {
    paddingHorizontal: 10
  },
  buttonText: {
    alignSelf: 'center',
    color: color.textIcons
  },
  label: {
    paddingLeft: 12,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: color.primaryText
  },
  btnNext: {
    marginTop: 20,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    width: '100%'
  },
  borderRadius: {
    borderRadius: 10
  },
  containCP: {
    marginTop: 50
  }
})

class Form extends Component {
  state = {
    gender: '1',
    type: '',
    emailVerified: null,
    phoneVerified: null,
    isVisibleChangeModal: false
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { currentItem, initialize } = this.props
    this.setState({
      gender: String(currentItem.gender)
    })
    initialize({
      image: currentItem && currentItem.image && currentItem.image.raw ? currentItem.image.raw : null,
      firstName: currentItem.firstName,
      lastName: currentItem.lastName,
      address: currentItem.address,
      gender: String(currentItem.gender)
    })
    if (currentItem && currentItem.birth) {
      initialize({
        oldImage: currentItem && currentItem.image && currentItem.image.url ? currentItem.image.url : '',
        firstName: currentItem.firstName,
        lastName: currentItem.lastName,
        address: currentItem.address,
        gender: String(currentItem.gender),
        birth: convertDateToTimeStamp(currentItem.birth)
      })
    }
  }

  onSubmit = async (values) => {
    const {
      error,
      dispatch,
      navigation
    } = this.props
    const { gender } = this.state

    if (!error) {
      const data = {
        ...values
      }
      if (data.birth) {
        data.birth = convertTimeStampToDate(data.birth)
      }
      data.gender = gender
      await dispatch(updateProfile(data, navigation))
    }
  }

  render () {
    const {
      loading,
      invalid,
      navigation,
      submitting,
      handleSubmit,
      error,
      currentItem
    } = this.props

    const {
      gender,
      type,
      emailVerified,
      phoneVerified,
      isVisibleChangeModal
    } = this.state

    const radioItem = [
      { label: 'Male', value: '1' },
      { label: 'Female', value: '0' }
    ]

    if (loading) {
      return (
        <LoadingScreen />
      )
    }

    const modalMessageProps = {
      isVisible: isVisibleChangeModal,
      type,
      currentItem,
      navigation,
      statusMail: emailVerified,
      statusPhone: phoneVerified,
      onCancel: () => this.setState({ isVisibleChangeModal: false })
    }

    return (
      <View>
        <ProfilePicture data={currentItem} />
        <View>
          {isVisibleChangeModal && <ModalMessage {...modalMessageProps} />}
          <View style={styles.field}>
            <Field
              name="firstName"
              title="First Name"
              placeholder="First Name"
              maxLength={255}
              component={InputEditProfile}
            />
          </View>
          <View style={styles.field}>
            <Field
              name="lastName"
              title="Last Name"
              placeholder="Last Name"
              maxLength={255}
              component={InputEditProfile}
            />
          </View>
          <View style={styles.field2}>
            <Field
              name="address"
              title="Full Address"
              placeholder="Address"
              maxLength={140}
              component={TextArea}
            />
          </View>
          <View style={styles.field}>
            <Field
              name="birth"
              placeholder="Birthday"
              maxLength={255}
              component={Calendar}
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

          <View style={styles.containCP}>
            <Button
              light
              full
              style={styles.borderRadius}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Text>Change Password</Text>
            </Button>
          </View>

          <Button
            primary
            disabled={invalid || loading || submitting}
            style={styles.btnNext}
            onPress={handleSubmit(this.onSubmit)}
          >
            <Text
              style={styles.buttonText}
            >
              Save
            </Text>
          </Button>
          {error && <Text>{error}</Text>}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  values: getFormValues('EditProfileForm')(state),
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

export default reduxForm({
  form: 'EditProfileForm',
  validate
})(withNavigation(connect(mapStateToProps)(Form)))
