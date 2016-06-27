import React, { PropTypes, Component } from 'react'

import { Layout, Panel, Sidebar } from 'react-toolbox'
import Search from 'containers/SearchContainer'
import Details from 'containers/DetailsContainer'

class Numerals extends Component {
  componentWillMount() {
    const { getNumerals, closeDetails } = this.props
    if (window.innerWidth < 720) {
      closeDetails();
    }

    getNumerals()
  }

  render() {
    const { detailsOpen } = this.props
    return (
      <Layout>
        <Panel scrollY={true}>
          <Search />
        </Panel>

        <Sidebar pinned={detailsOpen} width={50} scrollY={true}>
            <Details />
        </Sidebar>
      </Layout>
    )
  }
}

Numerals.propTypes = {
  getNumerals: PropTypes.func.isRequired,
  closeDetails: PropTypes.func.isRequired,
  detailsOpen: PropTypes.bool
}

export default Numerals
