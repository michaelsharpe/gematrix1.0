import { connect } from 'react-redux'

import { getInitialNumerals, closeDetails } from 'actions/numeralActions'
import Numerals from 'components/Numerals'

const mapStateToProps = state => ({
  detailsOpen: state.numerals.detailsOpen
})

const mapDispatchToProps = dispatch => ({
  getNumerals: () => dispatch(getInitialNumerals()),
  closeDetails: () => dispatch(closeDetails())
})

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals)

export default NumeralContainer
