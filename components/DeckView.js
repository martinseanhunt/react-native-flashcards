import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { key } = navigation.state.params

    return {
      title: key
    }
  }

  render() {
    const { deck } = this.props
    return (
      <View>
        <Text>Title: {deck.title && deck.title}</Text>
        <Text>Cards: {deck.questions && deck.questions.length}</Text>
      </View>
    )
  }
} 

const mapStateToProps = ({ decks }, { navigation }) => {
  const { key } = navigation.state.params
  return {
    deck: decks[key]
  }
}

export default connect(mapStateToProps)(DeckView)