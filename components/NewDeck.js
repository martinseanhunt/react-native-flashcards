import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, Button, Keyboard } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createDeck } from '../actions'

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
      <KeyboardAvoidingView>
        <Text>Make a new deck</Text>
        <TextInput
          style={{height: 40}}
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
        <Button
          onPress={this.submitForm}
          title="Submit"
        />
      </KeyboardAvoidingView>
    )
  }
}

const Error = styled.Text`
  color: red;
`

const mapDispatchToProps = dispatch => 
  bindActionCreators({ createDeck }, dispatch)

export default connect(null, mapDispatchToProps)(NewDeck)