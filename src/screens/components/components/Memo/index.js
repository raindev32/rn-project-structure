import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Icon, Right, Button, Badge, Text
} from 'native-base'
// import {
//   getCurrentTransaction
// } from 'actions/transaction/localTransactionAction'

import color from 'theme/color'
import Modal from 'components/Modal'
import MemoInput from './MemoInput'

const styles = StyleSheet.create({
  wrapIcon: {
    position: 'absolute',
    paddingRight: 10,
    right: 40
  },
  icon: {
    color: color.smoothText
  },
  badge: {
    backgroundColor: color.primaryColor,
    position: 'absolute',
    right: 10,
    height: 12,
    width: 12
  },
  iconExclamation: {
    fontSize: 20,
    color: color.errorColor,
    position: 'absolute',
    top: 0,
    right: -5
  },
  btnMemo: {
    backgroundColor: color.textIcons,
    elevation: 0
  }
})

class Memo extends Component {
  state = {
    visible: false
  }

  render () {
    const { navigation, photoList } = this.props
    const { visible } = this.state

    const modalMessageProps = {
      visible,
      component: (
        <MemoInput photoList={photoList} onClose={() => this.setState({ visible: false })} />
      ),
      customHeader: 'Memo (Note to designer)',
      onClose: () => this.setState({ visible: false })
    }

    return (
      <Right style={styles.wrapIcon}>

        {visible && (
          <Modal
            {...modalMessageProps}
            navigation={navigation}
          />
        )}

        <Button
          style={styles.btnMemo}
          onPress={() => this.setState({ visible: true })}
        >
          <Icon
            name="sticky-note-o"
            type="FontAwesome"
            style={styles.icon}
          />
          {
            photoList && photoList.memo ? (
              <Badge style={styles.badge}>
                <Text />
              </Badge>
            )
              : (
                <Icon
                  name="exclamation"
                  type="FontAwesome5"
                  style={styles.iconExclamation}
                />
              )
          }
        </Button>
      </Right>
    )
  }
}

const mapStateToProps = state => ({
  photoList: state.localTransactionStore.photoList
})

export default connect(mapStateToProps)(Memo)
