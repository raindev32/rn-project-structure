import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Field,
  reduxForm,
  getFormValues
} from 'redux-form'
import {
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import {
  Button
} from 'native-base'
import color from 'theme/color'
import globalStyle from 'theme/style'
import regional from 'cache/regional'
import InputComponent from 'components/Form/Input'
import Dropdown from 'components/Form/Dropdown'
import TextArea from 'components/Form/TextArea'
import {
  updateAddress
} from 'actions/auth/addressActions'
import validate from './validate'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: color.textIcons
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: color.textIcons
  },
  field: {
    width: '100%',
    marginTop: 10,
    borderBottomWidth: null
  },
  buttonText: {
    fontSize: 15,
    color: color.textIcons
  },
  button: {
    marginTop: 10,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})

class Form extends PureComponent {
  // Header customize from react native navigator
  static navigationOptions = () => {
    let headerTitle = 'Tambah Alamat'
    let headerTitleStyle = {
      color: color.textIcons,
      fontSize: 16
    }
    let headerTintColor = color.textIcons
    let headerStyle = { backgroundColor: color.primaryColor }
    let headerBackTitle = ''

    return {
      headerTitle,
      headerTitleStyle,
      headerStyle,
      headerTintColor,
      headerBackTitle
    }
  }

  state = {
    province: [],
    city: [],
    subdistrict: [],
    uploading: false
  }

  componentDidMount () {
    this.getProvince()
    this._renderCurrentUserAddress()
  }

  _renderCurrentUserAddress = () => {
    const { status, data, initialize } = this.props
    if (status === 'Edit') {
      this.getProvince()
      this.getCities(data.provinceId)
      this.getSubdistrict(data.cityId)

      initialize({
        name: data.name,
        address: data.address,
        provinceId: data.provinceId,
        cityId: data.cityId,
        subdistrictId: data.subdistrictId
      })
    } else {
      null
    }
  }

  getProvince = async () => {
    try {
      const province = await regional({
        type: 'province'
      })
      this.setState({
        province
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  getCities = async (index) => {
    try {
      const city = await regional({
        id: index,
        type: 'city'
      })
      this.setState({
        city
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  getSubdistrict = async (index) => {
    try {
      const subdistrict = await regional({
        id: index,
        type: 'subdistrict'
      })
      this.setState({
        subdistrict
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  onSubmit = (values) => {
    const {
      error,
      dispatch,
      navigation,
      checkout
    } = this.props
    const { params } = navigation.state
    if (!error) {
      const data = {
        ...values
      }
      dispatch(updateAddress(data, checkout, params.item, navigation, params.callback))
    }
  }

  render () {
    const {
      province,
      city,
      subdistrict,
      uploading
    } = this.state

    const {
      handleSubmit,
      submitting,
      error,
      invalid,
      dispatch,
      change
    } = this.props

    return (
      <View style={[globalStyle.padDefault, styles.container]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="height"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Field
                name="name"
                placeholder="Masukkan nama lengkap"
                minLength={10}
                component={InputComponent}
              />
            </View>

            <View style={styles.field}>
              <Field
                name="address"
                placeholder="Masukkan alamat lengkap"
                maxLength={140}
                component={TextArea}
              />
            </View>

            <View style={styles.field}>
              <Field
                onChange={(event) => {
                  dispatch(change('cityId', null))
                  dispatch(change('subdistrictId', null))
                  this.getCities(event)
                }}
                name="provinceId"
                placeholder="Pilih Provinsi"
                data={province}
                component={Dropdown}
              />
            </View>

            <View style={styles.field}>
              <Field
                onChange={(event) => {
                  dispatch(change('subdistrictId', null))
                  this.getSubdistrict(event)
                }}
                name="cityId"
                placeholder="Pilih Kota"
                data={city}
                component={Dropdown}
              />
            </View>

            <View style={styles.field}>
              <Field
                name="subdistrictId"
                placeholder="Pilih Kecamatan"
                data={subdistrict}
                component={Dropdown}
              />
            </View>

            <Button
              style={styles.button}
              disabled={uploading || submitting || invalid}
              onPress={handleSubmit(this.onSubmit)}
            >
              <Text
                style={styles.buttonText}
              >
                Save
              </Text>
            </Button>
            {error && <Text>{error}</Text>}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// Form.propTypes = {
//   navigation: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
  values: getFormValues('AddAddressForm')(state)
})

export default reduxForm({
  form: 'AddAddressForm',
  validate
})(connect(mapStateToProps)(Form))
