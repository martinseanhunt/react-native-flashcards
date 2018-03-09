import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers'
import StatusBarView from './components/StatusBarView'
import Navigation from './components/Navigation'
import { setLocalNotification } from './utils/helpers'

const store = createStore(rootReducer, 
  applyMiddleware(thunk, logger), 
)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBarView />
          <Navigation />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})