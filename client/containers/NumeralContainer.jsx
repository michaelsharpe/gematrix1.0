import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// UI
import { Layout, Panel } from 'react-toolbox';
import SearchDrawer from 'components/SearchDrawer';

// Actions
import {
  getInitialNumerals,
  nextNumeralPage,
  prevNumeralPage,
  findNumeral
 } from 'actions/numeralActions';

class Numerals extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.props.getInitialNumerals();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const numeral = e.currentTarget.value;
      this.props.findNumeral(+numeral);
    }
  }

  render() {
    const { searchResults, searchOpen } = this.props;
    const results = searchResults.map((numeral, i) => (<li key={i}>{numeral.value}</li>));
    return (
      <Layout>
        <SearchDrawer searchOpen={searchOpen}>
          testing
        </SearchDrawer>

        <Panel>
          <input type="text" onKeyPress={this.handleKeyPress}/>
          <ul>
            {results}
          </ul>
        </Panel>
      </Layout>
    );
  }
}

Numerals.propTypes = {
  getInitialNumerals: PropTypes.func,
  onClickNextPage: PropTypes.func,
  onClickPrevPage: PropTypes.func,
  findNumeral: PropTypes.func,
  searchResults: PropTypes.array,
  searchOpen: PropTypes.bool
};

const mapStateToProps = state => ({
  searchResults: state.numerals.searchResults,
  searchOpen: state.numerals.searchOpen
});

const mapDispatchToProps = dispatch => ({
  getInitialNumerals: () => dispatch(getInitialNumerals()),
  onClickPrevPage: () => dispatch(prevNumeralPage()),
  onClickNextPage: () => dispatch(nextNumeralPage()),
  findNumeral: numeral => dispatch(findNumeral(numeral))
});

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals);

export default NumeralContainer;
