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
    backgroundColor: color.textIcons,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    paddingLeft: 12,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: color.primaryText
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

const timeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let year = a.getFullYear()
  let month = months[a.getMonth()]
  let date = a.getDate()
  let time = `${date}-${month}-${year}`
  return time
}

const renderDate = ({
  input,
  minimumDate,
  iconName,
  iconType,
  placeholder = 'Pick Date',
  title,
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
          formatChosenDate={date => moment(date).format('YYYY-MM-DD')}
          {...input}
        />
      </Item>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default renderDate
