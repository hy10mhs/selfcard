import { GET_ERRORS, CARD_LOADING, CARDS_LOADING, GET_CARD, SET_CARD, GET_CARDS, CLEAR_CARD, CLEAR_CARDS, INIT_PAGE, ADD_PAGE, DEL_PAGE, NEXT_PAGE, PREV_PAGE } from './types';
import axios from 'axios';

// Card Loading
export const setCardLoading = () => {
  return {
    type: CARD_LOADING
  }
}

// Cards Loading
export const setCardsLoading = () => {
  return {
    type: CARDS_LOADING
  }
}

// Get Card by handle
export const getCard = handle => dispatch => {
  dispatch(setCardLoading());
  axios
    .get(`/api/cards/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_CARD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CARD,
        payload: {}
      })
    );
}

// Set Card
export const setCard = cardData => {
  return {
    type: SET_CARD,
    payload: cardData
  };
}

// Save Card
export const saveCard = (cardData, history) => dispatch => {
  axios
    .post('/api/cards/', cardData)
    .then(res => {
      dispatch({
        type:CLEAR_CARD
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Get Cards
export const getCards = () => dispatch => {
  dispatch(setCardsLoading());
  axios
    .get('/api/cards')
    .then(res =>
      dispatch({
        type: GET_CARDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CARDS,
        payload: {}
      })
    );
}

// Clear Card
export const clearCard = () => {
  return {
    type: CLEAR_CARD
  };
}

// Clear Cards
export const clearCards = () => {
  return {
    type: CLEAR_CARDS
  };
}

export const initPage = () => {
  return {
    type: INIT_PAGE
  }
}

export const addPage = pageIdx => {
  return {
    type: ADD_PAGE,
    payload: pageIdx
  };
}

export const delPage = pageIdx => {
  return {
    type: DEL_PAGE,
    payload: pageIdx
  };
}

export const nextPage = pageIdx => {
  return {
    type: NEXT_PAGE,
    payload: pageIdx
  };
}

export const prevPage = pageIdx => {
  return {
    type: PREV_PAGE,
    payload: pageIdx
  };
}