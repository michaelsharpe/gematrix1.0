import {
  REQUEST_NUMERALS,
  RECEIVE_NUMERALS,
  SET_NUMERALS,
  FAIL_NUMERALS,
  FIND_NUMERAL,
  TOGGLE_DETAILS,
  CURRENT_DETAILS
} from 'constants/actionTypes'

import config from '../../config/client'
import { get } from 'superagent'

// ADD ACTIONS FOR PAGINATION

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

export const findNumeral = numeral => ({
  type: FIND_NUMERAL,
  numeral
})

export const toggleDetails = () => ({
  type: TOGGLE_DETAILS
})

export const setCurrentDetails = details => ({
  type: CURRENT_DETAILS,
  details
})

export const getInitialNumerals = () => {
  return dispatch => {
    console.log('Dispatch called')
    dispatch(requestNumerals())

    get(`${config.api}/numerals`)
    .type('application/json')
    .accept('application/json')
    .end((err, res) => {
      try {
        dispatch(receiveNumerals())
        .then(() => dispatch(setNumerals(res.body.numerals)))
      } catch (e) {
        console.log('GET request to /numerals failed.')
        dispatch(failNumerals())
      }
    })
  }
}
