import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  View,
  StyleSheet
} from 'react-native'
import { Thumbnail } from 'native-base'
import { withNavigation } from 'react-navigation'

import imageNotFound from 'assets/app/404/no-image-upload.png'
import UploadSlider from './UploadSlider'

const styles = StyleSheet.create({
  slideShowStyle: {
    flex: 1
  },
  imagePic: {
    width: 150,
    height: 150,
    marginTop: 80
  },
  containerEmpty: {
    alignItems: 'center'
  },
  flex: {
    flex: 1,
    paddingVertical: 20
  }
  // image: {
  //   position: 'absolute',
  //   width: '100%',
  //   height: 500
  // }
})

class Slider extends PureComponent {
  render () {
    const {
      data
    } = this.props

    return (
      <View style={styles.flex}>
        {
          data && data.qty && data.product && (!data.photos || data.photos.length === 0) ? (
            <View style={styles.containerEmpty}>
              <Thumbnail source={imageNotFound} style={styles.imagePic} />
            </View>
          )
            : (
              <View style={styles.slideShowStyle}>
                <UploadSlider
                  onPress={() => { }}
                  qty={data.qty}
                  data={data}
                  sizeProduct={data.product}
                  dataSource={(data.photos || [])}
                />
              </View>
            )
        }
      </View>
    )
  }
}

export default connect(null)(withNavigation(Slider))
