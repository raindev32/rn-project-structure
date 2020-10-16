const statusColor = (text) => {
  switch (text) {
    case 'completed':
    case 'sent':
    case 'accept':
    case 'product':
      return '#493E3C'
    case 'money':
      return '#4CAF50'
    case 'pending':
    case 'send':
    case 'process':
    case 'retur':
      return '#FEBF35'
    case 'expired':
    case 'cancel':
      return '#E4202D'
    default:
      return '#757575'
  }
}

export default {
  primaryColor: '#6418b5',
  primaryColorTransparent: 'rgba(230, 126, 34, 0.8)',
  darkPrimaryColor: '#333333',
  lightPrimaryColor: '#836E6A',
  textIcons: '#FFFFFF',
  accentIcons: '#F0E9E9',
  primaryText: '#212121',
  primaryTextTransparent: 'rgba(33, 33, 33, 0.5)',
  secondaryText: '#757575',
  dividerColor: '#D3D1D1',
  termColor: '#EEEEEE',
  primaryBackgroundColor: '#f8f8f8',
  errorColor: '#E4202D',
  cottonColor: '#f1abb9',
  itemUnderline: '#c9c9c9',
  limeColor: '#50a329',
  successColor: '#1AB385',
  highlightColor: '#FF5722',
  whiteCream: '#FCFCFC',
  starColor: '#FEBF35',
  goldColor: '#ffd700',
  cloudColor: '#e9f1f4',
  creamColor: '#FFEDCF',
  sweetColor: '#E1F2EA',
  berryColor: '#E7EBFF',
  smoothText: '#4C4E6A',
  priceText: '#FF6A6A',
  transparent: 'transparent',
  link: '#1A0DAB',
  statusColor
}
