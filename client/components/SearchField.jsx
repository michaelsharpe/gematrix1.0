import React, { PropTypes, Component } from 'react';
import { Input } from 'react-toolbox';

import { searchContainer } from 'styles/search';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    search: ''
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const numeral = e.currentTarget.value;
      this.props.findNumeral(+numeral);
    }
  }

  handleChange = (value) => {
    this.setState({ ...this.state, search: value });
  };

  render() {
    return (
      <div className={searchContainer}>
        <Input
          label="Search"
          hint="Search for a number"
          value={this.state.search}
          name="number" icon="search"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}/>
      </div>
    );
  }
}

SearchField.propTypes = {
  findNumeral: PropTypes.func.isRequired
};

export default SearchField;
