import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Modal,
  StyleSheet
} from 'react-native'
import {
  Icon,
  Button
} from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 10,
    backgroundColor: color.textIcons,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1
  },
  modal: {
    borderColor: color.dividerColor,
    marginHorizontal: 0,
    marginBottom: 0,
    width: '100%',
    height: 200
  },
  iconText: {
    fontSize: 20
  },
  button: {
    marginVertical: 10
  },
  buttonText: {
    color: color.textIcons,
    textAlign: 'left'
  }
})

class ModalMessage extends Component {
  goToVerification () {
    const {
      navigation,
      statusMail,
      type,
      viewProfile,
      onCancel
    } = this.props
    onCancel()
    if (!statusMail && viewProfile.password) {
      navigation.navigate('verificationPage', {
        type,
        akun: type === 'email'
          ? viewProfile.email
          : viewProfile.phone_number
      })
    }
  }

  render () {
    const {
      isVisible,
      onCancel,
      navigation,
      statusMail,
      statusPhone,
      type,
      viewProfile
    } = this.props

    return (
      <Modal
        transparent
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => onCancel()}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            {
              (statusMail && type === 'email') || (statusPhone && type === 'phone') ? (
                <View>
                  <Button
                    full
                    primary
                    style={styles.button}
                    onPress={() => {
                      if (viewProfile.password) {
                        onCancel()
                        navigation.navigate('PasswordTransaksi', { type })
                      } else {
                        onCancel()
                        navigation.navigate('UbahPassword')
                      }
                    }}
                  >
                    <Icon
                      type="FontAwesome"
                      name="cog"
                      style={styles.iconText}
                    />
                    <Text style={styles.buttonText}>
                      {`Ubah ${type}`}
                    </Text>
                  </Button>

                  {
                    onCancel ? (
                      <Button full light style={styles.button} onPress={onCancel}>
                        <Text>Cancel</Text>
                      </Button>
                    ) : null
                  }
                </View>
              )
                : (
                  <View>
                    {/* <Button
                      full
                      primary
                      style={styles.button}
                      onPress={() => {
                        if (viewProfile.password) {
                          onCancel()
                          navigation.navigate('PasswordTransaksi', { type })
                        } else {
                          onCancel()
                          navigation.navigate('UbahPassword')
                        }
                      }}
                    >
                      <Icon
                        type="FontAwesome"
                        name="cog"
                        style={styles.iconText}
                      />
                      <Text style={styles.buttonText}>
                        {`Ubah ${type}`}
                      </Text>
                    </Button> */}
                    <Button
                      full
                      primary
                      style={styles.button}
                      onPress={() => this.goToVerification()}
                    >
                      {
                        type === 'email' ? (
                          <Icon
                            type="FontAwesome"
                            name="envelope"
                            style={styles.iconText}
                          />
                        )
                          : (
                            <Icon
                              type="FontAwesome"
                              name="mobile"
                              style={styles.iconText}
                            />
                          )
                      }
                      <Text style={{ color: color.textIcons }}>
                        {`Verifikasi ${type}`}
                      </Text>
                    </Button>
                    {
                      onCancel ? (
                        <Button full light style={styles.button} onPress={onCancel}>
                          <Text>Cancel</Text>
                        </Button>
                      ) : null
                    }
                  </View>
                )
            }
          </View>
        </View>
      </Modal>
    )
  }
}

ModalMessage.propTypes = {
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  onCancel: PropTypes.func,
  navigation: PropTypes.object.isRequired
}

ModalMessage.defaultProps = {
  isVisible: false
}

export default ModalMessage
