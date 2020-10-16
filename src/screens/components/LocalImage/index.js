import React, { PureComponent } from 'react'
import {
  Image
} from 'react-native'
import { getFileUri } from 'utils/file'

class LocalImage extends PureComponent {
  state = {
    uri: null,
    tempItem: null
  }

  componentDidMount () {
    this.setUri()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { tempItem } = this.state
    if (tempItem !== nextProps.item) {
      this.setUri()
    }
  }

  setUri = async () => {
    const { item } = this.props
    try {
      const filePath = await getFileUri(item)

      this.setState({
        uri: filePath,
        tempItem: item
      })
    } catch (error) {
      this.setState({
        uri: item,
        tempItem: item
      })
      console.log('error', error)
    }
  }

  render () {
    const { uri } = this.state

    if (this.props && uri) {
      return (
        <Image
          source={{
            uri
          }}
          {...this.props}
        />
      )
    }
    return null
  }
}

export default LocalImage
