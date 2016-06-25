import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

// UI
import { Layout, Panel, Sidebar } from 'react-toolbox'
import Search from 'containers/SearchContainer'
import Details from 'containers/DetailsContainer'

// Actions
import { getInitialNumerals } from 'actions/numeralActions'

class Numerals extends Component {
  componentWillMount() {
    this.props.getInitialNumerals()
  }

  render() {
    return (
      <Layout>
        <Panel scrollY={true}>
          <Search />
        </Panel>

        <Sidebar
          pinned={this.props.detailsOpen}
          width={50}>
            <Details />
        </Sidebar>
      </Layout>
    )
  }
}

Numerals.propTypes = {
  getInitialNumerals: PropTypes.func.isRequired,
  detailsOpen: PropTypes.bool
}

const mapStateToProps = state => ({
  detailsOpen: state.numerals.detailsOpen
})

const mapDispatchToProps = dispatch => ({
  getInitialNumerals: () => dispatch(getInitialNumerals())
})

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals)

export default NumeralContainer
