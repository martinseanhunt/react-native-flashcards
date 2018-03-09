import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, Button, Keyboard } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components'

import { createCard } from '../actions'
import ScreenTitle from './ScreenTitle'
import BigButton from './BigButton'
import { textInputStyle } from '../utils/helpers'

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `New Card`
  })

  state = {
    question: '',
    answer: '',
    err: ''
  }

  componentDidMount() {
    this.questionInput.clear()
    this.answerInput.clear()
  }

  submitForm = () => {
    const { question, answer } = this.state
    const { createCard, navigation } = this.props
    const { key } = navigation.state.params

    if ( !question.length ) {
      return this.setState({ err: 'Your question can\'t be blank!' })
    }

    if ( !answer.length ) {
      return this.setState({ err: 'Your answer can\'t be blank!' })
    }

    createCard(key, {
      question,
      answer
    })
    Keyboard.dismiss()
    this.questionInput.clear()
    this.answerInput.clear()
    this.setState({ err: '', deckTitle: '' })
    navigation.dispatch(NavigationActions.back({ key: navigation.state.key }))
  }

  render() {
    const { navigation } = this.props
    const { key } = navigation.state.params

    return ( 
      <Container behavior='padding'>
        <ScreenTitle>New card for {key}</ScreenTitle>

        <View>
          <TextInput
            style={[textInputStyle, { marginBottom: 40 }]}
            placeholder="Enter a question for your card!"
            onChangeText={question => this.setState({question})}
            onSubmitEditing={() => this.answerInput.focus() }
            ref={input => { this.questionInput = input }}
          />
          <TextInput
            style={textInputStyle}
            placeholder="Enter an answer for your card!"
            onChangeText={answer => this.setState({answer})}
            onSubmitEditing={this.submitForm}
            ref={input => { this.answerInput = input }}
          />
          {this.state.err !== '' && 
            <Error>
              {this.state.err}
            </Error>
          }
        </View>
        
        <BigButton
          onPress={this.submitForm}
          text='Add Card'
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
  bindActionCreators({ createCard }, dispatch)

export default connect(null, mapDispatchToProps)(NewCard)