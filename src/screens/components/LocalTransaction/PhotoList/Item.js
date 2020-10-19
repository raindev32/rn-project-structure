import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import {
  Card, CardItem, View, ActionSheet
} from 'native-base'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import {
  addPhoto,
  deletePhoto,
  receivePhotoDetail
} from 'actions/transaction/localTransactionAction'

import color from 'theme/color'

import LocalImage from 'components/LocalImage'

const styles = StyleSheet.create({
  image: {
    width: (Dimensions.get('window').width / 2) - 10,
    paddingBottom: 0,
    height: 160,
    borderRadius: 12
  },
  card: {
    borderRadius: 12,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    marginBottom: 5
  },
  item: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 12
  }
})

class Item extends Component {
  state = {
    errorPhotoLoad: false
  }

  goToDetail = (uri) => {
    const { dispatch, index } = this.props
    dispatch(receivePhotoDetail(uri))
    const BUTTONS = [
      {
        text: 'Edit', icon: 'crop', iconColor: color.secondaryText
      },
      {
        text: 'Change', icon: 'image', iconColor: color.secondaryText
      },
      {
        text: 'Duplicate', icon: 'copy', iconColor: color.secondaryText
      },
      {
        text: 'Delete', icon: 'trash', iconColor: color.secondaryText
      },
      {
        text: 'Cancel', icon: 'close', iconColor: color.secondaryText
      }
    ]

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: 2,
        title: 'Image Picker'
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.openDetail({ goTo: 'PhotoList' })
            break
          case 1:
            this.openDetail({ goTo: 'PhotoList' })
            break
          case 2:
            dispatch(addPhoto(uri))
            break
          case 3:
            dispatch(deletePhoto(index))
            break
          default:
            break
        }
      }
    )
  }

  openDetail = (goTo) => {
    const { index, navigation } = this.props
    navigation.navigate('PhotoDetail', {
      index, goTo
    })
  }

  render () {
    const { item } = this.props
    const {
      errorPhotoLoad
    } = this.state

    return (
      <View>
        <Card
          style={styles.card}
        >
          <CardItem
            onPress={() => this.goToDetail(item)}
            style={styles.item}
            button
          >
            {!errorPhotoLoad && (
              <LocalImage
                item={item}
                resizeMode="cover"
                style={styles.image}
                onError={() => {
                  this.setState({
                    errorPhotoLoad: true
                  })
                }}
              />
            )}
            {errorPhotoLoad && (
              <Image
                source={require('assets/app/404/image-notfound.png')}
                resizeMode="contain"
                style={styles.image}
              />
            )}
          </CardItem>
        </Card>
      </View>
    )
  }
}

export default connect(null)(withNavigation(Item))
