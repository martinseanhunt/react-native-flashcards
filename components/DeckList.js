import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { retrieveDecks } from '../actions'

class DeckList extends Component {
  componentWillMount() {
    this.props.retrieveDecks()
  }

  render() {
    const { decks, navigation } = this.props
    return (
      <Container>
        <ListTitle>Your Decks</ListTitle>
        {Object.keys(decks).map(key => {
          const { title, questions } = decks[key]
          return (
            <TouchableOpacity onPress={() => navigation.navigate('DeckView', { key })} key={key}>
              <Card>
                <Text>{title}</Text>
                <Text>{questions.length}</Text>
              </Card>
            </TouchableOpacity>
          )
        })}
      </Container>
    )
  }
}

const Container = styled.ScrollView`
  padding: 20px;
  flex: 1;
`

const ListTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`

const Card = styled.View`
  padding: 15px 10px;
  border: 1px solid #0F0F0F;
  border-radius: 3px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
`

const mapStateToProps = ({ decks }) => ({ decks })

const mapDisatchToProps = dispatch => 
  bindActionCreators({ retrieveDecks }, dispatch)

export default connect(mapStateToProps, mapDisatchToProps)(DeckList)