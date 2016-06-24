import React, { PropTypes, Component } from 'react';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox';
import EntryItem from 'components/EntryItem';

class SearchList extends Component {
  onEntryClick(entry) {
    console.log(entry);
  }

  render() {
    const { numeral } = this.props;
    const math = numeral.math.length > 0 ? numeral.math[0] : '';

    const number = (
      <ListItem caption={numeral.value.toString()}
          legend={math}
          rightIcon={numeral.default ? '' : 'chevron_right'}/>
    );

    const entries = numeral.entries.map((entry, i)=> (
      <EntryItem key={i} entry={entry} onClick={this.onEntryClick}/>
    ));

    return (
      <List ripple={true} selectable={true}>
        {numeral.default ?
          <ListSubHeader caption="No results found"/> :
          <div>
            <ListSubHeader caption="Number"/>
            <ListDivider/>
            {number}
          </div>
        }

        {numeral.default ? <noscript/> :
          <div>
            <ListSubHeader caption="Entries"/>
            <ListDivider/>
            {entries}
          </div>
        }
      </List>
    );
  }
}

SearchList.propTypes = {
  numeral: PropTypes.object
};

SearchList.defaultProps = {
  numeral: {
    value: 0,
    math: [],
    default: true,
    entries: [{
      word: '',
      definition: '',
      default: true
    }]
  }
};

export default SearchList;
