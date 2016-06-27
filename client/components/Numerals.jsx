import React, { PropTypes, Component } from 'react'

import { Layout, Panel, Sidebar } from 'react-toolbox'
import Search from 'containers/SearchContainer'
import Details from 'containers/DetailsContainer'

class Numerals extends Component {
  constructor(props) {
    super(props)
    this.findAndSetNumeral = this.findAndSetNumeral.bind(this)
  }

  componentWillMount() {
    const { closeDetails, getInitialNumerals, received, params } = this.props

    if (window.innerWidth < 720) {
      closeDetails()
    }

    if (!received) {
      getInitialNumerals()
      .then(() => {
        if (params.numeral) {
          this.findAndSetNumeral(params.numeral)
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('component wil receive props')
    if (this.props.params.numeral !== nextProps.params.numeral) {
      this.findAndSetNumeral(nextProps.params.numeral)
    }
  }

  findAndSetNumeral(num) {
    const { findNumeral, setCurrentDetails } = this.props

    return findNumeral(num)
    .then(foundNumeral => {
      setCurrentDetails({
        type: 'numeral',
        details: foundNumeral
      })
    })
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
  getInitialNumerals: PropTypes.func.isRequired,
  findNumeral: PropTypes.func.isRequired,
  setCurrentDetails: PropTypes.func.isRequired,
  closeDetails: PropTypes.func.isRequired,
  detailsOpen: PropTypes.bool,
  content: PropTypes.node,
  details: PropTypes.node,
  params: PropTypes.object,
  received: PropTypes.bool.isRequired
}

export default Numerals
