import React, { PropTypes, Component } from 'react'
import SearchList from 'components/SearchList'
import SearchField from 'components/SearchField'

class Search extends Component {
  constructor(props) {
    super(props)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onKeyPress(e) {
    const { findNumeral, setCurrentDetails } = this.props

    if (e.key === 'Enter') {
      const numeral = e.currentTarget.value
      findNumeral(+numeral)
        .then(foundNumeral => {
          setCurrentDetails({
            type: 'numeral',
            details: foundNumeral
          })
        })
    }
  }

  render() {
    const {
      currentNumeral,
      setCurrentDetails,
      openDetails
    } = this.props

    return (
      <div>
        <SearchField onKeyPress={this.onKeyPress}/>
        <SearchList
          numeral={currentNumeral}
          setDetails={setCurrentDetails}
          openDetails={openDetails}/>
      </div>
    )
  }
}

Search.propTypes = {
  currentNumeral: PropTypes.object,
  findNumeral: PropTypes.func.isRequired,
  setCurrentDetails: PropTypes.func.isRequired,
  openDetails: PropTypes.func.isRequired
}

export default Search
