import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, Button, Keyboard } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createDeck } from '../actions'
import BigButton from './BigButton'
import ScreenTitle from './ScreenTitle'
import { textInputStyle } from '../utils/helpers'

class NewDeck extends Component {
  state = {
    deckTitle: '',
    err: ''
  }

  componentDidMount() {
    this.textInput.clear()
  }

  submitForm = () => {
    const { deckTitle } = this.state
    const { createDeck, navigation } = this.props

    if ( !deckTitle.length ) {
      return this.setState({ err: 'Your title can\'t be blank!' })
    }

    createDeck(deckTitle)
    Keyboard.dismiss()
    this.textInput.clear()
    navigation.navigate('deckList')
    this.setState({ err: '', deckTitle: '' })
  }

  render() {
    return (
      <Container behavior="padding">
        <ScreenTitle>New Deck</ScreenTitle>
        <TextInput
          style={textInputStyle}
          placeholder="Enter a title for your deck!"
          onChangeText={deckTitle => this.setState({deckTitle})}
          onSubmitEditing={this.submitForm}
          ref={input => { this.textInput = input }}
        />
        {this.state.err !== '' && 
          <Error>
            {this.state.err}
          </Error>
        }
        <BigButton
          onPress={this.submitForm}
          text="Submit"
        />
      </Container>
    )
  }
}

const Container = styled.KeyboardAvoidingView`
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

const Error = styled.Text`
  color: red;
  margin-bottom: 20px;
  position: relative;
  top: -10px;
`

const mapDispatchToProps = dispatch => 
  bindActionCreators({ createDeck }, dispatch)

export default connect(null, mapDispatchToProps)(NewDeck)