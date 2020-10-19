import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Platform,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import {
  View,
  Button,
  Text
} from 'native-base'
import {
  addMemo
} from 'actions/transaction/localTransactionAction'

import color from 'theme/color'

import TextArea from 'components/Form/TextArea'
import validate from './validate'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 10,
    backgroundColor: color.textIcons
  },
  buttonText: {
    color: color.textIcons
  },
  mainContainer: {
    padding: 10,
    paddingBottom: 60
  },
  field: {
    width: '100%',
    height: 300
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: color.textIcons,
    paddingBottom: 20
  },
  btnSubmit: {
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginHorizontal: 10,
    marginVertical: 20
  }
})

class Form extends Component {
  componentDidMount () {
    const { photoList, initialize } = this.props
    initialize({
      memo: photoList && photoList.memo
    })
  }

  onSubmit = async (values) => {
    const { dispatch, onClose } = this.props
    dispatch(addMemo(values.memo))
    onClose()
  }

  render () {
    const {
      // navigation,
      error,
      errorMessage,

      loading,
      handleSubmit,
      submitting,
      invalid
    } = this.props

    return (
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior="height"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 10}
        >
          <View style={styles.container}>
            <View style={styles.field}>
              <Field
                name="memo"
                label="Memo"
                placeholder="Leave a note to designer"
                maxLength={255}
                component={TextArea}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <Button
          full
          style={styles.btnSubmit}
          disabled={invalid || loading || submitting}
          onPress={handleSubmit(this.onSubmit)}
        >
          <Text
            style={styles.buttonText}
            uppercase={false}
          >
            Submit
          </Text>
        </Button>
        {error && <Text>{errorMessage}</Text>}
      </View>
    )
  }
}

export default reduxForm({
  form: 'MemoForm',
  validate
})(connect(null)(Form))
