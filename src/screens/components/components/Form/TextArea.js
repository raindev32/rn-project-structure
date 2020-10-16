import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Text,
  Item,
  Textarea,
  View,
  Right
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  column: {
    paddingVertical: 5,
    minHeight: 60,
    flex: 1,
    flexDirection: 'column'
  },
  textArea: {
    width: '100%',
    paddingRight: 0,
    padding: 0,
    minHeight: 40,
    height: 300,
    paddingLeft: 5,
    paddingVertical: 10
  },
  label: {
    fontSize: 15,
    paddingLeft: 12,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: color.primaryText
  },
  item: {
    flex: 1,
    backgroundColor: color.textIcons,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10
  },
  error: {
    textAlign: 'right',
    color: color.errorColor
  },
  row: {
    flexDirection: 'row'
  }
})

const renderTextArea = ({
  input,
  placeholder,
  keyboardType = 'default',
  maxLength = 2000,
  autoFocus,
  multiline,
  title,
  height = 100,
  meta: {
    touched,
    error
  }
}) => {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text style={styles.label}>
          {title}
        </Text>
        <Right>
          <Text style={styles.lengthText}>{`${input && input.value ? input.value.length : 0}/${maxLength}`}</Text>
        </Right>
      </View>
      <Item
        regular
        style={styles.item}
        error={!!error && touched}
      >
        <Textarea
          selectTextOnFocus
          autoCorrect={false}
          autoFocus={autoFocus}
          style={[styles.textArea, { minHeight: height, maxHeight: height * 2 }]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={10}
          rowSpan={10}
          {...input}
        />
      </Item>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default renderTextArea
