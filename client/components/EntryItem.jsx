import React, { PropTypes, Component } from 'react';
import { ListItem } from 'react-toolbox';

class EntryItem extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.entry);
  }

  render() {
    const { entry } = this.props;

    return (
      <ListItem
          caption={entry.word}
          legend={entry.definition}
          rightIcon={entry.default ? '' : 'chevron_right'}
          selectable={true}
          onClick={this.onClick}/>
      );
  }
}

EntryItem.propTypes = {
  entry: PropTypes.object,
  onClick: PropTypes.func
};

export default EntryItem;
