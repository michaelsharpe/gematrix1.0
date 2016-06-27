import { connect } from 'react-redux'

import {
  getInitialNumerals,
  closeDetails,
  findNumeral,
  setCurrentDetails
} from 'actions/numeralActions'

import Numerals from 'components/Numerals'

const mapStateToProps = state => ({
  detailsOpen: state.numerals.detailsOpen,
  currentNumeral: state.numerals.currentNumeral,
  received: state.numerals.received
})

const mapDispatchToProps = dispatch => ({
  getInitialNumerals: () => dispatch(getInitialNumerals()),
  closeDetails: () => dispatch(closeDetails()),
  findNumeral: num => dispatch(findNumeral(num)),
  setCurrentDetails: details => dispatch(setCurrentDetails(details))
})

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals)

export default NumeralContainer
