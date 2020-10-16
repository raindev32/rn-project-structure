import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Item,
  Picker,
  Text,
  View
} from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  column: {
    width: '25%',
    paddingVertical: 5,
    minHeight: 40,
    flexDirection: 'column'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: color.textIcons,
    alignItems: 'center',
    borderRadius: 5,
    minHeight: 50,
    maxHeight: 50
  },
  error: {
    textAlign: 'right',
    color: color.errorColor
  },
  input: {
    paddingHorizontal: 0,
    paddingLeft: 0,
    padding: 0,
    minHeight: 40,
    maxHeight: 40,
    color: color.primaryText
  },
  inputText: {
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    padding: 0,
    justifyContent: 'flex-start',
    width: '100%',
    fontSize: 17
  },
  label: {
    paddingLeft: 12,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: color.primaryText
  },
  placeholder: {
    color: color.secondaryText,
    paddingVertical: 10
  },
  placeholderText: {
    color: color.secondaryText
  }
})

const Clock = ({
  input,
  placeholder = ' ',
  title,
  limit,
  time,
  onChangeValue,
  meta: {
    touched,
    error
  }
}) => {
  return (
    <View style={styles.column}>
      <Text style={styles.label}>
        {title || placeholder}
      </Text>
      <Item
        regular
        style={styles.item}
        error={!!error && touched}
      >
        <Picker
          mode="dialog"
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          placeholderIconColor={color.secondaryText}
          selectedValue={`${input.value}`}
          style={styles.input}
          textStyle={styles.inputText}
          iosHeader={placeholder}
          onValueChange={(event) => {
            input.onChange(event)
            if (onChangeValue) {
              onChangeValue(event)
            }
          }}
          {...input}
        >
          <Picker.Item value={null} label={placeholder} style={styles.placeholderText} />
          {
            [...Array(time)].map((data, index) => (
              <Picker.Item key={index} label={`${index <= limit ? `0${index}` : index}`} value={`${index <= limit ? `0${index}` : index}`} />
            ))
          }
        </Picker>
      </Item>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default Clock
