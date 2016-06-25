import {
  REQUEST_NUMERALS,
  FAIL_NUMERALS,
  RECEIVE_NUMERALS,
  SET_NUMERALS,
  SET_CURRENT_NUMERAL,
  CURRENT_DETAILS,
  CLOSE_DETAILS,
  OPEN_DETAILS
} from 'constants/actionTypes'

const initialState = {
  fetching: false,
  received: false,
  numeralCache: [],
  searchResults: [],
  currentNumeral: undefined,
  detailsOpen: true,
  currentDetails: {
    type: undefined,
    details: undefined
  }
}

const numerals = (state = initialState, action) => {
  switch (action.type) {
  case SET_NUMERALS:
    return {
      ...state,
      numeralCache: action.numerals
    }
  case REQUEST_NUMERALS:
    return {
      ...state,
      fetching: true,
      received: true
    }
  case RECEIVE_NUMERALS:
    return {
      ...state,
      fetching: false
    }
  case FAIL_NUMERALS:
    return {
      ...state,
      fetching: false
    }
  case SET_CURRENT_NUMERAL:
    return {
      ...state,
      currentNumeral: action.numeral
    }
  case CLOSE_DETAILS:
    return {
      ...state,
      detailsOpen: false
    }
  case OPEN_DETAILS:
    return {
      ...state,
      detailsOpen: true
    }
  case CURRENT_DETAILS:
    const { type, details } = action.details
    return {
      ...state,
      currentDetails: {
        type,
        details
      }
    }
  default:
    return state
  }
}

export default numerals
