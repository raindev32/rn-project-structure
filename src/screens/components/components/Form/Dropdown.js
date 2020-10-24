import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Item,
  Picker,
  Text,
  View,
  Icon
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  column: {
    paddingVertical: 5,
    minHeight: 40,
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.textIcons,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0,
    paddingTop: 0,
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

const renderDropdown = ({
  input,
  placeholder,
  data,
  title,
  iconName,
  iconType,
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
        {iconName && (
          <Icon
            active
            type={iconType}
            name={iconName}
          />
        )}
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
          {data && typeof data === 'object' ? data.map((data, key) => <Picker.Item key={key} label={`${data.value}`} value={`${data.id}`} />) : null}
        </Picker>
      </Item>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default renderDropdown
