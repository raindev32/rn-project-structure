import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View, Text, Image, StyleSheet
} from 'react-native'

import color from 'theme/color'

const styles = StyleSheet.create({
  wrapEmptyState: {
    marginTop: 50,
    alignItems: 'center'
  },
  imgNoEvent: {
    width: 200,
    height: 200
  },
  emptyEventLocation: {
    fontSize: 15,
    marginVertical: 20,
    textAlign: 'center',
    color: color.secondaryText
  }
})

class EmptyState extends Component {
  render () {
    const { image, title, noPicture } = this.props

    return (
      <View style={styles.wrapEmptyState}>
        {
          !noPicture ? (
            <Image
              source={image}
              style={styles.imgNoEvent}
              resizeMode="contain"
            />
          ) : null
        }

        <Text style={styles.emptyEventLocation}>
          {title}
        </Text>
      </View>
    )
  }
}

EmptyState.propTypes = {
  title: PropTypes.string,
  noPicture: PropTypes.bool
}

export default EmptyState
