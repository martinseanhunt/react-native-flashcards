import { saveDeck, getAllDecks, saveCard } from '../utils/api'

export const CREATE_DECK = 'CREATE_DECK'
export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const CREATE_CARD = 'CREATE_CARD'

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

export const createCard = (deckKey, card) => {
  saveCard(deckKey, card)
  return {
    type: CREATE_CARD,
    payload: { deckKey, card }
  }
}