// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Numerals from '../components/Numerals';

function mapStateToProps(state) {
  console.log('map state to props');
  console.log(state);
  return {
    numerals: state.numeralReducer.numerals,
    fetching: state.numeralReducer.fetching
  };
}


export default connect(mapStateToProps)(Numerals);
