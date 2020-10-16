import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet
} from 'react-native'
import {
  View,
  Text
} from 'native-base'

import color from 'theme/color'

const styles = StyleSheet.create({
  emptyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  emptyText: {
    fontSize: 14,
    paddingHorizontal: 2,
    color: color.secondaryText
  }
})

class ProductEmpty extends PureComponent {
  render () {
    const {
      text,
      data,
      additional,
      loading
    } = this.props
    return (
      <View>
        {data && data.length === 0 && !loading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{`${text} ${additional}`}</Text>
          </View>
        )}
      </View>
    )
  }
}

ProductEmpty.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any.isRequired,
  additional: PropTypes.string
}

ProductEmpty.defaultProps = {
  text: '',
  additional: 'not found.'
}

export default ProductEmpty
