import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import logoEventPlanner from 'assets/app/logo-event-planner.png'

const styles = StyleSheet.create({
  image: { height: 50, width: 50 },
  padLeft: { paddingLeft: 10 }
})

class Logo extends Component {
  render () {
    return (
      <View style={styles.padLeft}>
        <Image style={styles.image} resizeMode="contain" source={logoEventPlanner} />
      </View>
    )
  }
}
export default Logo
