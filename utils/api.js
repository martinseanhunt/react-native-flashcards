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