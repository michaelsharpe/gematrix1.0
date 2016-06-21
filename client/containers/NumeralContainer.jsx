// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Numerals from '../components/Numerals';

import {
  getInitialNumerals,
  nextNumeralPage,
  prevNumeralPage
 } from '../actions/numeralActions';

const mapStateToProps = state => ({
  numerals: state.numerals.pages,
  api: state.numerals.api
});

const mapDispatchToProps = dispatch => ({
  getInitialNumerals: () => dispatch(getInitialNumerals()),
  onClickPrevPage: () => dispatch(prevNumeralPage()),
  onClickNextPage: () => dispatch(nextNumeralPage())
});

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals);

export default NumeralContainer;
