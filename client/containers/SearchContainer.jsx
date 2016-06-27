import { connect } from 'react-redux'

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
  openDetails: () => dispatch(openDetails())
})

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer
