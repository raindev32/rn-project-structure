import {
  StyleSheet,
  Dimensions
} from 'react-native'
import color from './color'

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: color.textIcons
  },
  h1: {
    fontSize: 20,
    color: color.primaryText
  },
  h2: {
    fontSize: 16,
    color: color.primaryText
  },
  h3: {
    fontSize: 13,
    color: color.primaryText
  },
  whiteText: {
    color: color.textIcons
  },
  smallText: {
    fontSize: 12
  },
  mediumText: {
    fontSize: 14
  },
  centerText: {
    textAlign: 'center'
  },
  alignItems: {
    alignItems: 'center'
  },
  rightText: {
    textAlign: 'right'
  },
  boldText: {
    fontWeight: 'bold'
  },
  fdRow: {
    flexDirection: 'row'
  },
  fdColl: {
    flexDirection: 'column'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  navTitle: {
    fontSize: 18
  },
  padVert: {
    paddingVertical: 10
  },
  padDefault: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  fullWidth: {
    width: '100%'
  },
  buttonCenter: {
    padding: 10,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: '100%'
  },
  circleProfile: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadow: {
    shadowColor: color.primaryText,
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 13 }
  },
  buttonContainer: {
    backgroundColor: color.textIcons,
    padding: 10
  }
})

export default style
