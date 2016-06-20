import {
  REQUEST_NUMERALS,
  RECEIVE_NUMERALS,
  FAIL_NUMERALS
} from '../constants/actionTypes';

const initialState = {
  fetching: false,
  numerals: []
};

const numeralReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_NUMERALS:
    return {
      ...state,
      fetching: true
    };
  case RECEIVE_NUMERALS:
    return {
      ...state,
      numerals: action.numerals
    };
  case FAIL_NUMERALS:
    return {
      ...state,
      fetching: false
    };
  default:
    return state;
  }
};

export default numeralReducer;
