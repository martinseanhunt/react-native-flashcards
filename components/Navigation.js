import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

import DeckList from './DeckList'
import DeckView from './DeckView'
import NewDeck from './NewDeck'
import NewCard from './NewCard'
import Quiz from './Quiz'

const Tabs = TabNavigator({
  deckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => 
        <MaterialCommunityIcons name="cards" size={30} color={tintColor}/>
    }
  },
  newDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => 
        <Entypo name="new-message" size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: '#000',
    style: {
      height: 56,
      backgroundColor: '#fff',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const stackNavOptions = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#0F0F0F'
  }
}

const StackNav = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: stackNavOptions
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: stackNavOptions
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: stackNavOptions
  }
})

export default StackNav