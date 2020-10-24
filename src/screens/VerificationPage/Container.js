import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import {
  StyleSheet, ScrollView, View
} from 'react-native'

import Form from './Form'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class Container extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form navigation={navigation} />
        </ScrollView>
      </View>
    )
  }
}

export default withNavigation(Container)
