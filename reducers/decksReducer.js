import { RETRIEVE_DECKS, CREATE_DECK, CREATE_CARD } from '../actions'

const decksReducer = (state = {}, action) => {
  switch(action.type) {
    case RETRIEVE_DECKS:
      return { ...action.payload }
    case CREATE_DECK: 
      return { ...state, [action.payload]: { title: action.payload, questions: [] } }
    case CREATE_CARD:    
      const { deckKey, card } = action.payload
      
      const deck = { ...state[deckKey] }
      deck.questions = [...deck.questions, card]

      return {
        ...state,
        [deckKey]: deck
      }
    default: 
      return state
  }
}

export default decksReducer