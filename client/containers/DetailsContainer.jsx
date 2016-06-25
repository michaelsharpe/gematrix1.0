import { connect } from 'react-redux'

import { closeDetails } from 'actions/numeralActions'
import Details from 'components/Details'

const mapStateToProps = state => ({
  currentDetails: state.numerals.currentDetails
})

const mapDispatchToProps = dispatch => ({
  closeDetails: () => dispatch(closeDetails())
})

const DetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);

export default DetailsContainer
