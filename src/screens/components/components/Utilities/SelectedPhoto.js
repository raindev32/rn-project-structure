import React from 'react'
import {
  Image,
  StyleSheet,
  Text
} from 'react-native'
import {
  Container,
  Body,
  Left,
  Right,
  Button,
  Footer
} from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  cancelText: {
    color: color.primaryText
  },
  image: {
    backgroundColor: color.textIcons,
    height: 300,
    width: 300
  },
  btnCancel: {
    paddingHorizontal: 30,
    backgroundColor: color.textIcons
  },
  btn: {
    paddingHorizontal: 30
  },
  footer: {
    backgroundColor: color.textIcons,
    paddingHorizontal: 20
  },
  submitText: {
    color: color.textIcons
  }
})

const SelectedPhoto = ({
  uri,
  onCancel,
  onSubmit,
  image
}) => {
  return (
    <Container style={{ backgroundColor: color.textIcons }}>
      <Body>
        <Image
          source={{ uri }}
          style={styles.image}
        />
      </Body>
      <Footer style={styles.footer}>
        <Left>
          <Button style={styles.btnCancel} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Button>
        </Left>
        <Right>
          <Button primary style={styles.btn} onPress={() => onSubmit(uri, image)}>
            <Text style={styles.submitText}>Choose</Text>
          </Button>
        </Right>
      </Footer>
    </Container>
  )
}

export default SelectedPhoto
