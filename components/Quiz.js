import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components'

import { shuffleQuestions, clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import Card from './Card'
import BigButton from './BigButton'
import ScreenTitle from './ScreenTitle'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quiz'
  })

  state = {
    question: 0,
    showAnswer: false,
    score: 0
  }

  triggerHaltNotification = () =>
    clearLocalNotifications()
      .then(setLocalNotification)

  nextQuestion = correct => {
    const { deck } = this.props
    const { question } = this.state

    if ( question + 1 === deck.questions.length ) 
      this.triggerHaltNotification()
    
    this.setState(state => ({ 
      score: state.score + correct,
      question: state.question + 1,
      showAnswer: false
    }))
  }

  restartQuiz = () => this.setState({
    question: 0,
    showAnswer: false,
    score: 0
  })

  render() {  
    const { navigation, deck } = this.props
    const { key } = navigation.state.params
    const { question, showAnswer, score } = this.state

    if(deck.questions.length === 0) {
      return (
        <Container>
          <ScreenTitle>You need to add some cards!</ScreenTitle>
  
          <Buttons>
            <BigButton onPress={() => navigation.navigate('NewCard', { key })}
              text='Add a card' />
  
            <BigButton onPress={() => 
              navigation.dispatch(NavigationActions.back({ key: navigation.state.key }))}
              text='Back to deck details' />
          </Buttons>
        </Container>
      )
    }

    if(deck.questions[question]) {
      const currentQuestion = deck.questions[question]

      return (
        <Container>
          <QuestionCount>{question + 1}/{deck.questions.length}</QuestionCount>

          <View>
            <Card>
              {showAnswer 
                ? <CardContents>{currentQuestion.answer}</CardContents>
                : <CardContents>{currentQuestion.question}</CardContents>
              }        
            </Card>

            <CardFlip onPress={() => this.setState(state => ({ showAnswer: !state.showAnswer }))}>
              {showAnswer
                ? <CardFlipText>Hide Answer</CardFlipText>
                : <CardFlipText>Show Answer</CardFlipText>
              }
            </CardFlip>          
          </View>

          <Buttons>
            <BigButton onPress={() => this.nextQuestion(1)}
              text='Correct' />

            <BigButton onPress={() => this.nextQuestion(0)}
              text='Incorrect' />
          </Buttons>
          
        </Container>
      )
    }

    return (
      <Container>
        <ScreenTitle>Well done, you've completed the quiz!</ScreenTitle>

        <View>
          <FinalScore>{score}/{deck.questions.length}</FinalScore>

          <Text>Questions correct</Text> 
        </View>


        <Buttons>
          <BigButton onPress={this.restartQuiz}
            text='Restart Quiz' />

          <BigButton onPress={() => 
            navigation.dispatch(NavigationActions.back({ key: navigation.state.key }))}
            text='Back to deck details' />
        </Buttons>
      </Container>
    )
    
  }
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between; 
  align-items: center;
`

const QuestionCount = styled.Text`
  text-align: right;
  width: 100%;
`

const CardContents = styled.Text`
  font-size: 24px;
  padding: 20px 0;
  text-align: center;
  width: 100%;
`
const CardFlip = styled.TouchableOpacity`
  border: 1px solid #0F0F0F;
  border-radius: 3px;
  padding: 15px;
  align-self: center;
`

const CardFlipText = styled.Text`
  width: 100%;
  text-align: center;
`

const Buttons = styled.View`
  width: 100%;
`

const FinalScore = styled.Text`
  font-size: 45px;
  text-align: center;
`

const mapStateToProps = ({ decks }, { navigation }) => {
  const { key } = navigation.state.params
  const deck = decks[key]
  deck.questions = shuffleQuestions(deck.questions)

  return {
    deck
  }
}

export default connect(mapStateToProps)(Quiz)