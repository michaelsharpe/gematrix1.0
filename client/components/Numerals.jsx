import React, { PropTypes, Component } from 'react';
import { fetchNumerals } from '../actions/numeralActions';


class Numerals extends Component {
  componentWillMount() {
    this.props.dispatch(fetchNumerals());
  }

  render() {
    let nums = [];
    if (this.props.numerals.length !== 0) {
      nums = this.props.numerals.map((numeral, i) => (
        <li key={i}>
          {numeral.value}
        </li>
      ));
    }
    return (
      <ul>
        {nums}
      </ul>
    );
  }
}

Numerals.propTypes = {
  dispatch: PropTypes.func,
  numerals: PropTypes.array,
  fetching: PropTypes.bool
};

export default Numerals;
