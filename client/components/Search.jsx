import React, { PropTypes } from 'react'
import SearchList from 'components/SearchList'
import SearchField from 'components/SearchField'

const Search = ({
  currentNumeral,
  findNumeral,
  setCurrentDetails
}) => (
  <div>
    <SearchField findNumeral={findNumeral}/>
    <SearchList numeral={currentNumeral} setDetails={setCurrentDetails}/>
  </div>
)

Search.propTypes = {
  currentNumeral: PropTypes.object,
  findNumeral: PropTypes.func.isRequired,
  setCurrentDetails: PropTypes.func.isRequired
}

export default Search
