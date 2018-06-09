import { CARD_LOADING, CARDS_LOADING, GET_CARD, SET_CARD, DELETE_CARD, GET_CARDS, CLEAR_CARD, CLEAR_CARDS, INIT_PAGE, ADD_PAGE, DEL_PAGE, NEXT_PAGE, PREV_PAGE } from '../actions/types';

const initialState = {
  card: null,
  cards: null,
  cardloading: false,
  cardsloading: false
};

export default function(state = initialState, action) {
  let page;
  let pageidx;
  switch(action.type) {
    case CARD_LOADING:
      return {
        ...state,
        cardloading: true
      };
    case CARDS_LOADING:
      return {
        ...state,
        cardsloading: true
      };
    case GET_CARD:
      return {
        ...state,
        card: action.payload,
        cardloading: false
      };
    case SET_CARD:
      return {
        ...state,
        card: {
          ...state.card,
          ...action.payload
        }
      };
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload,
        cardsloading: false
      };
    case CLEAR_CARD:
      return {
        ...state,
        card: null
      };
    case CLEAR_CARDS:
      return {
        ...state,
        cards: null
      };
    case INIT_PAGE:
      return {
        ...state,
        card: {
          page: [{type1: '', type2: ''}],
          pageidx: 0
        }
      };
    case ADD_PAGE:
      page = state.card.page;
      page.splice(action.payload + 1, 0, {type1: '', type2: ''});
      return {
        ...state,
        card: {
          ...state.card,
          pageidx: action.payload + 1,
          page
        }
      };
    case DEL_PAGE:
      page = state.card.page;
      if(state.card.page.length === 1) {
        pageidx = 0;
        page.splice(action.payload, 1, {type1: '', type2: ''});
      } else if (action.payload + 1 === state.card.page.length) {
        pageidx = action.payload - 1;
        page.splice(action.payload, 1);
      } else {
        pageidx = action.payload;
        page.splice(action.payload, 1);
      }
      
      return {
        ...state,
        card: {
          ...state.card,
          pageidx,
          page
        }
      };
    case NEXT_PAGE:
      return {
        ...state,
        card: {
          ...state.card,
          pageidx: action.payload + 1
        }
      };
    case PREV_PAGE:
      return {
        ...state,
        card: {
          ...state.card,
          pageidx: action.payload - 1
        }
      };
    default:
      return state;
  }
}
