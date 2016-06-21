import {
  REQUEST_NUMERALS,
  RECEIVE_NUMERALS,
  SET_NUMERALS,
  FAIL_NUMERALS,
  GOTO_NUMERAL_PAGE,
  NEXT_NUMERAL_PAGE,
  PREV_NUMERAL_PAGE
} from '../constants/actionTypes';

import config from '../../config/client';
import { get } from 'superagent';

// ADD ACTIONS FOR PAGINATION

const requestNumerals = () => ({
  type: REQUEST_NUMERALS
});

const receiveNumerals = () => {
  return dispatch => {
    dispatch({
      type: RECEIVE_NUMERALS
    });

    return Promise.resolve();
  };
};

const setNumerals = numerals => ({
  type: SET_NUMERALS,
  numerals
});

const failNumerals = () => ({
  type: FAIL_NUMERALS
});

export const gotoNumeralPage = page => ({
  type: GOTO_NUMERAL_PAGE,
  page
});

export const nextNumeralPage = () => ({
  type: NEXT_NUMERAL_PAGE
});

export const prevNumeralPage = () => ({
  type: PREV_NUMERAL_PAGE
});

export const getInitialNumerals = () => {
  return dispatch => {
    console.log('Dispatch called');
    dispatch(requestNumerals());

    get(`${config.api}/numerals`)
    .type('application/json')
    .accept('application/json')
    .end((err, res) => {
      try {
        dispatch(receiveNumerals())
        .then(() => dispatch(setNumerals(res.body.numerals)))
        .then(() => dispatch(gotoNumeralPage(1)));
      } catch (e) {
        console.log('GET request to /numerals failed.');
        dispatch(failNumerals());
      }
    });
  };
};
