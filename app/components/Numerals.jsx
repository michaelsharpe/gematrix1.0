import React, { PropTypes, Component } from 'react';
import { getNumerals } from '../actions/numeralActions';

class Numerals extends Component {
  componentWillMount() {
    this.props.dispatch(getNumerals());
  }

  render() {
    return (
      <ul>
        <li>Testing</li>
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
