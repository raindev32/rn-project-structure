import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import {
  Container
} from 'native-base'
import {
  getCurrentTransaction
} from 'actions/transaction/localTransactionAction'

import HeaderTop from './HeaderTop'
import ContainerData from './Container'

class PhotoBooks extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton = () => {
    const { navigation, dispatch } = this.props
    navigation.navigate('PhotoList', { onGoBack: dispatch(getCurrentTransaction()) })
    return true
  }

  render () {
    const { photoList, navigation } = this.props
    const { params } = navigation.state

    return (
      <Container>
        <HeaderTop
          navigation={navigation}
          params={params && params.bundleName ? params.bundleName : ''}
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

export default connect(mapStateToProps)(PhotoBooks)
