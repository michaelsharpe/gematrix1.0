import React, { PropTypes, Component } from 'react'
import { List, ListSubHeader, ListDivider } from 'react-toolbox'
import EntryItem from 'components/EntryItem'
import NumeralItem from 'components/NumeralItem'

class SearchList extends Component {
  constructor(props) {
    super(props)
    this.onEntryClick = this.onEntryClick.bind(this)
    this.onNumeralClick = this.onNumeralClick.bind(this)
  }

  onEntryClick(entry) {
    this.props.setDetails(entry)
  }

  onNumeralClick(numeral) {
    this.props.setDetails(numeral)
  }

  render() {
    const { numeral } = this.props
    const entries = numeral.entries.map((entry, i)=> (
      <EntryItem key={i} entry={entry} onClick={this.onEntryClick}/>
    ))

    return (
      <List ripple={true} selectable={true}>
        {numeral.default ?
          <ListSubHeader caption="No results found"/> :
          <div>
            <ListSubHeader caption="Number"/>
            <ListDivider/>
            <NumeralItem numeral={numeral} onClick={this.onNumeralClick}/>
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
    )
  }
}

SearchList.propTypes = {
  numeral: PropTypes.object,
  setDetails: PropTypes.func
}

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
}

export default SearchList
