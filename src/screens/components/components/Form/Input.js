import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  View,
  Item,
  Input,
  Text,
  Icon
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  column: {
    paddingVertical: 5,
    minHeight: 60,
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    backgroundColor: color.textIcons,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    minHeight: 50,
    maxHeight: 50
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    padding: 0,
    minHeight: 40,
    height: '100%',
    width: '100%',
    fontSize: 16
  },
  label: {
    paddingLeft: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: color.primaryText
  },
  error: {
    textAlign: 'right',
    color: color.errorColor
  }
})

const renderInput = ({
  input,
  title,
  placeholder,
  keyboardType = 'default',
  maxLength = 30,
  max,
  min,
  autoFocus,
  selectTextOnFocus = true,
  iconType = 'FontAwesome',
  iconName,
  disabled,
  secureTextEntry = false,
  textAlignVertical = 'center',
  iconRight,
  meta: {
    touched,
    error
  }
}) => {
  if (keyboardType === 'numeric') {
    if (input && input.value) {
      input.value = (`${Number(input.value)}` || '').replace(/[^\d.]/g, '')
    }
    if (max && input.value > max) {
      input.value = `${max}`
    }
    if (min && input.value < min) {
      input.value = `${min}`
    }
    input.onChange(`${input.value}`)
  } else if (keyboardType === 'phone-pad') {
    input.value = (`${input.value}` || '').replace(/[^\d]/g, '')
    input.onChange(input.value)
  }

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
        {iconName && (
          <Icon
            active
            type={iconType}
            name={iconName}
          />
        )}
        <Input
          disabled={disabled}
          autoFocus={autoFocus}
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          selectTextOnFocus={selectTextOnFocus}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          autoCapitalize="none"
          textAlignVertical={textAlignVertical}
          {...input}
        />
        {iconRight}
      </Item>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default renderInput
