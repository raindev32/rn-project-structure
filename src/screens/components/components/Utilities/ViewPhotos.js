import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import {
  Container,
  Body,
  Left,
  Right,
  Footer,
  Button
} from 'native-base'

import color from 'theme/color'
import SelectedPhoto from './SelectedPhoto'

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width / 3.3,
    height: Dimensions.get('window').width / 3.3,
    backgroundColor: color.textIcons
  },
  cancelText: {
    color: color.primaryText
  },
  btnCancel: {
    paddingHorizontal: 30,
    backgroundColor: color.textIcons
  },
  footer: {
    backgroundColor: color.textIcons,
    paddingHorizontal: 20
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 15
  },
  content: {
    padding: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  }
})

class ViewPhotos extends Component {
  state = {
    showSelectedPhoto: false,
    uri: '',
    image: {}
  }

  render () {
    const {
      photoArray,
      onCancel,
      onSubmit
    } = this.props
    const { showSelectedPhoto, uri, image } = this.state

    if (showSelectedPhoto) {
      return (
        <SelectedPhoto
          onSubmit={onSubmit}
          onCancel={onCancel}
          uri={uri}
          image={image}
        />
      )
    }
    return (
      <Container style={{ backgroundColor: color.textIcons }}>
        <Body>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Pick A Photo</Text>
          </View>
          <FlatList
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={photoArray}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const { uri } = item.node.image
              return (
                <View style={styles.content}>
                  <TouchableHighlight
                    onPress={() => this.setState({ showSelectedPhoto: true, uri, image: item.node.image })}
                  >
                    <Image
                      source={{ uri }}
                      style={styles.image}
                    />
                  </TouchableHighlight>
                </View>
              )
            }}
          />
        </Body>
        <Footer style={styles.footer}>
          <Left>
            <Button style={styles.btnCancel} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Button>
          </Left>
          <Right />
        </Footer>
      </Container>
    )
  }
}

ViewPhotos.propTypes = {
  photoArray: PropTypes.array,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
}

ViewPhotos.defaultProps = {
  photoArray: []
}

export default ViewPhotos
