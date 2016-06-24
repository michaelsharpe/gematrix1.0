import React, { PropTypes, Component } from 'react'
import { ListItem } from 'react-toolbox'

class NumeralItem extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.onClick(this.props.numeral)
  }

  render() {
    const { numeral } = this.props;
    const math = numeral.math.length > 0 ? numeral.math[0] : ''

    return (
      <ListItem caption={numeral.value.toString()}
        legend={math}
        onClick={this.onClick}
        selectable={true}
        rightIcon={numeral.default ? '' : 'chevron_right'}/>
    )
  }
}

NumeralItem.propTypes = {
  numeral: PropTypes.object,
  onClick: PropTypes.func
}

export default NumeralItem;
