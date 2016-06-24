import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

// UI
import { Layout, Panel, Sidebar, IconButton } from 'react-toolbox'
import Search from 'containers/SearchContainer'

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
          pinned={true}
          width={50}>
            <div><IconButton icon="close"/></div>
            <div style={{ flex: 1 }}>
                <p>Supplemental content goes here.</p>
            </div>
        </Sidebar>
      </Layout>
    )
  }
}

Numerals.propTypes = {
  getInitialNumerals: PropTypes.func.isRequired,
  searchOpen: PropTypes.bool
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  getInitialNumerals: () => dispatch(getInitialNumerals())
})

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals)

export default NumeralContainer
