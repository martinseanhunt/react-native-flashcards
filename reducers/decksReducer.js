import { RETRIEVE_DECKS, CREATE_DECK } from '../actions'

const decksReducer = (state = {}, action) => {
  switch(action.type) {
    case RETRIEVE_DECKS:
      return { ...action.payload }
    case CREATE_DECK: 
      return { ...state, [action.payload]: { title: action.payload, questions: [] } }
    default: 
      return state
  }
}

export default decksReducer