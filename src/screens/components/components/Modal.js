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
    color: color.smoothText
  },
  header: {
    backgroundColor: color.textIcons,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowOpacity: 0,
    elevation: 0
  }
})

class ModalForm extends PureComponent {
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
            <Icon name="arrow-back" style={{ color: color.smoothText }} />
          </Button>
          <Body>
            <Title style={styles.titleHeader}>{customHeader}</Title>
          </Body>
        </Header>

        <Body>
          {component}
        </Body>
      </Modal>
    )
  }
}

ModalForm.propTypes = {
  visible: PropTypes.bool,
  customHeader: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

ModalForm.defaultProps = {
  visible: false
}

export default ModalForm
