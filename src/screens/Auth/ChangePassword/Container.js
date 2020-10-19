import React, { Component } from 'react'

import { withNavigation } from 'react-navigation'

import Form from './Form'

class Container extends Component {
  render () {
    return (
      <Form />
    )
  }
}
export default withNavigation(Container)
