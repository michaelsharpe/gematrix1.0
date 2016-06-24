import {
  REQUEST_NUMERALS,
  FAIL_NUMERALS,
  RECEIVE_NUMERALS,
  SET_NUMERALS,
  FIND_NUMERAL,
  CURRENT_DETAILS
} from 'constants/actionTypes'

const initialState = {
  fetching: false,
  received: false,
  numeralCache: [],
  searchResults: [],
  searchOpen: false,
  currentNumeral: undefined,
  currentDetails: undefined
}

const findNumeral = (nums, value) => nums.filter(num => num.value === value)[0]

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
  case FIND_NUMERAL:
    const foundNumeral = findNumeral(state.numeralCache, action.numeral)
    return {
      ...state,
      currentNumeral: foundNumeral
    }
  case CURRENT_DETAILS:
    return {
      ...state,
      currentDetails: action.details
    }
  default:
    return state
  }
}

export default numerals
