import { connect } from 'react-redux'

import { closeDetails, findNumeral } from 'actions/numeralActions'
import Details from 'components/Details'

const mapStateToProps = state => ({
  currentDetails: state.numerals.currentDetails
})

const mapDispatchToProps = dispatch => ({
  closeDetails: () => dispatch(closeDetails()),
  findNumeral: num => dispatch(findNumeral(num))
})

const DetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Details)

export default DetailsContainer
