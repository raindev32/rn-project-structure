import React from 'react'
import { Provider } from 'react-redux'
import { StyleProvider, Root } from 'native-base'

import getTheme from './node_modules/native-base/src/theme/components'
import material from './native-base-theme/variables/material.js'
import Routes from './src/Routes'
import store from './src/store'

export default class App extends React.Component {
  render () {
    console.disableYellowBox = true

    return (
      <Provider
        store={store}
      >
        <Root>
          <StyleProvider style={getTheme(material)}>
            <Routes />
          </StyleProvider>
        </Root>
      </Provider>
    )
  }
}
