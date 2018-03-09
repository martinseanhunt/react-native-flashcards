import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { retrieveDecks } from '../actions'
import BigButton from './BigButton'
import ScreenTitle from './ScreenTitle'
import Card from './Card'

class DeckList extends Component {
  componentWillMount() {
    this.props.retrieveDecks()
  }

  render() {
    const { decks, navigation } = this.props
    return (
      <Container>
        <ScreenTitle>Your Decks</ScreenTitle>
        {Object.keys(decks).map(key => {
          const { title, questions } = decks[key]
          return (
            <TouchableOpacity onPress={() => navigation.navigate('DeckView', { key })} key={key}>
              <Card>
                <DeckInfo>{title}</DeckInfo>
                <DeckInfo>{questions.length}</DeckInfo>
              </Card>
            </TouchableOpacity>
          )
        })}

        <BigButton 
          onPress={() => navigation.navigate('newDeck')} 
          text='Add a deck' />     
      </Container>
    )
  }
}

const Container = styled.ScrollView`
  padding: 20px;
  flex: 1;
`

const DeckInfo = styled.Text`
  font-size: 16px;
`

const mapStateToProps = ({ decks }) => ({ decks })

const mapDisatchToProps = dispatch => 
  bindActionCreators({ retrieveDecks }, dispatch)

export default connect(mapStateToProps, mapDisatchToProps)(DeckList)