import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'DECKS'

export const saveDeck = (title) => {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export const getAllDecks = () => 
  AsyncStorage.getItem(STORAGE_KEY)
  .then(results => JSON.parse(results))

export const saveCard = (deckKey, card) => {
  AsyncStorage.getItem(STORAGE_KEY)
  .then(results => JSON.parse(results))
  .then(decks => {
    const deck = { ...decks[deckKey] }
    deck.questions = [...deck.questions, card]

    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckKey]: deck
    }))
  })
}

const wipeDB = () => AsyncStorage.removeItem(STORAGE_KEY)