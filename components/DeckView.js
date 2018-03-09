import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ScreenTitle from './ScreenTitle'
import BigButton from './BigButton'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { key } = navigation.state.params

    return {
      title: key
    }
  }

  render() {
    const { deck, navigation } = this.props
    const { key } = navigation.state.params
    return (
      <Container>
        <ScreenTitle>Deck: {deck.title && deck.title}</ScreenTitle>
        
        <CardCount>Cards: {deck.questions && deck.questions.length}</CardCount>

        <Buttons>
          <BigButton 
            onPress={() => navigation.navigate('NewCard', { key })}
            text='Add a Card' />
          <BigButton onPress={() => navigation.navigate('Quiz', { key })}
            text='Start Quiz' />
        </Buttons>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
`

const CardCount = styled.Text`
  font-size: 45px;
`

const Buttons = styled.View`
  width: 100%;
`

const mapStateToProps = ({ decks }, { navigation }) => {
  const { key } = navigation.state.params
  return {
    deck: decks[key]
  }
}

export default connect(mapStateToProps)(DeckView)