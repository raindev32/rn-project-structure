import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  StyleSheet
} from 'react-native'
import {
  Header,
  Button,
  Icon,
  Body,
  Title
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  titleHeader: {
    fontWeight: 'bold',
    color: color.primaryColor
  },
  header: {
    paddingLeft: -10,
    backgroundColor: color.textIcons,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowOpacity: 0,
    elevation: 0
  },
  body: {
    width: '100%',
    backgroundColor: color.textIcons
  }
})

class ModalContainer extends PureComponent {
  render () {
    const {
      visible,
      onClose,
      component,
      customHeader
    } = this.props

    return (
      <Modal
        animated
        animationType="slide"
        presentationStyle="fullScreen"
        visible={visible}
        transparent
        onRequestClose={() => {
          onClose()
        }}
      >

        <Header
          iosBarStyle={color.primaryColor}
          androidStatusBarColor={color.primaryColor}
          style={styles.header}
        >
          <Button transparent onPress={() => onClose()}>
            <Icon name="arrow-back" style={{ color: color.primaryColor }} />
          </Button>
          <Body>
            <Title style={styles.titleHeader}>{customHeader}</Title>
          </Body>
        </Header>

        <Body style={styles.body}>
          {component}
        </Body>
      </Modal>
    )
  }
}

ModalContainer.propTypes = {
  visible: PropTypes.bool,
  customHeader: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

ModalContainer.defaultProps = {
  visible: false
}

export default ModalContainer
