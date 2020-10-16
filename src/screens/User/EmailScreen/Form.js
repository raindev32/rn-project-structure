import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { withNavigation } from 'react-navigation'
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'
import {
  Text,
  Button
} from 'native-base'
import globalStyle from 'theme/style'
import color from 'theme/color'
import Input from 'components/Form/Input'
import {
  userData
} from 'actions/auth/profile'
import {
  request
} from 'actions/auth/register'
// import {
//   submit
// } from 'actions/auth/forgotPassword'

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
    // secureTextEntry: true
  }

  componentDidMount () {
    this._refresh()
  }

  _refresh = async () => {
    const { onRefresh, currentItem, initialize } = this.props
    await onRefresh()

    initialize({
      account: currentItem.email
    })
    if (currentItem && currentItem.birth) {
      initialize({
        account: currentItem.email
      })
    }
  }

  onSubmit = async (values) => {
    const { onRequest, error, navigation } = this.props
    const data = {
      account: values.account,
      typeAccount: 1
    }
    if (!error) {
      await onRequest(data, navigation)
    }
  }

  render () {
    const {
      currentItem,
      invalid,
      loading,
      submitting,
      handleSubmit,
      error
    } = this.props

    return (
      <View style={[globalStyle.padDefault, styles.container]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}
        >
          <View style={styles.field}>
            <Field
              name="account"
              placeholder="Account"
              maxLength={255}
              component={Input}
              disabled
              iconName="email"
              iconType="MaterialIcons"
            />
            {
              currentItem.emailVerified ? (
                <Text style={[globalStyle.mediumText, { color: color.limeColor }]}>Verified</Text>
              ) : (
                <Text style={[globalStyle.mediumText, { color: color.errorColor }]}>Not verified</Text>
              )
            }
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
            Verification
          </Text>
        </Button>
        {error && <Text>{error}</Text>}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  values: getFormValues('EmailScreenForm')(state),
  currentItem: state.authStore.currentItem
})

const mapDispatchToProps = dispatch => ({
  onRefresh: () => dispatch(userData()),
  onRequest: (data, navigation) => dispatch(request(data, navigation))
})

export default reduxForm({
  form: 'EmailScreenForm'
})(withNavigation(connect(mapStateToProps, mapDispatchToProps)(Form)))
