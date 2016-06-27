import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  findNumeral,
  setCurrentDetails,
  openDetails
 } from 'actions/numeralActions'
import Search from 'components/Search'

const mapStateToProps = state => ({
  currentNumeral: state.numerals.currentNumeral
})

const mapDispatchToProps = dispatch => ({
  findNumeral: numeral => dispatch(findNumeral(numeral)),
  setCurrentDetails: details => dispatch(setCurrentDetails(details)),
  openDetails: () => dispatch(openDetails()),
  transitionTo: path => dispatch(push(path))
})

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer
