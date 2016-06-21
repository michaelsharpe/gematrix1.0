import {
  REQUEST_NUMERALS,
  FAIL_NUMERALS,
  RECEIVE_NUMERALS,
  SET_NUMERALS,
  GOTO_NUMERAL_PAGE,
  NEXT_NUMERAL_PAGE,
  PREV_NUMERAL_PAGE,
  SORT_NUMERALS,
  FILTER_NUMERALS
} from '../constants/actionTypes';

import { combineReducers } from 'redux';
import paginated from 'paginated-redux';

const initialState = {
  fetching: false,
  received: false
};

const numeralList = (state = [], action) => {
  switch (action.type) {
  case SET_NUMERALS:
    return action.numerals;
  default:
    return state;
  }
};

const pages = paginated(numeralList, {
  GOTO_PAGE: GOTO_NUMERAL_PAGE,
  NEXT_PAGE: NEXT_NUMERAL_PAGE,
  PREV_PAGE: PREV_NUMERAL_PAGE,
  FILTER: FILTER_NUMERALS,
  SORT: SORT_NUMERALS
}, {
  defaultSortBy: 'value'
});

const api = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_NUMERALS:
    return {
      ...state,
      fetching: true,
      received: true
    };
  case RECEIVE_NUMERALS:
    return {
      ...state,
      fetching: false
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

const numeralReducer = combineReducers({
  api,
  pages
});

export default numeralReducer;
