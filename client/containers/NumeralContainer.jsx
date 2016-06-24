import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// UI
import { Layout, Panel } from 'react-toolbox';
import SearchList from 'components/SearchList';

// Actions
import { getInitialNumerals, findNumeral } from 'actions/numeralActions';

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
    const { currentNumeral } = this.props;

    return (
      <Layout>
        <Panel>
          <input onKeyUp={this.handleKeyPress} type="text"/>
          <br/>
          <SearchList numeral={currentNumeral}/>
        </Panel>
      </Layout>
    );
  }
}

Numerals.propTypes = {
  currentNumeral: PropTypes.object,
  getInitialNumerals: PropTypes.func,
  findNumeral: PropTypes.func,
  searchOpen: PropTypes.bool
};

const mapStateToProps = state => ({
  currentNumeral: state.numerals.currentNumeral
});

const mapDispatchToProps = dispatch => ({
  getInitialNumerals: () => dispatch(getInitialNumerals()),
  findNumeral: numeral => dispatch(findNumeral(numeral))
});

const NumeralContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Numerals);

export default NumeralContainer;
