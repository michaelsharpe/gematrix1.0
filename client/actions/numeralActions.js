import {
  REQUEST_NUMERALS,
  RECEIVE_NUMERALS,
  FAIL_NUMERALS
} from '../constants/actionTypes';

import config from '../../config/client';
import { get } from 'superagent';

const requestNumerals = () => {
  return {
    type: REQUEST_NUMERALS
  };
};

const receiveNumerals = (numerals) => {
  return {
    type: RECEIVE_NUMERALS,
    numerals
  };
};

const failNumerals = () => {
  return {
    type: FAIL_NUMERALS
  };
};

export const fetchNumerals = () => {
  return dispatch => {
    dispatch(requestNumerals());

    get(`${config.api}/numerals`)
    .type('application/json')
    .accept('application/json')
    .end((err, res) => {
      try {
        dispatch(receiveNumerals(res.body.numerals));
      } catch (e) {
        console.log('GET request to /numerals failed.');
        dispatch(failNumerals());
      }
    });
  };
};
