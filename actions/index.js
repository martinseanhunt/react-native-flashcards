import { saveDeck, getAllDecks } from '../utils/api'

export const CREATE_DECK = 'CREATE_DECK'
export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'

export const retrieveDecks = () => dispatch => {
  getAllDecks().then(decks => {
    dispatch({
      type: RETRIEVE_DECKS,
      payload: decks
    })
  })
}

export const createDeck = title => {
  saveDeck(title)
  return {
    type: CREATE_DECK,
    payload: title
  }
}