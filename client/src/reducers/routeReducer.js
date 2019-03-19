import {
    GO_HOME
  } from '../actions/types';
  
  const initialState = {
    whereToNext: ''
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_ITEMS:
        return {
          ...state,
          whereToNext: 'Home'
        };
      default:
        return state;
    }
  }
  