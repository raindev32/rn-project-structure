import {
  StyleSheet
} from 'react-native'

const PADDING_CARD_HORIZONTAL = 17
const PADDING_CARD_VERTICAL = 5

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    width: '100%'
  },
  cardItem: {
    borderRadius: 10,
    paddingTop: PADDING_CARD_VERTICAL,
    paddingBottom: PADDING_CARD_VERTICAL,
    paddingLeft: PADDING_CARD_HORIZONTAL,
    paddingRight: PADDING_CARD_HORIZONTAL
  }
})

export default styles
