import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet, TouchableOpacity
} from 'react-native'
import {
  Text,
  Left,
  Body,
  View
} from 'native-base'
import {
  submitRegisterVerify
} from 'actions/auth/verification'

import color from 'theme/color'

import Verified from './Verified'

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexEnd: {
    alignItems: 'flex-end'
  },
  flexLeft: {
    width: '20%',
    fontWeight: 'normal',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  flexRight: {
    width: '80%',
    fontWeight: 'normal',
    paddingVertical: 5,
    alignItems: 'flex-end'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: color.primaryColor
  },
  txtTitle2: {
    fontSize: 15,
    paddingVertical: 10
  },
  txtTitle: {
    fontSize: 15,
    paddingVertical: 5
  },
  viewLeft: {
    width: '100%',
    flexDirection: 'row'
  }
})

class ProfileCard extends Component {
  onSubmit = (account) => {
    const { navigation, dispatch } = this.props
    dispatch(submitRegisterVerify({ account }, navigation))
  }

  render () {
    const { data } = this.props

    return (
      <View style={styles.flex}>
        <Text style={styles.headerText}>
          Contact
        </Text>
        <View style={styles.viewLeft}>
          <Left style={styles.flexLeft}>
            <Text style={styles.txtTitle2}>Email</Text>
          </Left>
          <Body style={styles.flexRight}>
            <TouchableOpacity
              style={styles.flexEnd}
              onPress={() => this.onSubmit(data.email)}
            >
              <Verified data={data || {}} />
              <Text numberOfLines={1} style={styles.txtTitle}>{data.email || '-'}</Text>
            </TouchableOpacity>
          </Body>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.authStore.loading,
  currentItem: state.authStore.currentItem,
  errorMessage: state.authStore.errorMessage
})

export default withNavigation(connect(mapStateToProps)(ProfileCard))
