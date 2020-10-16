import React from 'react'
import {
  StyleSheet
} from 'react-native'
import {
  Item,
  Text,
  DatePicker,
  View,
  Icon
} from 'native-base'
import color from 'theme/color'
import moment from 'moment'
import { timeConverter } from 'utils/time'

const styles = StyleSheet.create({
  column: {
    paddingVertical: 5,
    minHeight: 60,
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.accentIcons,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 0,
    paddingTop: 0,
    borderRadius: 10,
    minHeight: 50,
    maxHeight: 50
  },
  error: {
    textAlign: 'right',
    color: color.errorColor
  },
  label: {
    paddingLeft: 18,
    color: color.secondaryText
  },
  datePickerText: {
    paddingTop: 15,
    paddingBottom: 0,
    paddingHorizontal: 10,
    paddingLeft: 7,
    minHeight: 50,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: color.primaryText,
    borderBottomWidth: 0,
    fontSize: 16
  }
})

Date.prototype.getUnixTime = function () { return this.getTime() / 1000 || 0 }
if (!Date.now) Date.now = function () { return new Date() }
Date.time = function () { return Date.now().getUnixTime() }
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h)
  return this
}

const renderDate = ({
  input,
  minimumDate,
  iconName,
  iconType,
  placeholder = 'Pick Date',
  meta: {
    touched,
    error
  }
}) => {
  if (typeof input.value === 'object') {
    input.value = new Date(input.value)
  } else if (typeof input.value === 'string') {
    input.value = parseFloat(input.value)
  }

  return (
    <View style={styles.column}>
      <Text style={styles.label}>
        {placeholder}
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
        <DatePicker
          defaultDate={typeof input.value === 'string'
            ? new Date(input.value)
            : typeof input.value === 'object'
              ? input.value
              : null}
          locale="id"
          minimumDate={minimumDate}
          modalTransparent={false}
          animationType="fade"
          androidMode="calendar"
          placeHolderText={input.value ? timeConverter(input.value) : placeholder}
          textStyle={styles.datePickerText}
          placeHolderTextStyle={[styles.datePickerText, { color: color.secondaryText }]}
          onDateChange={input.onChange}
          formatChosenDate={(date) => moment(date).format('YYYY-MM-DD')}
          {...input}
        />
      </Item>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default renderDate
