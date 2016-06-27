import {
  REQUEST_NUMERALS,
  RECEIVE_NUMERALS,
  SET_NUMERALS,
  FAIL_NUMERALS,
  CLOSE_DETAILS,
  OPEN_DETAILS,
  CURRENT_DETAILS,
  SET_CURRENT_NUMERAL
} from 'constants/actionTypes'

import config from '../../config/client'
import { get } from 'superagent'

const numeralSearch = (nums, value) => nums.filter(num => num.value === value)[0]

const requestNumerals = () => ({
  type: REQUEST_NUMERALS
})

const receiveNumerals = () => {
  return dispatch => {
    dispatch({
      type: RECEIVE_NUMERALS
    })

    return Promise.resolve()
  }
}

const setNumerals = numerals => ({
  type: SET_NUMERALS,
  numerals
})

const failNumerals = () => ({
  type: FAIL_NUMERALS
})

export const closeDetails = () => ({
  type: CLOSE_DETAILS
})

export const openDetails = () => ({
  type: OPEN_DETAILS
})

export const setCurrentDetails = details => {
  return dispatch => {
    dispatch({
      type: CURRENT_DETAILS,
      details
    })

    return Promise.resolve()
  }
}

export const findNumeral = numeral => {
  return (dispatch, getState) => {
    const state = getState();
    const foundNumeral = numeralSearch(state.numerals.numeralCache, +numeral)
    dispatch({
      type: SET_CURRENT_NUMERAL,
      numeral: foundNumeral
    })

    return Promise.resolve(foundNumeral)
  }
}

export const getInitialNumerals = () => {
  return dispatch => {
    return new Promise(resolve => {
      dispatch(requestNumerals())

      get(`${config.api}/numerals`)
      .type('application/json')
      .accept('application/json')
      .end((err, res) => {
        try {
          dispatch(receiveNumerals())
          .then(dispatch(setNumerals(res.body.numerals)))
          .then(resolve())
        } catch (e) {
          console.log('GET request to /numerals failed.')
          dispatch(failNumerals())
        }
      })
    })
  }
}
