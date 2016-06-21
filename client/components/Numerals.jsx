import React, { PropTypes, Component } from 'react';

class Numerals extends Component {
  componentWillMount() {
    this.props.getInitialNumerals();
  }

  render() {
    const { pageList } = this.props.numerals;
    const nums = pageList.map((numeral, i) => (<li key={i}>{numeral.value}</li>));
    return (
      <div>
        <button onClick={this.props.onClickPrevPage}>Previous Page</button>
        <button onClick={this.props.onClickNextPage}>Next Page</button>
        <ul>
          {nums}
        </ul>
      </div>
    );
  }
}

Numerals.propTypes = {
  getInitialNumerals: PropTypes.func,
  onClickNextPage: PropTypes.func,
  onClickPrevPage: PropTypes.func,
  numerals: PropTypes.object,
  api: PropTypes.object
};

export default Numerals;
