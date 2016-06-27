import React, { PropTypes, Component } from 'react'
import { Input } from 'react-toolbox'

import { searchContainer } from 'styles/search'

class SearchField extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    search: ''
  }

  handleChange = (value) => {
    this.setState({ ...this.state, search: value })
  }

  render() {
    return (
      <div className={searchContainer}>
        <Input
          label="Search"
          hint="Search for a number"
          value={this.state.search}
          name="number" icon="search"
          onChange={this.handleChange}
          onKeyPress={this.props.onKeyPress}/>
      </div>
    )
  }
}

SearchField.propTypes = {
  onKeyPress: PropTypes.func.isRequired
}

export default SearchField
