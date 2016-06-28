import React, { PropTypes, Component } from 'react'

import { Button } from 'react-toolbox'
import { Link } from 'react-router'

class SeeButton extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.findNumeral(this.props.see)
  }

  render() {
    return (
      <Link to={`/numerals/${this.props.see}`}>
        <Button label={this.props.see.toString()}/>
      </Link>
    )
  }
}

SeeButton.propTypes = {
  see: PropTypes.number.isRequired,
  findNumeral: PropTypes.func.isRequired
}

export default SeeButton
