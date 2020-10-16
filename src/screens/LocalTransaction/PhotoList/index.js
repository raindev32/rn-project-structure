import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container
} from 'native-base'

import HeaderTop from './HeaderTop'
import ContainerData from './Container'

class PhotoList extends Component {
  render () {
    const { photoList, navigation } = this.props

    return (
      <Container>
        <HeaderTop
          navigation={navigation}
          customHeader="Photo List"
          photoList={photoList.photos}
        />
        <ContainerData navigation={navigation} />
      </Container>
    )
  }
}
const mapStateToProps = (state) => ({
  photoList: state.localTransactionStore.photoList
})

export default connect(mapStateToProps)(PhotoList)
